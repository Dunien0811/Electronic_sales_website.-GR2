import React, { Component } from "react";
import BillDetail from "./BillDetail";
import YourOrder from "./YourOrder";
import { connect } from "react-redux";
import callApi from "../../utils/apiCaller";
import { Redirect } from "react-router-dom";
import { actClearRequest } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLoading, doneLoading } from "../../utils/loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";
const MySwal = withReactContent(Swal);

toast.configure();

let token, res, resultOrder;
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCheckout: false,
      login: true,
      shippingAddress: false,
      checkout: false,
      result: false,
    };
    this.billing = React.createRef();
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
  }

  submitOrder = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to check out now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Checkout now!",
    }).then(async (result) => {
      const cart = this.props.cartStore;
      if (result.value) {
        const { provinceData, stateData } = res; //get code
        const resData = await callApi("users/me", "GET", null, token);
        const userId = resData.data.results[0].id;
        const promoTotal = 0;
        if (res.name === "" || res.address === "" || res.phone === "") {
          return toast.error("Please complete form before checkout");
        }
        //GET DATA FOR TABLE ORDER
        let amount = 0;
        let ship = 2; //setStatic
        if (cart.length > 0) {
          amount = cart.reduce((sum, item) => {
            return (sum += item.quantity * item.price);
          }, 0);
        } //output total Amount
        let addressProvince;
        if (res.provinces && res.provinces.length) {
          res.provinces.map((item) => {
            if (item.code === provinceData) {
              addressProvince = item.name;
              return addressProvince;
            }
            return { message: "error" };
          }); //output name province
        }

        let addressState;
        if (res.states && res.states.length) {
          res.states.map((item) => {
            if (item.code === stateData) {
              addressState = item.name;
              return addressState;
            }
            return { message: "error" };
          }); //output name state
        }

        const addressResult = {
          province: addressProvince,
          state: addressState,
          house: res.address,
          codeProvince: provinceData,
          codeState: stateData,
        }; // output address
        const note = res.note !== "" ? res.note : null;
        const resultOrder = {
          fullName: res.name,
          address: addressResult,
          note: note,
          phone: res.phone,
          shippingTotal: ship,
          itemAmount: amount,
          promoTotal,
          userId,
          totalAmount: ship + amount - promoTotal,
        };
        //insert order to db
        startLoading();
        const orderDb = await callApi("orders", "POST", resultOrder, token); //method post nen truyen them token tren headers
        //END GET DATA FOR TABLE ORDER

        //GET DATA ORDER_DETAIL
        cart.map(async (item) => {
          const resultOrderDetail = {
            quantity: item.quantity,
            price: item.price,
            orderId: orderDb.data.id,
            productId: item.id,
            nameProduct: item.nameProduct,
          };
          const payloadNumberAvailable = { numberAvailable: item.quantity };
          const changeNumberAvailableProduct = callApi(
            `products/${item.id}/updateNumberAvailable`,
            "PUT",
            payloadNumberAvailable,
            token
          );
          const addOrderDetail = callApi(
            "orderDetails",
            "POST",
            resultOrderDetail,
            token
          );
          await Promise.all([changeNumberAvailableProduct, addOrderDetail]);
          MySwal.fire({
            position: "top-end",
            icon: "success",
            title: "Success!",
            showConfirmButton: true,
            timer: 15000,
          });
          this.setState({
            checkout: true,
            result: true,
          });
          doneLoading();
        });
        //ENDGET DATA ORDER_DETAIL

        //CLEAR CART AFTER CHECKOUT
        this.props.reset_cart();
      }
    });
  };

  toggleCheckout = async () => {
    const { toggleCheckout, shippingAddress } = this.state;
    const auth = localStorage.getItem("_auth");
    console.log('auth', auth)
    if (!auth) {
      return toast.error("Missing authentication!");
    }
    res = this.billing.current.getBillingState();
    const { provinceData, stateData } = res; //get code
    const resData = await callApi("users/me", "GET", null, token);
    const userId = resData.data.results[0].id;
    const builder = localStorage.getItem("_cart");
    const dataCart = JSON.parse(builder);
    if (res.name === "" || res.address === "" || res.phone === "") {
      return toast.error("Please complete form before checkout");
    }
    let addressProvince;
    if (res.provinces && res.provinces.length) {
      res.provinces.map((item) => {
        if (item.code === provinceData) {
          addressProvince = item.name;
          return addressProvince;
        }
        return { message: "error" };
      }); //output name province
    }

    let addressState;
    if (res.states && res.states.length) {
      res.states.map((item) => {
        if (item.code === stateData) {
          addressState = item.name;
          return addressState;
        }
        return { message: "error" };
      }); //output name state
    }

    const addressResult = {
      province: addressProvince,
      state: addressState,
      house: res.address,
      codeProvince: provinceData,
      codeState: stateData,
    }; // output address
    const note = res.note !== "" ? res.note : null;
    let amount = 0;
    let dataItems = [];
    dataCart.forEach((item) => {
      dataItems.push({
        sku: item.id,
        name: item.nameProduct,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        currency: "USD",
      });
    });
    if (dataCart.length > 0) {
      amount = dataCart.reduce((sum, item) => {
        return (sum += item.quantity * item.price);
      }, 0);
    } //output total Amount
    resultOrder = {
      fullName: res.name,
      address: addressResult,
      note: note,
      phone: res.phone,
      itemAmount: amount,
      promoTotal: 0,
      shippingTotal: 2,
      totalAmount: amount + 2,
      orderBill: {
        customer: userId,
        total: amount,
        items: dataItems,
        itemsDetails: dataCart,
      },
      token,
    };
    this.setState({
      toggleCheckout: !toggleCheckout,
      shippingAddress: !shippingAddress,
    });
  };

  changeToggle(result) {
    if (result === true) {
      this.setState({
        checkout: true,
        result: true,
      });
    }
    //CLEAR CART AFTER CHECKOUT
    this.props.reset_cart();
  }

  render() {
    const {
      redirectTo,
      toggleCheckout,
      shippingAddress,
      checkout,
      result,
    } = this.state;
    if (redirectTo) {
      return <Redirect to="/after-checkout"></Redirect>;
    }
    return (
      <div className="checkout-area pt-60 pb-30">
        <div className="container">
          <div
            className="row"
            style={{ textAlign: "center", marginTop: -25, paddingBottom: 10 }}
          >
            <div className="col-3"></div>
            <div className="col-6">
              <div className="container">
                <ul className="progressbar">
                  <li className="active">login</li>
                  {shippingAddress ? (
                    <li className="active">SHIPPING ADDRESS</li>
                  ) : (
                    <li>SHIPPING ADDRESS</li>
                  )}
                  {checkout ? (
                    <li className="active">CHECKOUT</li>
                  ) : (
                    <li>CHECKOUT</li>
                  )}
                  {result ? (
                    <li className="active">RESULT</li>
                  ) : (
                    <li>RESULT</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          {result ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="error-wrapper text-center ptb-50 pt-xs-20">
                  <div>
                    <img
                      src="https://i.ibb.co/pvDhxPj/checked-ok-yes-icon-1320196391133448530.png"
                      alt="checked"
                      height="70px"
                    />
                    <h1>Thank You.</h1>
                  </div>
                  <div>
                    <h1>Your order was completed successfully.</h1>
                  </div>
                  <div>
                    <p>
                      <i>
                        The details of your order have been sent to the email.
                        Please check your email to check the status of your
                        order.
                      </i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {toggleCheckout ? (
                <YourOrder
                  changeToggle={(result) => this.changeToggle(result)}
                  order={resultOrder}
                  submitOrder={() => this.submitOrder()}
                ></YourOrder>
              ) : (
                <BillDetail ref={this.billing}></BillDetail>
              )}
              <div className="col-12" style={{ textAlign: "center" }}>
                {!toggleCheckout ? (
                  <button
                    onClick={() => this.toggleCheckout()}
                    className="btn btn-primary"
                    style={{ marginTop: -25, marginBottom: 10 }}
                  >
                    Next Step
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartStore: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset_cart: () => {
      dispatch(actClearRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

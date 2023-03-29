import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { connect } from 'react-redux'
import callApi from '../../../utils/apiCaller';
import { actAddOrderRequest, actGetOrderRequest, actEditOrderRequest } from '../../../redux/actions/order';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
let token;
let id;

class ActionOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      address: '',
      note: '',
      phone: '',
      totalAmount: 0,
      itemAmount: 0,
      promoTotal: 0,
      shippingTotal: 0,
      paypalCode: '',
      status: 'Unconfirm',
      isPaid: false,
      code: 0,
      isPaymentOnline: false,
      redirectToOrder: false,
      provinceData: '01',
      stateData: '001',
      provinces: null,
      states: null,
      dataOrderDetails: []
    };
    id = this.props.id
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    const myProvinces = await callApi('provinces', 'GET', null);
    if (id) {
      const res = await callApi(`orders/${id}`, 'GET', null, token);
      const myStates = await callApi(`provinces/${res.data.address.codeProvince}/states`, 'GET', null);
      const resOrderDetails = await callApi(`order/${id}/orderDetails`, 'GET', null, token);
      this.setState({
        provinces: myProvinces.data,
        states: myStates.data,
        fullName: res.data.fullName,
        address: res.data.address.house,
        paypalCode: res.data.paypalCode,
        provinceData: res.data.address.codeProvince,
        stateData: res.data.address.codeState,
        note: res.data.note,
        phone: res.data.phone,
        totalAmount: res.data.totalAmount,
        itemAmount: res.data.itemAmount,
        promoTotal: res.data.promoTotal,
        shippingTotal: res.data.shippingTotal,
        status: res.data.status,
        isPaid: res.data.isPaid,
        code: res.data.id,
        isPaymentOnline: res.data.isPaymentOnline,
        dataOrderDetails: resOrderDetails.data.results
      })
    } else {
      const myStates = await callApi('provinces/01/states', 'GET', null);
      this.setState({
        provinces: myProvinces.data,
        states: myStates.data
      })
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { fullName, address, phone, isPaid, isPaymentOnline, status, note, itemAmount, shippingTotal, promoTotal, states, provinces, provinceData, stateData } = this.state;
    let addressProvince;
    if (provinces && provinces.length) {
      provinces.map((item) => {
        if (item.code === provinceData) {
          addressProvince = item.name;
          return addressProvince;
        }
        return { message: 'error' }
      }) //output name province
    }

    let addressState;
    if (states && states.length) {
      states.map((item) => {
        if (item.code === stateData) {
          addressState = item.name;
          return addressState;
        }
        return { message: 'error' }
      }) //output name state
    }


    const addressResult = {
      province: addressProvince,
      state: addressState,
      house: address,
      codeProvince: provinceData,
      codeState: stateData,
    }// output address

    const newFullName = (fullName === '') ? null : fullName
    const newAddress = address === '' ? null : addressResult
    const newPhone = phone === '' ? null : phone;
    const newNote = note === '' ? null : note;
    const newItemAmount = parseFloat(itemAmount);
    const newShippingTotal = parseFloat(shippingTotal);
    const newPromoTotal = parseFloat(promoTotal);
    const newTotalAmount = newItemAmount + newShippingTotal - newPromoTotal;


    if (!id) {
      const newOrder = {
        fullName: newFullName,
        address: newAddress,
        note: newNote,
        phone: newPhone,
        itemAmount: newItemAmount,
        promoTotal: newPromoTotal,
        shippingTotal: newShippingTotal,
        totalAmount: newTotalAmount,
        isPaid,
        isPaymentOnline,
        status
      }
      this.props.add_order(token, newOrder);
      this.setState({
        fullName: '',
        address: '',
        note: '',
        phone: '',
        itemAmount: 0,
        promoTotal: 0,
        shippingTotal: 0,
        totalAmount: 0,
        isPaid: false,
        isPaymentOnline: false,
        status: 'Unconfirm'
      })
    } else {
      const editOrder = {
        fullName: newFullName,
        address: newAddress,
        note: newNote,
        phone: newPhone,
        itemAmount: newItemAmount,
        promoTotal: newPromoTotal,
        shippingTotal: newShippingTotal,
        totalAmount: newTotalAmount,
        isPaid,
        isPaymentOnline,
        status
      }
      await this.props.edit_order(token, id, editOrder);
      this.setState({
        redirectToOrder: true
      })
    }


  }

  sumTotal = (itemAmount, shippingTotal, promoTotal) => {
    const newitemAmount = itemAmount ? itemAmount : 0;
    const newShippingTotal = shippingTotal ? shippingTotal : 0;
    const newpPomoTotal = promoTotal ? promoTotal : 0;

    const result = parseInt(newitemAmount) + parseInt(newShippingTotal) - parseInt(newpPomoTotal);
    if (result < 0) {
      return toast.error('ERROR! Total amount can not < 0');
    }
    return result;
  }

  handleChangeSelectProvince = async (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const res = await callApi(`provinces/${value}/states`, 'GET', null)
    this.setState({
      states: res.data,
      provinceData: value,
      stateData: res.data[0].code
    })
  } //get value of province
  handleChangeSelectState = (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      stateData: value
    })
  } // get value of state

  render() {
    const { paypalCode, dataOrderDetails, provinces, states, provinceData, stateData, fullName, address, note, code, phone, totalAmount, promoTotal, shippingTotal, itemAmount, isPaid, isPaymentOnline, status, redirectToOrder } = this.state;
    let orderDetailAmount = 0;
    if (dataOrderDetails.length > 0) {
      orderDetailAmount = dataOrderDetails.reduce((sum, item) => {
        return sum += item.quantity * item.price
      }, 0)
    }
    if (redirectToOrder) {
      return <Redirect to='/orders'></Redirect>
    }
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Form Order</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Order</li>
          </ul>
        </div>
        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Descriptions</h3>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)} >
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Name Reciver</label>
                        <div className="col-sm-9">
                          <input type="text" name="fullName" value={fullName} onChange={this.handleChange} className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Provinces</label>
                        <div className="col-sm-3">
                          <select
                            name="provinces" value={provinceData}
                            onChange={this.handleChangeSelectProvince}
                            className="form-control mb-3">
                            {
                              (provinces && provinces.length) ? provinces.map((province, index) => {
                                return (
                                  <option key={index} value={province.code}>{province.name}</option>
                                )
                              }
                              ) : null
                            }}
                          </select>
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>States</label>
                        <div className="col-sm-3">
                          <select
                            name="state" value={stateData}
                            onChange={this.handleChangeSelectState}
                            className="form-control mb-3"
                          >
                            {
                              (states && states.length) ? states.map((state, index) => {
                                return (
                                  <option key={index} value={state.code}>{state.name}</option>
                                )
                              }
                              ) : null
                            }}
                            </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">House</label>
                        <div className="col-sm-3">
                          <input name="address" value={address} onChange={this.handleChange} type="text" className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Phone</label>
                        <div className="col-sm-3">
                          <input name="phone" value={phone} onChange={this.handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Note</label>
                        <div className="col-sm-9">
                          <textarea name="note" value={note} onChange={this.handleChange} type="text" rows={3} className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      {
                        id ? <div>
                       <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label" style={{paddingTop: 50}}>Items</label>
                        <div className="col-sm-9">
                        <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataOrderDetails && dataOrderDetails.length ? dataOrderDetails.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nameProduct}</td>
                                <td>
                                  <div className="fix-cart">
                                    <img src={item && item.product ? item.product.image : null} className="fix-img" alt="not found" />
                                  </div>
                                </td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                              </tr>
                            )
                          }) : null}
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><b style={{fontSize: 16}}>Item Amount: </b></td>
                        <td><b style={{fontSize: 16}}>${orderDetailAmount}</b></td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                        </div>
                      </div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Code Order</label>
                            <div className="col-sm-3">
                              <input disabled value={code} type="text" disabled className="form-control" />
                            </div>
                            <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}} >Paypal Code</label>
                            <div className="col-sm-3">
                              <input disabled value={paypalCode} name="paypalCode" className="form-control" />
                            </div>
                          </div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Item Amount</label>
                            <div className="col-sm-3">
                              <input name="itemAmount" disabled value={itemAmount} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                            <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Shipping Total</label>
                            <div className="col-sm-3">
                              <input name="shippingTotal" disabled value={shippingTotal} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                          </div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Promo Total</label>
                            <div className="col-sm-3">
                              <input name="shippingTotal" disabled value={promoTotal} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                            <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Total Amount</label>
                            <div className="col-sm-3">
                              <input disabled name="totalAmount" value={totalAmount} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                          </div>
                        </div>
                          :
                          <div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Item Amount</label>
                            <div className="col-sm-3">
                              <input name="itemAmount"  value={itemAmount} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                            <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Shipping Total</label>
                            <div className="col-sm-3">
                              <input name="shippingTotal" value={shippingTotal} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                          </div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Promo Total</label>
                            <div className="col-sm-3">
                              <input name="shippingTotal" value={promoTotal} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                            <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Total Amount</label>
                            <div className="col-sm-3">
                              <input name="totalAmount" value={totalAmount} onChange={this.handleChange} type="number" className="form-control" />
                            </div>
                          </div>
                          </div>
                      }
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Status</label>
                        <div className="col-sm-9">
                          <select name="account" className="form-control mb-3" name="status" value={status} onChange={this.handleChange}>
                            <option value='Unconfirm'>Unconfirm</option>
                            <option value='Confirm'>Confirm</option>
                            <option value='Shipping' >Shipping</option>
                            <option value='Complete' >Complete</option>
                            <option value='Canceled' >Cancel</option>
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Paid</label>
                        <div className="col-sm-3">
                          <div className="i-checks">
                            <input type="checkbox"
                              onChange={this.handleChange}
                              name="isPaid"
                              checked={isPaid}
                              className="checkbox-template" />
                          </div>
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Payment Online</label>
                        <div className="col-sm-3">
                          <div className="i-checks">
                            <input type="checkbox"
                              onChange={this.handleChange}
                              name="isPaymentOnline"
                              checked={isPaymentOnline}
                              className="checkbox-template" />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button>
                          <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}
        <MyFooter></MyFooter>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_order: (token, newOrder) => {
      dispatch(actAddOrderRequest(token, newOrder))
    },
    get_order: (token, id) => {
      dispatch(actGetOrderRequest(token, id))
    },
    edit_order: (token, id, data) => {
      dispatch(actEditOrderRequest(token, id, data))
    }
  }
}
export default connect(null, mapDispatchToProps)(ActionOrder)

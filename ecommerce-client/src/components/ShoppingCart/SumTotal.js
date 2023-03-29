import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatNumber } from '../../config/TYPE'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class SumTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectYourOrder: false,
      redirectYourLogin: false
    }
  }


  checkAuthenticate = () => {
    const { user, sumTotal } = this.props;
    if (!sumTotal.length) {
      return toast.error('Please purchase items before payment');
    }
    if (user) {
      this.setState({
        redirectYourOrder: true
      })
    } else {
      toast.error('You can login before checkout');
      this.setState({
        redirectYourLogin: true
      })
    }
  }

  render() {
    const { redirectYourOrder, redirectYourLogin } = this.state;
    const { sumTotal } = this.props;
    let amount = 0;
    let shippingTotal = 2;
    if (sumTotal.length > 0) {
      amount = sumTotal.reduce((sum, item) => {
        return sum += item.quantity * item.price
      }, 0)
    }
    if (redirectYourOrder) {
      return <Redirect to="/checkout"></Redirect>
    }
    if (redirectYourLogin) {
      return <Redirect to="/login-register"></Redirect>
    }
    return (
      <div>
        <div className="cart-page-total">
          <h2>Cart totals</h2>
          <ul>
            <li>Subtotal <span>{amount ? formatNumber.format(amount) : 0}</span></li>
            <li>Shipping <span>{formatNumber.format(amount ? shippingTotal : 0)}</span></li>
            <li style={{ color: 'red' }}>Total <span>{amount ? formatNumber.format(amount + shippingTotal) : 0}</span></li>
          </ul>
          <button onClick={() => this.checkAuthenticate()} className="fix-text-checkout">Order Now</button>
        </div>
        <div className="coupon-all">
          <div className="coupon">
            <input id="coupon_code" className="input-text" name="coupon_code" placeholder="Code..." type="text" />
            <input className="button" name="apply_coupon" type="submit" />
            <span className="fix-text-discount">Discount Code / Gifts</span>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sumTotal: state.cart,
    user: state.auth
  }
}
export default connect(mapStateToProps, null)(SumTotal)

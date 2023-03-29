import React, { Component } from 'react'
import ShoppingCartItems from './ShoppingCartItems'
import { actFetchCartRequest } from '../../redux/actions/cart';
import { connect } from 'react-redux'
import SumTotal from './SumTotal';

class ShoppingCart extends Component {

  componentDidMount() {
    this.props.fetch_items();
  }

  showItem(items) {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <ShoppingCartItems key={index} item={item} ></ShoppingCartItems>
        );
      });
    }
    return result;
  }

  render() {
    const { items } = this.props;

    return (
      <div className="Shopping-cart-area pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-xs-12">
              <form>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="li-product-remove">Action</th>
                        <th className="li-product-thumbnail">Image</th>
                        <th className="cart-product-name">Product</th>
                        <th className="li-product-price">Unit Price</th>
                        <th className="li-product-quantity">Quantity</th>
                        <th className="li-product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.showItem(items)
                      }
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="col-sm-4 col-xs-12">
                <SumTotal></SumTotal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {


  return {
    items: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_items: () => {
      dispatch(actFetchCartRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

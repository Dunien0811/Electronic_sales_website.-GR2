import React, { Component } from 'react'
import LaptopItems from './LaptopItems'
import {connect} from 'react-redux'
import { actFetchProductsLaptopRequest } from '../../../../redux/actions/products';

class LaptopArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    }
  }

  componentDidMount() {
    const { offset } = this.state;
    this.props.fetch_products_laptop(offset)
  }
  

  render() {
    const { products } = this.props;
    return (
      <section className="product-area li-laptop-product pt-60 pb-45">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="li-section-title">
                <h2>
                  <span>Laptop</span>
                </h2>
                <ul className="li-sub-category-list">
                  {/* <li className="active"><a href="/">Prime Video</a></li>
                  <li><a href="/">Computers</a></li>
                  <li><a href="/">Electronics</a></li> */}
                </ul>
              </div>
              <div className="row">
                {
                  (products && products.length) ? products.map((product, index) => {
                      return (
                        <LaptopItems key={index} product={product} ></LaptopItems>
                      )
                    }                 
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsLaptop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products_laptop: (offset) => {
      dispatch(actFetchProductsLaptopRequest(offset))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaptopArea)
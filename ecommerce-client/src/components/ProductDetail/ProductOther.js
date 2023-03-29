import React, { Component } from 'react'
import ProductOtherItems from './ProductOtherItems'
import { connect } from 'react-redux'
import Slider from "react-slick";
import './style.css'

class ProductOther extends Component {
  render() {
    const { products } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <section className="product-area li-laptop-product pt-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="li-section-title">
                <h2>
                  <span>Other products in the same category:</span>
                </h2>
              </div>
              {/* <div className="row"> */}
              <Slider {...settings}>
                {products.map((product, index) => {
                  return (
                    <div key={index} className="col-sm-9 fix-ml">
                      <ProductOtherItems product={product}> </ProductOtherItems>
                    </div>
                  )
                })}
              </Slider>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsOther
  }
}

export default connect(mapStateToProps, null)(ProductOther)

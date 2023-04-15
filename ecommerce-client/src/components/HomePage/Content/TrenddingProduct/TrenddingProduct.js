import React, { Component } from 'react'
import TrenddingProductItems from './TrenddingProductItems'
import { connect } from 'react-redux'
import { actFetchProductsOfficeRequest } from '../../../../redux/actions/products';
import Slider from "react-slick";
import './style.css'

class TrenddingProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    }
  }

  componentDidMount() {
    const { offset } = this.state;
    this.props.fetch_products_new(offset);
  }

  render() {
    const { products } = this.props;
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <section className="product-area li-trending-product pt-60">
        <div className="container">
          <div className="row">
            {/* Begin Li's Tab Menu Area */}
            <div className="col-lg-12">
              <div className="li-product-tab li-trending-product-tab">
                <h2>
                  <span>Trendding Laptop </span>
                </h2>
                <ul className="nav li-product-menu li-trending-product-menu">
                  {/* <li><a className="active" data-toggle="tab" href="#home1"><span>Sanai</span></a></li>
                  <li><a data-toggle="tab" href="#home2"><span>Camera Accessories</span></a></li>
                  <li><a data-toggle="tab" href="#home3"><span>XailStation</span></a></li> */}
                </ul>
              </div>
              {/* Begin Li's Tab Menu Content Area */}
              <div className="tab-content li-tab-content li-trending-product-content">
                <div id="home1" className="tab-pane show fade in active">
                  {/* <div className="row"> */}
                  <Slider {...settings}>
                    {products && products.length ? products.map((product, index) => {
                      return (
                        <div key={index} className="col-sm-9 fix-ml pt-3">
                          <TrenddingProductItems product={product} ></TrenddingProductItems>
                        </div>
                      )
                    }) : null
                    }
                  </Slider>
                  {/* </div> */}
                </div>
              </div>
              {/* Tab Menu Content Area End Here */}
            </div>
            {/* Tab Menu Area End Here */}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsOffice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products_new: (offset) => {
      dispatch(actFetchProductsOfficeRequest(offset))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrenddingProduct)
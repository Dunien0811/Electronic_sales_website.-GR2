import React, { Component } from 'react'
import ProductItems from './ProductItems'
import { connect } from 'react-redux'
import { actFetchProductsNewRequest } from '../../../../redux/actions/products';
import Slider from "react-slick";
import './style.css';
class ProductContent extends Component {
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
      dots: false,
      infinite: true,
      speed: 5000,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear"
    };
    return (
      <div className="tab-content mt-2">
        <div id="li-new-product">
          {/* <div className="row"> */}
          <Slider {...settings}>
            {products && products.length ? products.map((product, index) => {
              return (
                <div key={index} className="col-sm-9 fix-ml"> <ProductItems product={product} ></ProductItems> </div>
              )
            }) : null
            }
          </Slider>
          {/* </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsNew
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products_new: (offset) => {
      dispatch(actFetchProductsNewRequest(offset))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContent)

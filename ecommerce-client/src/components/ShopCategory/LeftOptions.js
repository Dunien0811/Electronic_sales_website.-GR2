import React, { Component } from 'react'
// import BeautyStars from 'beauty-stars';
import { actGetProductOfCategoryRequest, actFetchProductsOfProducerRequest, actFetchProductsPriceRequest, actFetchProductsOfRatingPointRequest } from '../../redux/actions/products';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.css'
let id;
class LeftOptions extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     two: 2,
  //     three: 3,
  //     four: 4,
  //     five: 5
  //   }
  // }
  

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleProductsProducer = (id) => {
    this.props.fetch_products_producer(id).then(res => {
      this.props.totalProducts(res.total);
    })
  }

  handleProductsPrice = (price) => {
    id = this.props.id;
    this.props.fetch_products_price(price, id).then(res => {
      this.props.totalProducts(res.total);
    })
  }

  handleProductsPoint = (point) => {
    id = this.props.id;
    this.props.fetch_products_point_rating(id, point).then(res => {
      this.props.totalProducts(res.total);
    })
  }

  handleProductsProducerAll = () => {
    id = this.props.id;
    this.props.fetch_products(id).then(res => {
      this.props.totalProducts(res.total);
    })
  }


  render() {
    let { producers } = this.props;
    // const { two, three, four, five } = this.state
    return (
      <div className="col-lg-3 order-2 order-lg-1">
        <div className="sidebar-categores-box">
          <div className="sidebar-title">
            <h2 className="fix-producers">Filter By</h2>
          </div>
          <button onClick={() => this.handleProductsProducerAll()} className="btn-clear-all mb-sm-30 mb-xs-30">Clear all</button>
          <div className="filter-sub-area">
            <h5 className="fix-producers filter-sub-titel">Producers</h5>
            <div className="categori-checkbox">
              <form action="/">
                <ul>
                  {producers && producers.length ? producers.map((item, index) => {
                    return (
                      <li key={index} >
                        <div className="fix-img-div2" onClick={(id) => this.handleProductsProducer(item.id)}>
                        <Link to="#">
                        <img className="fix-img2" src={item && item.image ? item.image : null} alt="notfound" />
                        </Link>
                        </div>
                      </li>
                    )
                  }) : null}
                </ul>
              </form>
            </div>
          </div>
          {/* <div className="filter-sub-area pt-sm-10 pt-xs-10">
            <h5 className="filter-sub-titel">Rating</h5>
            <div className="categori-checkbox">
              <form>
                <ul>
                  <li><Link onClick={()=>{this.handleProductsPoint(five)}} to="#">
                    <BeautyStars
                      size={10}
                      activeColor={'#ed8a19'}
                      inactiveColor={'#c1c1c1'}
                      value={five}
                      editable={true}
                    /></Link>
                  </li>
                  <li><Link onClick={()=>{this.handleProductsPoint(four)}} to="#">
                    <BeautyStars
                      size={10}
                      activeColor={'#ed8a19'}
                      inactiveColor={'#c1c1c1'}
                      value={four}
                      editable={true}
                    /></Link>
                  </li>
                  <li><Link onClick={()=>{this.handleProductsPoint(three)}} to="#">
                    <BeautyStars
                      size={10}
                      activeColor={'#ed8a19'}
                      inactiveColor={'#c1c1c1'}
                      value={three}
                      editable={true}
                    /></Link>
                  </li>
                  <li><Link onClick={()=>{this.handleProductsPoint(two)}} to="#">
                    <BeautyStars
                      size={10}
                      activeColor={'#ed8a19'}
                      inactiveColor={'#c1c1c1'}
                      value={two}
                      editable={true}
                    /></Link>
                  </li>
                </ul>
              </form>
            </div>
          </div> */}
          <div className="filter-sub-area pt-sm-10 pt-xs-10">
            <h5 className="fix-producers filter-sub-titel">Price</h5>
            <div className="size-checkbox">
              <form action="/">
                <ul>
                  <li><Link to="#" onClick={(price) => this.handleProductsPrice(1.5)}><b>From</b> 1 - $50</Link></li>
                  <li><Link to="#" onClick={(price) => this.handleProductsPrice(5.2)}><b>From</b> 50 - $200</Link></li>
                  <li><Link to="#" onClick={(price) => this.handleProductsPrice(2.1)}><b>From</b> 200 - $1000</Link></li>
                  <li><Link to="#" onClick={(price) => this.handleProductsPrice(1)}><b>More than</b> $1000</Link></li>
                </ul>
              </form>
            </div>
          </div>
          {/* filter-sub-area end */}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
    producers: state.producers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (id) => {
      return dispatch(actGetProductOfCategoryRequest(id));
    },
    fetch_products_producer: (id) => {
      return dispatch(actFetchProductsOfProducerRequest(id));
    },
    fetch_products_price: (price, id) => {
      return dispatch(actFetchProductsPriceRequest(price, id));
    },
    fetch_products_point_rating: (categoryId, point) => {
      return dispatch(actFetchProductsOfRatingPointRequest(categoryId, point));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LeftOptions)


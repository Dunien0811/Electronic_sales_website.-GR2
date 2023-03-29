import React, { Component } from 'react'
import LeftOptions from './LeftOptions'
import ShopCategoryItems from './ShopCategoryItems'
import { connect } from 'react-redux'
import { actGetProductOfCategoryRequest } from '../../redux/actions/products';
import Paginator from 'react-js-paginator';
import { actFetchProducersRequest } from '../../redux/actions/producer';
let categoryId;
class ShopCategory extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: 0
    };
  }

  
  componentDidMount() {
    this.fetch_reload_data();
  }

  fetch_reload_data(){
    this.props.fetch_producers(this.props.id);
    this.props.fetch_products(this.props.id).then(res => {
      this.setState({
        total: res.total
      });
    }).catch(err => {
      console.log(err);  
    })
  }

  totalProducts(total){
    this.setState({
      total
    })
    
  }
  
  pageChange(content){
    const limit = 9;
    const offset = limit * (content - 1);
    this.setState({
      currentPage: content
    })
    this.props.fetch_products(categoryId, null, offset);
    window.scrollTo(0, 0);
  }
  handleChangeSelectSort = (event, categoryId) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.fetch_products(categoryId, value);
  }

  render() {
    const { products } = this.props;
    if (products && products.length) {
      products.map((item) => categoryId = item.categoryId)
    }
    return (
      <div className="content-wraper pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-2">
              {/* Begin Li's Banner Area */}
              <div className="single-banner shop-page-banner">
                <a href="/">
                  <img src="https://www.rtlnieuws.nl/sites/default/files/content/images/2022/04/12/nieuwe%20smartphones.jpg?itok=axji7ZXW&width=2048&height=1152&impolicy=semi_dynamic" alt="Li's Static Banner" />
                </a>
              </div>
              <div className="shop-top-bar mt-30">
                <div className="shop-bar-inner">
                  <div className="product-view-mode">
                    {/* shop-item-filter-list start */}
                    <ul className="nav shop-item-filter-list" role="tablist">
                      <li role="presentation"><a data-toggle="tab" role="tab" aria-controls="grid-view" href="#grid-view"><i className="fa fa-th" /></a></li>
                    </ul>
                  </div>
                  <div className="toolbar-amount">
                    <span>Showing 1 to 9</span>
                  </div>
                </div>
                <div className="product-select-box">
                  <div className="product-short">
                    <p>Sort By:</p>
                    <select className="nice-select" onChange={(event) => this.handleChangeSelectSort(event, categoryId)} >
                      <option value="createdAt">All</option>
                      <option value="nameProduct">Name (A - Z)</option>
                      <option value="-nameProduct">Name (Z - A)</option>
                      <option value="price">Price (Low &gt; High)</option>
                      <option value="-price">Price (High &gt; Low)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="shop-products-wrapper">
                <div className="tab-content">
                  <div id="grid-view">
                    <div className="product-area shop-product-area">
                      <div className="row">
                        {products.map((product, index) => {
                          return (
                            <ShopCategoryItems key={index} product={product} ></ShopCategoryItems>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="paginatoin-area">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <p>Showing 1-9</p>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <Paginator
                        pageSize={9}
                        totalElements={this.state.total}
                        onPageChangeCallback={(e) => {this.pageChange(e)}}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LeftOptions totalProducts = {(count)=>this.totalProducts(count)} id={this.props.id} categoryId={categoryId}></LeftOptions>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (id, value, offset) => {
      return dispatch(actGetProductOfCategoryRequest(id, value, offset));
    },
    fetch_producers: (id) => {
      dispatch(actFetchProducersRequest(id))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory)


import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeautyStars from 'beauty-stars';
import { formatNumber } from '../../../../config/TYPE';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { actFetchRatingsRequest, actAddFavoriteRequest } from '../../../../redux/actions/rating';
import { actGetProductRequest, actFetchProductsOtherRequest } from '../../../../redux/actions/products';
import { actAddCartRequest } from '../../../../redux/actions/cart';
import { startLoading, doneLoading } from '../../../../utils/loading'
toast.configure()
let token;
class TrenddingProductItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      quantity: 1
    }
  }


  componentDidMount() {
    token = localStorage.getItem('_auth');
  }

  addItemToFavorite = (id) => {
    startLoading()
    if (!token) {
      return toast.error('Please login before add product to list favorites')
    }
    this.props.addFavorite(id, token);
    doneLoading();
  }

  upItem = (quantity) => {
    if (quantity >= 5) {
      toast.error('You can only purchase up to 5 products')
      return
    }
    this.setState({
      quantity: quantity + 1
    })
  }
  downItem = (quantity) => {
    if (quantity <= 1) {
      return
    }
    this.setState({
      quantity: quantity - 1
    })
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  getInfoProduct = (id) => {
    this.props.getProductDetail(id);
  }

  getToProductDetail = (id, cateogryId) => {
    const { offset } = this.state;
    startLoading();
    this.props.getProductDetail(id);
    this.props.fetch_products_other(offset, cateogryId);
    this.props.fetch_product_ratings(id);
    doneLoading();
  }

  addItemToCart2 = (event, product) => {
    event.preventDefault();
    const { quantity } = this.state;
    startLoading()
    this.props.addCart(product, quantity);
    doneLoading();
  }

  addItemToCart = async (product) => {
    startLoading();
    await this.props.addCart(product);
    doneLoading();
  }
  render() {
    const { product, getProduct } = this.props;
    const { quantity } = this.state;
    let sumRating = 0;
    let count = 0;
    if (product.rating && product.rating.length > 0) {
      let totalRating = 0;
      product.rating.map((item) => {
        return (
          count++ ,
          totalRating = totalRating + item.point
        )
      })
      sumRating = Math.round(totalRating / count);
    }
    return (
      <div>
        {/* single-product-wrap start */}
        <div className="single-product-wrap">
          <div className="fix-img-div-trend product-image">
            <Link to={`/products/${product.id}`}>
              <img className="fix-img-trend" src={product.image ? product.image : null} alt="Li's Product" />
            </Link>
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <div className="product-review">
                <h5 className="manufacturer">
                  <Link to={`/categories/${product.categoryId}`}>{product.categories && product.categories.nameCategory ? product.categories.nameCategory : null}</Link>
                </h5>
                <div className="rating-box">
                  <BeautyStars
                    size={10}
                    activeColor={'#ed8a19'}
                    inactiveColor={'#c1c1c1'}
                    value={sumRating}
                    editable={false}
                  />
                </div>
              </div>
              <h4><Link className="product_name text-truncate" to={`/products/${product.id}`}>{product.nameProduct}</Link></h4>
              <div className="price-box">
                <span className="new-price new-price-2">{formatNumber.format(product.price)}</span>
                {/* <span className="old-price">{formatNumber.format(product.price * 5 / 100)}</span>
                <span className="discount-percentage">-5%</span> */}
              </div>
            </div>
            <div className="add-actions">
              <ul className="add-actions-link">
                <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Add to cart</Link></li>
                <li><Link to="#" title="quick view" className="quick-view-btn"><i className="fa fa-eye" /></Link></li>
                {/* <li><Link onClick={(id) => this.getInfoProduct(product.id)} to={`/products/${product.id}`} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter7"><i className="fa fa-eye" /></Link></li> */}
                <li><Link onClick={(id) => this.addItemToFavorite(product.id)} className="links-details" to="#"><i className="fa fa-heart-o" /></Link></li>

              </ul>
            </div>
          </div>
        </div>
        {/*// QUICK VIEW */}
        <div className="modal fade modal-wrapper" id="exampleModalCenter7">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <div className="modal-inner-area row">
                  <div className="col-lg-5 col-md-6 col-sm-6">
                    {/* Product Details Left */}
                    <div className="product-details-left">
                      <div className="product-details-images slider-navigation-1">
                        <div className="lg-image">
                          <img src={getProduct.image} alt="not found" />
                        </div>
                      </div>
                    </div>
                    {/*// Product Details Left */}
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6">
                    <div className="product-details-view-content pt-60">
                      <div className="product-info">
                        <h2>{getProduct.nameProduct}</h2>
                        <div className="rating-box">
                        </div>
                        <div className="price-box pt-20">
                          <span className="new-price new-price-2">{formatNumber.format(getProduct.price)}</span>
                        </div>
                        <div className="product-desc">
                          <p>
                            <span>{getProduct.description}
                            </span>
                          </p>
                        </div>
                        <div className="product-variants">
                        </div>
                        <div className="single-add-to-cart">
                          <form className="cart-quantity" onSubmit={(event) => this.addItemToCart2(event, getProduct)}>
                            <div className="quantity">
                              <label>Quantity</label>
                              <div className="cart-plus-minus">
                                <input type="text"
                                  className="cart-plus-minus-box"
                                  name={quantity}
                                  value={quantity}
                                  onChange={this.handleChange}
                                />
                                <div onClick={() => this.downItem(quantity)} className="dec qtybutton"><i className="fa fa-angle-down" /></div>
                                <div onClick={() => this.upItem(quantity)} className="inc qtybutton"><i className="fa fa-angle-up" /></div>
                              </div>
                            </div>
                            <button className="add-to-cart" type="submit">Add to cart</button>
                          </form>
                        </div>
                        <div className="product-additional-info pt-25">
                          <a className="wishlist-btn" href="wishlist.html"><i className="fa fa-heart-o" />Add to wishlist</a>
                          <div className="product-social-sharing pt-25">
                            <ul>
                              <li className="facebook"><a href="/"><i className="fa fa-facebook" />Facebook</a></li>
                              <li className="twitter"><a href="/"><i className="fa fa-twitter" />Twitter</a></li>
                              <li className="google-plus"><a href="/"><i className="fa fa-google-plus" />Google +</a></li>
                              <li className="instagram"><a href="/"><i className="fa fa-instagram" />Instagram</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* single-product-wrap end */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getProduct: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (id) => {
      dispatch(actGetProductRequest(id))
    },
    addCart: (item, quantity) => {
      dispatch(actAddCartRequest(item, quantity))
    },
    fetch_products_other: (q, categoryId) => {
      dispatch(actFetchProductsOtherRequest(q, categoryId))
    },
    fetch_product_ratings: (id) => {
      dispatch(actFetchRatingsRequest(id));
    },
    addFavorite: (id, token) => {
      dispatch(actAddFavoriteRequest(id, token))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrenddingProductItems)

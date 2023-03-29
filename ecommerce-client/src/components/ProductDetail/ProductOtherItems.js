import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../config/TYPE'
import { connect } from 'react-redux'
import { actGetProductRequest } from '../../redux/actions/products'
import { actFetchRatingsRequest, actAddFavoriteRequest } from '../../redux/actions/rating'
import BeautyStars from 'beauty-stars';
import { actAddCartRequest } from '../../redux/actions/cart'
import { startLoading, doneLoading } from '../../utils/loading'
import { toast } from 'react-toastify';
import './style.css'
toast.configure()


let token;
class ProductOtherItems extends Component {

  updateProductDetail = (id) => {
    this.props.getOneProduct(id);
    this.props.reload_ratings(id);
  }
  componentDidMount() {
    token = localStorage.getItem('_auth');
  }
  addItemToCart = async (product) => {
    startLoading()
    await this.props.addCart(product);
    doneLoading();
  }
  addItemToFavorite = (id) => {
    startLoading()
    if (!token) {
      return toast.error('Please login before add product to list favorites')
    }
    this.props.addFavorite(id, token);
    doneLoading();
  }
  render() {
    const { product } = this.props;
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
      <div className="pt-30">
        <div className="single-product-wrap">
          <div className="fix-img-div-other product-image">
            <Link onClick={(id) => this.updateProductDetail(product.id)} to={`/products/${product.id}`}>
              <img className="fix-img-other" src={product.image} alt="Li's Product" />
            </Link>
            <span className="sticker">New</span>
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <div className="product-review">
                <h5 className="manufacturer">
                  <Link to={`/categories/${product.categoryId}`}>{product.categories && product.categories.nameCategory ? product.categories.nameCategory : null}</Link>
                </h5>
                <div className="rating-box">
                  <ul className="rating">
                    <BeautyStars
                      size={10}
                      activeColor={'#ed8a19'}
                      inactiveColor={'#c1c1c1'}
                      value={sumRating}
                      editable={false}
                    />
                  </ul>
                </div>
              </div>
              <h4><Link className="product_name text-truncate" to={`/products/${product.id}`}>{product.nameProduct}</Link></h4>
              <div className="price-box">
                <span className="new-price new-price-2">{formatNumber.format(product.price)}</span>
              </div>
            </div>
            <div className="add-actions">
              <ul className="add-actions-link">
                <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Add to cart</Link></li>
                <li><Link to="#" title="quick view" className="quick-view-btn" ><i className="fa fa-eye" /></Link></li>
                <li><Link onClick={(id) => this.addItemToFavorite(product.id)} className="links-details" to="#"><i className="fa fa-heart-o" /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOneProduct: (id) => {
      dispatch(actGetProductRequest(id))
    },
    reload_ratings: (id) => {
      dispatch(actFetchRatingsRequest(id))
    },
    addCart: (item, quantity) => {
      dispatch(actAddCartRequest(item, quantity))
    },
    addFavorite: (id, token) => {
      dispatch(actAddFavoriteRequest(id, token))
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductOtherItems)
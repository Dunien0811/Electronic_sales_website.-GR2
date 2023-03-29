import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatNumber } from '../../../../config/TYPE';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import BeautyStars from 'beauty-stars';
import { actFetchRatingsRequest, actAddFavoriteRequest } from '../../../../redux/actions/rating';
import { actGetProductRequest, actFetchProductsOtherRequest } from '../../../../redux/actions/products';
import { actAddCartRequest } from '../../../../redux/actions/cart';
import { startLoading, doneLoading } from '../../../../utils/loading'

toast.configure()
let token;

class ProductItems extends Component {
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

  addItemToFavorite = (id) => {
    startLoading()
    if (!token) {
      return toast.error('Please login before add product to list favorites')
    }
    this.props.addFavorite(id, token);
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
      <div>
        <div className="single-product-wrap">
          <div className="fix-img-div-new product-image">
            <Link to={`/products/${product.id}`} >
              <img className="fix-img-new" src={product.image ? product.image : null} alt="Li's Product" />
            </Link>
            <span className="sticker">New</span>
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <div className="product-review">
                <h5 className="manufacturer">
                  <Link to={`/categories/${product.categoryId}`}>{product.categories && product.categories.nameCategory ? product.categories.nameCategory : null}</Link>
                </h5>
                <div className="rating-box" style={{ marginRight: 10 }}>
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
                {/* <span className="old-price">{formatNumber.format(product.price * 10 / 100)}</span>
                <span className="discount-percentage">-10%</span> */}
              </div>
            </div>
            <div className="add-actions">
              <ul className="add-actions-link">
                <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Add to cart</Link></li>
                <li><Link to="#" title="quick view" className="quick-view-btn" ><i className="fa fa-eye" /></Link></li>
                {/* <li><Link onClick={(id) => this.getInfoProduct(product.id)} to={`/products/${product.id}`} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter99"><i className="fa fa-eye" /></Link></li> */}
                <li><Link onClick={(id) => this.addItemToFavorite(product.id)} className="links-details" to="#"><i className="fa fa-heart-o" /></Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/*// QUICK VIEW */}
       
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductItems)

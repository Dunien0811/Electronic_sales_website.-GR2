import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLoading, doneLoading } from '../../utils/loading'
import { actSearchProductsRequest } from '../../redux/actions/products';
import { toast } from 'react-toastify';
import { actFetchFavoritesRequest } from '../../redux/actions/rating';
let token;
class HeaderMiddle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    }
  }

  componentDidMount() {
    token = localStorage.getItem('_auth');
  }


  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleClick = () => {
    const { textSearch } = this.state;
    if (textSearch === '' || textSearch === null) {
      return toast.error('Please input search text ...');
    }
    startLoading();
    this.props.searchProduct(textSearch);
    this.setState({
      textSearch: null
    })
    doneLoading();
  }


  loadingPage = () => {
    startLoading();
    doneLoading();
  }

  handleFetchFavorites = () => {
    if(!token){
       return toast.error('Please login before watch list favorites')
    } else {
      this.props.fetch_productFavorites(token);
    }
  }

  render() {
    const { textSearch, redirectTo } = this.state;
    let count;
    const { countCart } = this.props;
    if (countCart.length > 0) {
      count = countCart.reduce((sum, item) => {
        return sum += item.quantity
      }, 0)
    }

    let count2 = 0;
    const { countFavorite } = this.props;
    if (countFavorite.length > 0) {
      countFavorite.map((item, index) => 
        count2 = index + 1
      )
      }
      if(redirectTo){
        return <Redirect to="/product-favorites"></Redirect>
      }
    return (
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            {/* Begin Header Logo Area */}
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <Link onClick={() => this.loadingPage()} to="/">
                  <img src="https://i.ibb.co/hBqzHKC/Untitled-1.gif" alt="" />
                </Link>
              </div>
            </div>
            {/* Header Logo Area End Here */}
            {/* Begin Header Middle Right Area */}
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              {/* Begin Header Middle Searchbox Area */}
              <form className="hm-searchbox">
                <input name="textSearch" value={textSearch} type="text" onChange={this.handleChange} placeholder="Enter your search key ..." />
                {/* <button className="li-btn" type="submit"></button> */}
                <Link onClick={this.handleClick} to='/products/search'>
                  <button className="li-btn" type="submit"><i className="fa fa-search" /></button>
                </Link>
              </form>
              {/* Header Middle Searchbox Area End Here */}
              {/* Begin Header Middle Right Area */}
              <div className="header-middle-right">
                <ul className="hm-menu">
                  {/* Begin Header Middle Wishlist Area */}
                  <li className="hm-wishlist">
                    <Link to="/product-favorites">
                      <span className="cart-item-count wishlist-item-count">{count2}</span>
                      <i className="fa fa-heart-o" />
                    </Link>
                  </li>
                  {/* Header Middle Wishlist Area End Here */}
                  {/* Begin Header Mini Cart Area */}
                  <li className="hm-minicart">
                    <Link to="/cart">
                      <div className="hm-minicart-trigger">
                        <span className="item-icon" />
                        <span className="item-text">
                          <span className="cart-item-count">{count ? count : 0}</span>
                        </span>
                      </div>
                    </Link>
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countCart: state.cart,
    countFavorite: state.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (q) => {
      dispatch(actSearchProductsRequest(q))
    },
    fetch_productFavorites: (token) => {
      dispatch(actFetchFavoritesRequest(token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMiddle)

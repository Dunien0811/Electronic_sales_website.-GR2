import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import { actTokenRequest } from '../../redux/actions/auth'
import {startLoading, doneLoading} from '../../utils/loading'

class HeaderTop extends Component {

  logOut = async () => {
    localStorage.removeItem('_auth');
    const token = null;
    startLoading();
    await this.props.setTokenRedux(token);
    doneLoading();
  }

  loadingPage = () => {
    startLoading();
    doneLoading();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="header-top-left">
                <ul className="phone-wrap">
                  <li><span>Telephone:</span><a href="/">(+84) 949 431 757</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="header-top-right">
                <ul className="ht-menu">
                  <li>
                    <span className="currency-selector-wrapper">Currency :</span>
                    <div className="ht-currency-trigger"><span>USD $</span></div>
                    <div className="currency ht-currency">
                      <ul className="ht-setting-list">
                        <li><a href="/">EUR €</a></li>
                        <li className="active"><a href="/">USD $</a></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    {
                      (!user) ? <Link onClick={()=>this.loadingPage()} to="/login-register" className="fix-link-color language-selector-wrapper"> Login </Link> :
                        <div className="dropdown show">
                          <Link to="#" className=" fix-link-color dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Setting
                          </Link>
                          <div className="fix-text-item dropdown-menu ht-setting-list " aria-labelledby="dropdownMenuLink">
                            <Link className="fix-text-item dropdown-item" to="/profile">Profile</Link>
                            <Link onClick={this.logOut} to="/login-register" className="fix-text-item dropdown-item" href="/">Logout</Link>
                          </div>
                        </div>
                    }
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
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTokenRedux: (token) => {
      dispatch(actTokenRequest(token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTop)

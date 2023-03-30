import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actToken, actGetNameRole  } from '../../redux/actions/auth'
import { startLoading, doneLoading } from '../../utils/loading'

class Header extends Component {

  logOut = async () => {
    localStorage.removeItem('_auth');
    const token = null;
    startLoading();
    const setToken = this.props.setTokenRedux(token);
    const setRole = this.props.setTokenRoleRedux(token);
    await Promise.all([setToken, setRole])
    doneLoading();
  }
  render() {
    return (
      <header className="header">
        <nav className="navbar">
          {/* Search Box*/}
          <div className="search-box">
            <button className="dismiss"><i className="icon-close" /></button>
            <form id="searchForm" action="#" role="search">
              <input type="search" placeholder="What are you looking for..." className="form-control" />
            </form>
          </div>
          <div className="container-fluid">
            <div className="navbar-holder d-flex align-items-center justify-content-between">
              {/* Navbar Header*/}
              <div className="navbar-header">
                {/* Navbar Brand */}<Link to="/" className="navbar-brand d-none d-sm-inline-block">
                  <div className="brand-text d-none d-lg-inline-block"><strong>Admin Gr2</strong></div></Link>
              </div>
              {/* Navbar Menu */}
              <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                {/* Search*/}
                {/* <li className="nav-item d-flex align-items-center"><Link id="search" to="#"><i className="icon-search" /></Link></li> */}
                {/* Notifications*/}
                {/* <li className="nav-item dropdown"> <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-bell-o" /><span className="badge bg-red badge-corner">1</span></a>
                  <ul aria-labelledby="notifications" className="dropdown-menu">
                    <li><Link rel="nofollow" to="#" className="dropdown-item">
                      <div className="notification">
                        <div className="notification-content"><i className="fa fa-envelope bg-green" />You have 6 new messages </div>
                        <div className="notification-time"><small>4 minutes ago</small></div>
                      </div></Link></li>
                    <li><Link rel="nofollow" to="#" className="dropdown-item all-notifications text-center"> <strong>view all notifications</strong></Link></li>
                  </ul>
                </li> */}
                {/* Languages dropdown    */}
                <li className="nav-item dropdown"><a id="languages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link language dropdown-toggle"><img src="https://i.ibb.co/QrtCN5s/GB.png" alt="English" /><span className="d-none d-sm-inline-block">English</span></a>
                  <ul aria-labelledby="languages" className="dropdown-menu">
                    <li><Link rel="nofollow" to="#" className="dropdown-item"> <img src="https://i.ibb.co/QrtCN5s/GB.png" alt="English" className="mr-2" />German</Link></li>
                    <li><Link rel="nofollow" to="#" className="dropdown-item"> <img src="https://i.ibb.co/SnpwbfX/VN.png" alt="English" className="mr-2" />Viet Nam</Link></li>
                  </ul>
                </li>
                {/* Logout    */}
                <li className="nav-item"><Link onClick={this.logOut} to="/login" className="nav-link logout"> <span className="d-none d-sm-inline">Logout</span><i className="fa fa-sign-out" /></Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setTokenRedux: (token) => {
      dispatch(actToken(token))
    },
    setTokenRoleRedux: (token) => {
      dispatch(actGetNameRole(token))
    }
  }
}

export default connect(null, mapDispatchToProps)(Header)
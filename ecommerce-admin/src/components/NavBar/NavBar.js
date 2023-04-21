import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import callApi from '../../utils/apiCaller';
let token;
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    if (token) {
      const res = await callApi('users/me', 'GET', null, token);
      if (res && res.status === 200) {
        this.setState({
          user: res.data.results
        })
      }
    } else {
      this.setState({
        redirect: true
      })    
    }
  }

  render() {
    const { nameRole } = this.props;
    const { user } = this.state;
    const newUser = user && user.length ? user[0] : null
    return (
      <nav className="side-navbar">
        {/* Sidebar Header*/}
        <div className="sidebar-header d-flex align-items-center">
          <div className="avatar"><img src={newUser && newUser.avatar ? newUser.avatar : 'https://png.pngtree.com/png-vector/20191124/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2029691.jpg'} alt="notfound" className="img-fluid rounded-circle" /></div>
          <div className="title">
            <h1 className="h4">{newUser && newUser.name ? newUser.name : null}</h1>
            <p><b style={{fontWeight: 600}}>{newUser && newUser.role ? newUser.role.nameRole : null}</b></p>
          </div>
        </div>
        {/* Sidebar Navidation Menus*/}
        <span className="heading">Main</span>
        {(nameRole === 'superadmin' || nameRole === 'admin') ?
          <ul className="list-unstyled">
            <li><Link to="/"> <i className="icon-home" />Home </Link></li>
            <li><Link to="/orders"> <i className="icon icon-bill" />Orders</Link></li>
            <li><Link to="/categories"> <i className="icon-interface-windows" />Categories</Link></li>
            <li><Link to="/products"> <i className="icon icon-website" />Products</Link></li>
            <li><Link to="/producers"> <i className="icon icon-list-1" />Brand</Link></li>
            {/* <li><Link to="/discounts"> <i className="icon icon-check" />Discount</Link></li> */}
            <li><Link to="/ratings">  <i className="icon icon-check" />Rating</Link></li>
            <li><Link to="/users"> <i className="icon icon-user" />Users</Link></li>
            <li><Link to="/roles"> <i className="icon icon-bars" />Roles</Link></li>
            <li> <Link to="/contacts"> <i className="icon-mail" />Contacts </Link></li>
          </ul>
          :
          <ul className="list-unstyled">
            <li><Link to="/"> <i className="icon-home" />Home </Link></li>
            <li><Link to="/orders"> <i className="icon icon-bill" />Orders</Link></li>
          </ul>
        }
        <span className="heading">Extras</span>
        <ul className="list-unstyled">
          <li> <Link to="/"> <i className="icon-screen" />Abount </Link></li>
          <li> <Link to="/"> <i className="icon-flask" />Help </Link></li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nameRole: state.nameRole,
  }
}

export default connect(mapStateToProps, null)(NavBar)
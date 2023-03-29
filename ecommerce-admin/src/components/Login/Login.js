import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { startLoading, doneLoading } from '../../utils/loading'
import { actLoginRequest } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (password.length < 6 || password.length > 32) {
      return toast.error('Password must be 6-32 characters');
    }
    const user = {
      email,
      password
    }
    startLoading();
    await this.props.loginRequest(user);
    doneLoading();
  }
  render() {
    const { email, password } = this.state;
    const { auth } = this.props;
    if (auth !== null) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <div className="page login-page">
        <div className="container d-flex align-items-center">
          <div className="form-holder has-shadow">
            <div className="row">
              {/* Logo & Information Panel*/}
              <div className="col-lg-6">
                <div className="info d-flex align-items-center">
                  <div className="content">
                    <div className="logo">
                      <h1>Shop admin</h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* Form Panel    */}
              <div className="col-lg-6 bg-white">
                <div className="form d-flex align-items-center">
                  <div className="content">
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                      <div className="form-group">
                        <input onChange={this.handleChange} type="email" name="email" value={email} className="input-material" placeholder="Email" />
                        {/* <label  className="label-material">Email</label> */}
                      </div>
                      <div className="form-group">
                        <input onChange={this.handleChange} type="password" name="password" value={password} className="input-material" placeholder="Password" />
                        {/* <label className="label-material">Password</label> */}
                      </div>
                      <button className="btn btn-primary">Login</button>
                    </form><Link to="#" className="forgot-pass" style={{marginTop:15}}>Forgot Password?</Link>
                  </div>
                </div>
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
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => {
      dispatch(actLoginRequest(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
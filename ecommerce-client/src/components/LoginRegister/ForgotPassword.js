import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import { actForgotPasswordRequest } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }


  sendEmailResetPassword = async (event) => {
    event.preventDefault();
    const { email } = this.state;
    if (email === '') {
      return toast.error('Email is required');
    }
    if (!email.match(/.+@.+/)) {
      return toast.error('Invalid email');
    }
    const dataEmail = {
      email
    }
    this.props.resetMyPassword(dataEmail)
    this.setState({
      email: ''
    })
    
  }

  render() {
    const { email } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6" style={{ padding: 55, margin: 'auto' }}>
            {/* Login Form s*/}
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="login-form fix-border-rspw">
                <h4 className="login-title">Reset Password</h4>
                <div className="row">
                  <div className="col-md-12 col-12 mb-20">
                    <label>Email Address*</label>
                    <input onChange={this.handleChange} value={email} className="mb-0" type="email"
                      placeholder="Email Address" name='email' />
                  </div>
                  <div className="col-md-4">
                    <button onClick={this.sendEmailResetPassword} className="register-button mb-3 fix-button-resetpw">Reset my Password</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMyPassword: (email) => {
      dispatch(actForgotPasswordRequest(email))
    }
  }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)
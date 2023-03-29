import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actRegisterRequest } from '../../redux/actions/auth';
import { connect } from 'react-redux'
import { startLoading, doneLoading } from '../../utils/loading'
toast.configure()

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      repassword: ''
    }
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, repassword } = this.state;
    if (password !== repassword){
      toast.error('The password is not the same')
      return 
    }
    if (password.length < 6 || password.length > 32) {
      toast.error('Password must be 6-32 characters');
      return
    }
    const newName = (name !== null)  ? name : ''
    const user = {
      name: newName,
      email,
      password,
    }
    startLoading();
    await this.props.registerRequest(user);
    this.setState({
      name: '',
      email: '',
      password: '',
      repassword: ''
    })
    
    doneLoading();
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="login-form">
            <h4 className="login-title">Register</h4>
            <div className="row">
              <div className="col-md-12 mb-20">
                <label>Name</label>
                <input onChange={this.handleChange} value={name} className="mb-0" type="text" name="name" placeholder="First Name" />
              </div>
              <div className="col-md-12 mb-20">
                <label>Email Address*</label>
                <input onChange={this.handleChange} value={email} className="mb-0" type="email" name="email" placeholder="Email Address" />
              </div>
              <div className="col-md-6 mb-20">
                <label>Password</label>
                <input onChange={this.handleChange} className="mb-0" type="password" name="password" placeholder="Password" />
              </div>
              <div className="col-md-6 mb-20">
                <label>Confirm Password</label>
                <input onChange={this.handleChange} className="mb-0" type="password" name="repassword" placeholder="Confirm Password" />
              </div>
              <div className="col-12">
                <button className="register-button mt-0">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (user) => {
      dispatch(actRegisterRequest(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)


import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'

export default class LoginRegister extends Component {
  render() {
    return (
      <div className="page-section mb-60">
        <div className="container">
          <div className="row">
            <Login></Login>
            <Register></Register>
          </div>
        </div>
      </div>
    )
  }
}

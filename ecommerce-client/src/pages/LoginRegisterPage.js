import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import LoginRegister from '../components/LoginRegister/LoginRegister'

export default class LoginRegisterPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <LoginRegister></LoginRegister>
      </div>
    )
  }
}

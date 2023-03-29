import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import CheckOut from '../components/CheckOut/CheckOut'

export default class CheckOutPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <CheckOut></CheckOut>
      </div>
    )
  }
}

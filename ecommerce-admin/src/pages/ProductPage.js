import React, { Component } from 'react'
import  Product  from '../components/Content/Product/Product'


export default class ProductPage extends Component {
  render() {
    return (
      <Product match={this.props.match} ></Product>
    )
  }
}

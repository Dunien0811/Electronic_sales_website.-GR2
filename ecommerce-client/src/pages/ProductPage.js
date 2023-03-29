import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ProductAll from '../components/ProductAll/ProductAll'
export default class ProductPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ProductAll></ProductAll>
      </div>
    )
  }
}


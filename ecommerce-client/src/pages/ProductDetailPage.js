import React, { Component } from 'react'
import ProductDetail from '../components/ProductDetail/ProductDetail'
import LinkHere from '../components/LinkHere/LinkHere'

export default class ProductDetailPage extends Component {
  render() {
    const url = this.props.match.match.url;
    const {id} = this.props.match.match.params
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ProductDetail id={id}></ProductDetail>
      </div>
    )
  }
}

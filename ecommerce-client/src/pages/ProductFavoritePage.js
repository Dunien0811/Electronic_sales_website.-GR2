import React, { Component } from 'react'
import ProductFavotire from '../components/ProductFavorite/ProductFavotire'
import LinkHere from '../components/LinkHere/LinkHere'
export default class ProductFavoritePage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ProductFavotire></ProductFavotire>
      </div>
    )
  }
}

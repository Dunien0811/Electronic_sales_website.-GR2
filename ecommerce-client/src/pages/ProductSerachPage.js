import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ProductSearch from '../components/ProductAll/ProductSearch'
export default class ProductSearchPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ProductSearch></ProductSearch>
      </div>
    )
  }
}


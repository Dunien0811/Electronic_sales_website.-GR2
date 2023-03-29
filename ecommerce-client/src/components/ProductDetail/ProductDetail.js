import React, { Component } from 'react'
import ProductViewDetail from './ProductViewDetail'
import ProductDescription from './ProductDescription'
import ProductOther from './ProductOther'

export default class ProductDetail extends Component {

  render() {
    window.scrollTo(0, 0);
    return (
      <div>
        <ProductViewDetail id={this.props.id}></ProductViewDetail>
        <ProductDescription id={this.props.id}></ProductDescription>
        <ProductOther id={this.props.id}></ProductOther>
      </div>
    )
  }
}
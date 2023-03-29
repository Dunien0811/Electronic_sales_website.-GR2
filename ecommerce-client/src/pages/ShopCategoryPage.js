import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ShopCategory from '../components/ShopCategory/ShopCategory'

export default class ShopCategoryPage extends Component {

  render() {
    const url = this.props.match.match.url;
    const {id} = this.props.match.match.params
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ShopCategory id={id}></ShopCategory>
      </div>
    )
  }
}

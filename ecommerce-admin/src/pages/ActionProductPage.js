import React, { Component } from 'react'
import ActionProduct from '../components/Content/Product/ActionProduct'

export default class ActionProductPage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionProduct id={id} ></ActionProduct>
    )
  }
}

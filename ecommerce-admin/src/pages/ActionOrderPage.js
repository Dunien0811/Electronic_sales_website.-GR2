import React, { Component } from 'react'
import ActionOrder from '../components/Content/Order/ActionOrder'

export default class ActionOrderPage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionOrder id={id}></ActionOrder>
    )
  }
}

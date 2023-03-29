import React, { Component } from 'react'
import ActionProducer from '../components/Content/Producer/ActionProducer'

export default class ActionProducerPage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionProducer id={id} ></ActionProducer>
    )
  }
}

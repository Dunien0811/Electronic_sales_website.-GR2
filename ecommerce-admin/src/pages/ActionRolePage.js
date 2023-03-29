import React, { Component } from 'react'
import ActionRole from '../components/Content/Role/ActionRole'

export default class ActionRolePage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionRole id={id}></ActionRole>
    )
  }
}

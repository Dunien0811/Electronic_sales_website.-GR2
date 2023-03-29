import React, { Component } from 'react'
import ActionUser from '../components/Content/User/ActionUser'

export default class ActionUserPage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionUser id={id}></ActionUser>
    )
  }
}

import React, { Component } from 'react'
import ActionCategory from '../components/Content/Category/ActionCategory'

export default class ActionCategoryPage extends Component {
  render() {
    const { match } = this.props;
    let id;
    if (match) {
      id = match.params.id;
    }
    return (
      <ActionCategory id={id} ></ActionCategory>
    )
  }
}

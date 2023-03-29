import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import NotFoundPage404 from '../components/NotFoundPage404/NotFoundPage404'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <LinkHere></LinkHere>
        <NotFoundPage404></NotFoundPage404>
      </div>
    )
  }
}

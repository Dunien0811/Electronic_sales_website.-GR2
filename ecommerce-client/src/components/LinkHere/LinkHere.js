import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LinkHere extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li className="active">{url}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

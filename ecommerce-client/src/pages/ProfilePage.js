import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import Profile from '../components/Profile/Profile'
export default class ProfilePage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <Profile></Profile>
      </div>
    )
  }
}

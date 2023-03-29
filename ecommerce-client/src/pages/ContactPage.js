import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import Contact from '../components/Contact/Contact'

export default class ContactPage extends Component {
  render() {
    const url = this.props.match.match.url;
    return (
     <div>
       <LinkHere url={url}></LinkHere>
       <Contact></Contact>
     </div>
    )
  }
}

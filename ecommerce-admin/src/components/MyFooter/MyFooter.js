import React, { Component } from 'react'

export default class MyFooter extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <p>Shopping cart © 2022-2023</p>
            </div>
            <div className="col-sm-6 text-right">
              {/* Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)*/}
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

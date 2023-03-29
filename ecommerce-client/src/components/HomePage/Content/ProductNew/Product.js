import React, { Component } from 'react'
import ProductContent from './ProductContent'

export default class Product extends Component {
  render() {
    return (
      <div className="product-area pt-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="li-product-tab">
                <ul className="nav li-product-menu">
                  <li><a className="active" data-toggle="tab" href="#li-new-product"><span>New Arrival</span></a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Begin item Content Area */}
         <ProductContent></ProductContent>
          {/* End item Content Area */}
        </div>
      </div>
    )
  }
}

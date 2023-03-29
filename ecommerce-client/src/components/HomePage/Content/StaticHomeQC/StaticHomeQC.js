import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class StaticHomeQC extends Component {
  render() {
    return (
      <div className="li-static-home mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Static Home Image Area */}
              <div className="li-static-home-image" />
              {/* Li's Static Home Image Area End Here */}
              {/* Begin Li's Static Home Content Area */}
              <div className="li-static-home-content">
                <p>Sale Offer<span> -35% Off</span>This Week</p>
                <h2>Featured Product</h2>
                <h2>Meito Accessories 2023</h2>
                <p className="schedule">
                  Starting at
                <span> $1.109.00</span>
                </p>
                <div className="default-btn">
                  <Link to="#" className="links">Shopping Now</Link>
                </div>
              </div>
              {/* Li's Static Home Content Area End Here */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

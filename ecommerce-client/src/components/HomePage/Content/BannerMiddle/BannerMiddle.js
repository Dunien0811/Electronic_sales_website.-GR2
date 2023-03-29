import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerMiddle extends Component {
  render() {
    return (
      <div className="li-static-banner" style={{marginTop: -50}}>
        <div className="container">
          <div className="row">
            {/* Begin Single Banner Area */}
            <div className="col-lg-4 col-md-4 text-center">
              <div className="single-banner">
                <Link to="#">
                  <img src="https://linhkienrc.com/wp-content/uploads/2020/12/af-flycam.png" alt="Li's Static Banner" />
                </Link>
              </div>
            </div>
            {/* Single Banner Area End Here */}
            {/* Begin Single Banner Area */}
            <div className="col-lg-4 col-md-4 text-center pt-xs-30">
              <div className="single-banner">
                <Link to="#">
                  <img src="https://thumbs.dreamstime.com/b/grand-opening-official-store-sale-bag-online-shop-background-sale-offer-banner-illustration-grand-opening-official-store-sale-bag-138501592.jpg" alt="Li's Static Banner" />
                </Link>
              </div>
            </div>
            {/* Single Banner Area End Here */}
            {/* Begin Single Banner Area */}
            <div className="col-lg-4 col-md-4 text-center pt-xs-30">
              <div className="single-banner">
                <Link to="#">
                  <img src="https://photos5.appleinsider.com/gallery/50969-100688-apple-ipad-pro-air-sale-xl.jpg" alt="Li's Static Banner" />
                </Link>
              </div>
            </div>
            {/* Single Banner Area End Here */}
          </div>
        </div>
      </div>

    )
  }
}

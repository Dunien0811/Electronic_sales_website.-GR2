import React, { Component } from 'react'

export default class FooterTop extends Component {
  render() {
    return (
      <div className="footer-static-top">
        <div className="container">
          {/* Begin Footer Shipping Area */}
          <div className="footer-shipping pt-60 pb-55 pb-xs-25">
            <div className="row">
              {/* Begin Li's Shipping Inner Box Area */}
              <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/T47vHYx/1.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Free Delivery</h2>
                    <p>And free returns. See checkout for delivery dates.</p>
                  </div>
                </div>
              </div>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/fdWjv2v/2.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Safe Payment</h2>
                    <p>Pay with the world's most popular and secure payment methods.</p>
                  </div>
                </div>
              </div>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/tbLjsRY/3.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Shop with Confidence</h2>
                    <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                  </div>
                </div>
              </div>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/GvHXW7z/4.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>24/7 Help Center</h2>
                    <p>Have a question? Call a Specialist or chat online.</p>
                  </div>
                </div>
              </div>
              {/* Li's Shipping Inner Box Area End Here */}
            </div>
          </div>
          {/* Footer Shipping Area End Here */}
        </div>
      </div>

    )
  }
}

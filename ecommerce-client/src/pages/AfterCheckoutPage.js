import React, { Component } from 'react'

export default class AfterCheckoutPage extends Component {
  render() {
    return (
      <div className="error404-area pt-30 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-wrapper text-center ptb-50 pt-xs-20">
                <div>
                  <img src="https://i.ibb.co/pvDhxPj/checked-ok-yes-icon-1320196391133448530.png" alt="checked" height="70px" />
                  <h1>Thank You.</h1>
                </div>
                <div>
                  <h1>Your order was completed successfully.</h1>
                </div>
                <div>
                  <p><i>The details of your order have been sent to the email. Please check your email to check the status of your order.</i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
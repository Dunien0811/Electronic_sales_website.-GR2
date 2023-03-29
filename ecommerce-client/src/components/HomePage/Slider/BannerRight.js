import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BannerRight extends Component {
  render() {
    return (
      <div className="col-lg-4 col-md-4 text-center pt-xs-30">
        <div className="li-banner">
          <Link tp="#">
            <img src="https://mspoweruser.com/wp-content/uploads/2022/01/Apple-MacBook-Air.jpg" alt="not found" />
          </Link>
        </div>
        <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
          <Link tp="#">
            <img src="https://www.travelandleisure.com/thmb/s5vdBFWAk51RWINjhvmA0yonrto=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/roundup-of-early-airpods-deals-tout-bfcf8e7c088f4fd2985ea9b5973f571e.jpg" alt="not found" />
          </Link>
        </div>
      </div>
    )
  }
}

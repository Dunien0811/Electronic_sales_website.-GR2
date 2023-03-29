import React, { Component } from 'react'

export default class SliderLeft extends Component {
  render() {
    return (
      <div className="col-lg-8 col-md-8">
        <div className="slider-area">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="https://24hstore.vn/upload_images/images/2022/11/25/apple-watch-ultra-49mm-lte-mat-titanium-day-alpine-vua-6.jpg" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://images2.thanhnien.vn/528068263637045248/2023/3/23/iphone-14-yellow-1679544385490815869939.jpeg" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://www.techadvisor.com/wp-content/uploads/2022/06/galaxy_s22_ultra_hands_on_19.jpg?quality=50&strip=all&w=1024" alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

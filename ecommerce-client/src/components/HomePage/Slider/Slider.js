import React, { Component } from 'react'
import SliderLeft from './SliderLeft'
import BannerRight from './BannerRight'

export default class Slider extends Component {
  render() {
    return (
      <div className="slider-with-banner">
        <div className="container">
          <div className="row">
            {/* Begin Slider Area */}
            <SliderLeft></SliderLeft>
            {/* Slider Area End Here */}

            {/* Begin Li Banner Area */}
            <BannerRight></BannerRight>
            {/* Li Banner Area End Here */}
          </div>
        </div>
      </div>
    )
  }
}

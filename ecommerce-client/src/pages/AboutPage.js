import React, { Component } from 'react'

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <ul>
                <li><a href="index.html">Home</a></li>
                <li className="active">/ About Us</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Li's Breadcrumb Area End Here */}
        {/* about wrapper start */}
        <div className="about-us-wrapper pt-60 pb-40">
          <div className="container">
            <div className="row">
              {/* About Text Start */}
              <div className="col-lg-6 order-last order-lg-first">
                <div className="about-text-wrap">
                  <h2><span>Provide Best</span>Product For You</h2>
                  <p>Introducing our online electronics store, GR2 - the go-to destination for high-quality, reliable electronic products. Our mission is to provide our customers with a seamless shopping experience, offering a wide range of top-quality electronics at competitive prices.</p>
                  <p>At GR2, we understand the importance of reliable and trustworthy electronic devices. That's why we have partnered with some of the most reputable brands in the industry to bring you a vast selection of top-quality products.</p>
                  <p>Our user-friendly website makes it easy for you to browse and shop for your favorite electronics, whether you're in the market for a new smartphone, laptop, camera, or gaming console. We are committed to providing our customers with fast and reliable shipping, excellent customer service, and a hassle-free return policy.</p>
                  <p>Thank you for choosing GR2 as your trusted source for high-quality electronics. We are dedicated to providing you with the best shopping experience possible and look forward to serving you for all your electronic needs.</p>
                </div>
              </div>
              {/* About Text End */}
              {/* About Image Start */}
              <div className="col-lg-5 col-md-10">
                <div className="about-image-wrap">
                  <img className="img-full" src="https://bizweb.dktcdn.net/100/329/122/files/gp66-kv-bg.jpg?v=1635149877286" alt="About Us" />
                </div>
              </div>
              {/* About Image End */}
            </div>
          </div>
        </div>
        {/* about wrapper end */}
        {/* Begin Counterup Area */}
        <div className="counterup-area">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-3 col-md-6">
                {/* Begin Limupa Counter Area */}
                <div className="limupa-counter white-smoke-bg">
                  <div className="container">
                    <div className="counter-img">
                      <img src="https://i.ibb.co/QKXDBNM/1.png" alt="" />
                    </div>
                    <div className="counter-info">
                      <div className="counter-number">
                        <h3 className="counter">2169</h3>
                      </div>
                      <div className="counter-text">
                        <span>HAPPY CUSTOMERS</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* limupa Counter Area End Here */}
              </div>
              <div className="col-lg-3 col-md-6">
                {/* Begin limupa Counter Area */}
                <div className="limupa-counter gray-bg">
                  <div className="counter-img">
                    <img src="https://i.ibb.co/f1Zj6SL/2.png" alt="" />
                  </div>
                  <div className="counter-info">
                    <div className="counter-number">
                      <h3 className="counter">869</h3>
                    </div>
                    <div className="counter-text">
                      <span>AWARDS WINNED</span>
                    </div>
                  </div>
                </div>
                {/* limupa Counter Area End Here */}
              </div>
              <div className="col-lg-3 col-md-6">
                {/* Begin limupa Counter Area */}
                <div className="limupa-counter white-smoke-bg">
                  <div className="counter-img">
                    <img src="https://i.ibb.co/vBktQgS/3.png" alt="" />
                  </div>
                  <div className="counter-info">
                    <div className="counter-number">
                      <h3 className="counter">689</h3>
                    </div>
                    <div className="counter-text">
                      <span>HOURS WORKED</span>
                    </div>
                  </div>
                </div>
                {/* limupa Counter Area End Here */}
              </div>
              <div className="col-lg-3 col-md-6">
                {/* Begin limupa Counter Area */}
                <div className="limupa-counter gray-bg">
                  <div className="counter-img">
                    <img src="https://i.ibb.co/z5t0Q7H/4.png" alt="" />
                  </div>
                  <div className="counter-info">
                    <div className="counter-number">
                      <h3 className="counter">2169</h3>
                    </div>
                    <div className="counter-text">
                      <span>COMPLETE PROJECTS</span>
                    </div>
                  </div>
                </div>
                {/* limupa Counter Area End Here */}
              </div>
            </div>
          </div>
        </div>
        {/* Counterup Area End Here */}
        {/* team area wrapper start */}

      </div>

    )
  }
}

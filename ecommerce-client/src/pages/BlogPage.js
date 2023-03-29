import React, { Component } from 'react'
import Iframe from 'react-iframe'

export default class BlogPage extends Component {
  render() {
    return (
      <div className="li-main-blog-page pt-60 pb-55">
        <div className="container">
          <div className="row">
            {/* Begin Li's Blog Sidebar Area */}
            <div className="col-lg-3 order-lg-1 order-2">
              <div className="li-blog-sidebar-wrapper">
                <div className="li-blog-sidebar">
                  <div className="li-sidebar-search-form">
                    <form action="#">
                      <input type="text" className="li-search-field" placeholder="search here" />
                      <button type="submit" className="li-search-btn"><i className="fa fa-search" /></button>
                    </form>
                  </div>
                </div>
                <div className="li-blog-sidebar pt-25">
                  <h4 className="li-blog-sidebar-title">Categories</h4>
                  <ul className="li-blog-archive">
                    <li><a href="/">Laptops (10)</a></li>
                    <li><a href="/">TV &amp; Audio (08)</a></li>
                    <li><a href="/">reach (07)</a></li>
                    <li><a href="/">Smartphone (14)</a></li>
                    <li><a href="/">Cameras (10)</a></li>
                    <li><a href="/">Headphone (06)</a></li>
                  </ul>
                </div>
                <div className="li-blog-sidebar">
                  <h4 className="li-blog-sidebar-title">Blog Archives</h4>
                  <ul className="li-blog-archive">
                    <li><a href="/">January (10)</a></li>
                    <li><a href="/">February (08)</a></li>
                    <li><a href="/">March (07)</a></li>
                    <li><a href="/">April (14)</a></li>
                    <li><a href="/">May (10)</a></li>
                    <li><a href="/">June (06)</a></li>
                  </ul>
                </div>
                <div className="li-blog-sidebar">
                  <h4 className="li-blog-sidebar-title">Recent Post</h4>
                  <div className="li-recent-post pb-30">
                    <div className="li-recent-post-thumb">
                      <a href="blog-details-left-sidebar.html">
                        <img className="img-full" src="images/product/small-size/3.jpg" alt="Li's Product" />
                      </a>
                    </div>
                    <div className="li-recent-post-des">
                      <span><a href="blog-details-left-sidebar.html">First Blog Post</a></span>
                      <span className="li-post-date">25.11.2018</span>
                    </div>
                  </div>
                  <div className="li-recent-post pb-30">
                    <div className="li-recent-post-thumb">
                      <a href="blog-details-left-sidebar.html">
                        <img className="img-full" src="images/product/small-size/2.jpg" alt="Li's Product" />
                      </a>
                    </div>
                    <div className="li-recent-post-des">
                      <span><a href="blog-details-left-sidebar.html">First Blog Post</a></span>
                      <span className="li-post-date">25.11.2018</span>
                    </div>
                  </div>
                  <div className="li-recent-post pb-30">
                    <div className="li-recent-post-thumb">
                      <a href="blog-details-left-sidebar.html">
                        <img className="img-full" src="images/product/small-size/5.jpg" alt="Li's Product" />
                      </a>
                    </div>
                    <div className="li-recent-post-des">
                      <span><a href="blog-details-left-sidebar.html">First Blog Post</a></span>
                      <span className="li-post-date">25.11.2018</span>
                    </div>
                  </div>
                </div>
                <div className="li-blog-sidebar">
                  <h4 className="li-blog-sidebar-title">Tags</h4>
                  <ul className="li-blog-tags">
                    <li><a href="/">Gaming</a></li>
                    <li><a href="/">Chromebook</a></li>
                    <li><a href="/">Refurbished</a></li>
                    <li><a href="/">Touchscreen</a></li>
                    <li><a href="/">Ultrabooks</a></li>
                    <li><a href="/">Sound Cards</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Li's Blog Sidebar Area End Here */}
            {/* Begin Li's Main Content Area */}
            <div className="col-lg-9 order-lg-2 order-1">
              <div className="row li-main-content">
                <div className="col-lg-6 col-md-6">
                  <div className="li-blog-single-item pb-25">
                    <div className="li-blog-banner embed-responsive embed-responsive-16by9">
                      <Iframe url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/300107209&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />
                    </div>
                    <div className="li-blog-content">
                      <div className="li-blog-details">
                        <h3 className="li-blog-heading pt-25"><a href="blog-details-left-sidebar.html">blog audio post</a></h3>
                        <div className="li-blog-meta">
                          <a className="author" href="/"><i className="fa fa-user" />Admin</a>
                          <a className="comment" href="/"><i className="fa fa-comment-o" /> 3 comment</a>
                          <a className="post-time" href="/"><i className="fa fa-calendar" /> 25 nov 2018</a>
                        </div>
                        <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                        <a className="read-more" href="blog-details-left-sidebar.html">Read More...</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="li-blog-single-item pb-25">
                    <div className="li-blog-banner embed-responsive embed-responsive-16by9">
                      <Iframe url="https://www.youtube.com/embed/DR2c266yWEA" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                    <div className="li-blog-content">
                      <div className="li-blog-details">
                        <h3 className="li-blog-heading pt-25"><a href="blog-details-left-sidebar.html">blog video post</a></h3>
                        <div className="li-blog-meta">
                          <a className="author" href="/"><i className="fa fa-user" />Admin</a>
                          <a className="comment" href="/"><i className="fa fa-comment-o" /> 3 comment</a>
                          <a className="post-time" href="/"><i className="fa fa-calendar" /> 25 nov 2018</a>
                        </div>
                        <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                        <a className="read-more" href="blog-details-left-sidebar.html">Read More...</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="li-blog-single-item pb-25">
                    <div className="li-blog-banner">
                      <a href="blog-details-left-sidebar.html"><img className="img-full" src="images/blog-banner/5.jpg" alt="" /></a>
                    </div>
                    <div className="li-blog-content">
                      <div className="li-blog-details">
                        <h3 className="li-blog-heading pt-25"><a href="blog-details-left-sidebar.html">blog fifth post</a></h3>
                        <div className="li-blog-meta">
                          <a className="author" href="/"><i className="fa fa-user" />Admin</a>
                          <a className="comment" href="/"><i className="fa fa-comment-o" /> 3 comment</a>
                          <a className="post-time" href="/"><i className="fa fa-calendar" /> 25 nov 2018</a>
                        </div>
                        <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                        <a className="read-more" href="blog-details-left-sidebar.html">Read More...</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="li-blog-single-item pb-35">
                    <div className="li-blog-banner">
                      <a href="blog-details-left-sidebar.html"><img className="img-full" src="images/blog-banner/6.jpg" alt="" /></a>
                    </div>
                    <div className="li-blog-content">
                      <div className="li-blog-details">
                        <h3 className="li-blog-heading pt-25"><a href="blog-details-left-sidebar.html">blog second post</a></h3>
                        <div className="li-blog-meta">
                          <a className="author" href="/"><i className="fa fa-user" />Admin</a>
                          <a className="comment" href="/"><i className="fa fa-comment-o" /> 3 comment</a>
                          <a className="post-time" href="/"><i className="fa fa-calendar" /> 25 nov 2018</a>
                        </div>
                        <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere libero eu augue condimentum rhoncus. Cras pretium arcu ex.</p>
                        <a className="read-more" href="blog-details-left-sidebar.html">Read More...</a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Begin Li's Pagination Area */}
                <div className="col-lg-12">
                  <div className="li-paginatoin-area text-center pt-25">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="li-pagination-box">
                          <li><a className="Previous" href="/">Previous</a></li>
                          <li className="active"><a href="/">1</a></li>
                          <li><a href="/">2</a></li>
                          <li><a href="/">3</a></li>
                          <li><a className="Next" href="/">Next</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Li's Pagination End Here Area */}
              </div>
            </div>
            {/* Li's Main Content Area End Here */}
          </div>
        </div>
      </div>

    )
  }
}

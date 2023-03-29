import React, { Component } from "react";
import { connect } from "react-redux";
import BeautyStars from "beauty-stars";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { actAddRatingRequest } from "../../redux/actions/rating";
import { toast } from "react-toastify";
import Modal from "react-modal";
toast.configure();

let token;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};

const mailUrl = "https://limupa-shop-client.herokuapp.com/products/";
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingPoint: 0,
      modalIsOpen: false,
      textRating: "",
      viewAllRating: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
    window.fbAsyncInit = function() {
    window.FB.init({
      appId: "661898660956451",
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v5.0'
     });
    };
  
    // Load the SDK asynchronously
    (function(d, s, id) {
     var js,
       fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s);
     js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   })(document, "script", "facebook-jssdk");
  }  
  
  componentDidUpdate() {
    if(window.FB) {
      window.FB.XFBML.parse();
    }
   }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#2d3136";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeRating = value => {
    this.setState({
      ratingPoint: value
    });
  };

  showCommentFb() {
    return (
      <div
        className="fb-comments"
        data-href={`${mailUrl}/${this.props.id}`}
        data-width="100%"
        data-numposts="5"
      ></div>
    );
  }

  handleChange = event => {
    let name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmitViewAllRating = () => {
    const { viewAllRating } = this.state;
    this.setState({
      viewAllRating: !viewAllRating
    });
  };

  handleSubmitRating = async (event, productId) => {
    event.preventDefault();
    const { ratingPoint, textRating } = this.state;
    if (!ratingPoint) {
      return toast.error("Please rate poin before submit");
    }
    const newTextRating = textRating ? textRating : null;
    const data = {
      point: ratingPoint,
      content: newTextRating
    };
    if (!token) {
      return toast.error("Please login before write rating");
    }
    this.props.add_rating(productId, data, token);
    this.setState({
      modalIsOpen: false,
      ratingPoint: 0
    });
  };

  showAllRating(arrRating, arrRatings) {
    if (this.state.viewAllRating) {
      return arrRatings && arrRatings.length ? (
        arrRatings.map((item, index) => {
          return (
            <div key={index} className="row">
              <div className="col-sm-3">
                <div className="fix-avatar-div">
                  <img
                    src={
                      item.user && item.user.avatar
                        ? item.user.avatar
                        : "https://i.ibb.co/NCdx7FF/avatar-Default.png"
                    }
                    className="fix-avatar rounded"
                    alt="notfound"
                  />
                </div>
                <div className="review-block-name">
                  <Link to="#">{item && item.user ? item.user.email : null}</Link>
                </div>
                <div className="review-block-date">
                  <Moment format="YYYY-MM-DD">{item.createdAt}</Moment>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="review-block-rate">
                  <div>
                    <BeautyStars
                      size={12}
                      activeColor={"#ed8a19"}
                      inactiveColor={"#c1c1c1"}
                      value={item.point}
                      onChange={ratingPoint =>
                        this.handleChangeRating(ratingPoint)
                      }
                    />
                  </div>
                </div>
                <div className="review-block-description">{item.content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <h4>This product has no reviews</h4>
      );
    } else {
      return arrRating && arrRating.length ? (
        arrRating.map((item, index) => {
          return (
            <div key={index} className="row">
              <div className="col-sm-3">
                <div className="fix-avatar-div">
                  <img
                    src={
                      item.user && item.user.avatar
                        ? item.user.avatar
                        : "https://i.ibb.co/NCdx7FF/avatar-Default.png"
                    }
                    className="fix-avatar rounded" alt="not found"
                  />
                </div>
                <div className="review-block-name">
                  <Link to="#">{item && item.user ? item.user.email : null}</Link>
                </div>
                <div className="review-block-date">
                  <Moment format="YYYY-MM-DD">{item.createdAt}</Moment>
                </div>
              </div>
              <div className="col-sm-9" style={{margin: 'auto'}}>
                <div className="review-block-rate">
                  <div>
                    <BeautyStars
                      size={12}
                      activeColor={"#ed8a19"}
                      inactiveColor={"#c1c1c1"}
                      value={item.point}
                      onChange={ratingPoint =>
                        this.handleChangeRating(ratingPoint)
                      }
                    />
                  </div>
                </div>
                <div className="review-block-description">{item.content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <h4>This product has no reviews</h4>
      );
    }
  }

  render() {
    const { product, productRatings } = this.props;
    const { ratingPoint } = this.state;
    let count = 0; //co bao nhieu danh gia
    let totalRating = 0; // xem danh gia bang bao nhieu sau do / count tinh trung binh
    let fixRating = 0; //rating fix cung left sider bar
    let showFixRating = 0; // show ***** tren left silde bar
    let oneStart = 0;
    let twoStart = 0;
    let threeStart = 0;
    let fourStart = 0;
    let fiveStart = 0;
    let showOneStart = 0;
    let showTwoStart = 0;
    let showThreeStart = 0;
    let showFourStart = 0;
    let showFiveStart = 0;
    let showProductRating = [];
    if (productRatings && productRatings.length > 0) {
      productRatings.forEach(item => {
        if (item.point === 1) {
          oneStart++;
        }
        if (item.point === 2) {
          twoStart++;
        }
        if (item.point === 3) {
          threeStart++;
        }
        if (item.point === 4) {
          fourStart++;
        }
        if (item.point === 5) {
          fiveStart++;
        }
        count++;
        totalRating = totalRating + item.point;
      });
      fixRating = (totalRating / count).toFixed(1);
      showFixRating = Math.round(fixRating);
      showOneStart = ((oneStart / count) * 100).toFixed(0);
      showTwoStart = ((twoStart / count) * 100).toFixed(0);
      showThreeStart = ((threeStart / count) * 100).toFixed(0);
      showFourStart = ((fourStart / count) * 100).toFixed(0);
      showFiveStart = ((fiveStart / count) * 100).toFixed(0);
    }
    showProductRating = productRatings.slice(0, 4);
    return (
      <div className="product-area pt-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h4 ref={subtitle => (this.subtitle = subtitle)}>Review</h4>
                <div
                  className="modal-content"
                  style={{ width: "auto", border: 0 }}
                >
                  <div className="modal-body">
                    <h3 className="review-page-title">Write Your Review</h3>
                    <div className="modal-inner-area row">
                      <div className="col-lg-12">
                        <div className="li-review-content">
                          {/* Begin Feedback Area */}
                          <div className="feedback-area">
                            <div className="feedback">
                              <h3 className="feedback-title">Our Rating</h3>
                              <form action="/">
                                <p className="your-opinion">
                                  <label>Your Rating</label>
                                  <div>
                                    <BeautyStars
                                      size={12}
                                      value={ratingPoint}
                                      onChange={ratingPoint =>
                                        this.handleChangeRating(ratingPoint)
                                      }
                                    />
                                  </div>
                                </p>
                                <p className="feedback-form">
                                  <label htmlFor="feedback">Your Review</label>
                                  <textarea
                                    onChange={this.handleChange}
                                    id="textRating"
                                    name="textRating"
                                    cols={45}
                                    rows={8}
                                  />
                                </p>
                                <div className="feedback-input">
                                  <div className="feedback-btn pb-15">
                                    <button
                                      onClick={event =>
                                        this.handleSubmitRating(
                                          event,
                                          product.id
                                        )
                                      }
                                      className="btn mr-1"
                                      style={{
                                        background: "#e80f0f",
                                        color: "white"
                                      }}
                                    >
                                      Submit
                                    </button>
                                    <button
                                      onClick={this.closeModal}
                                      className="btn mr-1"
                                      style={{
                                        background: "#fed700",
                                        color: "white"
                                      }}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* Feedback Area End Here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="li-product-tab">
                <ul className="nav li-product-menu">
                  <li>
                    <a className="active" data-toggle="tab" href="#description">
                      <span>Description</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* Begin Li's Tab Menu Content Area */}
            </div>
          </div>
          <div className="tab-content">
            <div
              id="description"
              className="tab-pane active show"
              role="tabpanel"
            >
              <div className="product-description">
                <span dangerouslySetInnerHTML={{__html: product.description}}></span>
                {this.showCommentFb()}
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-2">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="rating-block">
                      <h5>Have {count} ratings</h5>
                      <h2 className="bold padding-bottom-7">
                        {fixRating}
                        <small>/ 5</small>
                      </h2>
                      <div>
                        <BeautyStars
                          size={12}
                          editable={false}
                          activeColor={"#ed8a19"}
                          inactiveColor={"#c1c1c1"}
                          value={showFixRating}
                          onChange={ratingPoint =>
                            this.handleChangeRating(ratingPoint)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="pull-left">
                      <div
                        className="pull-left"
                        style={{ width: "35px", lineHeight: 1 }}
                      >
                        <div style={{ height: "9px", margin: "5px 0" }}>
                          {" "}
                          <img
                            src="https://i.ibb.co/2KKnLBh/148839.png"
                            style={{ height: 15 }}
                            alt="not found"
                          />{" "}
                          5 <span className="glyphicon glyphicon-star" />
                        </div>
                      </div>
                      <div className="pull-left" style={{ width: "180px" }}>
                        <div
                          className="progress"
                          style={{ height: "9px", margin: "8px 0" }}
                        >
                          <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            aria-valuenow={5}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            style={{ width: `${showFiveStart}%` }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ marginLeft: "10px" }}
                      >
                        {fiveStart}
                      </div>
                    </div>
                    <div className="pull-left">
                      <div
                        className="pull-left"
                        style={{ width: "35px", lineHeight: 1 }}
                      >
                        <div style={{ height: "9px", margin: "5px 0" }}>
                          <img
                            src="https://i.ibb.co/2KKnLBh/148839.png"
                            style={{ height: 15 }}
                            alt="not found"
                          />{" "}
                          4 <span className="glyphicon glyphicon-star" />
                        </div>
                      </div>
                      <div className="pull-left" style={{ width: "180px" }}>
                        <div
                          className="progress"
                          style={{ height: "9px", margin: "8px 0" }}
                        >
                          <div
                            className="progress-bar progress-bar-primary"
                            role="progressbar"
                            aria-valuenow={4}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            style={{ width: `${showFourStart}%` }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ marginLeft: "10px" }}
                      >
                        {fourStart}
                      </div>
                    </div>
                    <div className="pull-left">
                      <div
                        className="pull-left"
                        style={{ width: "35px", lineHeight: 1 }}
                      >
                        <div style={{ height: "9px", margin: "5px 0" }}>
                          <img
                            src="https://i.ibb.co/2KKnLBh/148839.png"
                            style={{ height: 15 }}
                            alt="not found"
                          />{" "}
                          3 <span className="glyphicon glyphicon-star" />
                        </div>
                      </div>
                      <div className="pull-left" style={{ width: "180px" }}>
                        <div
                          className="progress"
                          style={{ height: "9px", margin: "8px 0" }}
                        >
                          <div
                            className="progress-bar progress-bar-info"
                            role="progressbar"
                            aria-valuenow={3}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            style={{ width: `${showThreeStart}%` }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ marginLeft: "10px" }}
                      >
                        {threeStart}
                      </div>
                    </div>
                    <div className="pull-left">
                      <div
                        className="pull-left"
                        style={{ width: "35px", lineHeight: 1 }}
                      >
                        <div style={{ height: "9px", margin: "5px 0" }}>
                          <img
                            src="https://i.ibb.co/2KKnLBh/148839.png"
                            style={{ height: 15 }}
                            alt="not found"
                          />{" "}
                          2 <span className="glyphicon glyphicon-star" />
                        </div>
                      </div>
                      <div className="pull-left" style={{ width: "180px" }}>
                        <div
                          className="progress"
                          style={{ height: "9px", margin: "8px 0" }}
                        >
                          <div
                            className="progress-bar progress-bar-warning"
                            role="progressbar"
                            aria-valuenow={2}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            style={{ width: `${showTwoStart}%` }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ marginLeft: "10px" }}
                      >
                        {twoStart}
                      </div>
                    </div>
                    <div className="pull-left">
                      <div
                        className="pull-left"
                        style={{ width: "35px", lineHeight: 1 }}
                      >
                        <div style={{ height: "9px", margin: "5px 0" }}>
                          <img
                            src="https://i.ibb.co/2KKnLBh/148839.png"
                            style={{ height: 15 }}
                            alt="not found"
                          />{" "}
                          1 <span className="glyphicon glyphicon-star" />
                        </div>
                      </div>
                      <div className="pull-left" style={{ width: "180px" }}>
                        <div
                          className="progress"
                          style={{ height: "9px", margin: "8px 0" }}
                        >
                          <div
                            className="progress-bar progress-bar-danger"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={5}
                            style={{ width: `${showOneStart}%` }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="pull-right"
                        style={{ marginLeft: "10px" }}
                      >
                        {oneStart}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="review-block">
                      {this.showAllRating(showProductRating, productRatings)}
                    </div>
                  </div>
                </div>
                <Link
                  onClick={this.handleSubmitViewAllRating}
                  className="fix-view-all"
                  to="#"
                >
                  <i>View all ratings</i>
                </Link>
                <button className="fix-btn-review btn" onClick={this.openModal}>
                  Write Your Review!
                </button>
              </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    productRatings: state.productRatings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_rating: (productId, rating, token) => {
      dispatch(actAddRatingRequest(productId, rating, token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);

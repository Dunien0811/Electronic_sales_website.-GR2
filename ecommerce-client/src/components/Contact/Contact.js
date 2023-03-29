import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import { toast } from "react-toastify";
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };
  }
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, subject, message } = this.state;
    const newSubject = subject ? subject : null;
    const newMessage = message ? message : null;
    if (!name || !email) {
      return toast.error('Error! name and email is required')
    }
    const newContact = {
      name,
      email,
      subject: newSubject,
      message: newMessage
    };
    const res = await callApi("contacts", "POST", newContact, null);
    if (res && res.status === 200) {
      toast.success("Sending contact is successfully");
      this.setState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  };
  render() {
    const { name, email, subject, message } = this.state;
    return (
      <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Contact Us</h3>
                <p className="contact-page-message mb-25">
                  Claritas est etiam processus dynamicus, qui sequitur
                  mutationem consuetudium lectorum. Mirum est notare quam
                  littera gothica, quam nunc putamus parum claram anteposuerit
                  litterarum formas human.
                </p>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-fax" /> Address
                  </h4>
                  <p>66 Vo van Tan - Thanh Khe – Da Nang - VN</p>
                </div>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-phone" /> Phone
                  </h4>
                  <p>Mobile: (+84) 949 431 757</p>
                  <p>Hotline: 1900 9090 </p>
                </div>
                <div className="single-contact-block last-child">
                  <h4>
                    <i className="fa fa-envelope-o" /> Email
                  </h4>
                  <p>Group2@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="contact-form-content pt-sm-55 pt-xs-55">
                <h3 className="contact-page-title">Tell Us Your Message</h3>
                <div className="contact-form">
                  <form onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group">
                      <label>
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        value={name}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Your Email <span className="required">*</span>
                      </label>
                      <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        value={email}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        onChange={this.handleChange}
                        type="text"
                        name="subject"
                        value={subject}
                      />
                    </div>
                    <div className="form-group mb-30">
                      <label>Your Message</label>
                      <textarea
                        onChange={this.handleChange}
                        name="message"
                        value={message}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        value="submit"
                        className="li-btn-3"
                        name="submit"
                      >
                        send
                      </button>
                    </div>
                  </form>
                </div>
                <p className="form-messege" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

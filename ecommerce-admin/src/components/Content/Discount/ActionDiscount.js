import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class ActionDiscount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: null,
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleChangeEnd = date => {
    this.setState({
      endDate: date
    });
  };

  render() {
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Form User</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">User</li>
          </ul>
        </div>
        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Descriptions</h3>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal">
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Name Discount</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Trigger</label>
                        <div className="col-sm-9">
                          <select name="account" className="form-control mb-3">
                            <option>Code</option>
                            <option>Product</option>
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Code</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Total To Reach</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Type</label>
                        <div className="col-sm-9">
                          <select name="account" className="form-control mb-3">
                            <option>FixedAmount</option>
                            <option>Rate</option>
                            <option>Shipping</option>
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Rate</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Amount</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Max Usage</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Shipping Cost</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Start Time</label>
                        <div className="col-sm-3">
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </div>
                        <label className="col-sm-3 form-control-label">End Time</label>
                        <div className="col-sm-3">
                          <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleChangeEnd}
                          />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Products</label>
                        <div className="col-sm-9">
                          <select name="account" className="form-control mb-3">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Active <br /></label>
                        <div className="col-sm-9">
                          <div className="i-checks">
                            <input type="checkbox" defaultValue className="checkbox-template" />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <button type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Cancel</button>
                          <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}
        <MyFooter></MyFooter>
      </div>
    )
  }
}

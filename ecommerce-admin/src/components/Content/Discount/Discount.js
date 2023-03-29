import React, { Component } from 'react'
import {exportExcel} from '../../../utils/exportExcel'
import './style.css'
import { Link } from 'react-router-dom'
import { actFetchDiscountsRequest, actDeleteDiscountRequest } from '../../../redux/actions/discount'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MyFooter from '../../MyFooter/MyFooter'
const MySwal = withReactContent(Swal)

let token;

class Discount extends Component {

  componentDidMount() {
    token = localStorage.getItem('_auth');
    this.props.fetch_discounts(token);
  }

  handleRemove = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.value) {
        await this.props.delete_discount(id, token);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  downloadExcel = () => {
    const key = 'discounts'
    exportExcel(key)
  }

  render() {
    const { discounts } = this.props;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Discounts</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Discounts</li>
          </ul>
        </div>
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Data Table Discounts</h3>
                    <button onClick={()=>this.downloadExcel()} style={{ border: 0, background: "white" }}> <i className="fa fa-file-excel-o"
                        style={{fontSize: 18, color: '#1d7044'}}> Excel</i></button>
                  </div>
                  <form className="form-inline md-form form-sm mt-0" style={{ justifyContent: 'flex-end', paddingTop: 5, paddingRight: 20 }}>
                    <div>
                      <i className="fa fa-search" aria-hidden="true"></i>
                      <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" />
                    </div>
                    <Link to="/discounts/add" className="btn btn-primary" > Create</Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Total To Reach</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th>Max Usages</th>
                            <th>Used</th>
                            <th>shippingCost</th>
                            <th style={{textAlign: "center"}}>Active</th>
                            <th style={{textAlign: "center"}}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discounts && discounts.length ? discounts.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nameDiscount}</td>
                                <td>{item.code}</td>
                                <td>{item.totalToReach}</td>
                                <td>{item.rate}</td>
                                <td>{item.amount}</td>
                                <td>{item.maxNumberOfUsages}</td>
                                <td>{item.numberOfUsages}</td>
                                <td>{item.shippingCost}</td>
                                <td style={{textAlign: "center"}}>{item.isActive ?
                                  <div className="i-checks">
                                    <input type="checkbox" checked={true} className="checkbox-template" />
                                  </div>
                                  :
                                  <div className="i-checks">
                                    <input type="checkbox" checked={false} className="checkbox-template" />
                                  </div>}
                                </td>
                                <td style={{textAlign: "center"}}>
                                  <div>
                                    <span className="fix-action"><Link to={`discounts/edit/${item.id}`}> <i className="fa fa-edit"></i></Link></span>
                                    <span onClick={() => this.handleRemove(item.id)} className="fix-action"><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>
                                  </div>
                                </td>
                              </tr>
                            )
                          }) : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <nav aria-label="Page navigation example" style={{ float: "right" }}>
                  <ul className="pagination">
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
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

const mapStateToProps = (state) => {
  return {
    discounts: state.discounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_discounts: (token) => {
      dispatch(actFetchDiscountsRequest(token))
    },
    delete_discount: (id, token) => {
      dispatch(actDeleteDiscountRequest(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discount)

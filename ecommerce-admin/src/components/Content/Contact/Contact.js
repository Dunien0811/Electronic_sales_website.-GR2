import React, { Component } from 'react'
import { actFetchContactsRequest, actDeleteContactRequest, actFindContactsRequest } from '../../../redux/actions/contact';
import {exportExcel} from '../../../utils/exportExcel'
import { Link } from "react-router-dom";
import MyFooter from "../../MyFooter/MyFooter";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Paginator from "react-js-paginator";
import { connect } from "react-redux";
import './style.css'
const MySwal = withReactContent(Swal);

let token;


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          searchText: "",
          total: 0,
          currentPage: 1
        };
      }
    
      componentDidMount() {
      this.fetch_reload_data()
      }

      fetch_reload_data(){
        token = localStorage.getItem('_auth');
        this.props.fetch_contact(token, null).then(res => {
          this.setState({
            total: res.total
          });
        }).catch(err => {
          console.log(err);  
        })
      }
    
      pageChange(content) {
        const limit = 10;
        const offset = limit * (content - 1);
        this.props.fetch_contact(token, offset);
        this.setState({
          currentPage: content
        });
        window.scrollTo(0, 0);
      }
    
      handleRemove = id => {
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(async result => {
          if (result.value) {
            await this.props.delete_contact(id, token);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      };
    
      handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        const { searchText } = this.state;
        this.props.find_contacts(token, searchText).then(res => {
          this.setState({
            total: res.total
          })      
        })
      };

      downloadExcel = () => {
        const key = 'contacts'
        exportExcel(key)
      }

    render() {
        let { contacts } = this.props;
        const { searchText, total } = this.state;
        return (
            <div className="content-inner">
            {/* Page Header*/}
            <header className="page-header">
              <div className="container-fluid">
                <h2 className="no-margin-bottom">Contact</h2>
              </div>
            </header>
            {/* Breadcrumb*/}
            <div className="breadcrumb-holder container-fluid">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">contacts</li>
              </ul>
            </div>
            <section className="tables pt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header d-flex">
                        <h3 className="h4">Data Table contacts</h3>
                       <button onClick={()=>this.downloadExcel()} style={{ border: 0, background: "white" }}> <i className="fa fa-file-excel-o"
                        style={{fontSize: 18, color: '#1d7044'}}> Excel</i></button>
                      </div>
                      <form
                        onSubmit={event => this.handleSubmit(event)}
                        className="form-inline md-form form-sm mt-0"
                        style={{
                          justifyContent: "flex-end",
                          paddingTop: 5,
                          paddingRight: 20
                        }}
                      >
                        <div>
                          <button style={{ border: 0, background: "white" }}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </button>
                          <input
                            name="searchText"
                            onChange={this.handleChange}
                            value={searchText}
                            className="form-control form-control-sm ml-3 w-75"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                        {/* <Link to="/contacts/add" className="btn btn-primary">
                          Create
                        </Link> */}
                      </form>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Content</th>
                                <th>CreatedAt</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contacts && contacts.length
                                ? contacts.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item && item.name ? item.name : ''}</td>
                                        <td>{item && item.email ? item.email : ''}</td>
                                        <td>{item && item.subject ? item.subject : ''}</td>
                                        <td> <p className="text-truncate" style={{ width: 300 }}>
                                            {item && item.message ? item.message : ''}
                                            </p>
                                        </td>
                                        <td>{item && item.createdAt ? item.createdAt : ''}</td>
                                        <td style={{ textAlign: "center" }}>
                                          <div>
                                            {/* <span className="fix-action">
                                              <Link to={`/contacts/edit/${item.id}`}>
                                                {" "}
                                                <i className="fa fa-edit"></i>
                                              </Link>
                                            </span> */}
                                            <span title='Delete'
                                              onClick={() =>
                                                this.handleRemove(item.id)
                                              }
                                              className="fix-action"
                                            >
                                              <Link to="#">
                                                {" "}
                                                <i
                                                  className="fa fa-trash"
                                                  style={{ color: "#ff00008f" }}
                                                ></i>
                                              </Link>
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <nav
                      aria-label="Page navigation example"
                      style={{ float: "right" }}
                    >
                      <ul className="pagination">
                        <Paginator
                          pageSize={10}
                          totalElements={total}
                          onPageChangeCallback={e => {
                            this.pageChange(e);
                          }}
                        />
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

const mapStateToProps = state => {
    return {
      contacts: state.contacts
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      fetch_contact: (token, offset) => {
        return dispatch(actFetchContactsRequest(token, offset));
      },
      delete_contact: (id, token) => {
        dispatch(actDeleteContactRequest(id, token));
      },
      find_contacts: (token, searchText) => {
        return dispatch(actFindContactsRequest(token, searchText));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contact);
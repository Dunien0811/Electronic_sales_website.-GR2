import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { actFetchRolesRequest, actDeleteRoleRequest, actFindRolesRequest } from '../../../redux/actions/role'
import { connect } from 'react-redux'
import MyFooter from '../../MyFooter/MyFooter'
import {exportExcel} from '../../../utils/exportExcel'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Paginator from 'react-js-paginator';
const MySwal = withReactContent(Swal)

let token;
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      total: 0,
      currentPage: 1
    }
  }


  componentDidMount() {
    this.fetch_reload_data(); //recive data from return promise dispatch
  }

  fetch_reload_data(){
    token = localStorage.getItem('_auth');
    this.props.fetch_roles(token).then(res => {
      this.setState({
        total: res.total
      });
    }).catch(err => {
      console.log(err);  
    })
  }

  pageChange(content){
    const limit = 10;
    const offset = limit * (content - 1);
    this.props.fetch_roles(token, offset);
    this.setState({
      currentPage: content
    })
    window.scrollTo(0, 0);
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
        await this.props.delete_role(id, token);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchText } = this.state;
    this.props.find_roles(token, searchText).then(res => {
      this.setState({
        total: res.total
      })
    })
  }

  downloadExcel = () => {
    const key = 'roles'
    exportExcel(key)
  }

  render() {
    let { roles } = this.props;
    const { searchText, total } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Roles</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Roles</li>
          </ul>
        </div>
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Data Table Roles</h3>
                    <button onClick={()=>this.downloadExcel()} style={{ border: 0, background: "white" }}> <i className="fa fa-file-excel-o"
                        style={{fontSize: 18, color: '#1d7044'}}> Excel</i></button>
                  </div>
                  <form onSubmit={(event) => this.handleSubmit(event)}
                    className="form-inline md-form form-sm mt-0" style={{ justifyContent: 'flex-end', paddingTop: 5, paddingRight: 20 }}>
                    <div>
                    <button style={{border: 0, background: 'white'}}><i className="fa fa-search" aria-hidden="true"></i></button>
                      <input name="searchText"
                        onChange={this.handleChange}
                        value={searchText} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" />
                    </div>
                    <Link to="/roles/add" className="btn btn-primary" >Create</Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Name Role</th>
                            <th>Description</th>
                            <th style={{ textAlign: "center" }}>Active</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roles && roles.length ? roles.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nameRole}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: "center" }}>{item.isActive ?
                                  <div className="i-checks">
                                    <input type="checkbox" checked={true} onChange={() => this.handleChangeCheckBox} className="checkbox-template" />
                                  </div>
                                  :
                                  <div className="i-checks">
                                    <input type="checkbox" checked={false} onChange={() => this.handleChangeCheckBox} className="checkbox-template" />
                                  </div>}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <div>
                                    <span title='Edit' className="fix-action"><Link to={`/roles/edit/${item.id}`}> <i className="fa fa-edit"></i></Link></span>
                                    <span title='Delete' onClick={() => this.handleRemove(item.id)} className="fix-action"><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>
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
                  <Paginator
                        pageSize={10}
                        totalElements={total}
                        onPageChangeCallback={(e) => {this.pageChange(e)}}
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


const mapStateToProps = (state) => {
  return {
    roles: state.roles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_roles: (token, offset) => {
      return dispatch(actFetchRolesRequest(token, offset))
    },
    delete_role: (id, token) => {
      dispatch(actDeleteRoleRequest(id, token))
    },
    find_roles: (token, searchText) => {
      return dispatch(actFindRolesRequest(token, searchText))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
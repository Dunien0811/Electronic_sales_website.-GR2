import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { actAddRoleRequest, actGetRoleRequest, actEditRoleRequest } from '../../../redux/actions/role';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
let token;
let id;
class ActionRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultActive: true,
      name: '',
      desc: '',
      redirectToUser: false,
    };
    id = this.props.id
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    if (id) {
      const res = await callApi(`roles/${id}`, 'GET', null, token);
      this.setState({
        defaultActive: res.data.isActive,
        name: res.data.nameRole,
        desc: res.data.description,
      })
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { defaultActive, name, desc } = this.state;
    const newDesc = (desc === '') ? null : desc;
    if (!id) {
      const newRole = {
        isActive: defaultActive,
        nameRole: name,
        description: newDesc
      }
      this.props.add_role(token, newRole);
      this.setState({
        name: '',
        desc: '',
      })
    } else {
      const editRole = {
        isActive: defaultActive,
        nameRole: name,
        description: newDesc
      }
      await this.props.edit_role(token, id, editRole);
      this.setState({
        redirectToUser: true
      })
    }
  }

  render() {
    const { defaultActive, name, desc, redirectToUser } = this.state;
    if (redirectToUser) {
      return <Redirect to='/roles'></Redirect>
    }
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Forms Role</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Role</li>
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
                    <h3 className="h4">Description</h3>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)}>
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Name Role</label>
                        <div className="col-sm-9">
                          <input name="name" value={name} onChange={this.handleChange} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Description</label>
                        <div className="col-sm-9">
                          <input name="desc" value={desc} onChange={this.handleChange} type="text" placeholder="Note" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Active</label>
                        <div className="col-sm-9">
                          <div className="i-checks">
                            <input type="checkbox"
                              name="defaultActive"
                              checked={defaultActive}
                              onChange={this.handleChange}
                              className="checkbox-template" />
                            <label htmlFor="checkboxCustom1"></label>
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


const mapDispatchToProps = (dispatch) => {
  return {
    add_role: (token, newRole) => {
      dispatch(actAddRoleRequest(token, newRole))
    },
    get_role: (token, id) => {
      dispatch(actGetRoleRequest(token, id))
    },
    edit_role: (token, id, data) => {
      dispatch(actEditRoleRequest(token, id, data))
    }
  }
}
export default connect(null, mapDispatchToProps)(ActionRole)

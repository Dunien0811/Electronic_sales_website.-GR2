import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { connect } from 'react-redux'
import callApi from '../../../utils/apiCaller';
import { actAddUserRequest, actGetUserRequest, actEditUserRequest } from '../../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import { uploadImage } from '../../../utils/upload'
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';


let token;
let id;
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;
class ActionUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      email: '',
      password: '',
      avatar: null,
      phone: '',
      isActive: true,
      isVerifyEmail: false,
      roleId: 4,
      redirectToUser: false,
      dataRole: [],
      img: null,
      loading: false
    };
    id = this.props.id
  }
  async componentDidMount() {
    token = localStorage.getItem('_auth');
    const resRole = await callApi('roles', 'GET', null, token);
    this.setState({
      dataRole: resRole.data.results
    })
    if (id) {
      const res = await callApi(`users/${id}`, 'GET', null, token);
      this.setState({
        name: res.data.name,
        address: res.data.address,
        email: res.data.email,
        avatar: res.data.avatar,
        phone: res.data.phone,
        isActive: res.data.isActive,
        isVerifyEmail: res.data.isVerifyEmail,
        roleId: res.data.roleId,
        desc: res.data.description,
      })
    }
  }

  handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const img = event.target.files[0];
      this.setState(() => ({ img }));
    }
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
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
    const { name, address, email, password, phone, isActive, isVerifyEmail, roleId } = this.state;
    let { img, avatar } = this.state;
    this.setState({
      loading: true
    })
    //upload image to firebase
    if (img !== null && img !== avatar) {
      avatar = await uploadImage(img);
    }
    const newRoleId = parseInt(roleId);
    const newAvatar = (avatar === '') ? null : avatar
    const newAddress = (address === '') ? null : address
    const newPhone = (phone === '') ? null : phone
    const newName = (name === '') ? null : name
    if (!id) {
      const newUser = {
        name: newName,
        address: newAddress,
        email,
        password,
        avatar: newAvatar,
        phone: newPhone,
        isActive,
        isVerifyEmail,
        roleId: newRoleId
      }
      await this.props.add_user(token, newUser);
      this.setState({
        name: '',
        address: '',
        email: '',
        password: 'password',
        avatar: '',
        phone: '',
        isActive: true,
        isVerifyEmail: false,
        roleId: 4,
        loading: false,
        redirectToUser: true
      })
    } else {
      const editUser = {
        name: newName,
        address: newAddress,
        avatar: newAvatar,
        phone: newPhone,
        isActive,
        isVerifyEmail,
        roleId: newRoleId
      }
      await this.props.edit_user(token, id, editUser);
      this.setState({
        loading: false,
        redirectToUser: true
      })
    }
  }

  render() {
    const { name, dataRole, address, email, password, avatar, phone, isActive, isVerifyEmail, roleId, redirectToUser, loading } = this.state;
    if (redirectToUser) {
      return <Redirect to="/users"></Redirect>
    }
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={'#796aeebd'}
            loading={loading}
          />
        </div>
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
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)}>
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Name</label>
                        <div className="col-sm-3">
                          <input type="text" onChange={this.handleChange} name="name" value={name} className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Address</label>
                        <div className="col-sm-3">
                          <input type="text" onChange={this.handleChange} name="address" value={address} className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Phone</label>
                        <div className="col-sm-3">
                          <input type="text" onChange={this.handleChange} name="phone" value={phone} className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Email</label>
                        <div className="col-sm-3">
                          {
                            id ? <input type="email" onChange={this.handleChange} name="email" value={email} disabled className="form-control" />
                              : <input type="email" onChange={this.handleChange} name="email" value={email} className="form-control" />
                          }
                        </div>
                      </div>
                      {id ? null :
                        <div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">Password</label>
                            <div className="col-sm-9">
                              <input type="password" value={password} onChange={this.handleChange} name="password" className="form-control" />
                            </div>
                          </div>
                        </div>
                      }
                      <div className="line" />
                      <div className="form-group row">
                        <label htmlFor="fileInput" className="col-sm-3 form-control-label">Avatar</label>
                        <div className="col-sm-9">
                          <input type="file" onChange={this.handleChangeImage} className="form-control-file" />
                          <div className="fix-cart">
                          <img src={avatar || 'http://via.placeholder.com/400x300'} id="output" className="fix-img" alt="avatar" />
                          </div>                     
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Active</label>
                        <div className="col-sm-3">
                          <div className="i-checks">
                            <input type="checkbox"
                              name="isActive"
                              checked={isActive}
                              onChange={this.handleChange}
                              className="checkbox-template" />
                          </div>
                        </div>
                        <label className="col-sm-3 form-control-label" style={{textAlign: 'center'}}>Verify Email <br /></label>
                        <div className="col-sm-3">
                          <div className="i-checks">
                            <input type="checkbox"
                              name="isVerifyEmail"
                              checked={isVerifyEmail}
                              onChange={this.handleChange}
                              className="checkbox-template" />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">System user</label>
                        <div className="col-sm-9">
                          <select className="form-control mb-3" name="roleId" value={roleId} onChange={this.handleChange}>
                            {dataRole && dataRole.length ?
                              dataRole.map((item, index) => {
                                return (
                                  <option key={index} value={item.id} >{item.nameRole}</option>
                                )
                              })
                              : null
                            }
                          </select>
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
    add_user: (token, newUser) => {
      dispatch(actAddUserRequest(token, newUser))
    },
    get_user: (token, id) => {
      dispatch(actGetUserRequest(token, id))
    },
    edit_user: (token, id, data) => {
      dispatch(actEditUserRequest(token, id, data))
    }
  }
}
export default connect(null, mapDispatchToProps)(ActionUser)

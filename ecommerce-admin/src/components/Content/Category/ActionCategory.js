import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { actAddCategoryRequest, actGetCategoryRequest, actEditCategoryRequest } from '../../../redux/actions/category';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
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
class ActionCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      name: '',
      desc: '',
      image: '',
      redirectToCategory: false,
      img: null,
      loading: false
    };
    id = this.props.id
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    if (id) {
      const res = await callApi(`categories/${id}`, 'GET', null, token);
      this.setState({
        isActive: res.data.isActive,
        name: res.data.nameCategory,
        desc: res.data.description,
        image: res.data.image,
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
    const { isActive, name, desc } = this.state;
    let { img, image } = this.state;
    this.setState({
      loading: true
    })
    //upload image to firebase
    if (img !== null && img !== image) {
      image = await uploadImage(img);
    }
    const newImage= (image === '') ? null : image
    const newDesc = desc === '' ? null : desc;
    const newName = name === '' ? null : name;
    if (!id) {
      const newCategory = {
        isActive,
        nameCategory: newName,
        description: newDesc,
        image: newImage
      }
      await this.props.add_category(token, newCategory);
      this.setState({
        name: '',
        desc: '',
        loading: false
      })
    } else {
      const editCategory = {
        isActive,
        nameCategory: newName,
        description: newDesc,
        image: newImage
      }
      await this.props.edit_category(token, id, editCategory);
      this.setState({
        loading: false,
        redirectToCategory: true
      })
    }
  }


  render() {
    const { isActive, name, desc, redirectToCategory, loading, image } = this.state;
    if (redirectToCategory) {
      return <Redirect to='/categories'></Redirect>
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
            <h2 className="no-margin-bottom">Forms Category</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Category</li>
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
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)} >
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Name Category</label>
                        <div className="col-sm-9">
                          <input name="name" onChange={this.handleChange} value={name} type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Description</label>
                        <div className="col-sm-9">
                          <input name="desc" onChange={this.handleChange} value={desc} type="text" placeholder="Note" className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label htmlFor="fileInput" className="col-sm-3 form-control-label">Image</label>
                        <div className="col-sm-9">
                        <input type="file" onChange={this.handleChangeImage} className="form-control-file" />
                        <div className="fix-cart">
                          <img src={image || 'http://via.placeholder.com/400x300'} id="output" className="fix-img" alt="avatar" />
                          </div> 
                       </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Active</label>
                        <div className="col-sm-9">
                          <div className="i-checks">
                            <input type="checkbox"
                              onChange={this.handleChange}
                              name="isActive"
                              checked={isActive}
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
    add_category: (token, newCategory) => {
      dispatch(actAddCategoryRequest(token, newCategory))
    },
    get_category: (token, id) => {
      dispatch(actGetCategoryRequest(token, id))
    },
    edit_category: (token, id, data) => {
      dispatch(actEditCategoryRequest(token, id, data))
    }
  }
}
export default connect(null, mapDispatchToProps)(ActionCategory)
import React, { Component } from "react";
import routes from "./routes";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { actTokenRequest, actGetNameRole } from "./redux/actions/auth";
import { connect } from "react-redux";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { actShowLoading } from "./redux/actions/loading";
import callApi from './utils/apiCaller'
import "./style.css";
const override = css`
  display: block;
  margin: 0 auto;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
let token;
class App extends Component {

 async componentDidMount() {
    token = localStorage.getItem("_auth");
    if (token) {
      this.props.add_token_redux(token);
      const res = await callApi('users/me', 'GET', null, token);
      if (res && res.status === 200) {
      this.props.add_token_redux_role(res.data.results[0].role.nameRole);
    }
    }
  }

  render() {
    const { auth, loading } = this.props;
      return (
        <Router>
          { auth ?
          <React.Fragment>
          { !loading ? (
            <div>
              <div className="sweet-loading">
                <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={35}
                  color={"#796aeebd"}
                  loading={loading}
                />
              </div>
              <Header></Header>
              <div className="page-content d-flex align-items-stretch">
                <NavBar token={token}></NavBar>
                {this.showContentMenus(routes)}
              </div>
            </div>
          ) : (
            <div className="hidden-loading">
              <div className="sweet-loading">
                <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={35}
                  color={"#796aeebd"}
                  loading={loading}
                />
              </div>
              <Header></Header>
              <div className="page-content d-flex align-items-stretch">
                <NavBar token={token}></NavBar>
                {this.showContentMenus(routes)}
              </div>
            </div>
          )}
          </React.Fragment>
         
         :
          <LoginPage></LoginPage>
        } 
        </Router>
      );
  }

  showContentMenus = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.main} />;
      });
    }
    return <Switch>{result}</Switch>;
  };
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_token_redux: token => {
      dispatch(actTokenRequest(token));
    },
    add_token_redux_role: token => {
      dispatch(actGetNameRole(token));
    },
    statusLoading: () => {
      dispatch(actShowLoading());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

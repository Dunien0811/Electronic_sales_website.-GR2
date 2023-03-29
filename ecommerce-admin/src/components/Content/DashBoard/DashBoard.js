import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { actFetchDashboardRequest } from '../../../redux/actions/dashboard'
import { connect } from 'react-redux'
import { Line, HorizontalBar, Pie } from 'react-chartjs-2';
import './style.css'
import callApi from '../../../utils/apiCaller';
import { actTokenRequest } from "../../../redux/actions/auth";
let token;
class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
      January1: 0,
      February1: 0,
      March1: 0,
      April1: 0,
      May1: 0,
      June1: 0,
      July1: 0,
      August1: 0,
      September1: 0,
      October1: 0,
      November1: 0,
      December1: 0,
      labelsPie: [],
      dataShowPie: []
      
    }
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    if (token) {
      this.props.fetch_dashboard(token);
      const category =  callApi('reports/products', 'GET', null, token);
      const income =  callApi('reports/income', 'GET', null, token);
      const contact =  callApi('reports/contacts', 'GET', null, token);
      const [resCategory, resIncome, resContact ] = await Promise.all([category, income, contact]);
      if (resIncome) {
        resIncome.data.forEach((item) => {
          if (item.month === "01") {
            this.setState({
              January: item.total
            })
          }
          if (item.month === "02") {
            this.setState({
              February: item.total
            })
          }
          if (item.month === "03") {
            this.setState({
              March: item.total
            })
          }
          if (item.month === "04") {
            this.setState({
              April: item.total
            })
          }
          if (item.month === "05") {
            this.setState({
              May: item.total
            })
          }
          if (item.month === "06") {
            this.setState({
              June: item.total
            })
          }
          if (item.month === "07") {
            this.setState({
              July: item.total
            })
          }
          if (item.month === "08") {
            this.setState({
              August: item.total
            })
          }
          if (item.month === "09") {
            this.setState({
              September: item.total
            })
          }
          if (item.month === "10") {
            this.setState({
              October: item.total
            })
          }
          if (item.month === "11") {
            this.setState({
              November: item.total
            })
          }
          if (item.month === "12") {
            this.setState({
              December: item.total
            })
          }
        })
      }
      if (resContact) {
        resContact.data.forEach((item) => {
          if (item.month === "01") {
            this.setState({
              January1: item.count
            })
          }
          if (item.month === "02") {
            this.setState({
              February1: item.count
            })
          }
          if (item.month === "03") {
            this.setState({
              March1: item.count
            })
          }
          if (item.month === "04") {
            this.setState({
              April1: item.count
            })
          }
          if (item.month === "05") {
            this.setState({
              May1: item.count
            })
          }
          if (item.month === "06") {
            this.setState({
              June1: item.count
            })
          }
          if (item.month === "07") {
            this.setState({
              July1: item.count
            })
          }
          if (item.month === "08") {
            this.setState({
              August1: item.count
            })
          }
          if (item.month === "09") {
            this.setState({
              September1: item.count
            })
          }
          if (item.month === "10") {
            this.setState({
              October1: item.count
            })
          }
          if (item.month === "11") {
            this.setState({
              November1: item.count
            })
          }
          if (item.month === "12") {
            this.setState({
              December1: item.count
            })
          }
        })
      }
      if (resCategory) {
        this.setState({
          labelsPie: resCategory.data.map(e => e.nameCategory),
          dataShowPie: resCategory.data.map(e => e.count)
        })
      }
    } else {
      this.props.add_token_redux(null);
    }
  }

  render() {
    const { January, February, March, April, May, June, July, August, September, October, November, December,
      January1, February1, March1, April1, May1, June1, July1, August1, September1, October1, November1, December1, labelsPie, dataShowPie
    } = this.state
    const dataLine = {  
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Count contact',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [January1, February1, March1, April1, May1, June1, July1, August1, September1, October1, November1, December1]
        }
      ]
    };
    const dataHozi = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'ORDER',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [January, February, March, April, May, June, July, August, September, October, November, December]
        }
      ]
    };
    const dataPie = {
      labels: labelsPie,
      datasets: [{
        data: dataShowPie,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#b42b2b',
          '#6aea5a',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#b42b2b',
          '#6aea5a',
        ]
      }]
    };
    const { dashboard } = this.props
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Dashboard</h2>
          </div>
        </header>
        {/* Dashboard Counts Section*/}
        <section className="dashboard-counts no-padding-bottom">
          <div className="container-fluid">
            <div className="row bg-white has-shadow">
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-violet"><i className="icon-user" /></div>
                  <div className="title"><span>New<br />Clients</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-violet fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.customerCount}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-red"><i className="icon-padnote" /></div>
                  <div className="title"><span>Work<br />Orders</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-red fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.orderCount}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-green"><i className="icon-bill" /></div>
                  <div className="title"><span>New<br />Products</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-green fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.productCount}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-3 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-orange"><i className="icon-check" /></div>
                  <div className="title"><span>Amount<br />Income</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-orange fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>${dashboard.income}</strong></div>
                </div>
              </div>
            </div>
            <h3 style={{paddingTop: 20}}>Report Product of Catefory</h3>
            <Pie 
              width={100}
              height={25} data={dataPie} />
            <br />
            <br />
            <h3>Report Total Income</h3>
            <HorizontalBar 
            width={100}
            height={30} data={dataHozi} />
             <br />
             <br />
             <h3>Report Contact</h3>
             <Line  width={100}
            height={15}
              data={dataLine} />
          </div>
        </section>
        <MyFooter></MyFooter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetch_dashboard: (token) => {
      dispatch(actFetchDashboardRequest(token))
    },
    add_token_redux: token => {
      dispatch(actTokenRequest(token));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)

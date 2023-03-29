import axios from 'axios';
import * as Config from '../constants/Config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
toast.configure()

export default async function callApi(endpoint, method = 'GET', body, token) {
  try {
    let data;
    if (token !== undefined || token !== null || token !== '') {
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        headers: { Authorization: `Bearer ${token}` },
        data: body
      });
      return data;
    } else {
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
      });
      return data;
    }
  }
  catch (err) {
    if (err.response && err.response.data) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`
      })
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Can not connect to server!'
      })
    }
  }
}
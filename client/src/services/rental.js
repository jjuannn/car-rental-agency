import axios from 'axios';
import apiToEntity from '../mappers/rental';
// Backend running at port 8080 by default.
// Change this if you modify that.
const BASE_URL = 'http://localhost:8080';

const AXIOS_REQ = axios.create({
  baseURL: BASE_URL
});

export function getRentals() {
  return AXIOS_REQ.get('/rental/all')
    .then(res => {
      return res.data.map(rental => {
        return apiToEntity(rental);
      });
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function addRental(data) {
  return axios({
    method: 'POST',
    data,
    url: `${BASE_URL}/rental/new`,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function deleteRental(id) {
  return AXIOS_REQ.get(`/rental/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err.response.data.err);
    });
}

export function editRental(id, data) {
  return axios({
    method: 'POST',
    data,
    url: `${BASE_URL}/rental/edit?id=${id}`,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

import axios from 'axios';
import {apiToEntity} from '../mappers/car';

// Backend running at port 8080 by default.
// Change this if you modify that.
const BASE_URL = 'http://localhost:8080';

const AXIOS_REQ = axios.create({
  baseURL: BASE_URL
});

export function getCars() {
  return AXIOS_REQ.get('/car/all')
    .then(res => {
      return res.data.map(car => {
        return apiToEntity(car);
      });
    })
    .then(rjson => {
      return rjson;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function addCar(data) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/car/new`,
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function deleteCar(id) {
  return AXIOS_REQ.get(`/car/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function editCar(id, data) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/car/edit?id=${id}`,
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

import axios from 'axios';
import apiToEntity from '../mappers/client';
// Backend running at port 8080 by default.
// Change this if you modify that.
const BASE_URL = 'http://localhost:8080';

const AXIOS_REQ = axios.create({
  baseURL: BASE_URL
});

export function getClients() {
  return AXIOS_REQ.get('/client/all')
    .then(res => {
      return res.data.map(client => {
        return apiToEntity(client);
      });
    })
    .then(rjson => {
      return rjson;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function deleteClient(id) {
  return AXIOS_REQ.get(`/client/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function addClient(data) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/client/new`,
    data,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function editClient(id, data) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/client/edit?id=${id}`,
    data,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

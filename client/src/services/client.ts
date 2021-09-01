import axios from 'axios';
import Client from '../entities/client';
import apiToEntity from '../mappers/client';
// Backend running at port 8080 by default.
// Change this if you modify that.
const BASE_URL = 'http://localhost:8080';

const AXIOS_REQ = axios.create({
  baseURL: BASE_URL
});

export function getClients(): Promise<Client[] | Error> {
  return AXIOS_REQ.get('/client/all')
    .then(res => {
      return res.data.map((client: Client) => {
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

export function deleteClient(id: string): Promise<{success: true} | Error> {
  return AXIOS_REQ.get(`/client/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function addClient(data: object): Promise<Client | Error> {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/client/new`,
    data,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function editClient(id: string, data: FormData): Promise<Client | Error> {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/client/edit?id=${id}`,
    data,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

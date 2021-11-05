import axios from 'axios';
import Rental from '../entities/rental';
import apiToEntity from '../mappers/rental';
import AXIOS_REQ, {BASE_URL} from './_index';

export function getRentals(): Promise<Rental[] | Error> {
  return AXIOS_REQ.get('/rental/all')
    .then(res => {
      return res.data.map((rental: Rental) => {
        return apiToEntity(rental);
      });
    })
    .catch(err => {
      throw new Error('Failed while fetching rentals');
    });
}

export function addRental(data: FormData): Promise<Rental | Error> {
  return axios({
    method: 'POST',
    data,
    url: `${BASE_URL}/rental/new`,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function deleteRental(id: string): Promise<{success: true} | Error> {
  return AXIOS_REQ.get(`/rental/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err.response.data.err);
    });
}

export function editRental(id: string, data: FormData): Promise<Rental | Error> {
  return axios({
    method: 'POST',
    data,
    url: `${BASE_URL}/rental/edit?id=${id}`,
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

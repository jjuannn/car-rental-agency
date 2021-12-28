import axios from 'axios';
import Car from '../entities/car';
import {apiToEntity} from '../mappers/car';
import AXIOS_REQ, {BASE_URL} from './_index';

export function getCars(): Promise<Car[] | Error> {
  return AXIOS_REQ.get('/car/all')
    .then(res => {
      return res.data.map((car: Car) => {
        return apiToEntity(car);
      });
    })
    .then((rjson: Car[]) => {
      return rjson;
    })
    .catch(err => {
      throw new Error('Failed while fetching cars');
    });
}

export function addCar(data: FormData): Promise<Car | Error> {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/car/new`,
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function deleteCar(id: string): Promise<{success: true} | Error> {
  return AXIOS_REQ.get(`/car/delete?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

export function editCar(id: string, data: FormData): Promise<Car | Error> {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/car/edit?id=${id}`,
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
    .then(res => {
      return apiToEntity(res.data);
    })
    .catch(err => {
      throw new Error(err.response.data.err);
    });
}

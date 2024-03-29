import axios, {AxiosInstance} from 'axios';

const isProduction: boolean = process.env.NODE_ENV === 'production';

// Local backend will run at port 8080 by default
// Change this if you modify that
export const BASE_URL = isProduction
  ? 'https://car-rental-agency-j.herokuapp.com'
  : 'http://localhost:8080';

const AXIOS_REQ: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

export default AXIOS_REQ;

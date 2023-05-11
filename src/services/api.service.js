import Axios from 'axios';

class ApiRequestService {
  constructor() {
    this.baseURL = 'https://pokeapi.co/api/v2';
    this.axiosService = Axios.create({
      baseURL: this.baseURL,
    });
  }

  getApi(path, params = {}) {
    return new Promise((resolve, reject) => {
      this.axiosService
        .get(path, {
          params,
        })
        .then(res => {
          resolve({
            status: res.status === 200,
            statusText: res.statusText,
            data: res.data,
          });
        })
        .catch(error => {
          reject({
            message: error?.response?.data?.error,
            status: false,
            statusText: 'Error',
          });
        });
    });
  }
}

export default new ApiRequestService();

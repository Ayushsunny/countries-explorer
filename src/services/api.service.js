// import axios from 'axios'

// const apiClient = axios.create({
//   baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
//   headers: {
//     'X-RapidAPI-Key': '8f5d1de56emsha50d58d4a66131bp129d28jsn8b6e15c6b65a',
//     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//   }
// })

// export default {
//   getCities(page = 1, limit = 10, region = '') {
//     let url = `/cities?limit=${limit}&offset=${(page - 1) * limit}`
//     if (region) {
//       url += `&region=${region}`
//     }
//     return apiClient.get(url)
//   },
//   getNearby(cityId) {
//     return apiClient.get(`/cities/${cityId}/nearbyCities`)
//   }
// }

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Key': '8f5d1de56emsha50d58d4a66131bp129d28jsn8b6e15c6b65a',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});

export default {
  getCities(page = 1, limit = 10, region = '') {
    let url = `/cities?limit=${limit}&offset=${(page - 1) * limit}`;
    if (region) {
      url += `&region=${region}`;
    }
    return apiClient.get(url);
  },
  getNearby(cityId) {
    return apiClient.get(`/cities/${cityId}/nearbyCities`);
  },
};


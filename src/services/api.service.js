// src/services/api.service.js

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
      url += `&namePrefix=${region}`;
    }
    return apiClient.get(url)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          throw new Error('No cities found for the specified region.'); 
        } else {
          throw new Error('An error occurred while fetching cities. Please try again later.'); 
        }
      });
  },
  getNearby(cityId) {
    return apiClient.get(`/cities/${cityId}/nearbyCities`)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          throw new Error(`No nearby cities found for city ID: ${cityId}`); 
        } else {
          throw new Error('An error occurred while fetching nearby cities. Please try again later.'); 
        }
      });
  },
};
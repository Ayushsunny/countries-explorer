import apiService from '@/services/api.service';

const PAGE_LIMIT = 10;

export default {
  namespaced: true,
  state: {
    cities: [],
    totalPages: 0,
    currentPage: 1,
    error: null // Add an error state
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchCities({ commit }, { page, region }) {
      try {
        const response = await apiService.getCities(page, PAGE_LIMIT, region);
        if (response.error) { // Check for an error object
          commit('SET_ERROR', response.error); 
          return; // Exit early if there's an error
        }
        const cities = response.data.data;
        const totalCount = response.data.metadata.totalCount;
        const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

        commit('SET_CITIES', cities);
        commit('SET_TOTAL_PAGES', totalPages);
        commit('SET_CURRENT_PAGE', page);
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error('Error fetching cities:', error);
      }
    },
    async fetchNearby(_, cityId) {
      try {
        const response = await apiService.getNearby(cityId);
        if (response.error) { // Check for an error object
          return { error: response.error }; 
        }
        return response.data.data;
      } catch (error) {
        console.error('Error fetching nearby cities:', error);
        return { error: error.message }; 
      }
    },
  },
};
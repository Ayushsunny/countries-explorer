import apiService from '@/services/api.service';

const PAGE_LIMIT = 10; 

export default {
  namespaced: true,
  state: {
    cities: [],
    totalPages: 0,
    currentPage: 1,
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
  },
  actions: {
    async fetchCities({ commit }, { page }) {
      try {
        const response = await apiService.getCities(page, PAGE_LIMIT);
        const cities = response.data.data;
        const totalCount = response.data.metadata.totalCount;
        const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

        commit('SET_CITIES', cities);
        commit('SET_TOTAL_PAGES', totalPages);
        commit('SET_CURRENT_PAGE', page);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    async fetchNearby(_, cityId) {
      try {
        const response = await apiService.getNearby(cityId);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching nearby cities:', error);
      }
    },
  },
};

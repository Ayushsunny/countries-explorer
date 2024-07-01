<template>
  <div class="home">
    <div class="controls">
      <div class="view-toggle">
        <button @click="toggleView('grid')" :class="{ active: view === 'grid' }">Grid</button>
        <button @click="toggleView('cards')" :class="{ active: view === 'cards' }">Cards</button>
      </div>
      <div class="search">
        <input type="text" placeholder="Search by region" v-model="searchRegion" @input="searchCities" />
      </div>
    </div>
    <div class="content">
      <CityGrid v-if="view === 'grid'" :cities="filteredCities" @select-city="showNearbyModal" />
      <CityCard v-else-if="view === 'cards'" :cities="filteredCities" @select-city="showNearbyModal" />
      <PaginationComponent :total-pages="totalPages" :current-page="currentPage" @page-change="handlePageChange" />
    </div>
    <NearbyModal v-if="selectedCity" :city="selectedCity" :nearby-cities="nearbyCities" @close="closeModal" />
  </div>
</template>

<script>
import CityGrid from '@/components/CityGrid.vue';
import CityCard from '@/components/CityCard.vue';
import NearbyModal from '@/components/NearbyModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    CityGrid,
    CityCard,
    NearbyModal,
    PaginationComponent,
  },
  data() {
    return {
      view: 'grid',
      searchRegion: '',
      selectedCity: null,
      nearbyCities: [],
    };
  },
  computed: {
    ...mapState('cities', ['cities', 'totalPages', 'currentPage']),
    filteredCities() {
      return this.cities.filter(city => city.region.toLowerCase().includes(this.searchRegion.toLowerCase()));
    },
  },
  created() {
    this.fetchCities({ page: 1, region: this.searchRegion });
  },
  methods: {
    ...mapActions('cities', ['fetchCities', 'fetchNearby']),
    toggleView(view) {
      this.view = view;
    },
    handlePageChange(page) {
      this.fetchCities({ page, region: this.searchRegion });
    },
    searchCities() {
    this.fetchCities({ page: 1, region: this.searchRegion });
  },
    async showNearbyModal(city) {
      this.selectedCity = city;
      this.nearbyCities = await this.fetchNearby(city.id);
    },
    closeModal() {
      this.selectedCity = null;
      this.nearbyCities = [];
    },
  },
};
</script>

<style>
.home {
  text-align: left;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.view-toggle button.active {
  font-weight: bold;
}

.content {
  margin-top: 20px;
}
</style>

<template>
  <div class="home">
    <nav class="navbar">
      <div class="navbar-brand">
        <i class="fas fa-globe-americas"></i>
        <h1>Countries Explorer</h1>
      </div>
      <div class="navbar-menu">
        <div class="view-toggle">
          <button @click="toggleView('grid')" :class="{ active: view === 'grid' }">
            <i class="fas fa-th-large"></i> Grid
          </button>
          <button @click="toggleView('cards')" :class="{ active: view === 'cards' }">
            <i class="fas fa-th"></i> Cards
          </button>
        </div>
        <div class="search">
          <input 
            type="text" 
            placeholder="Search by region" 
            v-model="searchRegion" 
            @input="searchCities"
          >
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>
    </nav>
    <main class="content">
      <CityGrid v-if="view === 'grid'" :cities="cities" @select-city="showNearbyModal" />
      <CityCard v-else-if="view === 'cards'" :cities="cities" @select-city="showNearbyModal" />
      <PaginationComponent 
        :total-pages="totalPages" 
        :current-page="currentPage" 
        @page-change="handlePageChange" 
      />
    </main>
    <NearbyModal 
      v-if="selectedCity" 
      :city="selectedCity" 
      :nearby-cities="nearbyCities" 
      @close="closeModal" 
    />
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

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-top: 10px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand i {
  font-size: 1.8rem;
  margin-right: 0.5rem;
  color: #3498db;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.view-toggle {
  margin-right: 1rem;
}

.view-toggle button {
  background-color: transparent;
  border: 1px solid #3498db;
  color: #3498db;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
}

.view-toggle button:hover,
.view-toggle button.active {
  background-color: #3498db;
  color: white;
}

.search {
  position: relative;
}

.search input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.search input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search input:focus {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
}

.content {
  padding: 2rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-brand {
    margin-bottom: 1rem;
  }

  .navbar-menu {
    flex-direction: column;
    width: 100%;
  }

  .view-toggle {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 100%;
  }

  .view-toggle button {
    width: 50%;
  }

  .search {
    width: 100%;
  }

  .search input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
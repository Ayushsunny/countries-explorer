<!-- src/components/CityCard.vue -->
<template>
  <div class="city-cards">
    <div class="city-card" v-for="city in cities" :key="city.id">
      <div class="card-header">
        <h3>{{ city.name }}</h3>
        <span class="country-badge">{{ city.country }}</span>
      </div>
      <div class="card-body">
        <p><i class="fas fa-map-marker-alt"></i> {{ city.region }}</p>
        <p><i class="fas fa-globe"></i> {{ formatCoordinate(city.latitude) }}, {{ formatCoordinate(city.longitude) }}</p>
        <p><i class="fas fa-users"></i> {{ formatPopulation(city.population) }}</p>
      </div>
      <button @click="selectCity(city)" class="btn-details">
        <i class="fas fa-info-circle"></i> View Details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectCity(city) {
      this.$emit('select-city', city);
    },
    formatPopulation(population) {
      return new Intl.NumberFormat().format(population);
    },
    formatCoordinate(coordinate) {
      return coordinate.toFixed(4);
    },
  },
};
</script>

<style scoped>
.city-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}

.city-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  background-color: #3498db;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.4rem;
}

.country-badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.card-body {
  padding: 16px;
  flex-grow: 1;
}

.card-body p {
  margin: 8px 0;
  color: #34495e;
}

.card-body i {
  width: 20px;
  color: #3498db;
  margin-right: 8px;
}

.btn-details {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.btn-details:hover {
  background-color: #27ae60;
}

@media (max-width: 1200px) {
  .city-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .city-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .city-cards {
    grid-template-columns: 1fr;
  }
}
</style>
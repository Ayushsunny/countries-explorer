<!-- src/components/CityGrid.vue -->
<template>
  <div class="city-grid">
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Region</th>
          <th>Coordinates</th>
          <th>Population</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td>
            <strong>{{ city.name }}</strong>
          </td>
          <td>
            <span class="country-badge">{{ city.country }}</span>
          </td>
          <td>{{ city.region }}</td>
          <td>
            <span class="coordinates">
              <i class="fas fa-map-marker-alt"></i>
              {{ formatCoordinate(city.latitude) }}, {{ formatCoordinate(city.longitude) }}
            </span>
          </td>
          <td>
            <span class="population">
              <i class="fas fa-users"></i>
              {{ formatPopulation(city.population) }}
            </span>
          </td>
          <td>
            <button @click="selectCity(city)" class="btn-details">
              <i class="fas fa-info-circle"></i> Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CityGrid',
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
.city-grid {
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #3498db;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}

tr:hover {
  background-color: #f5f5f5;
}

.country-badge {
  background-color: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.coordinates, .population {
  display: flex;
  align-items: center;
}

.coordinates i, .population i {
  margin-right: 8px;
  color: #3498db;
}

.btn-details {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.btn-details:hover {
  background-color: #27ae60;
}

@media (max-width: 768px) {
  th, td {
    padding: 12px 8px;
  }
  
  .btn-details {
    padding: 6px 12px;
  }
}
</style>
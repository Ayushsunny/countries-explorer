<template>
  <div class="city-grid">
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Region</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id" @click="selectCity(city)">
          <td>{{ city.name }}</td>
          <td>{{ city.country }}</td>
          <td>{{ city.region }}</td>
          <td>{{ city.latitude }}</td>
          <td>{{ city.longitude }}</td>
          <td>{{ city.population }}</td>
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
  },
};
</script>

<style>
.city-grid {
  width: 100%;
  border-collapse: collapse;
}

.city-grid th,
.city-grid td {
  border: 1px solid #ddd;
  padding: 8px;
}

.city-grid tr:hover {
  background-color: #f1f1f1;
}

.city-grid th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>

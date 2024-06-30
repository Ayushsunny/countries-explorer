<template>
  <div class="city-cards">
    <div class="city-card" v-for="city in cities" :key="city.id" @click="selectCity(city)">
      <h3>{{ city.name }}</h3>
      <p>{{ city.country }}</p>
      <p>{{ city.region }}</p>
      <p>Latitude: {{ city.latitude }}</p>
      <p>Longitude: {{ city.longitude }}</p>
      <p>Population: {{ city.population }}</p>
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
  },
};
</script>

<style>
.city-cards {
  display: flex;
  flex-wrap: wrap;
}

.city-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
  width: calc(33.3333% - 16px);
  box-sizing: border-box;
}

.city-card:hover {
  background-color: #f1f1f1;
}
</style>

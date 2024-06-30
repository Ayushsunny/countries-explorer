<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Nearby Cities for {{ city.name }}</h2>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Region</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nearby in nearbyCities" :key="nearby.id">
            <td>{{ nearby.name }}</td>
            <td>{{ nearby.region }}</td>
            <td>{{ nearby.distance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NearbyModal',
  props: {
    city: {
      type: Object,
      required: true,
    },
    nearbyCities: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
</style>

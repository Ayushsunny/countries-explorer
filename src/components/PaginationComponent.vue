
### 7. `src/components/PaginationComponent.vue`

```vue
<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-change', page);
      }
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}
</style>

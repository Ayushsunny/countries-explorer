<!-- src/components/PaginationComponent.vue -->
<template>
  <div class="pagination">
    <button @click="changePage(1)" :disabled="currentPage === 1" class="btn-page">First</button>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn-page">Prev</button>
    <div class="page-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="changePage(page)"
        :class="['btn-page', { active: currentPage === page }]"
      >
        {{ page }}
      </button>
    </div>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn-page">Next</button>
    <button @click="changePage(totalPages)" :disabled="currentPage === totalPages" class="btn-page">Last</button>
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
  computed: {
    visiblePages() {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      range.push(1);

      if (this.totalPages <= 1) {
        return range;
      }

      for (let i = this.currentPage - delta; i <= this.currentPage + delta; i++) {
        if (i < this.totalPages && i > 1) {
          range.push(i);
        }
      }
      range.push(this.totalPages);

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
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

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.page-numbers {
  display: flex;
  margin: 0 10px;
}

.btn-page {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #007bff;
  padding: 6px 12px;
  margin: 0 2px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-page:hover:not(:disabled) {
  background-color: #e9ecef;
}

.btn-page.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
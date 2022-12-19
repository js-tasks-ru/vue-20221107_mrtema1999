<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
    <slot v-for="item in pageItems" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      const startIndex = (this.page - 1) * this.perPage;
      const lastIndex = this.page * this.perPage;

      return this.items.slice(startIndex, lastIndex);
    },
  },
};
</script>

<style></style>

<template>
  <button @click="addOne">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newValue) {
      this.localCount = newValue;
    },
  },

  methods: {
    addOne() {
      this.localCount += 1;
      this.$emit('update:count', this.localCount);
    },
  },
};
</script>

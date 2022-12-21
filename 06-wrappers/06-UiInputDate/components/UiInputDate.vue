<template>
  <ui-input :model-value="formatted" :type="type" v-bind="$attrs" @change="update">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },

    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      formatted: null,
    };
  },

  watch: {
    modelValue: {
      immediate: true,
      handler() {
        if (!this.modelValue) {
          this.formatted = '';
        } else {
          const date = new Date(this.modelValue).toJSON();

          this.formatted = this.formatType[this.type](date);
        }
      },
    },
  },

  beforeCreate() {
    this.formatType = {
      date: (date) => date.split('T').at(0),
      time: (date) => date.split('T').at(1).substring(0, 5),
      'datetime-local': (date) => date.substring(0, 16),
    };
  },

  methods: {
    update(event) {
      const value = event.target.valueAsNumber;

      this.$emit('update:modelValue', isNaN(value) ? null : value);
    },
  },
};
</script>

<template>
  <div class="toast" :class="toastStyle">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <p>{{ toastMessage }}</p>
    <button class="btn" type="button" @click="$emit('closeTost', toastID)">X</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    toastID: {
      type: Number,
    },
    toastData: {
      type: Object,
    },
  },

  emits: ['closeTost'],

  computed: {
    toastStyle() {
      const { style } = this.toastData;

      return `toast_${style}`;
    },
    toastIcon() {
      const { icon } = this.toastData;

      return `${icon}-circle`;
    },
    toastMessage() {
      const { message } = this.toastData;

      return message;
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.btn {
  margin-left: 20px;

  border-style: none;
  cursor: pointer;

  font-size: 16px;
  font-weight: bold;

  background-color: white;
  color: blue;
}
</style>

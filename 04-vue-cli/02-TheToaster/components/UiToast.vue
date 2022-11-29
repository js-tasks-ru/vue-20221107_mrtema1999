<template>
  <div class="toast" :class="`toast_${type}`">
    <ui-icon class="toast__icon" :icon="`${icon}-circle`" />
    <p>{{ message }}</p>
    <button class="btn" type="button" @click="$emit('close')">X</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    message: {
      type: String,
    },

    type: {
      type: String,
    },

    icon: {
      type: String,
    },
  },

  emits: ['close'],
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

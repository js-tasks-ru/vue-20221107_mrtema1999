<template>
  <ui-toasts>
    <template v-for="[toastID, toastData] in toasts" :key="toastID">
      <ui-toast :toastID="toastID" :toastData="toastData" @closeTost="closeTost" />
    </template>
  </ui-toasts>
</template>

<script>
import UiToast from './UiToast.vue';
import UiToasts from './UiToasts.vue';

export default {
  name: 'TheToaster',

  components: { UiToast, UiToasts },

  data() {
    return {
      toasts: new Map(),
    };
  },

  methods: {
    success(message) {
      const data = {
        message,
        style: 'success',
        icon: 'check',
        showTime: 5000,
      };

      this.showTost(data);
    },

    error(message) {
      const data = {
        message,
        style: 'error',
        icon: 'alert',
        showTime: 5000,
      };

      this.showTost(data);
    },

    showTost(data) {
      const tostID = setTimeout(() => {
        this.closeTost(tostID);
      }, data.showTime);

      this.toasts.set(tostID, data);
    },

    closeTost(tostID) {
      this.toasts.delete(tostID);
      clearTimeout(tostID);
    },
  },
};
</script>

<style>
</style>

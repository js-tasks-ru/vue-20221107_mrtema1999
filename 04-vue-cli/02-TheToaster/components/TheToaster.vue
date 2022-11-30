<template>
  <ui-toasts>
    <ui-toast
      v-for="[id, { message, type, icon }] in toasts"
      :key="id"
      :message="message"
      :type="type"
      :icon="icon"
      @close="close(id)"
    />
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
        type: 'success',
        icon: 'check',
        showTime: 5000,
      };

      this.show(data);
    },

    error(message) {
      const data = {
        message,
        type: 'error',
        icon: 'alert',
        showTime: 5000,
      };

      this.show(data);
    },

    show(data) {
      const id = setTimeout(() => {
        this.close(id);
      }, data.showTime);

      this.toasts.set(id, data);
    },

    close(id) {
      this.toasts.delete(id);
      clearTimeout(id);
    },
  },
};
</script>

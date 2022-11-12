import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    add() {
      this.counter += 1;
    },
  },
});

createApp(App).mount('#app');

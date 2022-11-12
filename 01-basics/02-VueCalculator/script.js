import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      operand1: 0,
      operand2: 0,
      operator: 'sum',
    };
  },

  computed: {
    computedResult() {
      const operations = {
        sum: (() => this.operand1 + this.operand2)(),
        subtract: (() => this.operand1 - this.operand2)(),
        multiply: (() => this.operand1 * this.operand2)(),
        divide: (() => {
          if (this.operand2 === 0) {
            return 'На 0 делить нельзя';
          }

          return this.operand1 / this.operand2;
        })(),
      };

      if (this.operand1 === '' || this.operand2 === '') {
        return 'Пустые поля';
      }

      return operations[this.operator];
    },
  },
});

createApp(App).mount('#app');

import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const url = 'https://jsonplaceholder.typicode.com/comments';
const fetchEmails = () => fetch(url).then((data) => data.json());

const App = defineComponent({
  name: 'App',

  data() {
    return {
      emails: null,
      filterValue: '',
    };
  },

  computed: {
    filteredEmails() {
      const isMarked = (value) => {
        if (!this.filterValue.length) {
          return false;
        }

        return value.toLowerCase().includes(this.filterValue.toLowerCase());
      };

      return this.emails.map((email) => [email, isMarked(email)]);
    },
  },

  created() {
    fetchEmails().then((data) => {
      this.emails = data.map(({ email }) => email);
    });
  },
});

createApp(App).mount('#app');

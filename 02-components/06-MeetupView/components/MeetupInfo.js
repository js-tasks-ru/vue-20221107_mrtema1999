import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
    date: {
      type: Number,
      require: true,
    },
  },

  computed: {
    isoDate() {
      return new Date(this.date).toISOString().split('T')[0];
    },

    localeDate() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="isoDate">{{ localeDate }}</time>
      </li>
    </ul>`,
});

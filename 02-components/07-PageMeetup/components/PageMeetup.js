import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      meetup: null,
      loading: true,
      errored: false,
      errorMessage: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.loading = true;
        this.errored = false;
        this.errorMessage = null;
        this.meetup = null;

        fetchMeetupById(this.meetupId)
          .then((meetup) => (this.meetup = meetup))
          .catch((error) => {
            this.errored = true;
            this.errorMessage = error.message;
          })
          .finally(() => (this.loading = false));
      },
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="errored">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>

      <MeetupView v-if="!loading && !errored" :meetup = meetup />
    </div>`,
});

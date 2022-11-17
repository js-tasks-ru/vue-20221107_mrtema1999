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
      options: {
        state: null,
        errorMessage: null,
      },
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.options.state = 'loading';

        fetchMeetupById(this.meetupId)
          .then((meetup) => {
            this.options.state = 'loaded';
            this.meetup = meetup;
          })
          .catch((error) => {
            this.options.state = 'failed';
            this.options.errorMessage = error.message;
          });
      },
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="options.state === 'loading'">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="options.state === 'failed'">
        <UiAlert>{{ options.errorMessage }}</UiAlert>
      </UiContainer>

      <MeetupView v-if="options.state === 'loaded'" :meetup = meetup />
    </div>`,
});

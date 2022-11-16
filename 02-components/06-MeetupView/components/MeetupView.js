import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgenda from './MeetupAgenda.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import _ from 'lodash';

export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda,
    UiAlert,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      require: true,
    },
  },

  computed: {
    isNotEmptyAgenda() {
      return !_.isEmpty(this.meetup.agenda);
    },
  },

  template: `
    <div>
      <MeetupCover :title="meetup.title" :image="meetup.image" />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />
            <h3>Программа</h3>
            <MeetupAgenda v-if="isNotEmptyAgenda" :agenda="meetup.agenda" />
            <ui-alert v-else>Программа пока пуста...</ui-alert>
          </div>
          <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});

import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      require: true,
    },
  },

  computed: {
    typeIcon() {
      return agendaItemIcons[this.agendaItem.type];
    },

    isTypeTalk() {
      return this.agendaItem.type === 'talk';
    },

    hasTitle() {
      return this.agendaItem.title !== null;
    },

    title() {
      return this.hasTitle ? this.agendaItem.title : agendaItemDefaultTitles[this.agendaItem.type];
    },

    hasDescription() {
      return this.agendaItem.description !== null;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="\`/assets/icons/icon-\${typeIcon}.svg\`" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if=isTypeTalk class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="hasDescription">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});

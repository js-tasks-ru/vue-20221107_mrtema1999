<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click.prevent="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            v-model="localItem.startsAt"
            type="time"
            placeholder="00:00"
            name="startsAt"
            @change="calculateEndsAt"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input
            v-model="localItem.endsAt"
            type="time"
            placeholder="00:00"
            name="endsAt"
            @change.prevent="calculateInterval"
          />
        </ui-form-group>
      </div>
    </div>

    <template v-for="(data, key) in selectedSchema" :key="key">
      <ui-form-group :label="data.label">
        <component :is="data.component" v-model="localItem[key]" v-bind="data.props" />
      </ui-form-group>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

/**
 * @typedef FormItemSchema
 * @property {string} label
 * @property {string|object} component
 * @property {object} props
 */
/** @typedef {string} AgendaItemField */
/** @typedef {string} AgendaItemType */
/** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

/** @type FormSchema */
const commonAgendaItemFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: 'ui-input',
    props: {
      name: 'title',
    },
  },
};

/** @type {Object.<AgendaItemField, FormSchema>} */
const agendaItemFormSchemas = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    speaker: {
      label: 'Докладчик',
      component: 'ui-input',
      props: {
        name: 'speaker',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
    language: {
      label: 'Язык',
      component: 'ui-dropdown',
      props: {
        options: talkLanguageOptions,
        title: 'Язык',
        name: 'language',
      },
    },
  },
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  other: {
    title: {
      label: 'Заголовок',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
    description: {
      label: 'Описание',
      component: 'ui-input',
      props: {
        multiline: true,
        name: 'description',
      },
    },
  },
};

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemTypeOptions,
  agendaItemFormSchemas,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      localItem: { ...this.agendaItem },
      interval: null,
    };
  },

  computed: {
    selectedSchema() {
      return agendaItemFormSchemas[this.localItem.type];
    },
  },

  watch: {
    localItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },
  },

  created() {
    this.calculateInterval();
  },

  methods: {
    calculateEndsAt() {
      const { startsAt } = this.localItem;
      const start = this.parse(startsAt);

      const endsAt = {
        hours: start.hours + this.interval.hours,
        minutes: start.minutes + this.interval.minutes,
      };

      this.localItem.endsAt = this.format(this.normalize(endsAt));
    },

    calculateInterval() {
      const { startsAt, endsAt } = this.localItem;
      const start = this.parse(startsAt);
      const end = this.parse(endsAt);

      this.interval = {
        hours: end.hours - start.hours,
        minutes: end.minutes - start.minutes,
      };
    },

    parse(value) {
      const separator = ':';
      const [hours, minutes] = value.split(separator);

      return {
        hours: +hours,
        minutes: +minutes,
      };
    },

    normalize(value) {
      return {
        hours: value.hours % 24,
        minutes: value.minutes % 60,
      };
    },

    format(value) {
      const { hours, minutes } = value;
      return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}`;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>

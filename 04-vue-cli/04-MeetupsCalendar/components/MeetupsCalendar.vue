<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" @click="updateMonth('previous')" aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ localeDate }}</div>
        <button class="calendar-view__control-right" type="button" @click="updateMonth('next')" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div class="calendar-view__cell" :class="{ 'calendar-view__cell_inactive': !isActive(day) }" v-for="day in intervalDays">
        <div class="calendar-view__cell-day">{{ day.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <a class="calendar-event" v-for="{ id, title } in getMeetups(day)" :href="`/meetups/${id}`">{{ title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  eachDayOfInterval,
  isSameDay,
 } from 'date-fns';

export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      date: new Date(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    localeDate() {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    startCurrentMonth() {
      return startOfMonth(this.date);
    },

    endCurrentMonth() {
      return endOfMonth(this.date);
    },

    startWeek() {
      return startOfWeek(this.startCurrentMonth, { weekStartsOn: 1 });
    },

    endWeek() {
      return endOfWeek(this.endCurrentMonth, { weekStartsOn: 1 });
    },

    intervalDays() {
      return eachDayOfInterval({
        start: this.startWeek,
        end: this.endWeek,
      });
    },
  },

  methods: {
    updateMonth(type) {
      this.date = (type === 'previous')
        ? new Date(subMonths(this.date, 1))
        : new Date(addMonths(this.date, 1));
    },

    isActive(day) {
      return this.date.getMonth() === day.getMonth();
    },

    getMeetups(day) {
      return this.meetups.filter(({ date }) => isSameDay(date, day.getTime()));
    },
  },
};
</script>

<style scoped>
.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>

import { isEmpty } from 'lodash';
import moment from 'moment';
import viLocale from 'moment/locale/vi';

let d = new Date();
window.timezoneOffset = -d.getTimezoneOffset();

const LOCALE = {
  vi: viLocale,
};

export const DATE_ACTIONS = {
  START: 'start',
  END: 'end',
};

export const DATE_TIME_FORMAT = 'MMM DD, YYYY - HH:mm:ss';
export const DATE_TIME_FORMAT_NO_SECOND = 'MMM DD, YYYY - HH:mm:00';

export const DATE_TIME_FORMAT_NO_SECOND_12H = 'MMM DD, YYYY - h:mm:00 A';

export const startTimer = async (duration = 59, display) => {
  if (!display) display = {};
  return new Promise((resolve) => {
    let timer = duration,
      minutes,
      seconds;
    const x = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      if (+minutes) {
        display.textContent = `${minutes} : ${seconds}s`;
      } else {
        display.textContent = `${seconds}s`;
      }

      timer--;

      if (timer < 0) {
        display.textContent = '';
        resolve(true);
        clearInterval(x);
      }
    }, 1000);
  });
};

export const setMomentLocale = (language = 'en') => {
  if (language === 'en') {
    moment.locale(language);
    return;
  }
  moment.updateLocale(language, LOCALE[language]);
};

setMomentLocale(localStorage.getItem('language') || 'en');

export const getTimeLocal = (time = new Date()) => {
  return moment.utc(time).local();
};

export const getTimeFormat = (
  time,
  format = 'DD MMM YYYY - hh:mm:ss',
  timeZoneOffset = window.timezoneOffset
) => {
  return time ? moment(time).utcOffset(timeZoneOffset).format(format) : '';
};

export const parseTimezone = (date, timeZoneOffset = window.timezoneOffset) => {
  if (isEmpty(date)) return undefined;
  return moment(date).utcOffset(timeZoneOffset);
};

export const parseUTC = (
  date,
  action = '',
  segment = 'days',
  timeZoneOffset = window.timezoneOffset
) => {
  if (isEmpty(date)) return undefined;
  let parsedDate = moment(date);
  if (action === DATE_ACTIONS.START) {
    parsedDate.startOf(segment);
  }
  if (action === DATE_ACTIONS.END) {
    parsedDate.endOf(segment);
  }
  return parsedDate.utcOffset(timeZoneOffset).toISOString();
};

export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const getDisabledTime = (form, date, isStart = true) => {
  if (date) {
    const currentDate = moment();
    if (date.isSame(currentDate, 'day')) {
      return {
        disabledHours: isStart
          ? () => range(0, currentDate.hour())
          : () => range(currentDate.hour() + 1, 24),
        disabledMinutes: isStart
          ? () =>
              date.hour() > currentDate.hour()
                ? []
                : range(0, currentDate.minute())
          : () =>
              date.hour() < currentDate.hour()
                ? []
                : range(currentDate.minute() + 1, 60),
      };
    } else {
      if (isStart) {
        const endDate = form.getFieldValue('endDate');
        if (endDate && date.isSame(endDate, 'day')) {
          return {
            disabledHours: () => range(endDate.hour() + 1, 24),
            disabledMinutes: () =>
              date.hour() < endDate.hour()
                ? []
                : range(endDate.minute() + 1, 60),
          };
        }
      }
    }
  }
  return {};
};

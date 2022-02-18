import React from 'react';

import classes from './EventDate.module.css';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EventDate = (props) => {
  const getDatePiecesFromIsoDate = (utcDate) => {
    const empty = '--';
    const localDate = new Date(utcDate);
    return {
      year: localDate.getFullYear() || empty,
      month: MONTHS[localDate.getMonth()] || empty,
      date: localDate.getDate() || empty,
      day: DAYS[localDate.getDay()] || empty,
    };
  };
  const { year, month, date, day } = getDatePiecesFromIsoDate(props.startDate);

  return (
    <div className={classes['event-date']}>
      <div className={classes['event-date__date']}>{day}</div>
      <div className={classes['event-date__day']}>{date}</div>
      <div className={classes['event-date__month']}>{month}</div>
      <div className={classes['event-date__year']}>{year}</div>
    </div>
  );
};

export default EventDate;

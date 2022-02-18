import React from 'react';
import { DateTime } from 'luxon';

import EventDate from './EventDate';
import classes from './EventItem.module.css';

const EventItem = (props) => {
  const displayLocalDate = (isoDate) => {
    const localDate = DateTime.fromISO(isoDate);
    const formattedDate =
      localDate.toLocaleString(DateTime.DATE_FULL) +
      ' ' +
      localDate.toLocaleString(DateTime.TIME_SIMPLE);
    return formattedDate;
  };

  const startDate = displayLocalDate(props.dates.start);
  const endDate = displayLocalDate(props.dates.end);
  return (
    <li>
      <div className={classes['event-item']}>
        <div className={classes['event-item__row']}>
          <EventDate
            className={classes['event-item_date']}
            startDate={props.dates.start}
            endDate={props.dates.end}
          />
          <div className={classes['event-item__description']}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <div className={classes['event-item__dates']}>
              <div className={classes['event-item__date']}>
                <div>Starts:</div>
                <div>{startDate}</div>
              </div>
              <div className={classes['event-item__date']}>
                <div>Ends:</div>
                <div>{endDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

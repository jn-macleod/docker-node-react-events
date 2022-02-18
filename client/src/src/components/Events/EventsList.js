import React from 'react';

import EventItem from './EventItem';
import Card from '../UI/Card';
import classes from './EventsList.module.css';

const EventsList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='events-list__fallback'>Found no events.</h2>;
  }

  return (
    <Card className={classes['events-list_container']}>
      <ul className={classes['events-list']}>
        {props.items.map((event) => (
          <EventItem
            key={event._id}
            name={event.name}
            dates={event.dates}
            description={event.description}
          />
        ))}
      </ul>
    </Card>
  );
};

export default EventsList;

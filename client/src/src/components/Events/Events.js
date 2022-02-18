import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import EventForm from './EventForm';
import EventsList from './EventsList';
import classes from './Events.module.css';

const Events = () => {
  const events = useSelector((state) => state.events.items);

  const [showForm, setShowForm] = useState(false);

  let eventsList = [...events];

  const openAddEventHandler = (event) => {
    setShowForm(true);
  };

  const closeAddEventHandler = (event) => {
    setShowForm(false);
  };

  if (eventsList.length) {
    const sortedEvents = eventsList.sort((a, b) => {
      if (!a.dates || !a.dates.start || !b.dates || !b.dates.start) {
        return false;
      }
      return (
        new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime()
      );
    });
    eventsList = [...sortedEvents];
  }

  return (
    <section className={classes.events}>
      {showForm && <EventForm onClose={closeAddEventHandler} />}
      {!showForm && (
        <div className={classes.toggle}>
          <button onClick={openAddEventHandler}>+ Create</button>
        </div>
      )}
      {!showForm && <EventsList items={eventsList} />}
    </section>
  );
};

export default Events;

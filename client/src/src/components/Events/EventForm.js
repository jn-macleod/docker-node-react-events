import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { updateEvents } from '../../store/events-actions';

import classes from './EventForm.module.css';

const apiHost = process.env.REACT_APP_SERVER || 'http://localhost:3030';
const DATE_FIELDS = {
  year: 0,
  month: 0,
  date: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};

const EventForm = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const enteredNameInputRef = useRef();
  const enteredDescriptionInputRef = useRef();
  const enteredStartDateInputRef = useRef();
  const enteredStartTimeInputRef = useRef();
  const enteredEndDateInputRef = useRef();
  const enteredEndTimeInputRef = useRef();

  const [isStartDateAllDay, setIsStartDateAllDay] = useState(true);
  const [isEndDateAllDay, setIsEndDateAllDay] = useState(true);

  const [isLoading, setIsloading] = useState(false);

  const startDateAllDayChangeHandler = (event) => {
    setIsStartDateAllDay((prevState) => {
      return !prevState;
    });
  };

  const endDateAllDayChangeHandler = (event) => {
    setIsEndDateAllDay((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = enteredNameInputRef.current.value;
    const enteredDescription = enteredDescriptionInputRef.current.value;
    const enteredStartDate = enteredStartDateInputRef.current.value;
    const enteredStartTime = isStartDateAllDay
      ? ''
      : enteredStartTimeInputRef.current.value;
    const enteredEndDate = enteredEndDateInputRef.current.value;
    const enteredEndTime = isEndDateAllDay
      ? ''
      : enteredEndTimeInputRef.current.value;

    //format dates
    const getDateInput = (dateInput, timeInput) => {
      try {
        if (!dateInput.match(/\d{4}-\d{2}-\d{2}/)) {
          throw new Error('Please enter a valid date');
        }
        if (timeInput !== '' && !timeInput.match(/\d{2}:\d{2}/)) {
          throw new Error('Please enter a valid time');
        }
      } catch (error) {
        console.log(error);
        return error;
      }

      const datePieces = dateInput.split('-');
      const timePieces = timeInput.split(':');
      let dateFields = DATE_FIELDS;
      dateFields.year = parseInt(datePieces[0]) || 0;
      dateFields.month = parseInt(datePieces[1]) || 0;
      dateFields.date = parseInt(datePieces[2]) || 0;
      dateFields.hours = parseInt(timePieces[0]) || 0;
      dateFields.minutes = parseInt(timePieces[1]) || 0;
      dateFields.seconds = 0;
      dateFields.milliseconds = 0;
      return dateFields;
    };

    const getUTCDate = (hoursInput, timeInput) => {
      try {
        const dateInput = getDateInput(hoursInput, timeInput);
        const dt = DateTime.local(
          dateInput.year,
          dateInput.month,
          dateInput.date,
          dateInput.hours,
          dateInput.minutes,
          dateInput.seconds,
          dateInput.milliseconds
        );
        const dj = dt.toJSDate();
        return dj.toISOString();
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const utcStartDate = getUTCDate(enteredStartDate, enteredStartTime);
    const utcEndDate = getUTCDate(enteredEndDate, enteredEndTime);

    if (!utcStartDate || !utcEndDate) {
      throw new Error('Error please enter valid dates.');
    }

    setIsloading(true);

    const eventData = {
      name: enteredName,
      description: enteredDescription,
      dates: {
        start: utcStartDate,
        end: utcEndDate,
      },
    };

    const url = apiHost + '/events';
    const bearer = 'Bearer ' + auth.token;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    })
      .then((res) => {
        setIsloading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(updateEvents());
        props.onClose();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>New Event</h1>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input
            ref={enteredNameInputRef}
            id='name'
            type='text'
            maxLength='32'
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <input
            id='description'
            ref={enteredDescriptionInputRef}
            type='text'
            maxLength='500'
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='startDate'>Start Date</label>
          <div>
            <input
              id='startDate'
              ref={enteredStartDateInputRef}
              type='date'
              min='2019-01-01'
              max='2022-12-31'
            />
          </div>
        </div>
        {!isStartDateAllDay && (
          <div className={classes.control}>
            <label htmlFor='startTime'>Start Time</label>
            <input ref={enteredStartTimeInputRef} id='startTime' type='time' />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='isStartDateAllDay'>
            <input
              id='isStartDateAllDay'
              value={isStartDateAllDay}
              type='checkbox'
              onChange={startDateAllDayChangeHandler}
              checked={isStartDateAllDay}
            />
            All day
          </label>
        </div>
        <div className={classes.control}>
          <label htmlFor='endDate'>End Date</label>
          <input
            ref={enteredEndDateInputRef}
            id='endDate'
            type='date'
            min='2019-01-01'
            max='2022-12-31'
          />
        </div>
        {!isEndDateAllDay && (
          <div className={classes.control}>
            <label htmlFor='endTime'>Start Time</label>
            <input ref={enteredEndTimeInputRef} id='endTime' type='time' />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='isEndDateAllDay'>
            <input
              id='isEndDateAllDay'
              value={isEndDateAllDay}
              type='checkbox'
              onChange={endDateAllDayChangeHandler}
              checked={isEndDateAllDay}
            />
            All day
          </label>
        </div>
      </div>
      <div className={classes['form-actions']}>
        {isLoading && <p>Sending request...</p>}
        {!isLoading && <button onClick={props.onClose}>Cancel</button>}
        {!isLoading && (
          <button className={classes.primary} type='submit'>
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;

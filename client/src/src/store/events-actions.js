import { eventsActions } from './events-slice';
import { authActions } from './auth-slice';

const apiHost = process.env.REACT_APP_SERVER || 'http://localhost:3030';

export const fetchEventsData = (token) => {
  return async (dispatch) => {
    const fetchData = async (token) => {
      const response = await fetch(apiHost + '/events', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error('Could not fetch events data.');
      }

      const data = await response.json();

      return data;
    };

    try {
      if (!token) {
        authActions.logout();
      }

      const data = await fetchData(token);

      dispatch(
        eventsActions.replaceEvents({
          items: data.events,
          totalQuantity: data.count,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateEvents = () => {
  return async (dispatch) => {
    dispatch(eventsActions.reloadEvents());
  };
};

import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import Events from './components/Events/Events';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { fetchEventsData } from './store/events-actions';
import { getToken } from './store/auth-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      if (isLoggedIn) {
        dispatch(fetchEventsData(token));
        isInitial = false;
      }

      return;
    }

    if (events.changed) {
      dispatch(fetchEventsData(token));
    }
  }, [events, token, isLoggedIn, dispatch]);

  console.log(events);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {isLoggedIn && events.loaded && <Redirect to='/events' />}
          <HomePage />
        </Route>

        <Route path='/auth'>{!isLoggedIn && <AuthPage />}</Route>

        <Route path='/events'>
          {isLoggedIn && <Events />}
          {!isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

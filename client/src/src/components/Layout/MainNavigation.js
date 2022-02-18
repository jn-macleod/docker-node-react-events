import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = auth.isLoggedIn;

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Events Manager TT</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to='/events'>Events</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

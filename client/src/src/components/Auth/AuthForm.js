import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';

import { authenticate } from '../../store/auth-actions';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {});

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsloading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    dispatch(authenticate(enteredEmail, enteredPassword, { isLogin: isLogin }));

    setIsloading(false);
    // history.replace('/');
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

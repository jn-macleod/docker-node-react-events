import { authActions } from './auth-slice';

const apiHost = process.env.REACT_APP_SERVER || 'http://localhost:3030';
// const NOT_AUTHENTICATED = 'Authentication failed';
// const tokenKeyName = 'events-tt-token';

export const getToken = () => {
  return async (dispatch) => {
    dispatch(authActions.refreshToken());
  };
};

export const updateToken = (token) => {
  return async (dispatch) => {
    dispatch(authActions.login(token));
  };
};

export const authenticate = (email, password, action) => {
  return async (dispatch) => {
    const sendAuthRequest = async () => {
      let url;
      if (action.isLogin) {
        url = apiHost + '/user/login';
      } else {
        url = apiHost + '/user/signup';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }

      const data = await response.json();
      return data;
    };

    try {
      dispatch(authActions.sendAuthRequest());
      const data = await sendAuthRequest();
      if (data.type && data.type === 'error') {
        throw new Error(data);
      }
      if (action.isLogin) {
        dispatch(authActions.login({ token: data.token }));
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      dispatch(authActions.authResponseReceived());
    }
  };
};

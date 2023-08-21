import produce from '../util/produce';
import axios from 'axios';
export const initialState = {
  accessToken: null,
  refreshToken: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  userInfoLoading: false,
  userInfoDone: false,
  userInfoError: null,
  user: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const USERINFO_REQUEST = 'USERINFO_REQUEST';
export const USERINFO_SUCCESS = 'USERINFO_SUCCES';
export const USERINFO_FAILURE = 'USERINFO_FAILURE';

const dummyUser = (data) => ({
  ...data,
  nickname: '이요르',
  id: 1,
  Posts: [{ id: 1 }],
});

const dummyUser1 = (data) => {
  console.log(data, 'dummydata');
};

const loginToken = (data) => ({
  ...data,
  nickname: '이요르',
  id: 1,
  Posts: [{ id: 1 }],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const loginSuccessAction = (data) => ({
  type: LOG_IN_SUCCESS,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signUpRequestAction = (formdata) => ({
  type: SIGN_UP_REQUEST,
  formdata,
});

export const signupSuccessAction = (formdata) => ({
  type: SIGN_UP_SUCCESS,
  formdata,
});

export const userInfoRequestAction = (formdata) => ({
  type: USERINFO_REQUEST,
  formdata,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USERINFO_REQUEST:
        draft.userInfoLoading = true;
        draft.userInfoError = null;
        draft.userInfoDone = false;
        break;
      case USERINFO_SUCCESS:
        {
          console.log(action, 'test-userInfoSuccess');
        }
        draft.userInfoLoading = false;
        draft.userInfoDone = true;
        draft.me = action;
        break;
      case USERINFO_FAILURE:
        draft.userInfoLoading = false;
        break;
      case LOG_IN_REQUEST:
        // {console.log(action,"test-loginRequest");}
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        // {
        //   console.log(action.data, 'test-loginSuccess');
        // }
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.accessToken = action.data['access_token'];
        draft.refreshToken = action.data['refresh_token'];
        draft.user = action.data['email'];

        draft.me = action.data;
        // draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        // draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        console.log(action, 'test-logoutSuccess');
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
    }
  });

export default reducer;

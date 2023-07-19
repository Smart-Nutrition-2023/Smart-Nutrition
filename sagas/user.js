import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
} from '../reducers/user';


function userInfoAPI(acToken) {
  console.log('test 유저 정보 API')
  return axios.get("http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/user/info", { 
    headers: {
      Authorization: `Bearer ${acToken}`
    }
  })
  .then((res)=>{
    console.log(res,'유저 정보 받아오는 API success')
    return [res.status, res.data];
  })
  .catch(error => {
    console.log(error.response,'유저 정보 받아오는 API ERROR')
    return error.response.data;
  });
}

function* userInfo(action) {
  try {
    console.log('saga userInfo',action.formdata);
    const result = yield call( userInfoAPI, action.formdata );
    console.log(result[1],"token")
    if(result[0] != 200 ){
      yield put({
        type: USERINFO_FAILURE,
        error: result[1],
      });  
    }else{
      yield put({
        type: USERINFO_SUCCESS,
        data: result[1]
      });  
    }
  } catch (err) {
    console.error(err);
  }
}



async function logInAPI(data) {
  
  const loginResponse = await axios.post("http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/user/login/", data)
  const test =  await userInfoAPI(loginResponse.data["access_token"])
  return [loginResponse.status, loginResponse.data]

  // return [loginResponse.status, loginResponse.data, test[1]["email"]]
  // return test[1]["email"]
  
  
  // .then((test)=>{
  //   console.log(test," promise 객체 알까기")
  //   return test[1]["email"]
  // })
  // .catch((error)=>console.log(error,"eerrrr"))       
                // .then((res)=>{
                // const userData = test(res.data["access_token"])
                // console.log("saga loginAPI", res.data)
                // const test =  userInfoAPI(res.data["access_token"])
                //               .then((test)=>{
                //                 console.log(test," promise 객체 알까기")
                //                 return test[1]["email"]
                //               })
                //               .catch((error)=>console.log(error,"eerrrr"))
              //   return [res.status, res.data, test]
              // })
              // .catch((res)=>{
              //   console.log(res.response,"ere")
              //   return [res.response.status,res.respons];
              // });
}

function* logIn(action) {
  try { 
    console.log('saga logIn');
    const result = yield call( logInAPI, action.data );
    console.log(result[1],result[2],"token")
    if(result[0] != 200 ){
      yield put({
        type: LOG_IN_FAILURE,
        error: result[1],
      });  
    }else{
      yield put({
        type: LOG_IN_SUCCESS,
        data: result[1]//
      });  
    }
  } catch (err) {
    console.error(err);
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(formdata) {
  return axios({
        method: "post",
        url: "http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/user/signup/",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res)=>{
        console.log(res)
        return res.status;
        
      })
      .catch(error => {
        console.log(error.response.data)
        return error.response.data;
      });
  }

function* signUp(action) {
  try {
    
    const result = yield call( signUpAPI, action.formdata );
    if(result != 201){
      yield put({
        type: SIGN_UP_FAILURE,
        error: result,
      });  
    }else{
      yield put({
        type: SIGN_UP_SUCCESS,
      });  
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI() {
  return axios.post('/api/follow');
}

function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}


function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchUserInfo() {
  yield takeLatest(USERINFO_REQUEST, userInfo);
}

export default function* userSaga() {
  yield all([
    // fork(watchFollow),
    // fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchUserInfo),
  ]);
}

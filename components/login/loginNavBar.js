import React, { useCallback, useEffect, useState } from 'react';
import LoginLinks from './loginLinks';
import { useDispatch } from 'react-redux';
import { loginRequestAction, loginSuccessAction } from '../../reducers/user';
import { userInfoRequestAction } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import { useSelector } from 'react-redux';
import FontTitle from '../font/fontTitle';
import TopNav from './topnav';
import LoginForm from './loginform';
import { useRouter } from 'next/router';
import Home from '../../pages/main';
import axios from 'axios';

export default function LoginNavbar() {
  const postLogin = (email, password) => {
    fetch('http://localhost:5000/auth/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === 'True') {
          const userName = json.name;
          const userNickName = json.nickname;
          const userPhonenumber = json.phonenumber;
          const userTaste = json.taste;
          const userProfileImg = json.profileImg;
          dispatch(
            loginSuccessAction({
              email: email,
              name: userName,
              nickname: userNickName,
              phonenumber: userPhonenumber,
              taste: userTaste,
              profile_img: userProfileImg,
            }),
          );
          router.push('/main');
        } else {
          alert(json.isLogin);
        }
      });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { logInError, logInDone } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const { accessToken, me } = useSelector((state) => state.user);
  const router = useRouter();
  const onSubmit = useCallback(() => {
    console.log('dispath-loginRequestAction', email, password, accessToken);
    dispatch(loginRequestAction({ email, password }));
    postLogin(email, password);
  }, [password, email]);

  useEffect(() => {
    console.log('userinfo - dispatch', accessToken);
    if (accessToken != null) dispatch(userInfoRequestAction(accessToken));
  }, [accessToken]);

  return (
    <div className="container mx-auto lg:w-[500px] h-full rounded-3xl">
      <TopNav />
      <div className=" mt-36"></div>
      {
        <LoginForm
          onSubmit={onSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      }
      <LoginLinks />
    </div>
  );
}

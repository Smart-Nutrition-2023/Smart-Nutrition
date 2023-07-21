import React, { useCallback, useEffect, useState } from 'react';
import LoginLinks from './loginLinks';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import { userInfoRequestAction } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import { useSelector } from 'react-redux';
import FontTitle from '../font/fontTitle';
import TopNav from './topnav';
import LoginForm from './loginform';
import { useRouter } from 'next/router';
import axios from 'axios';

const postLogin = (email, password) => {
  fetch('http://localhost:5000/auth/login', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.isLogin === 'True') {
        alert('안녕하세요!');
      } else {
        alert(json.isLogin);
      }
    });
};

export default function LoginNavbar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
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

  useEffect(() => {
    if (me != null) router.push('/main');
  }, [me]);

  return (
    <div>
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

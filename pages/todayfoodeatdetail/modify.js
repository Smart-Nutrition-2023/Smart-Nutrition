import TopNav from '../../components/login/topnav';
import React, { useState, useEffect } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import Image from 'next/image';
import ImageZoomModal from '../../components/image/imageZoom';
import axios from 'axios';

const Modify = (props) => {
  const router = useRouter();
  const queryDate = router.query.date + '';

  const [isImageZoomModal, isSetImageZoomModal] = useState(undefined);
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [foodMemo, setFoodMemo] = useState('');
  const [inputValue, setInputValue] = useState({
    id: '',
    date: '',
    food_name: '',
    memo: '',
  });

  const nowDate = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .split('T')[0];

  const onChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageClick = () => {
    isSetImageZoomModal(true);
  };

  const submitFuction = async (e) => {
    const memoChange = inputValue.memo.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    inputValue.memo = memoChange;

    fetch('http://localhost:5000/fooddetail/modify', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isModified === true) {
          router.push('/main');
        }
      });
  };

  const getAuth = () => {
    fetch('http://localhost:5000/auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === 'True') {
          dispatch(
            loginSuccessAction({
              email: json.email,
              name: json.name,
              nickname: json.nickname,
              phonenumber: json.phonenumber,
              taste: json.taste,
              profile_img: json.profile_img,
            }),
          );
          setIsLogined(true);
        } else {
          setIsLogined(false);
          router.push({
            pathname: '/login',
          });
        }
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      setInputValue({
        ...inputValue,
        id: router.query.id,
        date: queryDate.substr(0, 10),
        food_name: router.query.name,
        memo: router.query.memo.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n'),
      });
    }
  }, [router.query]);

  return (
    <div className="container mx-auto w-[500px] h-full rounded-3xl">
      <TopNav />

      <div className="flex justify-center mt-12">
        <div className="w-[200px] h-[200px] relative">
          {me == null ? null : (
            <Image
              className="rounded-3xl"
              src={`http://localhost:5000/${router.query.img}`}
              layout="fill"
              objectFit="cover"
              onClick={handleImageClick}
            />
          )}
        </div>
      </div>

      <div className="flex mt-7 mb-[-20px] ml-5 mr-5 gap-4">
        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            날짜
          </label>
          <input
            type="date"
            id="date"
            value={inputValue.date}
            min="0000-00-00"
            max={nowDate}
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline"
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            음식이름
          </label>
          <input
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline"
            id="food_name"
            type="text"
            value={inputValue.food_name}
          ></input>
        </div>
      </div>

      <div className="mt-5 mx-5 p-1 rounded-xl bg-neutral-200 flex items-center justify-center">
        <textarea
          onChange={onChange}
          id="memo"
          className="h-[190px] bg-white p-3 break-words w-11/12 placeholder:italic placeholder:text-center placeholder:text-slate-400 "
          value={inputValue.memo}
        ></textarea>
      </div>

      <div className="flex flex-col items-center justify-center mt-8 ml-5 mr-5 bg-yellow1 rounded-md">
        <button
          onClick={submitFuction}
          className="bg-yellow1 w-full active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          수정
        </button>
      </div>

      {isImageZoomModal && (
        <ImageZoomModal
          isSetImageZoomModal={isSetImageZoomModal}
          image={router.query.img}
        />
      )}
    </div>
  );
};

export default Modify;

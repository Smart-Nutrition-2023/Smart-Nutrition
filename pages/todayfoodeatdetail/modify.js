import TopNav from '../../components/login/topnav';
// import BoardImage from '../community/board/BoardImage';
import React, { useState, useEffect } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import Image from 'next/image';
import axios from 'axios';

const Modify = (props) => {
  const router = useRouter();
  console.log('ROUTER QUERY', router.query); //

  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user); // ***
  const [inputValue, setInputValue] = useState({
    id: router.query['id'],
    date: '',
    food_name: '',
    memo: '',
  });
  const onChange = (e) => {
    console.log(e.target.id, e.target.value);
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  // console.log(router.query,"sdfdsfsdfd")

  const submitFuction = async (e) => {
    console.log(inputValue, '보낼값!');
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
    // axios
    //   .put(
    //     'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten',
    //     inputValue,
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => console.log(error));
  };

  function getAuth() {
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
            pathname: '/main',
          });
        }
      });
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="">
      <TopNav />

      {me == null ? (
        <span className=" flex justify-end font-bold mr-5 text-3xl text-main ">
          안녕하세요. --- 님
        </span>
      ) : (
        <div className=" w-full font-bold text-3xl text-yellow1 ">
          <div className="flex  mt-12 mb-[-16px] justify-end mr-5  items-center">
            <div className=" rounded-3xl relative w-[30px] h-[30px]">
              <Image
                className=" rounded-3xl"
                src={`http://localhost:5000/${me['profile_img']}`}
                layout={'fill'}
              />
            </div>
            <div className=" w-[10px]"></div>
            <div>{me['nickname']}</div>
          </div>
        </div>
      )}
      {/* <img src={`http://localhost:5000/${router.query.img}`} /> */}
      {/* <BoardImage imageUrl={`http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com${router.query["img"]}`} /> */}

      <div className="flex  mt-7 mb-[-20px] ml-5 mr-5 gap-4 ">
        <div className=" mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            날짜
          </label>
          <input
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline"
            id="date"
            type="text"
            placeholder="YYYY-MM-DD"
          ></input>
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
            placeholder="음식이름"
          ></input>
        </div>
      </div>

      <div className=" mt-8 rounded-xl bg-neutral-200 flex items-center justify-center ml-5 mr-5 p-3">
        <textarea
          onChange={onChange}
          id="memo"
          className="h-[100px] focus:h-[170px] bg-white p-3 break-words w-11/12 placeholder:italic placeholder:text-center placeholder:text-slate-400 "
          placeholder="올리실 글을 작성해 주세요!"
        ></textarea>
      </div>

      <div className="flex items-center justify-center my-10 ml-5 mr-5 bg-yellow1 rounded-md">
        <button
          onClick={submitFuction}
          className="bg-yellow1 w-full active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Modify;

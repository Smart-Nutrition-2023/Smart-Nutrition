import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import TopNav from '../../components/login/topnav';
import styles from '../../styles/Home.module.css';

export default function MyInfo() {
  const postMyInfoModify = (input) => {
    fetch('http://localhost:5000/myinfo/modify', {
      method: 'post',
      credentials: 'include',
      body: input,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === 'True') {
          dispatch(loginSuccessAction(formData));
          router.push('/main');
        } else {
          alert(json.isSuccess);
        }
      });
  };

  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user); // ***
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    password1: '',
    password2: '',
    name: '',
    nickname: '',
    phonenumber: '',
    taste: '',
  });

  const onChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  const [imageFile, setImageFile] = useState(null);
  const handleImage = (event) => setImageFile(event.target.files[0]);

  const formData = new FormData();

  const submitFuction = async (e) => {
    e.preventDefault();

    formData.append('email', me['email']);
    formData.append('password1', inputValue['password1']);
    formData.append('password2', inputValue['password2']);
    formData.append('name', inputValue['name']);
    formData.append('nickname', inputValue['nickname']);
    formData.append('phonenumber', inputValue['phonenumber']);
    formData.append('taste', inputValue['taste']);
    formData.append('profile_img', imageFile);

    for (var pair of formData.entries()) console.log(pair);
    //dispatch(signUpRequestAction(formData));
    postMyInfoModify(formData);
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

  return (
    <div className="container mx-auto pb-8 lg:w-[500px] h-full bg-slate-50 rounded-3xl">
      <TopNav />
      <div className="h-40 p-8  text-left w-full">
        {isLogined === false ? null : (
          <div className=" w-full font-bold text-3xl text-yellow1 ">
            <div className="flex justify-end  items-center">
              "<span className='font-["Jalnan"] '>{me['nickname']}</span>" 님
              &nbsp;
              <div className=" rounded-3xl relative w-[30px] h-[30px]">
                <Image
                  className=" rounded-3xl"
                  src={`http://localhost:5000/${me['profile_img']}`}
                  layout={'fill'}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end text-gray-400 font-bold mt-2">
          회원정보 수정
        </div>
      </div>
      <form
        onSubmit={submitFuction}
        encType="multipart/form-data"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="px-8"
      >
        <div className="mb-4">
          <label
            className="block after:content-['변경불가'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            이메일
          </label>
          {me == null ? null : (
            <div
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline"
            >
              {`${me['email']}`}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="password1"
          >
            패스워드
          </label>
          <input
            onChange={onChange}
            name="password1"
            className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline"
            id="password1"
            type="password"
            maxLength={20}
            placeholder="******************"
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="password2"
          >
            패스워드 확인
          </label>
          <input
            onChange={onChange}
            name="password2"
            className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline"
            id="password2"
            type="password"
            maxLength={20}
            placeholder="******************"
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            이름
          </label>
          {me == null ? null : (
            <input
              onChange={onChange}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2  focus:shadow-outline"
              id="name"
              type="text"
              maxLength={30}
              placeholder={`${me['name']}`}
            ></input>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="nickname"
          >
            닉네임
          </label>
          {me == null ? null : (
            <input
              onChange={onChange}
              name="nickname"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              maxLength={30}
              placeholder={`${me['nickname']}`}
            ></input>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            프로필 사진
          </label>
          <input
            onChange={handleImage}
            name="image"
            className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            placeholder="사진을 입력해 주세요"
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taste"
          >
            음식 취향
          </label>
          {me == null ? null : (
            <input
              onChange={onChange}
              name="taste"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="taste"
              type="text"
              maxLength={30}
              placeholder={`${me['taste']}`}
            ></input>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
            htmlFor="phonenumber"
          >
            휴대폰 번호
          </label>
          {me == null ? null : (
            <input
              onChange={onChange}
              name="phonenumber"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="phonenumber"
              type="text"
              maxLength={20}
              placeholder={`${me['phonenumber']}`}
            ></input>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button className="bg-yellow1 mx-8 mt-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            회원정보 저장
          </button>
        </div>
      </form>
    </div>
  );
}

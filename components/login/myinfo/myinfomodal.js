import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccessAction } from '../../../reducers/user';

const ModifyMyInfoModal = ({ isSetModifyMyInfoModal, me }) => {
  const router = useRouter();
  const [isLogined, setIsLogined] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const postMyInfoModify = (input) => {
    fetch('http://localhost:5000/myinfo/modify', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === 'True') {
          dispatch(loginSuccessAction(formData));
          setIsModified(true);
        } else {
          alert(json.isSuccess);
        }
      });
  };

  const [inputValue, setInputValue] = useState({
    email: me['email'],
    password1: '',
    password2: '',
    name: me['name'],
    nickname: me['nickname'],
    phonenumber: me['phonenumber'],
    taste: me['taste'],
  });

  const onChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

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
    formData.append('profile_img', me['profile_img']);

    postMyInfoModify(inputValue);
  };

  useEffect(() => {
    if (isModified) {
      location.reload(true);
    }
  }, [isModified]);

  return (
    <>
      <div
        onClick={(e) => {
          isSetModifyMyInfoModal(false);
        }}
        className="w-screen h-screen inset-0 absolute bg-gray-200 bg-opacity-75"
      >
        <form
          onSubmit={submitFuction}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white lg:w-[450px] h-3/6 shadow-md px-8 pt-6 pb-8 mb-4 overflow-auto fixed p-5 rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="mb-4">
            <label
              className="block after:content-['변경불가'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <div
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline"
            >
              {`${me['email']}`}
            </div>
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
            <input
              onChange={onChange}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2  focus:shadow-outline"
              id="name"
              type="text"
              maxLength={20}
              value={inputValue.name}
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              onChange={onChange}
              name="nickname"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              maxLength={20}
              value={inputValue.nickname}
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taste"
            >
              음식 취향
            </label>
            <input
              onChange={onChange}
              name="taste"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="taste"
              type="text"
              maxLength={20}
              value={inputValue.taste}
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
              htmlFor="phonenumber"
            >
              휴대폰 번호
            </label>
            <input
              onChange={onChange}
              name="phonenumber"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="phonenumber"
              type="text"
              maxLength={20}
              value={inputValue.phonenumber}
            ></input>
          </div>

          <div className="flex flex-col items-center">
            <button className="bg-yellow1 mx-8 mt-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              회원정보 저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModifyMyInfoModal;

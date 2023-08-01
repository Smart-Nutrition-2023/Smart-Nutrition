import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../reducers/user';
import styles from '../styles/Home.module.css';

export default function MyInfo() {
  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user); // ***
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();

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
            pathname: '/main',
          });
        }
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="container mx-auto lg:w-[500px] h-full bg-slate-50 rounded-3xl">
      <div className="h-40 p-8  text-left w-full">
        {isLogined === false ? (
          <span className="flex justify-end font-bold text-3xl text-main">
            안녕하세요. --- 님
          </span>
        ) : (
          <div className=" w-full font-bold text-3xl text-yellow1 ">
            <div className="flex justify-end  items-center">
              안녕하세요 &nbsp;
              <div className=" rounded-3xl relative w-[30px] h-[30px]">
                <Image
                  className=" rounded-3xl"
                  src={`http://localhost:5000/${me['profile_img']}`}
                  layout={'fill'}
                />
              </div>
            </div>
            <div className="flex justify-end ">
              "<span className='font-["Jalnan"] '>{me['nickname']}</span>
              " 님
              <br />
            </div>
          </div>
        )}
        <div className="flex justify-end text-gray-400 font-bold mt-2">
          마이페이지
        </div>
      </div>

      <div className="block mx-8 my-8 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2">
        이메일
      </div>

      <div className="block mx-8 my-8 after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2">
        이름
      </div>

      <div className="block mx-8 my-8 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2">
        별명
      </div>

      <div className="block mx-8 my-8 after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2">
        음식 취향
      </div>

      <div className="block mx-8 my-8 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2">
        휴대폰 번호
      </div>

      <button className="bg-yellow1 mx-8 my-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        프로필 사진 변경
      </button>
      <button className="bg-yellow1 mx-8 my-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        비밀번호 변경
      </button>
    </div>
  );
}

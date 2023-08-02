import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import TopNav from '../../components/login/topnav';
import styles from '../../styles/Home.module.css';

export default function MyInfo() {
  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user); // ***
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();

  const handleMyInfoModifyClick = () => {
    router.push('/myInfo/modify');
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
            pathname: '/main',
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
      <div className="p-8 text-left w-full">
        {isLogined === false ? null : (
          <div className=" w-full font-bold text-3xl text-yellow1 ">
            <div className="flex justify-end  items-center">
              "<span className='font-["Jalnan"] '>{me['nickname']}</span>" 님
            </div>
          </div>
        )}
        <div className="flex justify-end text-gray-400 font-bold mt-2">
          마이페이지
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[200px] h-[200px] relative">
          {me == null ? null : (
            <Image
              className="rounded-3xl"
              src={`http://localhost:5000/${me['profile_img']}`}
              layout="fill"
            />
          )}
        </div>
      </div>

      <div className="block mx-8 my-8 text-gray-700 text-sm font-bold mb-2">
        이메일
      </div>
      {me == null ? null : <div className="block mx-8">{`${me['email']}`}</div>}

      <div className="block mx-8 my-8 text-gray-700 text-sm font-bold mb-2">
        이름
      </div>
      {me == null ? null : <div className="block mx-8">{`${me['name']}`}</div>}

      <div className="block mx-8 my-8 text-gray-700 text-sm font-bold mb-2">
        별명
      </div>
      {me == null ? null : (
        <div className="block mx-8">{`${me['nickname']}`}</div>
      )}

      <div className="block mx-8 my-8 text-gray-700 text-sm font-bold mb-2">
        음식 취향
      </div>
      {me == null ? null : <div className="block mx-8">{`${me['taste']}`}</div>}

      <div className="block mx-8 my-8 text-gray-700 text-sm font-bold mb-2">
        휴대폰 번호
      </div>
      {me == null ? null : (
        <div className="block mx-8">{`${me['phonenumber']}`}</div>
      )}

      <div className="flex flex-col items-center">
        <button
          className="bg-yellow1 mx-8 mt-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleMyInfoModifyClick}
        >
          회원정보 수정
        </button>
      </div>
    </div>
  );
}

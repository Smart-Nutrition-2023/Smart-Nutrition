import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import TopNav from '../../components/login/topnav';
import styles from '../../styles/Home.module.css';
import ImageZoomModal from '../../components/image/imageZoom';
import ModifyMyInfoModal from '../../components/login/myinfo/myinfomodal';
import ModifyProfileModal from '../../components/login/myinfo/profilemodify';

export default function MyInfo() {
  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user);
  const [isLogined, setIsLogined] = useState(false);
  const [isImageZoomModal, isSetImageZoomModal] = useState(undefined);
  const dispatch = useDispatch();
  const [isModifyMyInfoModal, isSetModifyMyInfoModal] = useState(undefined);
  const [isModifyProfileModal, isSetModifyProfileModal] = useState(undefined);

  const handleImageClick = () => {
    console.log('CLICK IMAGE');
    isSetImageZoomModal(true);
  };

  const handleModifyMyInfoClick = () => {
    isSetModifyMyInfoModal(true);
  };

  const handleModifyProfileClick = () => {
    isSetModifyProfileModal(true);
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
    <div className="container mx-auto w-[500px] h-full pb-8 rounded-3xl">
      <TopNav />
      <div className="p-8 text-left w-full">
        {isLogined === false ? null : (
          <div className="w-full font-bold text-3xl text-yellow1">
            <div className="flex justify-end  items-center">
              "<span className='font-["Jalnan"]'>{me['nickname']}</span>" 님
            </div>
          </div>
        )}
        <div className="flex justify-end text-gray-400 font-bold mt-2">
          마이페이지
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-[200px] h-[200px] relative">
          {me == null ? null : (
            <div>
              <Image
                className="rounded-full"
                src={`http://localhost:5000/${me['profile_img']}`}
                layout="fill"
                objectFit="cover"
                onClick={handleImageClick}
              />
            </div>
          )}
        </div>
        <button
          className="text-gray-400 font-bold text-s"
          onClick={handleModifyProfileClick}
        >
          변경
        </button>
      </div>

      <div className="mx-5 mt-8 mb-2 bg-slate-100 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="flex mt-4 mb-[-20px] ml-5 mr-5 gap-8">
            <div className="flex justify-end block w-[200px] text-gray-700 font-bold">
              이메일
            </div>
            {me == null ? null : (
              <div className="block w-[200px]">{`${me['email']}`}</div>
            )}
          </div>

          <div className="flex mt-7 mb-[-20px] ml-5 mr-5 gap-8">
            <div className="flex justify-end block w-[200px] text-gray-700 font-bold">
              이름
            </div>
            {me == null ? null : (
              <div className="block w-[200px]">{`${me['name']}`}</div>
            )}
          </div>

          <div className="flex mt-7 mb-[-20px] ml-5 mr-5 gap-8">
            <div className="flex justify-end block w-[200px] text-gray-700 font-bold">
              닉네임
            </div>
            {me == null ? null : (
              <div className="block w-[200px]">{`${me['nickname']}`}</div>
            )}
          </div>

          <div className="flex mt-7 mb-[-20px] ml-5 mr-5 gap-8">
            <div className="flex justify-end block w-[200px] text-gray-700 font-bold">
              음식 취향
            </div>
            {me == null ? null : (
              <div className="block w-[200px]">{`${me['taste']}`}</div>
            )}
          </div>

          <div className="flex mt-7 mb-[-20px] ml-5 mr-5 gap-8">
            <div className="flex justify-end block w-[200px] text-gray-700 font-bold">
              휴대폰 번호
            </div>
            {me == null ? null : (
              <div className="block w-[200px]">{`${me['phonenumber']}`}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-yellow1 mx-8 mt-12 mb-4 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleModifyMyInfoClick}
          >
            회원정보 수정
          </button>
        </div>
      </div>

      {isImageZoomModal && (
        <ImageZoomModal
          isSetImageZoomModal={isSetImageZoomModal}
          image={me['profile_img']}
        />
      )}
      {isModifyMyInfoModal && (
        <ModifyMyInfoModal
          isSetModifyMyInfoModal={isSetModifyMyInfoModal}
          me={me}
        />
      )}
      {isModifyProfileModal && (
        <ModifyProfileModal
          isSetModifyProfileModal={isSetModifyProfileModal}
          me={me}
        />
      )}
    </div>
  );
}

import React, { useEffect, PureComponent, useState } from 'react';
import FontTitle from '../../components/font/fontTitle';
import Image from 'next/image';
import Chart from '../../components/chart/index';
import moment from 'moment';
import 'moment/locale/ko';
import { useRouter, withRouter } from 'next/router';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import TopNav from '../../components/login/topnav';
import CheckDeleteModal from '../../components/delete/checkDelete';
import ImageZoomModal from '../../components/image/imageZoom';

function FoodInFoFoodName({ response }) {
  const router = useRouter();
  const [isCheckDeleteModal, isSetCheckDeleteModal] = useState(undefined);
  const [isImageZoomModal, isSetImageZoomModal] = useState(undefined);
  const { accessToken, me } = useSelector((state) => state.user);
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();
  const [tanDanGi, setTanDanGi] = useState({
    calorie: '',
    carb: '',
    fat: '',
    protein: '',
  });
  const [data, setData] = useState({
    labels: ['탄수화물', '단백질', '지방'],
    datasets: [],
  });

  const nowTimeDay = router.query.date + '';
  const nowTime = moment(`${nowTimeDay.substr(0, 10)}`, 'YYYY-MM-DD').format(
    'YYYY년 MM월 DD일',
  );

  const handleDeleteClick = () => {
    isSetCheckDeleteModal(true);
  };

  const handleImageClick = () => {
    isSetImageZoomModal(true);
  };

  const routeFoodname = (e) => {
    Router.push({
      pathname: `/todayfoodeatdetail/modify`,
      query: { ...router.query },
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

  const fetchNutrition = (id) => {
    fetch('http://localhost:5000/fooddetail/foodname', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((json) => {
        setTanDanGi({
          ...tanDanGi,
          ['calorie']: json.energy,
          ['carb']: json.carbohydrate,
          ['fat']: json.fat,
          ['protein']: json.protein,
        });
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      fetchNutrition(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    if (tanDanGi['carb'] != '') {
      setData({
        ...data,
        ['datasets']: [
          {
            label: '내가 먹은 영양소',
            data: [
              parseInt(tanDanGi['carb']),
              parseInt(tanDanGi['protein']),
              parseInt(tanDanGi['fat']),
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [tanDanGi]);

  useEffect(() => {
    const foodMemo = document.querySelector('#foodMemo');
    foodMemo.innerHTML = `<div>${router.query['memo']}</div>`;
  }, []);

  return (
    <div className="container mx-auto w-[500px] h-full rounded-3xl">
      <TopNav />
      <div className="flex justify-end mx-5 mt-8">
        <button
          onClick={routeFoodname}
          className="rounded-2xl w-[60px] mr-1 flex justify-center items-center bg-red-600 text-white"
        >
          수정
        </button>
        <button
          onClick={handleDeleteClick}
          className="rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white"
        >
          삭제
        </button>
      </div>

      <div className='mt-5 mr-5 ml-5 flex justify-end font-["Jalnan"] text-xs'>
        {nowTime}
      </div>

      <div className='flex justify-center font-["Jalnan"]'>
        {router.query.name}
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-[250px] h-[250px] relative">
          <Image
            className={'rounded-2xl shadow-2xl'}
            src={`http://localhost:5000/${router.query.img}`}
            layout="fill"
            objectFit="cover"
            onClick={handleImageClick}
          />
        </div>
      </div>

      <div className="flex justify-center mt-10 px-4 py-4 ml-5 mr-5 rounded-2xl">
        <div className="h-full">
          {data.datasets.length == 0 ? (
            <div>로딩중</div>
          ) : (
            <Chart data={data} />
          )}
        </div>
      </div>

      <div className="flex-col item justify-center bg-slate-100 mx-10 mb-10 px-4 py-2 rounded-2xl ml-5 mr-5">
        <div className='items-center justify-center flex font-["Jalnan"] mb-4'>
          📌 Ya---M 일기
        </div>
        <div id="foodMemo" className="items-center text-center break-all px-2">
          로딩중
        </div>
      </div>

      {isImageZoomModal && (
        <ImageZoomModal
          isSetImageZoomModal={isSetImageZoomModal}
          image={router.query.img}
        />
      )}
      {isCheckDeleteModal && (
        <CheckDeleteModal
          isSetCheckDeleteModal={isSetCheckDeleteModal}
          foodId={router.query.id}
        />
      )}
    </div>
  );
}

export default withRouter(FoodInFoFoodName);

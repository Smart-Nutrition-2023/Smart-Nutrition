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
// withRouter 사용법 알아 둘 것!!

function FoodInFoFoodName({ response }) {
  const router = useRouter();

  const [isCheckDeleteModal, isSetCheckDeleteModal] = useState(undefined);
  const { accessToken, me } = useSelector((state) => state.user); // ***
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

  const routeBackFuntion = () => {
    router.push('/todayfoodeatdetail');
  };

  const routeFoodname = (e) => {
    // console.log(testData,"wewewew", e.currentTarget.id)
    Router.push({
      pathname: `/todayfoodeatdetail/modify`,
      query: { ...router.query },
    });
  };

  // useEffect(()=>{
  //   axios.get(`http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/nutrient?food_name=${query["name"]}`)
  //   .then((res)=>{
  //     console.log(res)
  //     setTanDanGi({
  //       ...tanDanGi,
  //       ["calorie"] : parseInt(res.data["calorie"]),
  //       ["carb"] : parseInt(res.data["carb"]),
  //       ["protein"] : parseInt(res.data["protein"]),
  //       ["fat"] : parseInt(res.data["fat"])
  //   });
  //   })
  //   .catch((error)=> console.log(error, "error 탄단지 1개"))
  // }, []);

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

  return (
    <div>
      <TopNav />
      <div className="flex justify-end mx-5 mt-8">
        <div
          onClick={routeFoodname}
          className="rounded-2xl w-[60px] mr-1 flex justify-center items-center bg-red-600 text-white"
          id="testForm"
        >
          수정
        </div>
        <div
          onClick={handleDeleteClick}
          className="rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white"
        >
          삭제
        </div>
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
          />
        </div>
      </div>

      <div className="flex justify-center min-h-[200px] bg-neutral-200 mt-10 px-4 py-2 ml-5 mr-5 rounded-2xl">
        <div className="h-full">
          {/* {console.log(tanDanGiData.datasets.length, "dkasdjlas")  } */}
          {data.datasets.length == 0 ? (
            <div>로딩중</div>
          ) : (
            <Chart data={data} />
          )}
        </div>
      </div>

      <div className="flex-col item justify-center bg-neutral-200 m-10 px-4 py-2 rounded-2xl ml-5 mr-5">
        <div className='items-center justify-center flex font-["Jalnan"]'>
          📌 Ya---M 일기
        </div>
        <div className="items-center justify-center flex">
          {router.query['memo']}
        </div>
      </div>

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

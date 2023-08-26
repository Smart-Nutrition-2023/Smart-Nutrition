import CalorieGraph from '../../components/todayeatfood/caloriegraph';
import TodayFoodList from '../../components/todayeatfood/todayfoodlist';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import ReactLoading from 'react-loading';
import TopNav from '../../components/login/topnav';
import { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../../reducers/user';
import CheckDeleteAllModal from '../../components/delete/checkDeleteAll';

function FoodInFo({ response }) {
  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user);
  const [isLogined, setIsLogined] = useState(false);
  const dispatch = useDispatch();

  const { year, month, date } = router.query;
  const nowTime = moment(`${year}.${month}.${date}`, 'YYYY.MM.DD').format(
    'YYYY년 MM월 DD일',
  );
  const nowTimeAPI = moment().format('YYYY-MM-DD');
  const [dataNull, setDataNull] = useState(false);
  const [eatFoodData, setEatFoodData] = useState([]);
  const [isCheckDeleteModal, isSetCheckDeleteModal] = useState(undefined);
  const [tanDanGiAPI, setTanDanGiAPI] = useState({
    totolKcal: 0,
    calorie: '',
    carb: '',
    fat: '',
    protein: '',
  });
  const [recommendation, setRecommendation] = useState({
    nutrition: '',
    food: '',
    calorie: '',
    carb: '',
    protein: '',
    fat: '',
  });

  const handleClickDelete = () => {
    isSetCheckDeleteModal(true);
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

  const fetchFoodList = () => {
    fetch(
      'http://localhost:5000/fooddetail/todayeatfood?' +
        new URLSearchParams({ year, month, date }),
      {
        credentials: 'include',
      },
    )
      .then((res) => res.json())
      .then((json) => {
        setEatFoodData(json);
      });
  };

  const fetchNutrition = (id) => {
    fetch('http://localhost:5000/fooddetail/nutrition', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((json) => {
        const nutritionData = { calorie: 0, carb: 0, fat: 0, protein: 0 };
        for (var i = 0; i < json.length; i++) {
          nutritionData.calorie =
            nutritionData.calorie + parseInt(json[i].energy);
          nutritionData.carb =
            nutritionData.carb + parseInt(json[i].carbohydrate);
          nutritionData.fat = nutritionData.fat + parseInt(json[i].fat);
          nutritionData.protein =
            nutritionData.protein + parseInt(json[i].protein);
        }
        setTanDanGiAPI({
          ...tanDanGiAPI,
          ['calorie']: nutritionData.calorie,
          ['carb']: nutritionData.carb,
          ['fat']: nutritionData.fat,
          ['protein']: nutritionData.protein,
        });
        fetchPercentTanDanGi(
          nutritionData.carb,
          nutritionData.protein,
          nutritionData.fat,
        );
      });
  };

  const fetchPercentTanDanGi = (tan, dan, gi) => {
    fetch(
      'http://localhost:5000/fooddetail/recommendation?' +
        new URLSearchParams({ carb: tan, protein: dan, fat: gi }),
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.nutrition == 'none') {
          setRecommendation({
            ...recommendation,
            ['nutrition']: json.nutrition,
          });
        } else {
          setRecommendation({
            ...recommendation,
            ['nutrition']: json.nutrition,
            ['food']: json.food['음식'],
            ['calorie']: json.food['에너지(kcal)'],
            ['carb']: json.food['탄수화물(g)'],
            ['protein']: json.food['단백질(g)'],
            ['fat']: json.food['지방(g)'],
          });
        }
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    fetchFoodList();
  }, []);

  useEffect(() => {
    if (eatFoodData.length > 0) {
      const foodIdData = [];
      eatFoodData.forEach((food, index) => {
        foodIdData.push(food.id);
      });
      fetchNutrition(foodIdData);
    }
  }, [eatFoodData]);

  return (
    <div className="container mx-auto w-[500px] h-full rounded-3xl">
      <TopNav />
      <CalorieGraph
        tanDanGiAPI={tanDanGiAPI}
        nowTime={nowTime}
        dataNull={dataNull}
      />
      {eatFoodData.length == 0 ? (
        <div className="mt-20 justify-center flex">
          <ReactLoading type="spin" color="#EDA345" />
        </div>
      ) : (
        <>
          <div className="mt-8 mx-5">
            {recommendation.nutrition == 'none' ? null : (
              <>
                <div className="flex justify-center pt-1 text-sm font-sans bg-[#ece06f88] rounded-t-2xl">
                  '<p className="font-bold">{recommendation.nutrition}</p>'이
                  부족하시네요!
                </div>
                <div className="py-2 grid grid-cols-2 border-2 border-[#ece06f88] rounded-b-2xl">
                  <div className="flex flex-col items-center ml-10">
                    <div className='font-["Jalnan"] text-sm text-gray-500'>
                      🥄 추천 음식 🍴
                    </div>
                    <div className='mt-2 font-["Jalnan"]'>
                      {recommendation.food}
                    </div>
                  </div>
                  <div className="flex justify-center mr-10">
                    <ul className="text-xs font-sans">
                      <li>칼로리 {recommendation.calorie} kcal</li>
                      <li>탄수화물 {recommendation.carb} g</li>
                      <li>단백질 {recommendation.protein} g</li>
                      <li>지방 {recommendation.fat} g</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className="rounded-2xl mr-5 mb-1 px-2 flex justify-center items-center bg-red-600 text-xs text-white"
              onClick={handleClickDelete}
            >
              음식 모두 삭제
            </button>
          </div>
          <TodayFoodList eatFoodData={eatFoodData} />
        </>
      )}

      {isCheckDeleteModal && (
        <CheckDeleteAllModal
          isSetCheckDeleteModal={isSetCheckDeleteModal}
          year={year}
          month={month}
          date={date}
        />
      )}
    </div>
  );
}

export default FoodInFo;

// export const getServerSideProps = async () => {
//   // 달력 여기서 처리할 것
//   const data = null;
//   // const { data } = await axios.get(
//   //   'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=2021-03-11',
//   // );
//   // // console.log(response)
//   // // const response1 = await response.json();
//   return {
//     props: {
//       response: data,
//     },
//   };
// };

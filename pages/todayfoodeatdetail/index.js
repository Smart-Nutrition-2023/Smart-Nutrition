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

  const [tanDanGiAPI, setTanDanGiAPI] = useState({
    totolKcal: 0,
    calorie: '',
    carb: '',
    fat: '',
    protein: '',
  });

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
        console.log('DETAIL FOOD LIST', json);
        setEatFoodData(json);
      });
    // fetch('http://localhost:5000/fooddetail/todayeatfood', {
    //   method: 'post',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ year, month, date }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log('DETAIL FOOD LIST', json);
    //     setEatFoodData(json);
    //   });
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

  // useEffect(()=>{
  //   axios.get(`http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=${nowTimeAPI}`)
  //   // axios.get("http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=2021-03-11")
  //   .then((res)=>{
  //       console.log(res,  "칼로리 API 응답 성공")
  //       setTanDanGiAPI({
  //           ...tanDanGiAPI,
  //           ["calorie"] : parseInt(res.data[0]["calorie"]),
  //           ["carb"] : parseInt(res.data[0]["carb"]),
  //           ["protein"] : parseInt(res.data[0]["protein"]),
  //           ["fat"] : parseInt(res.data[0]["fat"])
  //       });
  //       setEatFoodData([
  //         ...eatFoodData,
  //         ...res.data
  //       ])
  //   })
  //   .catch((error)=>{
  //     console.log(error, "칼로리 API 응답 실패")
  //     setDataNull(true);
  //   })
  // },[]);
  //console.log(response, 'getserverside Props');

  return (
    <div>
      <TopNav />
      <CalorieGraph
        tanDanGiAPI={tanDanGiAPI}
        nowTime={nowTime}
        dataNull={dataNull}
      />
      {eatFoodData.length == 0 ? (
        <div className=" mt-20 justify-center flex">
          <ReactLoading type="spin" color="#EDA345" />
        </div>
      ) : (
        <TodayFoodList eatFoodData={eatFoodData} />
      )}
    </div>
  );
}

export default FoodInFo;

export const getServerSideProps = async () => {
  // 달력 여기서 처리할 것
  const data = null;
  // const { data } = await axios.get(
  //   'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=2021-03-11',
  // );
  // // console.log(response)
  // // const response1 = await response.json();
  return {
    props: {
      response: data,
    },
  };
};

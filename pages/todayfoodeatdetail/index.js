// import TopNav from '../../components/todayeatfood/topnav/topnav';
import CalorieGraph from '../../components/todayeatfood/caloriegraph';
import TodayFoodList from '../../components/todayeatfood/todayfoodlist';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import ReactLoading from 'react-loading';
import TopNav from '../../components/login/topnav';
function FoodInFo({ response }) {
  const nowTime = moment().format('YYYY년 MM월 DD일');
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
  console.log(response, 'getserverside Props');
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
  const { data } = await axios.get(
    'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=2021-03-11',
  );
  // console.log(response)
  // const response1 = await response.json();
  return {
    props: {
      response: data,
    },
  };
};

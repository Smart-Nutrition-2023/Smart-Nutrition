import Image from 'next/image';
import FoodItem from './fooditem';
import FoodItemm from './fooditemm';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './loader';
import { testData } from './datacuthook';

const TodayFoodList = ({ eatFoodData }) => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten?date=2021-02-08',
  //     )
  //     .then((res) => {
  //       console.log(res.data, 'food');
  //       setData((arr) => [...data, eatFoodData]);
  //     });
  // }, []);

  return (
    <div>
      <div className="mt-10 ml-5 mr-5 bg-slate-100 rounded-2xl shadow-2xl">
        <div className="rounded-2xl">
          <FoodItemm testData={eatFoodData} />
          <div className="bg-yellow1 pt-[1px] bg-opacity-50"></div>
        </div>
        {/* {eatFoodData.map((item, i) => {
          if (eatFoodData.length != 0)
            // 원래는 if (i != 0) 였음
            return (
              <div className=" rounded-2xl ">
                <FoodItemm key={i} testData={eatFoodData[i]} />
                <div className=" bg-yellow1 pt-[1px] bg-opacity-50"></div>
              </div>
            );
          // console.log(item,"sds")
        })} */}
        {/* {  < FoodItemm testData={eatFoodData[1]} /> } */}
        {/* { <FoodItemm testData={testData[1]} /> } */}
        {/* { data.length != 0 && <FoodItemm foodData={data[0][2]} testData={testData[2]} /> } */}
        {/* { data.length != 0 && <FoodItemm foodData={data[0][3]} testData={testData[0]} /> } */}
      </div>
    </div>
  );
};

export default TodayFoodList;

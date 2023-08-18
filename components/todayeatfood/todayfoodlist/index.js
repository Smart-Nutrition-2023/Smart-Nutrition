import Image from 'next/image';
import FoodItem from './fooditem';
import FoodItemm from './fooditemm';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './loader';

const TodayFoodList = ({ eatFoodData }) => {
  return (
    <div>
      <div className="ml-5 mr-5 bg-slate-100 rounded-2xl shadow-xl">
        <div className="rounded-2xl">
          <FoodItemm testData={eatFoodData} />
        </div>
      </div>
    </div>
  );
};

export default TodayFoodList;

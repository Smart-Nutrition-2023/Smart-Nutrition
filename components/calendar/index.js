import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import renderDay from './renderDay';
import { ElevatorSharp } from '@mui/icons-material';

export const days = [];

export default function Calendar() {
  const { accessToken, me } = useSelector((state) => state.user);
  const [foodDateArray, setFoodDateArray] = useState({});
  const [foodDays, setFoodDays] = useState([]);

  function getTodayEatFood(e) {
    fetch('http://localhost:5000/main/calendar', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email: e }),
    })
      .then((res) => res.json())
      .then((json) => {
        setFoodDateArray(json);
      });
  }

  useEffect(() => {
    const fetchCalendarFood = () => {
      getTodayEatFood(me['email']);
    };
    if (me !== null) {
      fetchCalendarFood();
    }
  }, []);

  useEffect(() => {
    for (const day in days) {
      delete days.day;
    }
    // 달별로는 어케 하지?
    // const nowDate = new Date(+new Date() + 3240 * 10000)
    //   .toISOString()
    //   .split('T')[0];
    Array.from(foodDateArray).forEach(function (element) {
      console.log('ELEMENT TEST', element);
      const tmpDay = element.date.substr(8, 2);
      let dayTest = 0;
      days.forEach(function (day) {
        if (day == tmpDay) dayTest = 1;
      });
      if (dayTest == 0) {
        days.push(tmpDay);
      }
      console.log('DAYS TEST', days);
    });
    console.log('tjtnsdlsrk??', days);
    fetch('http://localhost:3000/api/eatday', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(days),
    }).then(() => {
      console.log('WlsWKehlfk', typeof days, days);
    });
  }, [foodDateArray]);

  return (
    <div className=" w-full min-h-[250px] md:min-h-[500px] flex justify-center ">
      <div className="w-5/6  flex justify-center ">
        <DayPicker
          canChangeMonth={true}
          className="Birthdays"
          renderDay={renderDay}
        />
      </div>
    </div>
  );
}

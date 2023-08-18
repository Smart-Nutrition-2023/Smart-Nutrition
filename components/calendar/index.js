import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import renderDay from './renderDay';

// export const days = [];

export default function Calendar() {
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

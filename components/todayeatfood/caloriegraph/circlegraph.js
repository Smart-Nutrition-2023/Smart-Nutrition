import { circularProgressClasses } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import React, { useState, useEffect } from 'react';

const CircleGraph = ({ percentage, weight, name }) => {
  const [percentage1, setPercentage1] = useState(1);
  // API 값으로 수정
  useEffect(() => {
    setTimeout(() => {
      setPercentage1(percentage);
    }, 2000);
  }, []);

  return (
    <div>
      <div className="flex-col">
        <div className="flex justify-center text-[8px]">{name}</div>
        <div className="w-[70px] h-[70px] flex justify-center">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <div className="flex justify-center text-[8px]">{weight}</div>
      </div>
    </div>
  );
};

export default CircleGraph;

import 'react-circular-progressbar/dist/styles.css';
import CircleGraph from './circlegraph';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const CalorieGraph = ({ tanDanGiAPI, nowTime, dataNull }) => {
  const [percentBarChange, setPercentBarChange] = useState(
    'w-[30%] rounded-2xl bg-yellow-100 ease-linear duration-500',
  );
  const percentBar = parseInt((tanDanGiAPI['calorie'] / 2000) * 100);
  const percentCarb = parseInt((tanDanGiAPI['carb'] / 130) * 100);
  const percentProtein = parseInt((tanDanGiAPI['protein'] / 55) * 100);
  const percentFat = parseInt((tanDanGiAPI['fat'] / 51) * 100);

  const totalPercent = useEffect(() => {
    if (percentBar > 100)
      setPercentBarChange(
        ' rounded-2xl bg-red1 ease-linear duration-500 delay-1000',
      );
    if (percentBar < 100)
      setPercentBarChange(
        `rounded-2xl bg-yellow-100 ease-linear duration-500 delay-1000`,
      );
  }, [tanDanGiAPI]);

  return (
    <div className="mt-12 mr-5 ml-5">
      <div className='flex justify-end font-["Jalnan"] text-xs'>{nowTime}</div>

      <div className="flex justify-center mt-6">
        <div className="w-11/12 items-end">
          {dataNull && (
            <div className="flex justify-center text-lg text-red1 mb-4">
              " 해당날짜의 먹은 음식이 없습니다 "
            </div>
          )}
          <div className="flex justify-start text-xs mt-1">총 섭취량 📌</div>
          <div className="flex justify-end text-[8px]">
            {parseInt(tanDanGiAPI['calorie'])} / 2000 kcal
          </div>

          <div className="flex justify-center mt-2">
            <div className="h-[8px] flex justify-start w-full bg-blue-300 rounded-2xl">
              <div
                className={percentBarChange}
                style={{ width: `${percentBar}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <CircleGraph
              name={'탄수화물'}
              weight={tanDanGiAPI['carb']}
              percentage={percentCarb}
            />
            <CircleGraph
              name={'단백질'}
              weight={tanDanGiAPI['protein']}
              percentage={percentProtein}
            />
            <CircleGraph
              name={'지방'}
              weight={tanDanGiAPI['fat']}
              percentage={percentFat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieGraph;

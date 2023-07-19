import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// export const data = {
//   labels: ['탄수화물', '단백질', '지방'],
//   datasets: [
//     {
//       label: '내가 먹은 영양소',
//       data: [5, 3, 1],
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

export default function Chart({ data }) {
  // console.log(tanDanGiData, data, tanDanGiData===data, "weere")
  // return <></>
  return <Radar data={data} />;
}

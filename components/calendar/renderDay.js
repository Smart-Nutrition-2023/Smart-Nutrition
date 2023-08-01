import { LinkOff } from '@mui/icons-material';
import Link from 'next/link';

// API 로 수정 할 것 30일 데이터에서 해당 날짜 색칠
const birthdays = [13];

let currentMonth = 0;
let totalDay = [];
let checkFinish = true;

const getTotalFoodEatDay = () => {
  fetch('http://localhost:5000/main/calendar', {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((json) => {
      totalDay = json;
      //console.log('TOTAL DAY', totalDay);
    });
};

export default function renderDay(day) {
  const date = day.getDate();
  const month = day.getMonth() + 1;
  const year = day.getFullYear();
  const day_week = day.getDay();

  if (!currentMonth || checkFinish) {
    if (date !== 1) {
      if (month != 12) {
        currentMonth = month + 1;
      } else {
        currentMonth = 1;
      }
    } else {
      currentMonth = month;
    }
    checkFinish = false;
  } else if (currentMonth) {
    if (
      day_week === 6 &&
      (month !== currentMonth ||
        new Date(year, currentMonth, 0).getDate() === date)
    ) {
      checkFinish = true;
    }
  }

  getTotalFoodEatDay();

  let currentMonthDay = [];
  totalDay.forEach(function (date) {
    if (date.month === currentMonth) {
      currentMonthDay.push(date.day);
    }
  });

  return (
    <div className="h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] relative">
      <div className=" bottom-0 right-0 text-sm flex items-center">{date}</div>

      {currentMonthDay.includes(date) ? (
        <Link
          key={date}
          href={{
            pathname: '/todayfoodeatdetail/',
            query: { year: year, month: currentMonth, date: date },
          }}
        >
          <a key={date}>
            <div className="break-before-column bg-yellow1 text-left text-xs flex justify-center">
              📌
            </div>
          </a>
        </Link>
      ) : null}

      {/* {birthdays[date] &&
        birthdays[date].map((name, i) => (
          <Link
            key={i}
            href={{
              pathname: '/todayfoodeatdetail/',
              query: {},
            }}
          >
            <a key={i}>
              {console.log(name)}
              <div className="break-before-column bg-yellow1 text-left text-xs flex justify-center">
                {name}
              </div>
            </a>
          </Link>
        ))} */}
    </div>
  );
}

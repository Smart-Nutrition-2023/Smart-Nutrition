import Link from 'next/link';

let currentMonth = 0;
let totalDay = [];
let checkFinish = true;

const getTotalFoodEatDay = () => {
  fetch('http://ec2-34-204-76-11.compute-1.amazonaws.com:5000/main/calendar', {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((json) => {
      totalDay = json;
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
    </div>
  );
}

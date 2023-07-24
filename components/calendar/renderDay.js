import Link from 'next/link';
import { useEffect } from 'react';

// API 로 수정 할 것 30일 데이터에서 해당 날짜 색칠
const birthdays = {
  13: ['📌'],
};

export default function renderDay(day) {
  const date = day.getDate();
  //console.log(day, 'dattttt');
  //console.log(date,"dateee")

  // useEffect(() => {
  //   birthdays[15] = '😎';
  // }, []);

  return (
    <div className="h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] relative">
      <div className=" bottom-0 right-0 text-sm flex items-center">{date}</div>

      {birthdays[date] &&
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
        ))}
    </div>
  );
}

import Link from 'next/link';

// API 로 수정 할 것 30일 데이터에서 해당 날짜 색칠
export const birthdays = [13];

let dayData = [];
const fetchBirthdays = async () => {
  await fetch('http://localhost:3000/api/eatday')
    .then((res) => res.json())
    .then((json) => {
      console.log('RES TEST', json);
      dayData = json;
    });
};

fetchBirthdays();

export default function renderDay(day) {
  const date = day.getDate();

  return (
    <div className="h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] relative">
      <div className=" bottom-0 right-0 text-sm flex items-center">{date}</div>

      {birthdays.includes(date) ? (
        <Link
          key={date}
          href={{
            pathname: '/todayfoodeatdetail/',
            query: {},
          }}
        >
          <a key={date}>
            <div className="break-before-column bg-yellow1 text-left text-xs flex justify-center">
              🍉
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

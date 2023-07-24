import { useRouter } from 'next/router';
import Calendar from '../components/calendar/index';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TodayEatFood from '../components/todayeatfood/todayeatfood';
import TodayEatFoodNull from '../components/todayeatfood/todayeatfoodnull';
import { useSelector, useDispatch } from 'react-redux'; // ***
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Home({}) {
  const router = useRouter();
  const { accessToken, me } = useSelector((state) => state.user); // ***
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('WHWHWHWHWH', me);
  }, []);

  const moveCapture = () => {
    if (me == null) {
      router.push({
        pathname: '/login',
        query: { url: '/capture' },
      });
    } else {
      router.push('/capture');
    }
  };

  const [todayFoodInfo, setTodayFoodInfo] = useState();

  useEffect(() => {
    const nowDate = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .split('T')[0];
    const fetchDate = () => {
      postMain(me['email'], nowDate);
      // fetch("http://localhost:5000/main", {
      // })
      // axios({
      //   method: 'get',
      //   url: 'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/yamm/food/eaten',
      //   params: { date: nowDate },
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // }).then((response) => {
      //   response.data.shift();
      //   setTodayFoodInfo(response.data.flat());
      // });
    };
    if (me !== null) {
      fetchDate();
    }
  }, []);

  function postMain(e, t) {
    fetch('http://localhost:5000/main', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: e, today: t }),
    })
      .then((res) => res.json())
      .then((json) => setTodayFoodInfo(json));
  }

  return (
    <>
      <div className="container mx-auto lg:w-[500px] h-full bg-slate-50 rounded-3xl">
        <div className=" h-40 p-8  text-left w-full ">
          {me == null ? (
            <span className=" flex justify-end font-bold text-3xl text-main ">
              안녕하세요. --- 님
            </span>
          ) : (
            <div className=" w-full font-bold text-3xl text-yellow1 ">
              <div className="flex justify-end  items-center">
                안녕하세요 &nbsp;
                <div className=" rounded-3xl relative w-[30px] h-[30px]">
                  <Image
                    className=" rounded-3xl"
                    src={`http://localhost:5000/${me['profile_img']}`}
                    layout={'fill'}
                  />
                </div>
              </div>
              <div className="flex justify-end ">
                "<span className='font-["Jalnan"] '>{me['nickname']}</span>
                " 님
                <br />
              </div>
            </div>
          )}
          <div className="flex justify-end text-gray-400 font-bold mt-2">
            오늘은 어떤 음식을 드셨나요?
          </div>
        </div>

        <div className="font-bold px-8 py-2 text-xl">사진 업로드</div>
        <div className="flex justify-center px-8 ">
          <button
            className="w-full h-48 top-1/2 bg-slate-800 rounded-3xl flex flex-col items-center text-white"
            onClick={moveCapture}
          >
            <div className="pt-8 text-2xl">오늘 먹은 음식을 추가해주세요</div>
            <div className="pt-4 text-main">
              <AddCircleIcon fontSize="large" />
            </div>
          </button>
        </div>
        {true ? (
          <TodayEatFood todayFoodInfo={todayFoodInfo} />
        ) : (
          <TodayEatFoodNull />
        )}
        <div className="font-bold px-8 pt-8 text-xl">달력</div>
        <div className="mt-0">
          <Calendar className="mt-0" />
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=4`,
  );
  const images = await res.json();
  return {
    props: {
      images,
    },
  };
};

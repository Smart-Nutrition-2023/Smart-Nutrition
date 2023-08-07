import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

const HamburgerMenu = ({ bgColor }) => {
  const router = useRouter();

  const handleMainMenuClick = () => {
    router.push('/main');
  };
  const handleMoveCaptureClick = () => {
    router.push('/capture');
  };
  const handleTodayEatFoodClick = () => {
    router.push({
      pathname: '/todayfoodeatdetail',
      query: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
      },
    });
  };
  const handleCalendarClick = () => {
    console.log('Calendar Clicked');
  };

  return (
    <>
      <div className={bgColor}>
        <div className=" mt-20 flex-col border-t-2 border-t-white">
          <div
            className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 "
            onClick={handleMainMenuClick}
          >
            메인 메뉴
          </div>
          <div
            className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 "
            onClick={handleMoveCaptureClick}
          >
            사진 업로드
          </div>
          <div
            className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 "
            onClick={handleTodayEatFoodClick}
          >
            오늘 먹은 음식
          </div>
          <div
            className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 "
            onClick={handleCalendarClick}
          >
            Calendar
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;

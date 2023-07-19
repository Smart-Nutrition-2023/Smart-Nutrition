import { useRef, useState } from "react";

const HamburgerMenu = ({ bgColor }) => {

    return (
        <>
          <div className={bgColor}>
              <div className=" mt-20 flex-col border-t-2 border-t-white">
                  <div className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 ">
                      메인 메뉴
                  </div>
                  <div className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 ">
                      사진 업로드
                  </div>
                  <div className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 ">
                      오늘 먹은 음식
                  </div>
                  <div className=" bg-yellow1 border-b-[1px] rounded-xl border-dashed border-white flex justify-center p-10 text-white active:bg-red1 ">
                      Calendar
                  </div>
              </div>
          </div>
        </>
    );
};

export default HamburgerMenu;
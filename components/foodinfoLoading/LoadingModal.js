import React from 'react';
import Image from 'next/image';
import classes from './LoadingModal.module.css';

function LoadingModal() {
  return (
    <div className="z-20 fixed inset-0 bg-black/50">
      <div className="fixed inset-2/4 -translate-x-2/4 -translate-y-2/4	w-[300px] h-1/4 bg-white rounded-3xl shadow-2xl border-solid border-4 border-main text-center">
        <div className="h-full p-6 justify-items-center items-center">
          <Image
            className={classes.imgLoading}
            src="/loading.png"
            alt="loading"
            width={50}
            height={50}
          />
          <div className="font-bold mt-4">
            <p className="underline decoration-main">분석중입니다.</p>
            잠시만 기다려주세요.
          </div>
        </div>
      </div>

      <a
        href="https://www.flaticon.com/kr/free-icons/"
        title="로딩 아이콘"
        className="fixed text-xs bottom-0"
      >
        로딩 아이콘 제작자: wahya - Flaticon
      </a>
    </div>
  );
}

export default LoadingModal;

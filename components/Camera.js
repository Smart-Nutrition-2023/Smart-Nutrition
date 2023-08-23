import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import axios from 'axios';

const videoConstraints = {
  width: 500,
  height: 700,
  facingMode: 'user',
};

export default function Camera({ setShowLoadingModal }) {
  // const videoConstraints = {
  //     facingMode: { exact: "environment" }
  //   };

  // 후면 카메라를 기본 카메라로 하기 위해서는 위 주석 해제
  const router = useRouter();
  const [foodImg, setFoodImg] = useState();
  const webcamRef = useRef(null);
  const [nutrition, setNutrition] = useState();

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: 'image/png' });
  };

  const capture = useCallback(() => {
    setShowLoadingModal(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setFoodImg(imageSrc);
    localStorage.setItem('image', imageSrc);

    const imgFile = dataURLtoFile(imageSrc, 'food.png');
    const formData = new FormData();
    formData.append('image', imgFile);
    postFoodImageFlask(formData);
  }, [webcamRef]);

  useEffect(() => {
    if (nutrition) {
      moveFoodInfo();
    }
  }, [nutrition]);

  const moveFoodInfo = () => {
    router.push({
      pathname: '/foodinfo',
      query: nutrition,
    });
  };

  const postFoodImageFlask = (input) => {
    fetch('http://ec2-34-204-76-11.compute-1.amazonaws.com:5001/foodimage', {
      method: 'post',
      body: input,
    })
      .then((res) => res.json())
      .then((json) => {
        setNutrition(json);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center h-full text-white bg-main/30 py-6 px-4 rounded-3xl">
        <Webcam
          className="rounded-3xl"
          audio={false}
          width={500}
          height={700}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>

      <div className="pt-4 text-center text-white">
        <button
          className="p-4 mx-4 mt-8 mb-4 rounded-3xl bg-main drop-shadow-xl"
          onClick={capture}
        >
          사진 촬영
        </button>
        <button
          className="p-4 mx-4 mt-8 mb-4 rounded-3xl bg-neutral-400 drop-shadow-xl"
          onClick={() => router.push('/main')}
        >
          촬영 취소
        </button>
      </div>
    </>
  );
}

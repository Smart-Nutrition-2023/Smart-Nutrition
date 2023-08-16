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
    // console.log(webcamRef.current, "웹캡 ")
    setShowLoadingModal(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setFoodImg(imageSrc);
    localStorage.setItem('image', imageSrc);

    const imgFile = dataURLtoFile(imageSrc, 'food.png');
    const formData = new FormData();
    formData.append('image', imgFile);
    postFoodImageFlask(formData);

    // moveFoodInfo();
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
    fetch('http://localhost:5001/foodimage', {
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
      <Webcam
        className="rounded-3xl"
        audio={false}
        width={500}
        height={700}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div className="pt-8 text-center">
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

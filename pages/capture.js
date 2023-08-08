import React, { useState, useEffect, useRef, useCallback } from 'react';
import Camera from '../components/Camera';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccessAction } from '../reducers/user';
import axios from 'axios';
import UpLoadImg from '../components/community/writeboard/uploadimg';
import CaptureUpLoad from '../components/captureupload';

function capture() {
  const [showModal, setShowModal] = useState(true);
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState('');
  const [nutrition, setNutrition] = useState();

  const [isLogined, setIsLogined] = useState(false);

  const { accessToken, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const imageRef = useRef(null);

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (files) {
      console.log(files, '여기에 file 들어가는지 확인');
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        localStorage.setItem('image', reader.result);

        const imgFile = dataURLtoFile(reader.result, 'food.png');
        const formData = new FormData();
        formData.append('image', imgFile);
        postFoodImageFlask(formData);
      };
      reader.readAsDataURL(files);
    }
  }, [files]);

  useEffect(() => {
    if (nutrition) {
      moveFoodInfo();
    }
  }, [nutrition]);

  const postFoodImageFlask = (input) => {
    fetch('http://localhost:5001/foodimage', {
      method: 'post',
      body: input,
    })
      .then((res) => res.json())
      .then((json) => setNutrition(json));
  };

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

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const router = useRouter();

  const moveFoodInfo = () => {
    router.push({
      pathname: '/foodinfo',
      query: nutrition,
    });
  };

  const getAuth = () => {
    fetch('http://localhost:5000/auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === 'True') {
          setIsLogined(true);
          dispatch(
            loginSuccessAction({
              email: json.email,
              name: json.name,
              nickname: json.nickname,
              phonenumber: json.phonenumber,
              taste: json.taste,
              profile_img: json.profile_img,
            }),
          );
        } else {
          setIsLogined(false);
          router.push({
            pathname: '/login',
          });
        }
      });
  };

  return (
    <div className="container mx-auto lg:w-[500px] h-screen bg-slate-50 rounded-3xl">
      <div className="">
        {showModal ? <Modal closeModal={closeModal} /> : null}
        <div className="flex flex-col items-center h-screen text-white bg-main/30 p-2 pd-8 rounded-3xl">
          <div className="mt-5">
            <Camera className="" />
            {/* <input type="file" id="file" ref={imageRef} className="file" accept='jpg, jpeg, png, gif' onChange={onLoadFile}/> */}
            <CaptureUpLoad onLoadFile={onLoadFile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default capture;

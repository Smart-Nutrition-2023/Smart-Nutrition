import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Memo from '../components/Memo';
import Search from '../components/Search';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccessAction } from '../reducers/user';

function foodinfo(props) {
  const router = useRouter();
  const [nutrition, setNutrition] = useState({
    '1회제공량(g)': '',
    '나트륨(mg)': '',
    '단백질(g)': '',
    '당류(g)': '',
    '에너지(kcal)': '',
    '지방(g)': '',
    '탄수화물(g)': '',
  });

  useEffect(() => {
    for (const key in router.query) {
      if (key === '음식') {
        setFoodName(router.query[key]);
      } else {
        nutrition[key] = router.query[key];
      }
    }
  }, [router.query]);

  const { accessToken, me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLogined, setIsLogined] = useState(false);

  const [foodImage, setFoodImage] = useState('');
  const [foodImageFile, setFoodImageFile] = useState();

  const [writeMemo, setWriteMemo] = useState(false);
  const [searchFoodName, setSearchFoodName] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [foodName, setFoodName] = useState();

  const nowDate = new Date(+new Date() + 3240 * 10000)
    .toISOString()
    .split('T')[0];
  const nowTime = new Date().toTimeString().split(' ')[0];

  const [todayDate, setTodayDate] = useState(nowDate);
  const [time, setTime] = useState(nowTime);
  const [memo, setMemo] = useState('');

  useEffect(() => {
    const Image = localStorage.getItem('image');
    setFoodImage(Image);
    async function fetchData() {
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
      var testfile = dataURLtoFile(Image, 'food.png');
      setFoodImageFile(testfile);
      const formData = new FormData();
      formData.append('image', testfile);
    }
    fetchData();
  }, []);

  const toggleSearch = () => setSearchFoodName((prev) => !prev);

  useEffect(() => {
    console.log(foodName);
    console.log(foodImageFile);
    console.log(todayDate + ' ' + time);
    console.log(memo);
  }, [foodName, foodImageFile, todayDate, time, memo]);

  const toggleMemo = () => setWriteMemo((prev) => !prev);
  const changeDate = (e) => setTodayDate(e.target.value);
  const changeTime = (e) => setTime(e.target.value);
  const changeMemo = (e) => setMemo(e.target.value);

  const searchFood = (e) => {
    setSearchResult(e.target.value);
  };
  const selectFood = (e) => {
    setFoodName(e.target.value);
  };
  const moveMain = () => {
    async function fetchData() {
      const formData = new FormData();
      formData.append('email', me['email']);
      formData.append('food_name', foodName);
      formData.append('image', foodImageFile);
      formData.append('date', todayDate + ' ' + time);
      formData.append('memo', memo);
      formData.append('amount', nutrition['1회제공량(g)']);
      formData.append('natrium', nutrition['나트륨(mg)']);
      formData.append('protein', nutrition['단백질(g)']);
      formData.append('sugar', nutrition['당류(g)']);
      formData.append('energy', nutrition['에너지(kcal)']);
      formData.append('fat', nutrition['지방(g)']);
      formData.append('carbohydrate', nutrition['탄수화물(g)']);
      postFoodinfo(formData);
    }
    fetchData();
    router.push('/main');
  };

  const postFoodinfo = (input) => {
    fetch('http://localhost:5000/foodinfo', {
      method: 'post',
      body: input,
    });
    for (var pair of input.entries()) console.log(pair);
  };

  useEffect(() => {
    if (!me) {
      router.push('/capture');
    }
  }, [me]);

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
      <div className="flex flex-col items-center text-center">
        <div className="m-auto text-center pt-9">
          <img src={foodImage} className="w-4/5 m-auto rounded-3xl"></img>
        </div>
        <div className="fixed bottom-0 w-full pt-8">
          <div className="h-96 rounded-t-3xl drop-shadow-[0_-10px_20px_-5px_rgba(115,115,115,0.75)] bg-main">
            <div className="py-8 text-2xl font-bold">
              사진의 음식이 {foodName} 맞으신가요?
            </div>
            <button
              className="p-4 px-8 m-4 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full"
              onClick={toggleMemo}
            >
              맞습니다
            </button>
            <button
              className="p-4 px-8 m-4 font-bold bg-white hover:bg-slate-300 shadow-lg rounded-full"
              onClick={toggleSearch}
            >
              아닙니다
            </button>

            {searchFoodName ? (
              <Search
                closeSearch={toggleSearch}
                searchFood={searchFood}
                searchResult={searchResult}
                selectFood={selectFood}
                foodName={foodName}
              />
            ) : null}

            {writeMemo ? (
              <Memo
                closeMemo={toggleMemo}
                nowTime={nowTime}
                nowDate={nowDate}
                todayDate={todayDate}
                time={time}
                memo={memo}
                changeDate={changeDate}
                changeTime={changeTime}
                changeMemo={changeMemo}
              />
            ) : null}
            <div>
              <button
                className="p-4 px-8 mt-32 text-white font-bold bg-red-600 hover:bg-red-800 shadow-lg rounded-full"
                onClick={moveMain}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default foodinfo;

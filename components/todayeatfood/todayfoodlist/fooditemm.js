import Image from 'next/image';
import { format } from 'date-fns';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import SmileClick from './smileclick';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import ReactLoading from 'react-loading';
import Router from 'next/router';
const settings = {
  className: ' w-full h-5/6  pt-1',
  centerMode: true,
  infinite: true,
  centerPadding: '5px',
  slidesToShow: 1,
  speed: 500,
};
// let date = new Date(testData[0]["date"]);
// let formatDate = format(date, "H시 mm분");
// const [testData1, setTestData1] = useState(testData)

// const routeFoodname = () => {
//   router.push({
//     pathname : `/todayfoodeatdetail/foodname`,
//     query: { "data" : testData1 }
// });
// }
// const router = useRouter();

const FoodItemm = ({ foodData, testData }) => {
  console.log('FoodItemm prop(testData):', testData);

  const [loading, setLoading] = useState(true);
  const [formDate, setFormDate] = useState('');
  const router = useRouter();
  const routeFoodname = (e) => {
    console.log(testData, 'wewewew', e.currentTarget.id);
    Router.push({
      pathname: `/todayfoodeatdetail/foodname`,
      query: {
        id: testData[e.currentTarget.id]['id'],
        img: testData[e.currentTarget.id]['image'],
        name: testData[e.currentTarget.id]['food_name'],
        memo: testData[e.currentTarget.id]['memo'],
        date: testData[e.currentTarget.id]['date'],
      },
    });
  };
  let date = '';

  useEffect(() => {
    if (testData != undefined) {
      date = new Date(testData[0]['date']);
      // formtDate = format(date, "H시 mm분");
      setFormDate(format(date, 'H시 mm분'));
    }
    setLoading(false);
  }, [testData]);

  // useEffect(()=>{
  //   setLoading()
  // }, [formDate]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <ReactLoading type="spin" color="#EDA345" />
        </div>
      ) : (
        <div className="flex">
          {/* {console.log(foodData)} */}
          <div className="w-2/6 mt-2  flex flex-col items-center justify-center">
            <div className=" col-span-1 rounded-full  w-4/6 min-h-[50px] min-w-[50px]  flex justify-center items-center relative">
              <SmileClick />
            </div>
            <div className="flexitems-center justify-center text-xs mt-1">
              <div>{formDate}</div>
            </div>
            <div className="flex items-center justify-center text-xs">
              <div>좋아요</div>
            </div>
          </div>

          {/* 여기 슬라이더 css 살짝 안맞음 수정할 것*/}
          <div className="w-4/6 flex justify-end mt-2  ">
            <div className="  rounded-2xl w-4/6 min-h-[200px] h-full  flex items-center justify-center ">
              {
                <Slider {...settings}>
                  {testData.map((test, i) => (
                    <div
                      onClick={routeFoodname}
                      className="w-[100px] h-[160px] relative "
                      key={i}
                      id={i}
                    >
                      <Image
                        className={' rounded-2xl shadow-2xl'}
                        src={`http://localhost:5000/${test['image']}`}
                        // src={`http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com${test['image']}`}
                        layout="fill"
                      />
                      <div className=" absolute w-full bottom-0 px-2 bg-yellow1 rounded-b-2xl bg-opacity-90">
                        <p className="text-xs text-neutral-200 font-sans m-3 ml-[-2px]">
                          {test['food_name']}
                        </p>
                        {/* <p className=" mb-2 flex justify-first text-[4px] text-neutral-200 font-sans overflow-hidden h-[15px]">{""}</p> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItemm;

// onClick={(e)=>(router.push({
//   pathname: '/todayfoodeatdetail',
//   query: { "img" : test["img"], "name" : test["name"], "memo" : test["memo"], "date" : test["date"]  },
// }))}

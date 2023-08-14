import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Prev = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIos
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

const Next = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIos
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );
};

const TodayEatFood = ({ todayFoodInfo }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    beforeChange: (slide, newSlide) => setCurrentSlide(newSlide),
  };

  const routeTodayFoodEatDetail = () => {
    if (user == null) {
      router.push({
        pathname: '/login',
        query: { url: '/todayfoodeatdetail' },
      });
    } else {
      router.push({
        pathname: '/todayfoodeatdetail',
        query: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          date: new Date().getDate(),
        },
      });
    }
  };

  return (
    <div>
      <div className="font-bold px-8 pt-6 pb-2 mt-10 text-xl animate-pulse">
        <p>오늘 먹은 음식</p>
      </div>

      <div className="px-8 ml-5 mr-5 rounded-2xl">
        <Slider {...settings}>
          {todayFoodInfo &&
            todayFoodInfo.map((images) => (
              <div
                className="relative h-[235px]"
                key={images.id}
                onClick={(e) => {
                  routeTodayFoodEatDetail();
                }}
              >
                <Image
                  className="rounded-3xl"
                  src={`http://localhost:5000/${images.image}`}
                  layout="fill"
                  objectFit="cover"
                />

                <div className="absolute w-full bottom-0 px-6 bg-yellow1 rounded-b-3xl bg-opacity-90">
                  <p className="text-md font-bold font-sans mt-2 mb-1 ml-[-2px] break-all">
                    {images.food_name}
                  </p>
                  <p
                    id="foodMemo"
                    className="mb-2 flex justify-first text-xs font-sans overflow-hidden break-all h-[16px]"
                  >
                    {images.memo.replace('<br />', ' ')}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <div className="flex justify-center">
        {currentSlide + 1} / {todayFoodInfo.length}
      </div>
    </div>
  );
};

export default TodayEatFood;

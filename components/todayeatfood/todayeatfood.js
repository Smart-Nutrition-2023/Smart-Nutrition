import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@mui/icons-material';

const Prev = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, color: 'black' }}
      onClick={onClick}
    >
      <ArrowLeftOutlined fontSize="large" />
    </div>
  );
};

const Next = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, color: 'black' }}
      onClick={onClick}
    >
      <ArrowRightOutlined fontSize="large" />
    </div>
  );
};

const TodayEatFood = ({ todayFoodInfo }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const slickRef = useRef(null);

  const settings = {
    centerMode: true,
    infinite: true,
    dots: true,
    centerPadding: '0px', // centerPadding: '30px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
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
    <div className="">
      <div className="font-bold px-8 pt-6 pb-2 mt-6 text-xl animate-pulse">
        <p>오늘 먹은 음식</p>
      </div>
      <div className="px-8 ml-5 mr-5 rounded-2xl">
        <Slider {...settings} ref={slickRef}>
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
                  <p className="text-md font-bold font-sans mt-1 mb-1 ml-[-2px] break-all">
                    {images.food_name}
                  </p>
                  <p className="mb-2 flex justify-first text-xs font-sans overflow-hidden break-all h-[16px]">
                    {images.memo}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFood;

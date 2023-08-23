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

  const routeFoodname = (e) => {
    router.push({
      pathname: `/todayfoodeatdetail/foodname`,
      query: {
        id: todayFoodInfo[e.currentTarget.id]['id'],
        img: todayFoodInfo[e.currentTarget.id]['image'],
        name: todayFoodInfo[e.currentTarget.id]['food_name'],
        memo: todayFoodInfo[e.currentTarget.id]['memo'],
        date: todayFoodInfo[e.currentTarget.id]['date'],
      },
    });
  };

  return (
    <div>
      <div className="font-bold px-8 pt-6 pb-2 mt-10 text-xl animate-pulse">
        <p>오늘 먹은 음식</p>
      </div>

      <div className="px-8 ml-5 mr-5 rounded-2xl">
        <Slider {...settings}>
          {todayFoodInfo &&
            todayFoodInfo.map((images, i) => (
              <div
                className="relative h-[235px]"
                key={images.id}
                onClick={routeFoodname}
                id={i}
              >
                <Image
                  className="rounded-3xl"
                  src={`http://ec2-34-204-76-11.compute-1.amazonaws.com:5000/${images.image}`}
                  layout="fill"
                  objectFit="cover"
                />

                <div className="absolute w-full bottom-0 px-6 bg-yellow1 rounded-b-3xl bg-opacity-90">
                  <div className="flex justify-between my-2">
                    <p className="text-md font-bold font-sans ml-[-2px] break-all">
                      {images.food_name}
                    </p>
                    <p className="text-white text-xs">
                      {currentSlide + 1} / {todayFoodInfo.length}
                    </p>
                  </div>
                  <p
                    id="foodMemo"
                    className="mb-2 flex justify-first text-xs font-sans overflow-hidden break-all h-[16px]"
                  >
                    {images.memo.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}
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

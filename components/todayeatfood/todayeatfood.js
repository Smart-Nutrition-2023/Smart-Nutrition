import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const settings = {
  className: ' ',
  centerMode: true,
  infinite: true,
  dots: true,
  centerPadding: '30px',
  slidesToShow: 1,
  speed: 500,
};

const TodayEatFood = ({ todayFoodInfo }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

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

  console.log('TodayFoodInfo list test', todayFoodInfo);

  return (
    <div className="">
      <div className="font-bold px-8 pt-6 pb-2 mt-6 text-xl animate-pulse  ">
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
                <div className="absolute h-[155px] overflow-hidden">
                  <img
                    className="w-100 h-100 rounded-t-3xl px-2"
                    layout="fill"
                    src={`http://localhost:5000/${images.image}`}
                  ></img>
                </div>

                <div className="w-full absolute px-2 top-[155px]">
                  <div className="w-100 h-20 pt-1 px-4 bg-main rounded-b-3xl break-all">
                    <p className="font-bold text-lg pt-2 ">
                      {images.food_name}
                    </p>
                    <p className="text-md h-1/2 break-all py-2 w-full overflow-y-hidden">
                      {images.memo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFood;

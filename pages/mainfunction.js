import { useRouter } from "next/router";
import Calendar from "../components/calendar/index";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TodayEatFood from "../components/todayeatfood/todayeatfood";
import TodayEatFoodNull from "../components/todayeatfood/todayeatfoodnull";
import { useSelector } from 'react-redux';
import Link from "next/link";

export default function Home({ images }) {
  
  const router = useRouter();
  const  { accessToken }   = useSelector((state) => state.user);

  const moveCapture = () => {
    router.push('/capture')
  }
  const moveLogin = (e) => {
    console.log("test bubbling moveLogin, mainfunction")
    if(accessToken != null) {
      router.push("/todayfoodeatdetail")
    }else{
      router.push({
        pathname : `/login`,
        query: { "url" : "todayfoodeatdetail" } 
      });
    }
    
  }

  return (
    <>
    <div className="container mx-auto h-full bg-slate-50 rounded-3xl">
      <div className="w-80 h-40 p-8 flex text-left flex-col justify-center">
        <span className="font-bold text-3xl text-main ">안녕하세요. ---님</span><br/>
        <span className="font-bold ">오늘은 어떤 음식을 드셨나요?</span>
      </div>

      <div className="font-bold px-8 py-2 text-xl">사진 업로드</div>
      <div className="flex justify-center px-8  ">
        <button className="w-full h-48 top-1/2 bg-slate-800 rounded-3xl flex flex-col items-center text-white" onClick={moveCapture}>
          <div className="pt-8 text-2xl">오늘 먹은 음식을 추가해주세요</div>
          <div className="pt-4 text-main">
            <AddCircleIcon fontSize="large"/>
          </div>
        </button>
      </div>

      { true && <TodayEatFood images={images}/>}
      { false && <TodayEatFoodNull />}

      
      <div onClick={(e) => {
        e.stopPropagation();
        moveLogin();}}>

        <Calendar />
      </div>     
    </div>
    </>
  )
}

export const getServerSideProps = async() => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=4`)
  const images = await res.json();
  return {
    props: {
      images
    }
  }
}

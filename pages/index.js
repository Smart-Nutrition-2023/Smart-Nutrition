import { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import Fade from 'react-reveal/Fade'
import { useRouter } from "next/router";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function intro() {
  
  const foodcontainer = useRef();
  const cameracontainer = useRef();
  const socialcontainer = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: foodcontainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require("../public/foodcontainer.json")
    })

    lottie.loadAnimation({
      container: cameracontainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require("../public/camera.json")
    })
    lottie.loadAnimation({
      container: socialcontainer.current,
      renderer: 'svg',
      lopp: true,
      autoplay: true,
      animationData: require("../public/socialcontainer.json")
    })
  })

  const router = useRouter();

  const moveLogin = () => {
      router.push({
          pathname: '/main',
      })
  }

  return ( 
    <>
      <div className="w-screen h-screen">
         <div className="w-full h-full flex bg-slate-50">
          <div className="m-auto text-center">
            <Fade bottom> 
              <div>
                <img className="w-96 h-96 mt-2" src='mainlogo.png' alt="mainlogo"/>
              </div>
            </Fade>

            <Fade bottom> 
              <p className="mt-4 text-2xl font-bold">
                지금 바로<br/> 
                <span className="text-main text-3xl">스마트뉴트리션 </span>
                을 시작해보세요.
              </p>
              <div className="">
                <button className="mt-8 w-auto p-4 text-white font-bold shadow-md rounded-3xl bg-main" onClick={moveLogin}>시작하기</button>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </> 
  )
  }

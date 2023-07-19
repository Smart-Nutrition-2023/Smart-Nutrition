import { bgcolor } from '@mui/system';
import Image from 'next/image';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import HamburgerMenu from './hamburgermenu';
import FontTitle from '../../font/fontTitle';
import { useRouter } from 'next/router';
const TopNav = () => {

  const router = useRouter();
  const [sideMenuToggle, setSideMenuToggle]  = useState({
    "toggle" : undefined,
    "bgColor" : ""
  });
  const toggleSideMenu = useRef(null);
  const sideMenuToggleFunction = () =>{
    setSideMenuToggle({
      ...sideMenuToggle,
      ["toggle"] : true,
      ["bgColor"] : "bg-yellow1 animate-wiggledown inset-0 top-0 left-0 absolute z-10"
    });
    if(sideMenuToggle["toggle"]==true) {
      setSideMenuToggle({
        ...sideMenuToggle,
        ["toggle"] : false,
        ["bgColor"] : "bg-white duration- opacity-70 delay-700 animate-wiggleup inset-0 top-0 left-0 absolute z-10"
      })
    }
  } 

  // 1. 에니메이션 끝나고 사라지기
  // 2. useEffect 

  const dalayHiddenHamburgerMenu = useEffect(()=>{
    try{
      if(sideMenuToggle["toggle"] !== undefined){ // 해결 부분
        toggleSideMenu.current.className=""; 
        setTimeout(() => {
          if(sideMenuToggle["toggle"] == false) toggleSideMenu.current.className=" hidden";
        }, 900);
      }
    }catch(e){
      
    }
    
  }, [sideMenuToggle["toggle"]]);
  
  return (
    <>
      <div className='flex justify-between ' >
        <div onClick={(e)=>{
          router.push('/main')
        }} className='  relative h-[30px] w-[30px] mt-[28px] ml-[28px] dur'>
          <Image src={"/Arrow2.svg"} layout={"fill"} />
        </div>
        <div className='mt-7 text-2xl font-bold'>
                <FontTitle marginTop="" textSize="text-xl" />
        </div>
        <div onClick={sideMenuToggleFunction} className='relative z-30 h-[30px] w-[30px] mt-[28px] mr-[28px]'>
          {sideMenuToggle["toggle"] ? <Image src={"/cancelx.svg"} layout={"fill"}/>
                          : <Image src={"/HambergerMenu.svg"} layout={"fill"}/>}
        </div>
      </div>
      
      <div ref={toggleSideMenu} className="hidden"> 
        <HamburgerMenu bgColor={sideMenuToggle["bgColor"]}/>
      </div>
      {/* <div ref={toggleSideMenu} className="hidden"> */} 
      {/* <div className="" 
        style={{ transition : "opacity 900ms step-end",
                opacity : sideMenuToggle["toggle"] ? 1 : 0 }} >

        <HamburgerMenu bgColor={sideMenuToggle["bgColor"]}/>
      </div> */}
      
    </>
  );
};

export default TopNav;
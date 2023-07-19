import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const imageWrap = "";
const extraMenuModalContainer = "w-screen h-screen bg-gray-100 z-10 fixed top-0 left-0 flex justify-center bg-opacity-60";


// 모달 창 크기 만큼 마우스를 감지하고 그 밖을 클릭하면 isclicked = false

const ExtraMenuModal = () => {

    const [isExtraMenuImageClicked, setIsExtraMenuImageClicked] = useState(false); 
    const [isModalClicked, setIsModalClicked] = useState(false); 
    
    const windowClick = () => {
        
    };
    const modalItemBubbleStop = (e) => {
        
        setIsExtraMenuImageClicked(false);
        e.stopPropagation();
    }
    const modalview1 = useEffect((e)=>{
        window.addEventListener('click', windowClick);
        return ()=>{
            window.removeEventListener('click', windowClick);
        }
    },[isModalClicked, isExtraMenuImageClicked]);

    return (
        <>
            <div onClick={(e)=>{setIsExtraMenuImageClicked(true)}} className={imageWrap}>
                <Image src="/dot3.svg" width="30px" height="30px" />
            </div>
            { isExtraMenuImageClicked && 
                <div onClick={(e)=>{setIsExtraMenuImageClicked(false); console.log("backlog-modal")}} className={extraMenuModalContainer}>
                    <div className="w-screen h-1/6 fixed bottom-0 flex-col justify-center border-t-2 border-slate-900 rounded-3xl ml-10 mr-10 divide-y divide-dashed p-[10px] bg-stone-100">
                        <div className='text-center' onClick={(e)=>{modalItemBubbleStop(e)}} >되돌아가기</div>
                        {/* <div className='text-center' onClick={(e)=>{modalItemBubbleStop(e)}} >저장</div>
                        <div className='text-center' onClick={(e)=>{modalItemBubbleStop(e)}} >공유</div> */}
                    </div>
                </div>
                
            }
        </>
    );
}

export default ExtraMenuModal;
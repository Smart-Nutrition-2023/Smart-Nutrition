import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import ImageItem from '../components/ImageItem';
import ExtraMenuModal from '../components/ExtraMenuModal';
import BoardTitle from '../components/BoardTitle';
// flex 말고 grid를 써야하나?
const boardTitleExtraMenuWrap1 = "flex justify-between mt-1";
const boardTitleExtraMenuWrap = "";

export default function BoardCards({ image, boardTitle, classNameCSS, content, idx, hit, tag, create_date, user_info, reaction }){
    const contentLength = useMemo(()=>{
        //console.log(content.length,'here') 나중에 사진 길이 체크할 함수 !!
        if (content.length < 20){
            return "min-h-[4px]";
        }else if(content.length >= 20 && content.length < 50){
            return "min-h-[8px]";
        }else if(content.length >= 51 && content.length < 100){
            return "min-h-[12px]";
        }else{
            return "min-h-[25px]";
        }
    },[]);
    
    return (
        <div className='mt-[5px]'>
          <div className={classNameCSS}>
              {/* API 호출 후 10개 씩 BORAD CARD IMAGE 받아온다 */}
              <ImageItem image={image} contentLength={contentLength} boardTitle={boardTitle} idx={idx} hit={hit} content={content} tag={tag} create_date={create_date} user_info={user_info} reaction={reaction} />
              
      
              <div className={boardTitleExtraMenuWrap1}>
                  <BoardTitle boardTitle={boardTitle}>
                  </BoardTitle>
                  {/* CSS margin 겹침 현상 ?? 모르겠음 */}
                  <ExtraMenuModal>
                  </ExtraMenuModal>
              </div>
              <div className={contentLength}></div>
          </div>
        </div>
    );
}
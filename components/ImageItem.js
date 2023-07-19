import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';

const imageWrap ="rounded-2xl border-indigo-500 bg-gray-50 w-full h-full relative min-h-[120px]";
const ImageItem = ({ image, idx, hit, content, tag, create_date, user_info, reaction, boardTitle}) => {
    const router = useRouter();
    const routeFuntion = () => {
        Router.push({
            pathname : `/community/board/${idx}`,
            query: { "image": image, "hit" : hit, "content" : content, "idx" : idx, "tag" : tag, "create_date" : create_date, "user_info1" : user_info ,
                   "nickname" : user_info["nickname"], "profile_img" : user_info["profile_img"], "reaction" : reaction, "boardTitle" : boardTitle  } 
        });
    }
    return (
        <>
          <div onClick={(e)=>{routeFuntion()}} className={imageWrap}>
              
              <Image className={'rounded-2xl'} src={image} layout={"fill"}  />
          </div>
        </>
    );
}

export default ImageItem;
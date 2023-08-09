import BoardCards from '../components/BoardCards';
import { memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import Loader from '../components/Loader';
import Dummy from '../components/Dummy';
import BottomNav from '../components/BottmNav/BottomNav';
import { dataDummy } from '../components/Dummy';
import axios from 'axios';
import Image from 'next/image';

const targetCSS =
  'w-screen h-[140px] flex justify-center text-center items-center';
const container = 'flex';
const itemWrapper = 'flex flex-col w-1/2';

const Community = () => {
  const bottomNav = useRef(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState(dataDummy);

  const [boardItem, setBoardItem] = useState({
    count: 0,
    // next: 'http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com/api/boards/',
    next: null,
    item: [],
  });
  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  });
  const listener = (e) => {
    try {
      setCurrentScrollY(-document.body.getBoundingClientRect().y);
      const scrollDirection = lastScrollTop < currentScrollY ? 'down' : 'up';
      setLastScrollTop(currentScrollY);
      scrollDirection == 'down'
        ? (bottomNav.current.className = 'hidden')
        : (bottomNav.current.className = '');
    } catch (e) {}
  };

  const itemListMap = useMemo(() => {
    let boardCardImage = '';
    let oddResult = boardItem['item'].map((item, i) => {
      // console.log(item["images"].length == 0 )
      if (i % 2 != 0) {
        if (item['images'].length == 0) {
          boardCardImage = '/noimage1.svg';
        } else {
          boardCardImage = '/noimage1.svg';
          // boardCardImage = `http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com${item['images'][0]['img']}`;
        }
        // console.log(item)
        return (
          <BoardCards
            classNameCSS="ml-2 mr-2"
            key={i}
            image={boardCardImage}
            boardTitle={item['title']}
            content={item['content']}
            idx={item['id']}
            hit={item['reaction']}
            tag={item['tags']}
            create_date={item['create_date']}
            user_info={item['user_info'][0]}
            reaction={item['reaction']}
          />
        );
      }
    });
    let evenResult = boardItem['item'].map((item, i) => {
      if (i % 2 == 0) {
        if (item['images'].length == 0) {
          boardCardImage = '/noimage1.svg';
        } else {
          boardCardImage = '/noimage1.svg';
          // boardCardImage = `http://elice-kdt-ai-3rd-team15.koreacentral.cloudapp.azure.com${item['images'][0]['img']}`;
        }
        return (
          <BoardCards
            classNameCSS="ml-2 mr-2"
            key={i}
            image={boardCardImage}
            boardTitle={item['title']}
            content={item['content']}
            idx={item['id']}
            hit={item['reaction']}
            tag={item['tags']}
            create_date={item['create_date']}
            user_info={item['user_info'][0]}
            reaction={item['reaction']}
          />
        );
      }
    });
    return [evenResult, oddResult];
  }, [boardItem]);
  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // API 호출로 수정
    let Items = dataDummy;
    setItemLists((itemLists) => itemLists.concat(Items));
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.4 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, []);

  useEffect(() => {
    // console.log("", boardItem)
    // if(boardItem["next"] !=null ){
    //   axios.get(boardItem["next"])
    //   .then((res)=>{
    //     // console.log(res.data ," 데이터 가져온느거 성공")
    //     setBoardItem((prevState)=>({
    //       ...prevState,
    //       count : res.data["count"],
    //       next : res.data["next"],
    //       item : [...prevState["item"],...res.data["results"]],
    //     }))
    //   })
    //   .catch((error)=>console.log(error, "첫 데이터 가져올때 error"))
    // }
  }, [boardItem]);
  return (
    <div className="  flex justify-center">
      <div className="lg:w-[500px]">
        <div ref={bottomNav} className="hidden">
          <BottomNav></BottomNav>
        </div>
        <div className={container}>
          <div className={itemWrapper}>{itemListMap[0]}</div>
          <div className={itemWrapper}>{itemListMap[1]}</div>
        </div>

        {boardItem['next'] == null ? (
          <div className=" flex justify-center p-3 font-bold text-yellow1 text-xl border-2 border-yellow1 shadow-lg">
            {' '}
            마지막 게시글 입니다!{' '}
          </div>
        ) : (
          <div className={targetCSS} ref={setTarget}>
            {isLoaded && <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

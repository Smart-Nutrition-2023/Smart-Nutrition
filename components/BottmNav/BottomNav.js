import BottomNavHome from './BottomNavHome';
import BoardOrder from './BoardOrder';
import WriteBoardDetail from './WriteBoardDetail';

const BottomNav = () => {


    return (
        <div className=' z-10 bg-slate-50 shadow-2xl rounded-full w-1/2 fixed flex justify-center left-1/2 bottom-5 transform -translate-x-1/2 -translate-y-1/2 '>
            <div className=' w-4/5 flex justify-between space-x-8'>
                {/* space-x-12 로 바꾸면 간격만 벌어지는 것이 아니라 크기도 바뀜 왜..?*/}
                <BottomNavHome />
                <BoardOrder />
                <WriteBoardDetail />
            </div>
        </div>
    );
}

export default BottomNav;
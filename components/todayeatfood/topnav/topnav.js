import Image from 'next/image';
import { useRouter } from 'next/router';
import FontTitle from '../../font/fontTitle';

const TopNav = () => {
    const router = useRouter();
    const routeBackFuntion = () => router.push({ pathname : `/mainfunction`, });
    const routeUpLoadFuntion = () => router.push({ pathname : `/uploadfoodimg`, });
    
    return (
        <div className='flex justify-between m-5'>
            <div onClick={(e)=>{routeBackFuntion()}} className='w-[30px] h-[30px]'>
                <Image src="/Arrow2.svg" width="100%" height="100%" />
            </div>
            <div className='mt-1 text-2xl font-bold'>
                <FontTitle marginTop="" textSize="text-xl" />
            </div>
            
            <div onClick={(e)=>{routeUpLoadFuntion()}} className='rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white' id="testForm"> 
                업로드
            </div>
               
            
        </div>
    );
};

export default TopNav;
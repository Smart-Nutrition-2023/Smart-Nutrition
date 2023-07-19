import Image from 'next/image';
import { useRouter } from 'next/router'
const BottomNavHome = () => {
    const router = useRouter();
    const routeFuntion = (e) => {
        router.push('/main')
    }
    return (
        <div onClick={(e)=>{routeFuntion();}}>
            <Image src="/home1.svg" width="100%" height="100%" />
        </div>
    );
}

export default BottomNavHome;
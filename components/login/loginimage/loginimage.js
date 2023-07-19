import Image from 'next/image';

const LoginImage = ({ imageUrl }) => {
    return (
        <div className='relative h-[30px] w-[30px] flex align-middle m-1'>
            <Image src={imageUrl} layout='fill'/>
        </div>
    );
};

export default LoginImage;
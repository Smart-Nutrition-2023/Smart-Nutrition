import Image from 'next/image';
import { useRouter } from 'next/router';

const WriteBoardDetail = () => {
  const router = useRouter();
  const routeFuntion = () => {
    router.push('/community/writeboard');
  };
  return (
    <div
      onClick={(e) => {
        routeFuntion();
      }}
    >
      <Image src="/write.svg" width="100%" height="100%" />
    </div>
  );
};

export default WriteBoardDetail;

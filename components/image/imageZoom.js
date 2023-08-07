import { useRouter } from 'next/router';
import Image from 'next/image';

const ImageZoomModal = ({ isSetImageZoomModal, foodImage }) => {
  const router = useRouter();

  const handleDeleteClick = () => {};

  return (
    <>
      <div
        onClick={(e) => {
          isSetImageZoomModal(false);
        }}
        className="h-screen inset-0 absolute"
      >
        <div className="">
          <div className="w-100 h-100">
            <Image
              // className={'rounded-2xl shadow-2xl'}
              src={`http://localhost:5000/${foodImage}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        {/* <div className="bg-white w-[300px] shadow-lg border-2 border-slate-200 px-8 py-6 mb-4 fixed rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center">정말 삭제하시겠습니까?</div>

          <div className="flex justify-center mx-5 mt-6">
            <div
              className="rounded-2xl w-[60px] mr-3 flex justify-center items-center bg-red-600 text-white"
              onClick={handleDeleteClick}
            >
              예
            </div>
            <div className="rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white">
              아니오
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ImageZoomModal;

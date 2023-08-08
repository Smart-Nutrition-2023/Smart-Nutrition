import { useRouter } from 'next/router';
import Image from 'next/image';

const ImageZoomModal = ({ isSetImageZoomModal, foodImage }) => {
  const router = useRouter();

  const handleDeleteClick = () => {};

  return (
    <>
      {/* w-screen h-screen inset-0 absolute bg-gray-200 bg-opacity-75 */}
      <div
        onClick={(e) => {
          isSetImageZoomModal(false);
        }}
        className="w-screen h-screen inset-0 absolute bg-gray-200 bg-opacity-75"
      >
        <div className="w-100 h-100">
          <div className="h-4/6">
            <Image
              // className={'rounded-2xl shadow-2xl'}
              src={`http://localhost:5000/${foodImage}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageZoomModal;

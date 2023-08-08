import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ImageZoomModal = ({ isSetImageZoomModal, foodImage }) => {
  const router = useRouter();

  // useEffect(() => {
  //   document.body.style = `overflow: hidden`;
  //   return () => (document.body.style = `overflow: auto`);
  // }, []);

  return (
    <>
      <div
        onClick={(e) => {
          isSetImageZoomModal(false);
        }}
        className="z-50 inset-0 absolute"
      >
        <div className="bg-white shadow-lg border-2 border-slate-200 p-1 mb-4 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center ">
            <img src={`http://localhost:5000/${foodImage}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageZoomModal;

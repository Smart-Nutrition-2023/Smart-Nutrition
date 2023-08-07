import React from 'react';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

function Modal({ closeModal }) {
  return (
    <div className="z-20 fixed inset-0 bg-black/50">
      <div className="fixed inset-2/4 -translate-x-2/4 -translate-y-2/4	lg:w-[500px] w-10/12 h-1/2 bg-white rounded-3xl shadow-2xl border-solid border-4 border-main text-center">
        <CloseIcon onClick={closeModal} />
        <div className="h-full p-6 grid grid-cols-2 gap-4 justify-items-center items-center">
          <Image
            src="/focus.svg"
            alt="focus"
            width={200}
            height={200}
            className=""
          />

          <div className="font-bold">
            {' '}
            밝은 곳에서
            <p className="underline decoration-main">
              {' '}
              카메라 정중앙에
              <br />
              음식을 놓아주세요.
            </p>
          </div>

          <div className="font-bold">
            음식은
            <p className="underline decoration-main">하나씩만 찍어주세요.</p>
          </div>
          <Image src="/food.svg" alt="focus" width={200} height={200} />
        </div>
      </div>
    </div>
  );
}

export default Modal;

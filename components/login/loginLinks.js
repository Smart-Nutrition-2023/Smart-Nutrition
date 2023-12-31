import { useState } from 'react';
import FontTitle from '../font/fontTitle';
import SignUpModal from './signup/signupmodal';
import Image from 'next/image';
import Router from 'next/router';

export default function LoginLinks() {
  const [isSignUpModal, isSetSignUpModal] = useState(undefined);

  return (
    <>
      <div className="ml-5 mr-5 mt-5 flex justify-center overflow-hidden">
        <div className="fixed bottom-8">
          <div className="grid grid-cols-6 grid-flow-row gap-5 w-full">
            <div className="col-span-2 flex justify-center mt-1">
              <FontTitle marginTop="" textSize="text-sm" />
            </div>

            <button
              className="col-span-2 flex justify-center"
              onClick={(e) => {
                isSetSignUpModal(true);
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
      {isSignUpModal && (
        <SignUpModal
          isSetSignUpModal={isSetSignUpModal}
          isSignUpModal={isSetSignUpModal}
        />
      )}
    </>
  );
}

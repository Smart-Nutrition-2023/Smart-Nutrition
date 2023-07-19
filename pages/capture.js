import React, { useState, useEffect, useRef, useCallback } from 'react'
import Camera from '../components/Camera'
import Modal from '../components/Modal'
import { useRouter } from "next/router";
import axios from 'axios';
import UpLoadImg from '../components/community/writeboard/uploadimg';
import CaptureUpLoad from '../components/captureupload';

function capture() {

  const [showModal, setShowModal] = useState(true);
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState('');

  const imageRef = useRef(null);

  useEffect(() => {
    if(files) {
      console.log(files, "여기에 file 들어가는지 확인")
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result)
        localStorage.setItem("image", reader.result);
        moveFoodInfo();
      }
      reader.readAsDataURL(files)
    }
  },[files]) 

  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file)
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const router = useRouter();

  const moveFoodInfo = () => {
      router.push({
          pathname: '/foodinfo',
      })
  }

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
        <div className="">
            {showModal ? <Modal closeModal={closeModal}/> : null}
              <div className="h-screen text-white bg-main/30 p-2 pd-8 rounded-3xl">
                <div className="mt-10">
                  <Camera className=""/>
                    {/* <input type="file" id="file" ref={imageRef} className="file" accept='jpg, jpeg, png, gif' onChange={onLoadFile}/> */}
                    <CaptureUpLoad onLoadFile={onLoadFile} />
                </div>
              </div>
        </div>
    </div>
  )
}

export default capture



import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccessAction } from '../../../reducers/user';

const ModifyProfileModal = ({ isSetModifyProfileModal, me }) => {
  const router = useRouter();
  const [isLogined, setIsLogined] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const postProfileModify = (input) => {
    fetch('http://localhost:5000/myinfo/modifyprofile', {
      method: 'post',
      credentials: 'include',
      body: input,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === 'True') {
          dispatch(loginSuccessAction(formData));
          setIsModified(true);
        } else {
          alert(json.isSuccess);
        }
      });
  };

  const [inputValue, setInputValue] = useState({
    profile_img: me['profile_img'],
  });

  const [imageFile, setImageFile] = useState(null);
  const handleImage = (event) => setImageFile(event.target.files[0]);

  const formData = new FormData();

  const submitFuction = async (e) => {
    e.preventDefault();

    formData.append('email', me['email']);
    formData.append('name', me['name']);
    formData.append('nickname', me['nickname']);
    formData.append('phonenumber', me['phonenumber']);
    formData.append('taste', me['taste']);
    formData.append('profile_img', imageFile);

    for (var pair of formData.entries()) console.log(pair);
    postProfileModify(formData);
  };

  useEffect(() => {
    if (isModified) {
      location.reload(true);
    }
  }, [isModified]);

  return (
    <>
      <div
        onClick={(e) => {
          isSetModifyProfileModal(false);
        }}
        className="w-screen h-screen inset-0 absolute bg-gray-200 bg-opacity-75"
      >
        <form
          onSubmit={submitFuction}
          encType="multipart/form-data"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white lg:w-[450px] h-2/7 shadow-md px-8 pt-6 pb-8 mb-4 overflow-auto fixed p-5 rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="mb-4">
            <label
              className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              프로필 사진
            </label>
            <input
              onChange={handleImage}
              name="image"
              className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              placeholder="사진을 입력해 주세요"
            ></input>
          </div>

          <div className="flex flex-col items-center">
            <button className="bg-yellow1 mx-8 mt-8 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              프로필 저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModifyProfileModal;

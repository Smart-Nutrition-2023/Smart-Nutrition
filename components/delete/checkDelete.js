import { useRouter } from 'next/router';

const CheckDeleteModal = ({ isSetCheckDeleteModal, foodId }) => {
  const router = useRouter();

  const handleDeleteClick = () => {
    console.log('delete', foodId);
    fetch('http://localhost:5000/fooddetail/delete', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: foodId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isDeleted === true) {
          router.push('/main');
        }
      });
  };

  return (
    <>
      <div
        onClick={(e) => {
          isSetCheckDeleteModal(false);
        }}
        className="inset-0 absolute"
      >
        <div
          className="bg-white w-[300px] shadow-lg border-2 border-slate-200 px-8 py-6 mb-4 fixed rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-center">정말 삭제하시겠습니까?</div>

          <div className="flex justify-center mx-5 mt-6">
            <div
              className="rounded-2xl w-[60px] mr-3 flex justify-center items-center bg-red-600 text-white"
              onClick={handleDeleteClick}
            >
              예
            </div>
            <div
              className="rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white"
              onClick={(e) => {
                isSetCheckDeleteModal(false);
              }}
            >
              아니오
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckDeleteModal;

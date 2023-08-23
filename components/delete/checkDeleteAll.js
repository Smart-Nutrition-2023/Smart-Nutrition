import { useRouter } from 'next/router';

const CheckDeleteAllModal = ({ isSetCheckDeleteModal, year, month, date }) => {
  const router = useRouter();

  const handleDeleteClick = () => {
    fetch(
      'http://ec2-34-204-76-11.compute-1.amazonaws.com:5000/fooddetail/deleteall',
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, month, date }),
      },
    )
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
        className="z-50 inset-0 fixed bg-black/50"
      >
        <div
          className="bg-white w-[300px] shadow-lg border-2 border-slate-200 px-8 py-6 mb-4 fixed rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-center">정말 모두 삭제하시겠습니까?</div>

          <div className="flex justify-center mx-5 mt-6">
            <button
              className="rounded-2xl w-[60px] mr-3 flex justify-center items-center bg-red-600 text-white"
              onClick={handleDeleteClick}
            >
              예
            </button>
            <button
              className="rounded-2xl w-[60px] flex justify-center items-center bg-red-600 text-white"
              onClick={(e) => {
                isSetCheckDeleteModal(false);
              }}
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckDeleteAllModal;

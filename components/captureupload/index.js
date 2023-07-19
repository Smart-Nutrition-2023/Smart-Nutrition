const CaptureUpLoad = ({ onLoadFile }) => {
    return (
        <div className=" w-full  flex justify-center items-center ">
            <div className="flex justify-center items-center mt-4 w-4/6  ">
                <div className="w-full ml-5 mr-5 rounded-3xl shadow-sm bg-gray-50">
                    <div className="m-4">
                        {/* <label className="inline-block mb-2 font-semibold text-gray-500">사진 업로드</label> */}
                        <div className="flex items-center justify-center w-full">
                            <label  className="flex flex-col w-full h-32 border-4 border-[#ece06f88] border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        사진을 올려주세요 !</p>
                                </div>
                                <input onChange={onLoadFile} type="file" className="opacity-0" />
                            </label>
                        </div>
                    </div>
                    {/* <div className="flex justify-center p-2">
                        <button  className="w-full px-4 py-2 text-white bg-yellow1 rounded shadow-xl">제출</button>
                    </div> */}
                </div>
            </div> 
        </div>
    );
};
export default CaptureUpLoad;
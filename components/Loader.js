import { memo } from "react";
import ReactLoading from "react-loading";

const LoaderWrap = "w-full h-3/4 flex justify-center text-center items-center";

const Loader = () => {
  return (
    <div className={LoaderWrap}>
      <ReactLoading type="spin" color="#A593E0" />
    </div>
    
  );
};

export default memo(Loader);
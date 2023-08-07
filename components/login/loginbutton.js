const LoginButton = () => {
  return (
    <div className="flex justify-center mt-[45px] w-full">
      <button className="w-full h-12 rounded-xl active:rounded-xl bg-yellow1 active:bg-red1">
        <p className="text-white text-2xl hover:rounded-xl">로그인</p>
      </button>
    </div>
  );
};

export default LoginButton;

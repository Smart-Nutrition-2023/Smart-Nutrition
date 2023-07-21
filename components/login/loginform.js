import LoginButton from './loginbutton';
import Image from 'next/image';
import LoginImage from './loginimage/loginimage';

const LoginForm = ({ onSubmit, setEmail, setPassword }) => {
  const onchangeEmailPassword = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <div className="mt-[76px] ml-[21px] mr-[21px]">
        <div>
          <div className="rounded-t-lg rounded-b-lg border-2 border-slate-100 px-0 shadow-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1">
            <div className="flex justify-between items-center">
              <LoginImage imageUrl="/email.svg" />
              <input
                onChange={onchangeEmailPassword}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="아이디를 입력하세요"
                type="text"
                name="email"
              />
            </div>
            <div className="flex justify-between items-center">
              <LoginImage imageUrl="/lock.svg" />
              <input
                onChange={onchangeEmailPassword}
                className="placeholder:italic placeholder:text-slate-400 block  w-full  rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="비밀번호를 입력하세요"
                type="password"
                name="password"
              />
            </div>
          </div>
          <div onClick={onSubmit}>
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

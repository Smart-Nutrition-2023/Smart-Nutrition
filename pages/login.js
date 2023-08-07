import LoginNavbar from '../components/login/loginNavBar';
// 마이 페이지를 게더타운 처럼 만들면 어떨가
export default function Login() {
  return (
    <div className="container mx-auto lg:w-[500px] h-full rounded-3xl">
      <LoginNavbar />
      {/* <LoginInputIdPw /> */}
      {/*<LoginLinks /> */}
    </div>
  );
}

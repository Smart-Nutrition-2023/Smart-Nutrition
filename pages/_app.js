import Layout from '../components/Layout'
import "tailwindcss/tailwind.css";
import '../styles/globals.css';
import 'moment/locale/ko';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wrapper from '../store/configureStore';

function MyApp({ Component, pageProps }) {
  return ( 
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp);

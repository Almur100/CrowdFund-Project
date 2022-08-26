import '../styles/globals.css'
import ResponsiveAppBar from './components/appbar';

function MyApp({ Component, pageProps }) {
  return <>
  <ResponsiveAppBar/>


  <Component {...pageProps} />
  </>
}

export default MyApp

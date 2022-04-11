import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "./theme";
import '@fontsource/nunito/400.css';
import { Provider } from "react-redux";
import { store } from "../redux/reducers";
import AuthProvider from '../components/authProvider';

function MyApp({ Component, pageProps }) {
  return (
     <Provider store = {store}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
     </Provider> 
  )
}

export default MyApp

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { Spinner } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';

const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      let token = Cookies.get("token");
      if (token) {
        let result = await axios.get(`${API_URL}/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "LOGIN", payload: result.data });
      }

      console.log(token)
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false)
    }
  }, []);
  
  if(loading){
    return <div className="bg-black min-h-screen">
              <Heading>
                <div className='grid justify-center text-center text-9xl pt-10'>
                  <div><span className='bg-clip-text text-transparent bg-gradient-to-r from-pinktertiary to-violet-500'>POST.</span></div>
                  <div><span className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-yellow-500'>SHARE.</span></div>
                  <div><span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pinktertiary'>INTERACT.</span></div>
                </div>
              </Heading>
           </div>
    
  }

  return children;
  

};

export default AuthProvider;
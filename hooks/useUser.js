import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUser = () => {

  const user = useSelector((state) => state.user);

  // const router = useRouter()
  
  // useEffect(()=>{

  //   if(!user.isLogin){
  //     router.push("/login")
  //   };
  // }, [user])

  return user;
};

export default useUser;
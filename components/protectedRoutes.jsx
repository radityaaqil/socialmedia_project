import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoutes = ({ children }) => {

  
    const router = useRouter();
  
    const { isLogin } = useSelector((state) => state.user);
  
    if (!isLogin) {
        router.push("/login")
    }
    
    return children;
    
  
  };
  
  export default ProtectedRoutes;
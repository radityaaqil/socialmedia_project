import Profile from "../components/profile";
import LeftNavBar from "../components/leftnavbar";
import RightBarProfile from "../components/rightnavbarprof";
import useUser from "../hooks/useUser";

const Userprofile = () => {

    const { username, fullname } = useUser()

    return ( 
        <div className="flex">
            <LeftNavBar username = {username}
                        />
            <Profile username = {username}
            fullname = {fullname}/>
            <RightBarProfile/>
        </div>
    );
}
 
export default Userprofile;
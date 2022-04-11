import Profile from "../components/profile";
import LeftNavBar from "../components/leftnavbar";
import RightBarProfile from "../components/rightnavbarprof";

const Userprofile = () => {
    return ( 
        <div className="flex">
            <LeftNavBar/>
            <Profile/>
            <RightBarProfile/>
        </div>
    );
}
 
export default Userprofile;
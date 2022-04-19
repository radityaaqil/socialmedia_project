import Profile from "../components/profile";
import LeftNavBar from "../components/leftnavbar";
import RightBarProfile from "../components/rightnavbarprof";
import useUser from "../hooks/useUser";

const Userprofile = () => {

    const { username, fullname, bio, profile_picture, cover_picture, location } = useUser()

    return ( 
        <div className="flex">
            <LeftNavBar username = {username}
            fullname = {fullname}
            profile_picture = {profile_picture}
                        />
            <Profile  username = {username}
            fullname = {fullname}
            bio = {bio}
            profile_picture = {profile_picture}
            cover_picture = {cover_picture}
            location = {location}/>
            <RightBarProfile/>
        </div>
    );
}
 
export default Userprofile;
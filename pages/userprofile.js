import Profile from "../components/profile";
import LeftNavBar from "../components/leftnavbar";
import RightBarProfile from "../components/rightnavbarprof";
import useUser from "../hooks/useUser";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
import API_URL from "../helpers/apiurl";
import axios from "axios";

const Userprofile = () => {

    const { username, fullname, bio, profile_picture, cover_picture, location, createdAt } = useUser()

    const [data, setState] = useState([]);

    const fetchData = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getpost`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setState(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    const fetchDataComment = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getusercomment`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setuserCommentsData(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    const fetchDataMedia = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getuserpostmedia`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setMedia(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    const fetchLikedPost = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getlikedpost`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setlikedPosts(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataComment();
        fetchDataMedia();
        fetchLikedPost();
    }, []);
    
    //Values is an object

    const postEverywhere = async (values) => {
        try {
         
          let token = Cookies.get("token")
      
          await axios.post(`${API_URL}/post/postcaption`, {
              ...values
          },
          {headers: {
              authorization: `Bearer ${token}`,
          }},)

          userPosts()
          fetchPostCounts()

          fetchData()
    
        } catch (error) {
            console.log(error)
        } finally {
         
        }
    };

    //User Posts counts

    const [counts, setCounts] = useState([])

    const fetchPostCounts = async () => {
        try {
            let token = Cookies.get("token")
            let res1 = await axios.get(`${API_URL}/post/getpostcount`, {headers: {
                authorization: `Bearer ${token}`,
            }});
            setCounts(res1.data);
            console.log(res1.data)
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        fetchPostCounts();
    }, []);

    //User comments
    const [userCommentsData, setuserCommentsData] = useState([]);

    const userComments =  async () => {
        try {
            let token = Cookies.get("token");
            let res = await axios.get(`${API_URL}/post/getusercomment`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setuserCommentsData(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    //User Posts 

    const [posts, setPosts] = useState([])

    const userPosts = async () => {
        try {
            let token = Cookies.get("token");
            let res = await axios.get(`${API_URL}/post/getuserpost`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setPosts(res.data)
            
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        userPosts();
    }, []);

    //User media
    const [media, setMedia] = useState([])

    const userPostMedia = async () => {
        try {
            let token = Cookies.get("token");
            let res = await axios.get(`${API_URL}/post/getuserpostmedia`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setMedia(res.data)
            
        } catch (error) {
            console.log(error)
        }
    };

    //Liked post
    const [likedPosts, setlikedPosts] = useState([]);

    const userLikedPosts = async () => {
        try {
            let token = Cookies.get("token");
            let res = await axios.get(`${API_URL}/post/getlikedpost`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            setlikedPosts(res.data)
            
        } catch (error) {
            console.log(error)
        }
    };    

    return ( 
        <div className="flex">
            <LeftNavBar username = {username}
            fullname = {fullname}
            profile_picture = {profile_picture}
            postEverywhere={postEverywhere}
            fetchData = {fetchData}
            userPosts={userPosts}
            fetchPostCounts={fetchPostCounts}
            />
            <Profile  username = {username}
            fullname = {fullname}
            bio = {bio}
            profile_picture = {profile_picture}
            cover_picture = {cover_picture}
            location = {location}
            posts={posts}
            userCommentsData={userCommentsData}
            media={media}
            likedPosts={likedPosts}
            userPosts={userPosts}
            userComments={userComments}
            userPostMedia={userPostMedia}
            userLikedPosts={userLikedPosts}
            counts={counts}
            createdAt={createdAt}/>
            <RightBarProfile/>
        </div>
    );
}
 
export default Userprofile;
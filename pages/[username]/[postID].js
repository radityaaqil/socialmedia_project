import LeftNavBar from '../../components/leftnavbar';
import RightBar from '../../components/rightnavbar';
import useUser from '../../hooks/useUser';
import Postdetail from '../../components/postdetail';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../helpers/apiurl';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
// import PostDetailV2 from '../../components/postdetailV2';

const Post = () => {

    const router = useRouter();
    let { postID } = router.query;

    postID = parseInt(postID)

    const { username, fullname, profile_picture, isVerified } = useUser()

    const [data, setData] = useState([]);

    const[commentsData, setcommentsData] = useState([])

    const fetchDataUserDetail = async () => {
        try {
            let token = Cookies.get("token")
            let res = await axios.get(`${API_URL}/post/getuserpostdetail/${postID}`, {headers: {
                authorization: `Bearer ${token}`,
            }});
            setData(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComments = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getcomments/${postID}`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setcommentsData(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchComments()
    }, []);

    const updatePost = async (formData) => {
        try {
            let token = Cookies.get("token");
            await axios.patch(`${API_URL}/post/editpostcaptionimage/${postID}`, formData, {headers: {
                authorization: `Bearer ${token}`,
            }});
            fetchDataUserDetail();
        } catch (error) {
            console.log(error);
        }
    };

    const insertComment = async (input) => {
        try {
            let token = Cookies.get("token");
            await axios.post(`${API_URL}/post/comments/${postID}`, input, {headers: {
                authorization: `Bearer ${token}`,
            }});
            await fetchComments();
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = () => {
        Swal.fire({
            title: 'Delete post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color:'#ffffff',
            iconColor:'#d33',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: '#1a1a1d',
          }).then((result) => {
            if (result.isConfirmed) {
                let token = Cookies.get("token");
                axios.delete(`${API_URL}/post/deletepost/${postID}`, {headers: {
                    authorization: `Bearer ${token}`,
                }});
              Swal.fire({
                title:'Deleted!',
                text:'Your post has been deleted.',
                icon:'success',
                color: ' #4FBF26',
                iconColor: ' #4FBF26',
                background: '#1a1a1d',
                })
                router.push("/home")
            }
          })
        //   }).then(()=>{
        //     console.log('udah diapus sob')
        //   })
    }

    const addLikes = async () => {
        try {
            let token = Cookies.get("token");
            await axios.post(`${API_URL}/post/addlikes/${postID}`, null,
            {headers: {
                authorization: `Bearer ${token}`,
            }})
            await fetchDataUserDetail();
            console.log("masuk sini")
        } catch (error) {
            console.log(error);
        }finally{
            console.log("masuk sokin brader")
        };
    };

    useEffect(()=>{
        fetchDataUserDetail();
    },[])

    return (
        <div className='flex'>
           <LeftNavBar username = {username}
            fullname = {fullname}
            profile_picture = {profile_picture}
            isVerified={isVerified}/>
            <Postdetail profile_picture = {profile_picture}
            data = {data}
            commentsData = {commentsData}
            setData = {setData}
            username = {username}
            fullname = {fullname}
            isVerified={isVerified}
            fetchDataUserDetail={fetchDataUserDetail}
            insertComment={insertComment}
            postID = {postID}
            updatePost={updatePost}
            deletePost={deletePost}
            addLikes={addLikes}/>
            {/* {data.map((val, index)=>{
                <PostDetailV2
                key={index}
                profilepicture={val.profile_picture}
                fullname={val.fullname}
                username={val.username}
                caption={val.caption}
                photos={val.photos}
                />
            })} */}
            <RightBar/>
        </div>
    );
}

export async function getServerSideProps() {

    return {
      props: {}, // will be passed to the page component as props
    }
  }

 
export default Post;
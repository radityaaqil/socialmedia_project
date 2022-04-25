import LeftNavBar from '../../components/leftnavbar';
import RightBar from '../../components/rightnavbar';
import useUser from '../../hooks/useUser';
import Postdetail from '../../components/postdetail';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../helpers/apiurl';
import Cookies from "js-cookie";

const Post = () => {

    const router = useRouter();
    const { postID } = router.query;

    const { username, fullname, profile_picture, isVerified } = useUser()

    const [data, setState] = useState([]);

    const fetchDataUserDetail = async () => {
        try {
        let token = Cookies.get("token")
        let res = await axios.get(`${API_URL}/post/getuserpostdetail/${postID}`, {headers: {
            authorization: `Bearer ${token}`,
        }});
        setState(res.data);
        console.log(res.data)
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchDataUserDetail();
    }, []);

    return (
        <div className='flex'>
           <LeftNavBar username = {username}
            fullname = {fullname}
            profile_picture = {profile_picture}
            isVerified={isVerified}/>
            <Postdetail profile_picture = {profile_picture}
            data = {data}
            setData = {setState}
            username = {username}
            fullname = {fullname}
            isVerified={isVerified}
            fetchDataUserDetail={fetchDataUserDetail}/>
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
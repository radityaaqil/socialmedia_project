import LeftNavBar from '../components/leftnavbar';
import Feed from '../components/feed';
import RightNavBar from '../components/rightnavbar';
import useUser from '../hooks/useUser';
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Home = () => {

    const { username, fullname, profile_picture, isVerified } = useUser()

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

    useEffect(() => {
        fetchData();
    }, []);
    
    //Values is an object

    const postEverywhere = async (values) => {
        try {
         
          let token = Cookies.get("token")
      
          await axios.post(`${API_URL}/post/postcaptionimage`,
              values
          ,
          {headers: {
              authorization: `Bearer ${token}`,
          }},)

          await Swal.fire(
            'Post sent!',
            '',
            'success'
            )

          fetchData()
    
        } catch (error) {
            console.log(error)

            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: (error.response.data.message || "Network Error"),
                })
        } finally {
         
        }
      };
      
    return(
        <div className='flex'>
            <LeftNavBar username = {username}
            fullname = {fullname}
            postEverywhere={postEverywhere}
            fetchData = {fetchData}
            profile_picture = {profile_picture}
            isVerified={isVerified}/>
            <Feed profile_picture = {profile_picture}
            data = {data}
            postEverywhere={postEverywhere}
            username = {username}
            fullname = {fullname}
            isVerified={isVerified}/>
            <RightNavBar/>
        </div>
    )
}

export default Home
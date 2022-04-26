import LeftNavBar from '../components/leftnavbar';
import Feed from '../components/feed';
import RightNavBar from '../components/rightnavbar';
import useUser from '../hooks/useUser';
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {

    const { username, fullname, profile_picture, isVerified } = useUser()

    // const [data, setState] = useState([]);

    // const fetchData = async () => {
    //     try {
    //     let token = Cookies.get("token")
    //     let res = await axios.get(`${API_URL}/post/getpost`, {headers: {
    //         authorization: `Bearer ${token}`,
    //     }});
    //     setState(res.data);
    //     console.log(res.data)
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);
    
    //Values is an object

    const [data, setState] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const limit = 10;

    const fetchDataOnScroll = async () => {
        try {
          if(hasMore){
              const res = await axios.get(`${API_URL}/post/getpost`, {
                params: { page, limit },
              });
              console.log("fetchData testetstts")
              
              if (res.data.length === 0) setHasMore(false);
              setState((prev) => [...prev, ...res.data]);
              setPage((prev) => prev + 1);
          }  
    
        } catch (error) {
          console.log("Error fetching Posts");
          console.log(error);
        }
      };

    useEffect(() => {
        fetchDataOnScroll();
    }, []);


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

          fetchDataOnScroll()
    
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
            profile_picture = {profile_picture}
            isVerified={isVerified}/>
            <Feed profile_picture = {profile_picture}
            postEverywhere={postEverywhere}
            username = {username}
            fetchDataOnScroll={fetchDataOnScroll}
            setPage={setPage}
            fullname = {fullname}
            isVerified={isVerified}
            data={data}
            hasMore={hasMore}/>
            <RightNavBar/>
        </div>
    )
}

export default Home
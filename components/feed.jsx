import { FaRetweet } from 'react-icons/fa'
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { Avatar } from '@chakra-ui/react'
import { FiMoreHorizontal} from "react-icons/fi";
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import axios from 'axios'

const Feed = () => {
    
    // const [input, setInput] = useState({
    //     twaat:"",
    //     image:""
    // })

    // const inputTwaatHandler = (e) => {
    //     setInput({...input, [e.target.name]:e.target.value})
    // }  

    // const submitTwaatHandler = (e) => {
    //     e.preventDefault()
        
    //     axios.post(`${API_URL}/data`, 
    //     input
    //     )
    //     .then(() => {
    //     fetchData()
    //     setInput(
    //         {twaat:"",
    //     image:""}
    //     );
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    // }
        
        
    // const [data, setState] = useState([]);

    // const fetchData = async () => {
    //     try {
    //     let res = await axios.get(`${API_URL}/data`);
    //     setState(res.data);
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const renderData = () => {
    //     return [...data].reverse().map((val, index) => {
    //         return(
    //             <div key={index} className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700'>
    //                 <div><a href=""><Avatar size='md' bg='pink.500'/></a></div>
    //                 <div className='text-white flex flex-col pl-6'>
    //                     <div className='flex space-x-2'>
    //                         <div>Barbara Palvin</div>
    //                         <div>@realbarbarapalvin</div>
    //                     </div>
    //                     <div className='pt-2 text-lg'>{val.twaat}</div>
    //                     <div className='pt-2 text-lg pr-6'>{val.image}</div>
    //                     <div className='pt-4 flex space-x-28'>
    //                         <button className='text-lg hover:scale-150 duration-700'><BiComment/></button>
    //                         <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
    //                         <button className='text-lg hover:scale-150 duration-700'><AiOutlineHeart/></button>
    //                         <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
    //                     </div>
    //                 </div>
    //                 <button className='pb-20'><FiMoreHorizontal/></button>
    //             </div>
    //         )
    //     })
    // }



    return(
        <div className="bg-black min-h-screen w-5/12 relative text-white">
            <div className='bg-black bg-opacity-70 backdrop-blur-md fixed top-0 pl-6 py-6 w-5/12 z-10 text-2xl'>Home</div>

            <div className='mt-20'>
                <form onSubmit={""} className='border-b-2 border-darksecondary flex pb-4 pl-6 order-first'>
                        <div><a href=""><Avatar size='md' bg='blue.500'/></a></div>
                        <div className='text-white pl-6'>
                            <div className='text-lg'><textarea onChange={""} className='w-full bg-black resize-none p-2 focus:outline-none overflow-hidden' name="twaat" value={""} cols="30" rows="4" placeholder="What's happening?"></textarea></div>
                            
                            <div className='pt-2 space-x-64'>
                                <label htmlFor="pic" className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700 cursor-pointer'>Upload</label>
                                <input className='hidden' type="file" id='pic' name='image' value={""}/>
                                <button className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700' type='submit'>Twaat</button>
                            </div>
                        </div>
                </form>
                    
                {/* {renderData()} */}
                
                
            </div>
        </div>
    )
}

export default Feed
import { FaRetweet } from 'react-icons/fa'
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { Avatar } from '@chakra-ui/react'
import { FiMoreHorizontal} from "react-icons/fi";
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import Link from 'next/link';
import { useFormik } from 'formik';
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2';

const Feed = ({profile_picture, postEverywhere, data, fetchData, isVerified}) => {
    
    const [input, setInput] = useState({
        caption:"",
    });

    //Pake preview
    const [selectedImage, setselectedImage] = useState([]);

    const onFileChange = (e) => {
        console.log(e.target.files, "ini target files")
        console.log(e.target.files[0], "ini target files[0]")

        if(e.target.files[0]){
   
            setselectedImage([...selectedImage,e.target.files[0]]) 
        }
    
    }
    console.log(selectedImage, "selected image")

    const inputPostHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value})
    }  

    const submitPost = async (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        let insertData = {
          caption: input.caption,
        };

        for (let i = 0; i < selectedImage.length; i++) {            
            formData.append(`image`, selectedImage[i]);
        }

        formData.append("data", JSON.stringify(insertData));
 
        try {
            await postEverywhere(formData)

            setInput({...input, caption:""})

            // await Swal.fire(
            // 'Post sent!',
            // '',
            // 'success'
            // )

            console.log(formData)
            
        } catch (error) {
            // await Swal.fire({
            // icon: 'error',
            // title: 'Oops...',
            // text: (error.response.data.message || "Network Error"),
            // })
        }
        console.log(formData)
    };    

    const renderData = () => {
        return data.map((val, index) => {
            return(
                <div key={index} className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700'>
                    <div><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                    <div className='text-white flex flex-col pl-6'>
                        <div className='flex space-x-2'>
                            <div>{val.fullname}</div>
                            <div>@{val.username}</div>
                            {/* <div>- {val.created_at}</div> */}
                        </div>
                        <div className='pt-2 text-lg'>{val.caption}</div>
                        <div className='pt-2'>{val.photos ? 
                        val.photos.map((val1, index1)=>{
                            return (
                                <div>
                                    <div className='pt-2' key={index1}><img src={`${API_URL}${val1.image}`}></img></div>
                                </div>
                            )
                        }) : null }</div>
                        <div className='pt-2 text-lg pr-6'></div>
                        <div className='pt-4 flex space-x-28'>
                            <button className='text-lg hover:scale-150 duration-700'><BiComment/></button>
                            <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                            <button className='text-lg hover:scale-150 duration-700'><AiOutlineHeart/></button>
                            <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                        </div>
                    </div>
                    <button className='pb-20'><FiMoreHorizontal/></button>
                </div>
            )
        })
    }



    return(
        <div className="bg-black min-h-screen w-5/12 relative text-white">
            <div className='bg-black bg-opacity-70 backdrop-blur-md fixed top-0 pl-6 py-6 w-5/12 z-10 text-2xl'>Home</div>

            <div className='mt-20'>
                <form onSubmit={submitPost} className='border-b-2 border-darksecondary flex pb-4 pl-6 order-first'>
                        <div className='hover:cursor-pointer'><Link href="/userprofile">{profile_picture ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</Link></div>
                        <div className='text-white pl-6'>
                            <div className='text-lg'><textarea onChange={inputPostHandler} 
                                    value={input.caption} className='w-full bg-black resize-none p-2 focus:outline-none overflow-hidden' name="caption" cols="30" rows="4" placeholder="What's happening?"></textarea></div>
                            
                            {selectedImage.map((val, index) => {
                                return (
                                    <div key={index} ><img src={URL.createObjectURL(val)} alt="" className="object-cover w-14 h-14 rounded-full"/></div>
                                )
                            }) }

                            <div className='pt-2 space-x-64'>
                                <label htmlFor="pic" className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700 cursor-pointer'>Upload</label>
                                <input className='hidden' type="file" id='pic' name='image' onChange={onFileChange}/>
                                <button className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700' type='submit'>Post</button>
                            </div>
                        </div>
                </form>
                    
                {renderData()}
                
                
            </div>
        </div>
    )
}

export default Feed
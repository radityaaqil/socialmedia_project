import { useEffect } from "react"
import API_URL from "../helpers/apiurl";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import Swal from "sweetalert2";

const Postdetail = ({data, fetchDataUserDetail, profile_picture, updatePost}) => {

    const { isOpen, onOpen, onClose} = useDisclosure();
    
    const [input, setInput] = useState({
        caption:"",
    });

    const [selectedImage, setselectedImage] = useState([]);

    const onFileChange = (e) => {
        console.log(e.target.files, "ini target files")
        console.log(e.target.files[0], "ini target files[0]")

        if(e.target.files[0]){
   
            setselectedImage([...selectedImage,e.target.files[0]]) 
        }
    }

    const inputTwaatHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value})
    }  

    const submitPost = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        let insertData = {
          caption: input.caption,
        };

        console.log(selectedImage)

        for (let i = 0; i < selectedImage.length; i++) {            
            formData.append(`image`, selectedImage[i]);
        }

        formData.append("data", JSON.stringify(insertData));
 
        try {
            // let token = Cookies.get("token")
            // await axios.patch(`${API_URL}/post/editpostcaptionimage/${postID}`, formData, {headers: {
            //     authorization: `Bearer ${token}`,
            // }})
            updatePost(formData)
            
            await Swal.fire(
                'Post successfully changed!',
                '',
                'success'
                )
                
            setInput({...input, caption:""})
           
            console.log(formData)
            
        } catch (error) {
            await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: (error.response.data.message || "Network Error"),
            })
        }
        console.log(formData)
    }
    
    // useEffect(() => {
    //     fetchDataUserDetail()
    //     renderData()
    // }, []);

    const deletePost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                

              Swal.fire(
                'Deleted!',
                'Your post has been deleted.',
                'success'
              )
            }
          })
    }

    const renderData = () => {
        return data.map((val, index) => {
            return(
                <div key={index} className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700 mt-20'>
                    <div><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                    <div className='text-white flex flex-col pl-6'>
                        <div className='flex space-x-2'>
                            <div>{val.fullname}</div>
                            <div>@{val.username}</div>
                            {/* <div>- {val.created_at}</div> */}
                        </div>
                        <div className='pt-2 text-lg'>{val.caption}</div>
                        <div className='pt-2 grid grid-cols-2 gap-2'>{val.photos ? 
                        val.photos.map((val1, index1)=>{
                            return (  
                                <div className='' key={index1}><img className='rounded-xl object-cover w-full h-40' src={`${API_URL}${val1.image}`}></img></div> 
                            )
                        }) : null }</div>
                        <div className='pt-2 text-lg pr-6'></div>
                        <div className='pt-4 flex space-x-28'>
                            <button onClick={onOpen} className='text-lg hover:scale-150 duration-700'><BiComment/></button>
                            <button className='text-lg hover:scale-150 duration-700'><AiOutlineHeart/></button>
                            <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                            <button className='text-lg hover:scale-150 hover:text-red-500 duration-700'><IoClose/></button>
                        </div>
                    </div>
                    <div className='mr-5'>
                        <button className=''><FiMoreHorizontal/></button>
                    </div>
                </div>  
            )
        })
    }
    
    
    return (
        <div className="bg-black min-h-screen w-5/12 relative text-white">
            <div className='bg-black bg-opacity-70 backdrop-blur-md fixed top-0 pl-6 py-6 w-5/12 z-10 text-2xl'>Post</div>
            {renderData()}
            <Modal size="sm" isOpen={isOpen} onClose={onClose} roundedTop='3xl'>
                <ModalOverlay />
                    <form onSubmit={submitPost}>
                        <ModalContent>
                            <ModalHeader bg='darkprimary' display='flex' justifyContent='space-between'>
                                <button className="bg-darkprimary rounded-full py-2 px-3 text-base text-white hover:bg-darksecondary duration-700" onClick={onClose} type="button">
                                Cancel
                                </button>
                                <button onClick={onClose} className='bg-pinktertiary text-white rounded-full py-2 px-3 text-base hover:bg-pinksecondary duration-700' type="submit">Twaat</button>
                            </ModalHeader>
                        
                        <ModalBody className=' bg-darkprimary'>
                            <div className="flex gap-4">
                                <img className="rounded-full w-10 h-10 object-cover" src={`${API_URL}${profile_picture}`} alt="" />
                                <textarea onChange={inputTwaatHandler} name="caption" value={input.caption} className='pt-1 focus:outline-none bg-darkprimary text-white resize-none'  cols="36" rows="3" placeholder="What's happening..."></textarea>

                            </div>
                            <div className='mr-5 grid grid-cols-4 gap-2'>
                                {selectedImage.map((val, index) => {         
                                    return  (
                                        <div className='relative' key={index} ><img src={URL.createObjectURL(val)} alt="" className="rounded-xl object-cover w-full h-40"/>
                                        <button type="button" onClick={()=>{setselectedImage(selectedImage.filter((e)=> e !== val))}} className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div>
                                    )
                                }) }
                            </div>
                        </ModalBody>
            
                        <ModalFooter className='bg-darkprimary'>
                            <label className='bg-pinktertiary text-white rounded-full py-2 px-3 text-base hover:bg-pinksecondary duration-700 cursor-pointer' for="inputPic">Add Photos</label>
                            <input onChange={onFileChange} className='hidden' type="file" id='inputPic' />
                        </ModalFooter>
                        </ModalContent>
                    </form>
            </Modal>
        </div>
    );
}
 
export default Postdetail;
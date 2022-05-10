import { BiHomeCircle } from "react-icons/bi";
import { IoNotificationsOutline, IoClose  } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { BsHash } from "react-icons/bs";
import { FiMoreHorizontal} from "react-icons/fi";
import { FiUser} from "react-icons/fi";
import { GiHummingbird } from "react-icons/gi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import axios from 'axios'
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";

const LeftNavBar = ({username, fullname, profile_picture, postEverywhere, isVerified}) => {

    const dispatch = useDispatch();
    
    const { isOpen, onOpen, onClose} = useDisclosure()

    const [input, setInput] = useState({
        caption:"",
    })

    const router = useRouter()

    const signOut = () => {
        Swal.fire({
            title: 'Sign out',
            text: "Do you want to sign out from your account?",
            icon: 'warning',
            iconColor:'#d33',
            color:'#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, I have had enough!",
            background: '#1a1a1d',
          }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove("token")
                    Swal.fire({
                        title:'Signed out!',
                        text:'Good bye!',
                        icon:'success',
                        color: ' #4FBF26',
                        iconColor: ' #4FBF26',
                        background: '#1a1a1d',
                        })
                .then(()=>{
                    router.push("/")
                }).then(()=>{
                    dispatch({ type : "LOGOUT" })
                });
            }
          })
    };

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

        for (let i = 0; i < selectedImage.length; i++) {            
            formData.append(`image`, selectedImage[i]);
        }

        formData.append("data", JSON.stringify(insertData));
 
        try {
       
            // await postEverywhere(formData)

            // setInput({...input, caption:""})

            await Swal.fire({
                title:'Post sent!',
                icon:'success',
                color: ' #4FBF26',
                iconColor: ' #4FBF26',
                background: '#1a1a1d',
            })
                
                
                
            console.log(formData)
            
        } catch (error) {
            await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            color: '#f44336',
            iconColor: '#f44336',
            background: '#1a1a1d',
            text: (error.response.data.message || "Network Error"),
            })
        }
        console.log(formData)
    }

    return(
        <div className="bg-black min-h-screen w-3/12 border-r-2 border-darksecondary">
            <div className='fixed left-0 top-0 bottom-0 pt-6 pl-10 space-y-4 text-4xl text-white'>
                <div className='pl-5 text-pinktertiary'><Link href="/home"><a><GiHummingbird/></a></Link></div>
                <div className='flex items-center gap-7 hover:bg-darksecondary hover:cursor-pointer duration-700 w-fit rounded-full py-2 px-3'>
                    <div><Link href="/home"><a><BiHomeCircle/></a></Link></div>
                    <button className='text-xl sm:hidden md:block'><Link href="/home">Home</Link></button>
                </div>
                <div className='flex items-center gap-7 hover:bg-darksecondary hover:cursor-pointer duration-700 w-fit rounded-full py-2 px-3'>
                    <div><a href=""><BsHash/></a></div>
                    <button className='text-xl sm:hidden md:block'>Explore</button>
                </div>
                <div className='flex items-center gap-7 hover:bg-darksecondary hover:cursor-pointer duration-700 w-fit rounded-full py-2 px-3'>
                    <div><a href=""><IoNotificationsOutline/></a></div>
                    <button className='text-xl sm:hidden md:block'>Notification</button>
                </div>
                <div className='flex items-center gap-7 hover:bg-darksecondary hover:cursor-pointer duration-700 w-fit rounded-full py-2 px-3'>
                    <div><a href=""><BsEnvelope/></a></div>
                    <button className='text-xl sm:hidden md:block'>Message</button>
                </div>
                <div className='flex items-center gap-7 hover:bg-darksecondary hover:cursor-pointer duration-700 w-fit rounded-full py-2 px-3'>
                    <div><Link href="/userprofile"><FiUser/></Link></div>
                    <button className='text-xl sm:hidden md:block'><Link href="/userprofile">Profile</Link></button>
                    
                    
                </div>
                {isVerified == 0 ? <button disabled onClick={onOpen} className='text-center text-xl rounded-full bg-darksecondary py-3 px-20'>Post</button> : <button onClick={onOpen} className='text-center text-xl rounded-full bg-pinktertiary py-3 px-20 hover:bg-pinksecondary duration-700'>Post</button>}

                <button className='md:hidden absolute left-4 text-5xl'>
                    <IoAddCircleOutline/>
                </button>

                <div className="pt-10">
                <Menu autoSelect={false}>
                    {({ isOpen }) => (
                        <>
                        <MenuButton 
                        isActive={isOpen} as={Button} variant="unstyled" height="70px" borderRadius="50px" colorScheme="black" _hover={{ bg: 'darksecondary' }}>
                            {isOpen ? <div className=''>
                    <div className='flex items-center space-x-3 hover:bg-darksecondary rounded-full duration-700 px-3 cursor-pointer tracking-wide'>
                        <a href="">
                            {profile_picture ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full" /> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}
                        </a>
                        <div className='flex flex-col text-base'>
                            <div className='font-bold'>{fullname}</div>
                            <div className='text-sm'>@{username}</div>
                        </div>
                        <button className='text-base p-2'><FiMoreHorizontal/></button>
                    </div> 
                </div> : <div className=''>
                    <div className='flex items-center space-x-3 hover:bg-darksecondary rounded-full duration-700 px-3 cursor-pointer tracking-wide'>
                        <a href="">
                            {profile_picture ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full" /> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}
                        </a>
                        <div className='flex flex-col text-base'>
                            <div className='font-bold'>{fullname}</div>
                            <div className='text-sm'>@{username}</div>
                        </div>
                        <button className='text-base p-2'><FiMoreHorizontal/></button>
                    </div> 
                </div>}
                        </MenuButton>
                        <MenuList background="darkprimary" border='0px'>
                            <MenuItem bg="darkprimary" fontSize='25px' _hover={{ bg:"darksecondary"}} onClick={() => signOut()}>Sign out</MenuItem>
                        </MenuList>
                        </>
                )}
                </Menu>
                </div>
                

                
            </div>

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
                                <textarea name="caption" value={input.caption} onChange={inputTwaatHandler} className='pt-1 focus:outline-none bg-darkprimary text-white resize-none'  cols="36" rows="3" placeholder="What's happening..."></textarea>
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
    )
};

export default LeftNavBar;
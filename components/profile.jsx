import Image from "next/image";
import CoverPhoto from "../photos/Barbara_CoverPhoto.jpg";
import ProfilePhoto from "../photos/Barbara_ProfilePicture.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCalendarAlt } from 'react-icons/fa';
import React, {useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Swal from 'sweetalert2';
import { editProfile } from "../redux/actions/userActions";
import { connect } from "react-redux";

const Profile = ({editProfile, username, fullname}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [input, setinput] = useState({
        image: "",
      });

    const [fileupload, setupload] = useState(null);

    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    
    const [isActive, setActive] = useState();

    const formik = useFormik({
        initialValues : {
            fullname : "",
            bio : "",
        },
        onSubmit : async (values) => {
            try {
                editProfile(values)
                onClose()

            } catch (error) {
                console.log(error)
            }     
        }

    })

    const ToggleClass = () => {
      setActive(!isActive);
    };

    let formData = new FormData();

    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            formData.append("profile_picture", e.target.files[0]);
        }
    }

    const submitPhoto = async () => {
        try {
            let token = Cookies.get("token");
            await axios.patch(`${API_URL}/photos`, formData, {
                headers: {
                  authorization: `Bearer ${token}`,
                },
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div className="bg-black min-h-screen w-5/12 relative text-white">
            
            {/* Header */}
            <div className='bg-black bg-opacity-70 backdrop-blur-sm fixed top-0 pl-6 pt-4 pb-2 w-5/12 z-10'>
                <div className="text-xl font-bold">Barbara Palvin</div>
                <div className="text-sm">6969 Twaats</div>
            </div>

            {/* User Profile */}

            <div className="h-52 mt-20 relative">
                <Image objectFit="cover" layout="fill" src={CoverPhoto} alt="Barbara Palvin"/>
                <div className="relative -bottom-32 left-6 ring-4 w-32 h-32 rounded-full ring-black">
                    <Image src={ProfilePhoto} className='rounded-full' layout='fill' objectFit="cover"/>
                </div>
                <button onClick={onOpen} className="absolute -bottom-14 right-5 border-2 py-2 px-3 rounded-full hover:bg-darksecondary duration-700">Edit Profile</button>
            </div>

            <div className="mt-16 pl-6">
                <div className="text-xl font-bold">{fullname}</div>
                <div>@{username}</div>
                <div className="pt-3">just working hard. living my dream. and hoping that u like the results! instagram: 
                @realbarbarapalvin</div>
                <div className="flex gap-10 pt-3">
                    <div className="flex items-center gap-2"><IoLocationOutline/><span>All over your heart</span></div>
                    <div className="flex items-center gap-2"><FaCalendarAlt/><span>Joined March 2010</span></div>
                </div>
                <div className="flex gap-10 pt-3">
                    <div className="font-bold">1,099 <span className="font-thin">Following</span></div>
                    <div className="font-bold">1.1 M <span className="font-thin">Followers</span></div>
                </div>
            </div>

            <div className="flex pt-8 text-lg border-b-2 border-darksecondary">
                <div onClick={ToggleClass} className={isActive ? "w-1/4 bg-pinktertiary text-center cursor-pointer" : "w-1/4 text-center hover:bg-pinktertiary cursor-pointer"}>
                    <button className="py-3">Tweet</button>
                </div>
                <div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Comments</button>
                </div><div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Media</button>
                </div><div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Likes</button>
                </div>
            </div>

            {/* Edit Profile Modal */}

            <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior} color='black'>
                <ModalOverlay />
                    <form onSubmit={formik.handleSubmit}>
                        <ModalContent> 
                            <ModalHeader className='bg-darkprimary text-white backdrop-blur-lg flex font-thin items-center w-full gap-4 text-lg'>
                                <button onClick={onClose} type="button" className="w-1/6 rounded-full"><div className="hover:bg-darksecondary w-fit p-2 rounded-full text-2xl duration-700"><IoClose/></div></button>
                                <div className="w-4/6 text-left font-thin">Edit Profile</div>
                                <button type="submit" className="w-1/4 grid justify-center"><div className="bg-pinktertiary w-fit py-1 px-3 hover:bg-pinksecondary duration-700 rounded-full">Save</div></button>    
                            </ModalHeader>
                        
                        <ModalBody className='flex flex-col gap-4 bg-darkprimary'>
                            <div>
                                <div className="h-48 relative w-full">
                                    <Image layout="fill" objectFit="cover" src={CoverPhoto} alt="Barbara Palvin"/>
                                    <div className="relative -bottom-28 left-6 ring-4 rounded-full ring-darkprimary w-28 h-28">
                                        <Image src={ProfilePhoto} className='rounded-full' layout='fill' objectFit="cover"/>
                                    </div>
                                    <input className='hidden' type="file" id='coverPic'/>
                                    <input className='hidden' type="file" id='profilePic' onChange={onFileChange}/>
                                    <button type="button" onClick={submitPhoto} className="absolute left-64 top-20 text-3xl bg-darkprimary hover:bg-darksecondary duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoClose/></button>
                                    <label for="coverPic" type="button" className="absolute left-40 top-20 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoAddCircleOutline/></label>
                                    <label for="profilePic" type="button" className="absolute left-24 top-48 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-1 bg-opacity-60 text-white"><IoAddCircleOutline/></label>
                                </div>
                            </div>
                            <div className="text-white mt-12 p-2 w-full border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Fullname</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="fullname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.fullname} />
                            </div>
                            
                            <div className="text-white w-full p-2 border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Bio</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="bio"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.bio}/>
                            </div>
                            <div className="text-white w-full p-2 mb-4 border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Location</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text"/>
                            </div>
                        
                        </ModalBody>  
                        </ModalContent>
                    </form>
            </Modal> 

        </div>
    );
}
 
export default connect(null, { editProfile })(Profile);
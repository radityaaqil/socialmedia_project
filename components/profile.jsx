import { IoLocationOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCalendarAlt } from 'react-icons/fa';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Swal from 'sweetalert2';
import { editProfile } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import React, { useState } from "react";
import { FaRetweet } from 'react-icons/fa'
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import moment from "moment";
import Link from "next/link";

const Profile = ({editProfile, username, fullname, bio, profile_picture, cover_picture, location, posts, userPosts, counts, createdAt, userCommentsData, userComments, media, userPostMedia, userLikedPosts, likedPosts}) => {
    
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedCoverImage, setselectedCoverImage] = useState({
        file:[],
        filePreview:null,
    });

    const [selectedImage, setselectedImage] = useState({
        file:[],
        filePreview:null,
    });

    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    
    const [isActive, setActive] = useState(true);

    const formik = useFormik({
        initialValues : {
            fullname : fullname,
            username : username,
            bio : bio,
            location : location,
        },

        validationSchema : Yup.object({
            fullname : Yup.string().min(8, "Name can't be blank").required("Name can't be blank"),
            username : Yup.string().min(8, "Minimum 8 characters")
        }),

        onSubmit : async (values) => {
            try {
                editProfile(values)
                onClose()
                
            } catch (error) {
                console.log(error)
                router.push("/userprofile")
            }     
        }

    })
    
    const TogglePost = () => {
    //   setActive(!isActive);
      userPosts()
    };

    const ToggleComment = () => {
        //   setActive(!isActive);
        userComments()
    };

    const ToggleMedia = () => {
        //   setActive(!isActive);
        userPostMedia()
    };

    const ToggleLikedPosts = () => {
        //   setActive(!isActive);
        userLikedPosts()
    };


    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            setselectedImage({...selectedImage, file:e.target.files[0], filePreview:URL.createObjectURL(e.target.files[0])}) 
        }
    }

    const onFileChangeCover = (e) => {
        console.log(e.target.files[0])
        if(e.target && e.target.files[0]){
            setselectedCoverImage({...selectedCoverImage, file:e.target.files[0], filePreview:URL.createObjectURL(e.target.files[0])})
        }
    }

    const deletePhoto = async () => {
        try {
            let token = Cookies.get("token");
    
            await axios.patch(`${API_URL}/photos/deletecoverphotos`, null ,{
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const submitPhoto = async () => {
        try {
            let token = Cookies.get("token");
            let formData = new FormData();
            formData.append("profile_picture", selectedImage.file);
            
            let formDataCover = new FormData();
            formDataCover.append("cover_picture", selectedCoverImage.file);
           
            await axios.all([
                axios.patch(`${API_URL}/photos`, formData, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                }),
                axios.patch(`${API_URL}/photos/coverphotos`, formDataCover, {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                }) 
            ])

            onClose()
            
            await Swal.fire(
            'Successfully changed pictures!',
            'Welcome back!',
            'success'
            )

        } catch (error) {
            console.log(error)
        }
    }

    const renderData = () => {
        return posts.map((val, index) => {
            return(
                <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                    <div key={index} className='border-b-2 border-darksecondary flex pb-4 space-x-2 pt-4 hover:bg-darksecondary duration-700'>
                        <div className="min-w-fit"><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                        <div className='text-white flex flex-col'>
                            <div className='flex space-x-2'>
                                <div>{val.fullname}</div>
                                <div>@{val.username}</div>
                                <div>- {val.fromnow}</div>
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
                                <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                            </div>
                        </div>
                        <div className='mr-5'>
                                <button className=''><FiMoreHorizontal/></button>
                        </div>
                    </div>
                </Link>
            )
        })
    };

    const renderDataMedia = () => {
        return media.map((val, index) => {
            return(
                <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                    <div key={index} className='border-b-2 border-darksecondary flex pb-4 space-x-2 pt-4 hover:bg-darksecondary duration-700'>
                        <div className="min-w-fit"><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                        <div className='text-white flex flex-col'>
                            <div className='flex space-x-2'>
                                <div>{val.fullname}</div>
                                <div>@{val.username}</div>
                                <div>- {val.fromnow}</div>
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
                                <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                            </div>
                        </div>
                        <div className='mr-5'>
                                <button className=''><FiMoreHorizontal/></button>
                        </div>
                    </div>
                </Link>
            )
        })
    };

    const renderUserComments = () => {
        return userCommentsData.map((val, index) => {
            return (
                <div key={index} className="py-4 pl-8 border-b-2 border-darksecondary">
                    <div className="flex gap-3 items-center">
                        <img className="object-cover w-10 h-10 rounded-full" src={`${API_URL}${val.profile_picture}`} alt="" />
                        <div>@{val.username}</div>
                        <div>- {val.fromnow}</div>
                    </div>
                    <div className="pt-2">{val.comment}</div>
                </div>
            )
        })
    };

    const renderUserLikedPosts = () => {
        return likedPosts.map((val, index) => {
            return(
               
                    <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                        <div key={index} className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700'>
                            <div className='min-w-fit'><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                            <div className='text-white flex flex-col pl-6'>
                                <div className='flex space-x-2'>
                                    <div>{val.fullname}</div>
                                    <div>@{val.username}</div>
                                    <div>- {val.fromnow}</div>
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
                                    <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                    <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                    {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                   
                                    <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                                </div>
                            </div>
                            <div className='mr-5'>
                                <button className=''><FiMoreHorizontal/></button>
                            </div>
                        </div>
                    </Link> 
             
            )
        })
    };

    return (
        <div className="bg-black min-h-screen w-5/12 relative text-white">
            
            {/* Header */}
            <div className='bg-black bg-opacity-70 backdrop-blur-sm fixed top-0 pl-6 pt-4 pb-2 w-5/12 z-10'>
                {fullname ? <div className="text-xl font-bold">{fullname}</div> : <div className="text-xl font-bold">Your Fullname</div>}
                <div className="text-sm">{counts.posts} Posts</div>
            </div>

            {/* User Profile */}

            <div className="mt-20 relative">
             
                {cover_picture ? <img src={`${API_URL}${cover_picture}`} alt="" className="object-cover h-52 w-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover h-52 w-full"/>}
                <div className="absolute -bottom-14 left-6 ring-4 w-32 h-32 rounded-full ring-black">
                
                    {profile_picture ? <img src={`${API_URL}${profile_picture}`} alt="" className="ring-4 w-32 h-32 rounded-full ring-black object-cover"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="ring-4 w-32 h-32 rounded-full ring-black object-cover"/>}
                    
                </div>

                <button onClick={onOpen} className="absolute -bottom-14 right-5 border-2 py-2 px-3 rounded-full hover:bg-darksecondary duration-700">Edit Profile</button>
            </div>

            <div className="mt-20 pl-6">
                <div className="text-xl font-bold">{fullname}</div>
                <div>@{username}</div>
                {bio ? <div className="pt-3">{bio}</div> : <div className="pt-3">Your Bio</div>}
                <div className="flex gap-10 pt-3">
                    {location ? <div className="flex items-center gap-2"><IoLocationOutline/><span>{location}</span></div> : null}
                    
                    <div className="flex items-center gap-2"><FaCalendarAlt/><span>{moment(createdAt).format("MMMM YYYY")}</span></div>
                </div>
                <div className="flex gap-10 pt-3">
                    <div className="font-bold">1,099 <span className="font-thin">Following</span></div>
                    <div className="font-bold">1.1 M <span className="font-thin">Followers</span></div>
                </div>
            </div>

            {/* <div className="flex pt-8 text-lg border-b-2 border-darksecondary">
                <div onClick={ToggleClass} className={isActive ? "w-1/4 bg-pinktertiary text-center cursor-pointer" : "w-1/4 text-center hover:bg-pinktertiary cursor-pointer"}>
                    <button className="py-3">Post</button>
                </div>
                <div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Comments</button>
                </div><div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Media</button>
                </div><div className="w-1/4 hover:bg-pinktertiary text-center">
                    <button className="py-3">Likes</button>
                </div>
            </div> */}

            <Tabs className="pt-6" isFitted variant='solid-rounded' colorScheme='pinktertiary'>
                <TabList>
                    <Tab onClick={TogglePost}>Post</Tab>
                    <Tab onClick={ToggleComment}>Comments</Tab>
                    <Tab onClick={ToggleMedia}>Media</Tab>
                    <Tab onClick={ToggleLikedPosts}>Likes</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {renderData()}
                    </TabPanel>
                    <TabPanel>
                        {renderUserComments()}
                    </TabPanel>
                    <TabPanel>
                        {renderDataMedia()}
                    </TabPanel>
                    <TabPanel>
                        {renderUserLikedPosts()}
                    </TabPanel>
                </TabPanels>
            </Tabs>

           

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
                        
                        <ModalBody className='flex flex-col gap-2 bg-darkprimary'>
                            <div className="pb-4">
                                <div className="relative">

                                    {cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                    {!cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                    {cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}${cover_picture}`} alt="" className="object-cover w-full h-48"/> : null}

                                    {!cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-full h-48"/> : null}

                                    {/* {cover_picture ? <img src={`${API_URL}${cover_picture}`} alt="" className="object-cover w-full h-48"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-full h-48"/>}

                                    {selectedCoverImage && (<img src={URL.createObjectURL(selectedCoverImage)} alt="" className="object-cover w-full h-48 z-99"/>)} */}

                                    <div className="absolute -bottom-8 left-6">
{/* 
                                        {selectedImage.filePreview && <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/>} */}

                                        {profile_picture && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                        {!profile_picture && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                        {profile_picture && !selectedImage.filePreview ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                        {!profile_picture && !selectedImage.filePreview ? <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}
                                        
                                    </div>
                                    <input className='hidden' type="file" id='coverPic' onChange={onFileChangeCover}/>
                                    <input className='hidden' type="file" id='profilePic' onChange={onFileChange}/>
                                    <button type="button" onClick={deletePhoto} className="absolute left-64 top-20 text-3xl bg-darkprimary hover:bg-darksecondary duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoClose/></button>
                                    <label for="coverPic" type="button" className="absolute left-40 top-20 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoAddCircleOutline/></label>
                                    <label for="profilePic" type="button" className="absolute left-24 top-48 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-1 bg-opacity-60 text-white"><IoAddCircleOutline/></label>

                                    <button type="button" className="text-white absolute -bottom-10 right-4 border-2 py-1 px-2 rounded-full hover:bg-darksecondary duration-700" onClick={submitPhoto}>Confirm photos</button>
                                </div>
                            </div>
                            <div className="text-white mt-12 p-2 w-full border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Fullname</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="fullname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.fullname} />
                            </div>

                            {formik.touched.fullname && formik.errors.fullname ? <p className="text-sm ml-3 text-pinktertiary font-bold">{formik.errors.fullname}</p> : null}

                            <div className="text-white w-full p-2 border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Username</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.username}/>
                            </div>

                            {formik.touched.username && formik.errors.username ? <p className="text-sm ml-3 text-pinktertiary font-bold">{formik.errors.username}</p> : null}
                            
                            <div className="text-white w-full p-2 border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Bio</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="bio"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.bio}/>
                            </div>
                            <div className="text-white w-full p-2 mb-4 border-2 border-darksecondary rounded-xl">
                                <div className="text-base">Location</div>
                                <input className="w-full text-white focus:outline-none bg-darkprimary text-xl font-bold tracking-wider" type="text" name="location"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    value={formik.values.location}/>
                            </div>
                        
                        </ModalBody>  
                        </ModalContent>
                    </form>
            </Modal> 

        </div>
    );
}
 
export default connect(null, { editProfile })(Profile);
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
import { editProfile, editAllPhotos, editCoverPhoto, editProfilePhoto } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import React, { useState } from "react";
import { FaRetweet } from 'react-icons/fa'
import { BiComment, BiPhotoAlbum, BiDetail, BiReply } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import moment from "moment";
import Link from "next/link";

const Profile = ({isVerified, editProfile, editAllPhotos, username, fullname, bio, profile_picture, cover_picture, location, posts, userPosts, counts, createdAt, userCommentsData, userComments, media, userPostMedia, userLikedPosts, likedPosts, verifyMe}) => {
    
    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen : isOpenPhoto, onOpen : onOpenPhoto, onClose : onClosePhoto } = useDisclosure()

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
            fullname : Yup.string().min(8, "Name can't be blank").max(45, "Name exceeds limit").required("Name can't be blank"),
            username : Yup.string().min(8, "Minimum 8 characters")
        }),

        onSubmit : async (values) => {
            try {
                await editProfile(values)
                onClose()
                
            } catch (error) {
                console.log(error)
                router.push("/userprofile")
            }     
        }

    });

    const closeModalEditProfile = () => {
        formik.setValues(formik.initialValues)
        onClose()
    }
    
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

    // const deletePhoto = async () => {
    //     try {
    //         let token = Cookies.get("token");
    
    //         await axios.patch(`${API_URL}/photos/deletecoverphotos`, null ,{
    //             headers: {
    //                 authorization: `Bearer ${token}`,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const submitPhoto = async () => {
        try {
            // let token = Cookies.get("token");
            let formData = new FormData();
            formData.append("profile_picture", selectedImage.file);
            
            let formDataCover = new FormData();
            formDataCover.append("cover_picture", selectedCoverImage.file);
           
            // await axios.all([
            //     axios.patch(`${API_URL}/photos`, formData, {
            //         headers: {
            //           authorization: `Bearer ${token}`,
            //         },
            //     }),
            //     axios.patch(`${API_URL}/photos/coverphotos`, formDataCover, {
            //         headers: {
            //           authorization: `Bearer ${token}`,
            //         },
            //     }) 
            // ])
            
            if(selectedCoverImage.file.length == 0 && selectedImage.file.length == 0){
                onClosePhoto()
                throw "Please select images to submit!"
            }else if(selectedImage.file.length == 0){
                onClosePhoto()
                throw "Please select profile picture!"
            }else if(selectedCoverImage.file.length == 0){
                onClosePhoto()
                throw "Please select cover picture!"
            }else{
                await editAllPhotos({formData, formDataCover});
                setselectedCoverImage({...selectedCoverImage, file:[]})
                setselectedImage({...selectedImage, file:[]})
                onClosePhoto()
            }

            // await editProfilePhoto(formData);

            // await editCoverPhoto(formDataCover);

            // onClosePhoto()
            
            await Swal.fire(
            'Successfully changed pictures!',
            'YAY!',
            'success'
            )

        } catch (error) {
            console.log(error)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: (error || "Network Error"),
              })
        }
    }

    const renderData = () => {
        return posts.map((val, index) => {
            return(
                <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                    <div key={index} className='border-b-2 border-darksecondary flex pb-4 pt-4 hover:bg-darksecondary duration-700'>
                        <div className="min-w-fit"><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                        <div className='text-white flex flex-col pl-3 w-10/12'>
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
                            <div className='pt-4 flex justify-between'>
                                <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                            </div>
                        </div>
                        <div className='mr-5 w-fit'>
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
                    <div key={index} className='border-b-2 border-darksecondary flex pb-4 pt-4 hover:bg-darksecondary duration-700'>
                        <div className="min-w-fit"><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                        <div className='text-white flex flex-col w-10/12 pl-3'>
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
                            <div className='pt-4 flex justify-between'>
                                <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                            </div>
                        </div>
                        <div className='mr-5 w-fit'>
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
                <div key={index} className="py-4 border-b-2 border-darksecondary">
                    <div className="flex gap-3 items-center w-10/12">
                        <img className="object-cover w-10 h-10 rounded-full" src={`${API_URL}${val.profile_picture}`} alt="" />
                        <div>@{val.username}</div>
                        <div>- {val.fromnow}</div>
                    </div>
                    <div className="pt-2 min-w-fit text-sm tracking-wider">Replying to <span className="font-bold tracking-wider">@{val.postowner_username}</span></div>
                    <div className="pt-2 max-w-fit text-lg">{val.comment}</div>
                </div>
            )
        })
    };

    const renderUserLikedPosts = () => {
        return likedPosts.map((val, index) => {
            return(
               
                    <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                        <div key={index} className='border-b-2 border-darksecondary flex pb-4 pt-4 hover:bg-darksecondary duration-700'>
                            <div className='min-w-fit'><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
                            <div className='text-white flex flex-col w-10/12 pl-3'>
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
                                <div className='pt-4 flex justify-between'>
                                    <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.comments ? val.comments : null}<BiComment/></button>
                                    <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                    {val.alreadyliked ? <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiFillHeart/></button> : <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>}
                                   
                                    <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                                </div>
                            </div>
                            <div className='mr-5 w-fit'>
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
                {isVerified == 0 ? <button onClick={verifyMe} className="absolute -bottom-14 right-32 p-2 hover:scale-125 duration-700 bg-pinktertiary rounded-full">Verify me!</button> : null}

                {isVerified == 0 ? <button disabled onClick={onOpenPhoto} className="absolute -bottom-14 right-16 py-2 px-2 text-3xl"><BiPhotoAlbum/></button> : <button onClick={onOpenPhoto} className="absolute -bottom-14 right-16 py-2 px-2 hover:scale-125 duration-700 text-3xl"><BiPhotoAlbum/></button>}

                {isVerified == 0 ? <button disabled onClick={onOpen} className="absolute -bottom-14 right-5 py-2 px-2 text-3xl"><BiDetail/></button> : <button onClick={onOpen} className="absolute -bottom-14 right-5 py-2 px-2 hover:scale-125 duration-700 text-3xl"><BiDetail/></button>}

                
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

            {/* Tabs for tweet */}

            <Tabs className="pt-6" isFitted variant='unstyled' size="lg">
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'pinktertiary.500' }} _hover={{ color: 'white', bg: 'pinktertiary.500' }} onClick={TogglePost}>Post</Tab>
                    <Tab _selected={{ color: 'white', bg: 'pinktertiary.500' }} _hover={{ color: 'white', bg: 'pinktertiary.500' }} onClick={ToggleComment}>Comments</Tab>
                    <Tab _selected={{ color: 'white', bg: 'pinktertiary.500' }} _hover={{ color: 'white', bg: 'pinktertiary.500' }} onClick={ToggleMedia}>Media</Tab>
                    <Tab _selected={{ color: 'white', bg: 'pinktertiary.500' }} _hover={{ color: 'white', bg: 'pinktertiary.500' }} onClick={ToggleLikedPosts}>Likes</Tab>
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

            {/* Edit profile photos */}

            <Modal size="lg" isOpen={isOpenPhoto} onClose={onClosePhoto} color='black'>
                <ModalOverlay />
                    
                    <ModalContent> 
                        <ModalHeader className='bg-darkprimary text-white backdrop-blur-lg flex font-thin items-center w-full gap-4 text-lg'>
                            <button onClick={onClosePhoto} type="button" className="w-1/6 rounded-full"><div className="hover:bg-darksecondary w-fit p-2 rounded-full text-2xl duration-700"><IoClose/></div></button>
                            <div className="w-4/6 text-left font-thin">Edit Photos</div>
                            <button onClick={submitPhoto} className="w-1/4 grid justify-center"><div className="bg-pinktertiary w-fit py-1 px-3 hover:bg-pinksecondary duration-700 rounded-full">Save</div></button>    
                        </ModalHeader>
                    
                    <ModalBody className='flex flex-col gap-2 bg-darkprimary'>
                        <div className="pb-12">
                            <div className="relative">

                                {cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                {!cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                {cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}${cover_picture}`} alt="" className="object-cover w-full h-48"/> : null}

                                {!cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-full h-48"/> : null}

                                <div className="absolute -bottom-8 left-6">

                                    {profile_picture && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                    {!profile_picture && selectedImage.filePreview ? <img src={selectedImage.filePreview} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                    {profile_picture && !selectedImage.filePreview ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}

                                    {!profile_picture && !selectedImage.filePreview ? <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-28 h-28 ring-4 rounded-full ring-darkprimary"/> : null}
                                    
                                </div>
                                <input className='hidden' type="file" id='coverPic' onChange={onFileChangeCover}/>
                                <input className='hidden' type="file" id='profilePic' onChange={onFileChange}/>
                                {/* <button type="button" onClick={deletePhoto} className="absolute left-64 top-20 text-3xl bg-darkprimary hover:bg-darksecondary duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoClose/></button> */}
                                <label for="coverPic" type="button" className="absolute left-52 top-20 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-2 bg-opacity-60 text-white"><IoAddCircleOutline/></label>
                                <label for="profilePic" type="button" className="absolute left-24 top-48 text-3xl bg-darkprimary hover:bg-darksecondary hover:cursor-pointer duration-700 rounded-full p-1 bg-opacity-60 text-white"><IoAddCircleOutline/></label>

                                {/* <button type="button" className="text-white absolute -bottom-10 right-4 border-2 py-1 px-2 rounded-full hover:bg-darksecondary duration-700" onClick={submitPhoto}>Confirm photos</button> */}
                            </div>
                        </div>
                    
                    </ModalBody>  
                    </ModalContent>
            </Modal> 

            {/* Edit Profile Modal */}

            <Modal size="lg" isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior} color='black'>
                <ModalOverlay />
                    <form onSubmit={formik.handleSubmit}>
                        <ModalContent> 
                            <ModalHeader className='bg-darkprimary text-white backdrop-blur-lg flex font-thin items-center w-full gap-4 text-lg'>
                                <button onClick={closeModalEditProfile} type="button" className="w-1/6 rounded-full"><div className="hover:bg-darksecondary w-fit p-2 rounded-full text-2xl duration-700"><IoClose/></div></button>
                                <div className="w-4/6 text-left font-thin">Edit Details</div>
                                {formik.values.fullname == fullname && formik.values.username == username && formik.values.bio == bio && formik.values.location == location ? <button type="submit" disabled className="w-1/4 grid justify-center"><div className="bg-darksecondary w-fit py-1 px-3 rounded-full">Save</div></button> : <button type="submit" className="w-1/4 grid justify-center"><div className="bg-pinktertiary w-fit py-1 px-3 hover:bg-pinksecondary duration-700 rounded-full">Save</div></button> }
                                   
                            </ModalHeader>
                        
                        <ModalBody className='flex flex-col gap-2 bg-darkprimary'>
                            {/* <div className="pb-4">
                                <div className="relative">

                                    {cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                    {!cover_picture && selectedCoverImage.filePreview ? <img src={selectedCoverImage.filePreview} alt="" className="object-cover w-full h-48"/> : null}

                                    {cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}${cover_picture}`} alt="" className="object-cover w-full h-48"/> : null}

                                    {!cover_picture && !selectedCoverImage.filePreview ? <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-full h-48"/> : null}

                                    <div className="absolute -bottom-8 left-6">

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
                            </div> */}
                            <div className="text-white p-2 w-full border-2 border-darksecondary rounded-xl">
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
 
export default connect(null, { editProfile, editAllPhotos })(Profile);
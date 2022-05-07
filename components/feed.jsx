import { FaRetweet } from 'react-icons/fa'
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import Link from 'next/link';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { AiOutlinePicture } from "react-icons/ai";

const Feed = ({profile_picture, postEverywhere, data, hasMore, fetchDataOnScroll, isVerified}) => {
    
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
    };

    //Maximum photos and characters

    const [selectedImageCounts, setImageCounts] = useState(selectedImage.length);

    useEffect(()=>{
        setImageCounts(selectedImage.length)
    },[selectedImage])

    const [characters, setCharacters] = useState(input.caption.length);

    useEffect(()=>{
        setCharacters(input.caption.length)
    },[input.caption]);

  
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
            if(selectedImage.length>4 && input.caption.length>300){
                throw 'Post limit exceeded'
            }else if(input.caption.length>300){
                throw "Maximum 300 characters"
            }else if(selectedImage.length>4){
                throw 'Maximum 4 photos'
            }

            await postEverywhere(formData);

            setInput({...input, caption:""})

            // await Swal.fire(
            // 'Post sent!',
            // '',
            // 'success'
            // )
            console.log(formData)
            
        } catch (error) {
            await Swal.fire({
            icon: 'error',
            color: '#f44336',
            iconColor: '#f44336',
            background: '#1a1a1d',
            title: 'Oops...',
            text: (error || "Network Error"),
            })
        }
        console.log(formData)
    };  
    
    // const [data, setState] = useState([])
    // const [hasMore, setHasMore] = useState(true);
    // const [page, setPage] = useState(0);
    // const limit = 10;

    // const fetchDataOnScroll = async () => {
    //     try {
    //       const res = await axios.get(`${API_URL}/post/getpost`, {
    //         params: { page, limit },
    //       });
    
    //       if (res.data.length === 0) setHasMore(false);
    //       setState((prev) => [...prev, ...res.data]);
    //       setPage((prev) => prev + 1);
    //     } catch (error) {
    //       console.log("Error fetching Posts");
    //       console.log(error);
    //     }
    //   };

    // useEffect(() => {
    //     fetchDataOnScroll();
    // }, []);
    

    const renderData = () => {
        return data.map((val, index) => {
            return(
               
                    <Link href={`http://localhost:3000/${val.username}/${val.postID}`}>
                        <div key={index} className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700'>
                            <div className='min-w-fit'><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
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
    }



    return(
        
             <div className="bg-black min-h-screen w-5/12 relative text-white">
                <div className='bg-black bg-opacity-70 backdrop-blur-md fixed top-0 pl-6 py-6 w-5/12 z-10 text-2xl'>Home</div>

                <div className='mt-20'>
                    <form onSubmit={submitPost} className='border-b-2 border-darksecondary flex pb-4 pl-6 order-first'>
                            <div className='hover:cursor-pointer min-w-fit'><Link href="/userprofile">{profile_picture ? <img src={`${API_URL}${profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</Link></div>
                            <div className='text-white pl-3 w-11/12'>
                                <div className='text-lg mr-5'><textarea onChange={inputPostHandler} value={input.caption} className='w-full bg-black resize-none p-2 focus:outline-none overflow-hidden' name="caption" cols="30" rows="4" placeholder="What's happening?"></textarea></div>
                                
                                {input.caption.length === 0 ? null : null}

                                {input.caption.length > 0 && input.caption.length <= 300? <div className="text-white text-sm text-right mr-5">{characters} / 300</div> : null}

                                {input.caption.length > 300 ? <div className="text-red-500 text-sm text-right mr-5">{characters} / 300 characters limit exceeded</div> : null}

                                <div className='mr-5 grid grid-cols-4 gap-2 pt-2'>
                                    {selectedImage.map((val, index) => {
                                        
                                        return  (
                                            <div className='relative' key={index} ><img src={URL.createObjectURL(val)} alt="" className="rounded-xl object-cover w-full h-40"/>
                                            <button type="button" onClick={()=>{setselectedImage(selectedImage.filter((e)=> e !== val))}} className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                            </div>
                                        )
                                        
                                        // if(selectedImage.length == 1){
                                        //     return (
                                        //         <div className='col-span-2 relative' key={index} ><img src={URL.createObjectURL(val)} alt="" className="rounded-xl object-cover w-full"/>
                                        //         <button type="button" onClick={()=>{setselectedImage(selectedImage.filter((e)=> e !== val))}} className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        //         </div>
                                        //     )
                                        // }else if(selectedImage.length == 2){
                                        //     return (
                                        //         <div className='' key={index} ><img src={URL.createObjectURL(val)} alt="" className="rounded-xl object-cover w-full h-40"/></div>
                                        //     )
                                        // }
                                    }) }

                                    {/* {selectedImage.length == 1 ?  <div className='mr-5 relative' ><img src={URL.createObjectURL(selectedImage[0])} alt="" className="rounded-xl object-cover w-full"/>
                                    <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                    </div> : null}

                                    {selectedImage.length == 2 ? 
                                    <div className='mr-5 grid grid-cols-2 gap-2'>
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[0])} alt="" className="rounded-xl object-cover w-full h-60"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div> 
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[1])} alt="" className="rounded-xl object-cover w-full h-60"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div> 
                                    </div>
                                    : null}

                                    {selectedImage.length == 3 ? 
                                    <div className='mr-5 grid grid-rows-2 grid-cols-2 grid-flow-col gap-2 items-center'>
                                        <div className='row-span-2 relative' ><img src={URL.createObjectURL(selectedImage[0])} alt="" className="rounded-xl object-cover w-full h-60"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div> 
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[1])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div>
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[2])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div> 
                                    </div>
                                    : null} 

                                    {selectedImage.length == 4 ? 
                                    <div className='mr-5 grid grid-cols-2 gap-2'>
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[0])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button></div> 
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[1])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div>
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[2])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div> 
                                        <div className='relative' ><img src={URL.createObjectURL(selectedImage[3])} alt="" className="rounded-xl object-cover w-full h-28"/>
                                        <button type="button" className='absolute top-1 left-1 p-1 bg-darkprimary rounded-full bg-opacity-60 text-white hover:bg-darksecondary hover:bg-opacity-60 duration-500'><IoClose/></button>
                                        </div>  
                                    </div>
                                    : null} */}

                                </div>
                                
                                {selectedImage.length == 0 ? null : null}

                                {selectedImage.length > 0 && selectedImage.length <= 4 ? <div className="text-white text-sm pt-2 text-right mr-5">{selectedImageCounts} / 4 photos</div> : null}

                                {selectedImage.length > 4 ? <div className="text-red-500 text-sm pt-2 text-right mr-5">{selectedImageCounts} / 4 limit exceeded</div> : null}

                                <div className='pt-2 flex justify-between items-center'>
                                    {isVerified == 0 ? <label for="pic" className='text-xl bg-darksecondary rounded-full p-4'><AiOutlinePicture/></label> : <label for="pic" className='text-xl bg-pinktertiary rounded-full p-4 hover:bg-pinksecondary duration-700 disabled:bg-slate-500 hover:cursor-pointer'><AiOutlinePicture/></label>}
                                    
                                    {isVerified == 0 ? <input disabled className='hidden' type="file" id='pic' name='image' onChange={onFileChange}/> : <input className='hidden' type="file" id='pic' name='image' onChange={onFileChange}/>}
                                    
                                    {isVerified == 0 ? <button disabled className='text-lg bg-darksecondary rounded-full px-4 py-2 mr-5' type='submit'>Post</button> : <button className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700 mr-5' type='submit'>Post</button>}
                                    
                                </div>
                            </div>
                    </form>
                    
                    {/* Dummy Feed Template */}
                    {/* <div className='border-b-2 border-darksecondary flex pb-4 pl-6 pt-4 hover:bg-darksecondary duration-700'>
                        <div className='min-w-fit bg-yellow-400'><img src="" alt="" className="object-cover w-14 h-14 rounded-full"/></div>
                            <div className='text-white flex flex-col pl-6 bg-green-500 w-10/12'>
                                <div className='flex space-x-2'>
                                    <div>Barbara Palvin</div>
                                    <div>@realbarbarapalvin</div>
                                    <div>- 23 minutes ago</div>
                                </div>
                                <div className='pt-2 text-lg'>heeeeeeyyyyyyyyyy</div>
                                <div className='pt-2 text-lg pr-6'></div>
                                <div className='pt-4 flex justify-between'>
                                    <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>3<BiComment/></button>
                                    <button className='text-lg hover:scale-150 duration-700'><FaRetweet/></button>
                                    <button className='text-lg text-red-500 hover:scale-150 duration-700 flex items-center gap-2'>3<AiFillHeart/></button>
                                   
                                    <button className='text-lg hover:scale-150 duration-700'><FiShare/></button>
                                </div>
                            </div>
                            <div className='mr-5 bg-blue-500 w-fit'>
                                <button className=''><FiMoreHorizontal/></button>
                            </div>
                        </div> */}

                    <InfiniteScroll
                    hasMore={hasMore}
                    next={fetchDataOnScroll}
                    // loader={<div>Loading...</div>}
                    // endMessage={<div>ga ada lagi bosku</div>}
                    dataLength={data.length}>
                        {renderData()}
                    </InfiniteScroll>
                     
                </div>
            </div>
      
    )
}

export default Feed
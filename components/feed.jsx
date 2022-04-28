import { FaRetweet } from 'react-icons/fa'
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import Link from 'next/link';
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const Feed = ({profile_picture, postEverywhere, data, hasMore, fetchDataOnScroll}) => {
    
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
            if(selectedImage.length>4){
                throw { message : "Maximum 4 photos on a single upload"}
            }

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
                            <div><a href="">{val.profile_picture ? <img src={`${API_URL}${val.profile_picture}`} alt="" className="object-cover w-14 h-14 rounded-full"/> : <img src={`${API_URL}/photos/defaultcoverimage.png`} alt="" className="object-cover w-14 h-14 rounded-full" />}</a></div>
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
                                    <button className='text-lg hover:scale-150 duration-700 flex items-center gap-2'>{val.likes ? val.likes : null}<AiOutlineHeart/></button>
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
                                
                                <div className='mr-5 grid grid-cols-4 gap-2'>
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
                                

                                <div className='pt-2 space-x-52'>
                                    <label for="pic" className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700 disabled:bg-slate-500 hover:cursor-pointer'>Add Photos</label>
                                    <input className='hidden' type="file" id='pic' name='image' onChange={onFileChange}/>
                                    <button className='text-lg bg-pinktertiary rounded-full px-4 py-2 hover:bg-pinksecondary duration-700' type='submit'>Post</button>
                                </div>
                            </div>
                    </form>   
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
import { useEffect } from "react"
import API_URL from "../helpers/apiurl";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Postdetail = ({data, fetchDataUserDetail}) => {
    
    useEffect(() => {
        fetchDataUserDetail()
        renderData()
    }, []);

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
                            <button className='text-lg hover:scale-150 duration-700'><BiComment/></button>
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
        </div>
    );
}
 
export default Postdetail;
import { BiHomeCircle } from "react-icons/bi";
import { Avatar } from '@chakra-ui/react'
import { IoNotificationsOutline } from "react-icons/io5";
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
  } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import API_URL from '../helpers/apiurl';
import axios from 'axios'

const LeftNavBar = () => {
    
    const { isOpen, onOpen, onClose} = useDisclosure()

    // const [input, setInput] = useState({
    //     twaat:"",
    //     image:""
    // })

    // const inputTwaatHandler = (e) => {
    //     setInput({...input, [e.target.name]:e.target.value})
    // }  

    // const submitTwaatHandler = () => {
        
        
    //     axios.post(`${API_URL}/data`, 
    //     input
    //     )
    //     .then(() => {
    //     fetchData()
    //     setInput(
    //         {twaat:"",
    //         image:""}
    //     );
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });

    //     onClose()

    //     window.location.reload()
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
                <button onClick={onOpen} className='text-center text-xl rounded-full bg-pinktertiary py-3 px-20 hover:bg-pinksecondary duration-700'>Twaat</button>

                <button className='md:hidden absolute left-4 text-5xl'>
                    <IoAddCircleOutline/>
                </button>

                <div className='pt-10'>
                    <div className='flex items-center space-x-3 hover:bg-darksecondary rounded-full duration-700 py-2 px-3 cursor-pointer'>
                        <a href=""><Avatar size='md' bg='pink.500'/></a>
                        <div className='flex flex-col text-base'>
                            <div className='font-bold'>Barbara Palvin</div>
                            <div className='text-sm'>@realbarbarapalvin</div>
                        </div>
                        <button className='text-base p-2'><FiMoreHorizontal/></button>
                    </div> 
                </div>

            </div>

            <Modal size="sm" isOpen={isOpen} onClose={onClose} roundedTop='3xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg='darkprimary' display='flex' justifyContent='space-between'>
                        <button className="bg-darkprimary rounded-full py-2 px-3 text-base text-white hover:bg-darksecondary duration-700" onClick={onClose}>
                        Cancel
                        </button>
                        <button className='bg-pinktertiary text-white rounded-full py-2 px-3 text-base hover:bg-pinksecondary duration-700'>Twaat</button>
                    </ModalHeader>
                   
                <ModalBody className='flex gap-4 bg-darkprimary'>
                    <Avatar size='sm' bg='pink.500'/>
                    <textarea name="twaat" className='pt-1 focus:outline-none bg-darkprimary text-white resize-none'  cols="36" rows="10" placeholder="What's happening..."></textarea>
                </ModalBody>
    
                <ModalFooter className='bg-darkprimary'>
                    <label className='bg-pinktertiary text-white rounded-full py-2 px-3 text-base hover:bg-pinksecondary duration-700 cursor-pointer' for="inputPic">Upload</label>
                    <input className='hidden' type="file" id='inputPic' />
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LeftNavBar
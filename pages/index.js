import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { GiHummingbird } from "react-icons/gi";
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='flex justify-between mx-auto px-28 py-6 text-xl items-center'>
        <div className='text-5xl text-pinktertiary font-bold flex space-x-2'>
          <div><GiHummingbird/></div>
          <div>Echo.</div>
        </div>
        <div className='flex space-x-10'>
          <Link href="/login"><div className='hover:font-bold hover:cursor-pointer'>Login</div></Link>
          <Link href="/register"><div className='hover:font-bold hover:cursor-pointer'>Register</div></Link>
          <Link href=""><div className='hover:font-bold hover:cursor-pointer'>About</div></Link>
        </div>
      </div>

      <Heading>
        <div className='grid justify-center text-center text-9xl pt-10'>
        {/* bg-gradient-to-r from-pinktertiary to-violet-500 */}
        {/* bg-gradient-to-r from-violet-500 to-yellow-500 */}
        {/* bg-gradient-to-r from-yellow-500 to-pinktertiary */}
          <div>
            <motion.span className='bg-clip-text text-transparent'
              animate={{backgroundColor:["#FFFFFF", "#c3073f", "#ffffff"]}}
              // transition={{ ease: "easeOut", repeat:Infinity, duration:2, repeatDelay:10 }}
              >POST.</motion.span>
          </div>
          <div>
            <motion.span className='bg-clip-text text-transparent'
              animate={{backgroundColor:["#FFFFFF", "#0000FF", "#ffffff"]}}
              // transition={{ ease: "easeInOut", repeat:Infinity, delay:2, duration:2 }}
              >SHARE.</motion.span></div>
          <div>
            <motion.span className='bg-clip-text text-transparent'
              animate={{backgroundColor:["#FFFFFF", "#1200FF", "#ffffff"]}}
              // transition={{ ease: "easeInOut", repeat:Infinity, delay:4, duration:2 }}
              >INTERACT.</motion.span></div>
        </div>
      </Heading>
    </div>
  )
}

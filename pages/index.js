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
          <div>Echo</div>
        </div>
        <div className='flex space-x-10'>
          <Link href="/login"><div className='hover:font-bold hover:cursor-pointer'>Login</div></Link>
          <Link href="/register"><div className='hover:font-bold hover:cursor-pointer'>Register</div></Link>
          <Link href=""><div className='hover:font-bold hover:cursor-pointer'>About</div></Link>
        </div>
      </div>

      <Heading>
        <div className='grid justify-center text-center text-9xl pt-10'>
          <div>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-pinktertiary via-orange-500 to-pinktertiary animate-move-bg bg-[length:400%]'>POST.</span>
          </div>
          <div>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500  via-yellow-500 to-violet-500 animate-move-bg bg-[length:400%]'>SHARE.</span></div>
          <div>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 animate-move-bg bg-[length:400%]'>INTERACT.</span></div>
        </div>
      </Heading>
    </div>
  )
}

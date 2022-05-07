import { GiHummingbird } from "react-icons/gi";
import Link from 'next/link';
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { loginAction } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    
    const [inputEmail, setinputEmail] = useState({
        email:""
    });

    const handleInput = (e) => {
        setinputEmail({...inputEmail, [e.target.name]:e.target.value})
    };

    const router = useRouter()

    const submitForgotPassword = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/auth/forgotpassword`, {
              email : inputEmail.email
            });
            await Swal.fire(
                'Email sent!',
                'Please check your email',
                'success'
                )
        } catch (error) {
            console.log(error)
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: (error.response.data.message || "Network Error"),
              })
        }
    }

    return(
        <div className='bg-pinktertiary min-h-screen flex'>
            
            <div className="w-1/3 text-9xl font-bold grid justify-center mt-60 text-black">
                <GiHummingbird/>
            </div>

            {/* Header */}
            
            <div className='bg-black pb-6 w-2/3 pt-10 pl-10'>
                <div className="border-2 border-white w-fit mt-32 ml-48 py-4 rounded-3xl ">
                    <div className='font-bold text-pinktertiary px-10 pb-4'>
                        <div className='text-2xl pl-4 text-white font-bold'>Forgot Password</div>
                    </div>

                    {/* Form */}

                    <form className='text-pinktertiary font-bold text-lg space-y-6 mx-16' onSubmit={submitForgotPassword}>
                        <div className='flex flex-col'>
                            
                            <input 
                            placeholder="Email" 
                            className=" bg-black autofill:shadow-fill-black autofill:text-fill-white border-2 rounded-full border-white focus:outline-none text-white p-2 w-70 placeholder-pinktertiary" 
                            name="email"
                            type="text"
                            onChange={handleInput}
                            />
                        
                        </div>

                        <div className='py-2 flex justify-center bg-pinktertiary rounded-full focus:outline-none hover:cursor-pointer hover:text-black duration-700 text-white'><button className='text-2xl font-bold' type="submit">Send Link</button>
                        </div>

                        <div className="text-pinktertiary font-thin focus:outline-none">Don't have an account? <Link href="/register"><span className="hover:underline-offset-2 hover:underline hover:cursor-pointer">Sign Up</span></Link></div>
                    </form>

                </div>
                
                

            </div>

        </div>
    )
}

export default ForgotPassword;
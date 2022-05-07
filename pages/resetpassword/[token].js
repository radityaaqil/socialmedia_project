import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import API_URL from "../../helpers/apiurl";
import useUser from "../../hooks/useUser";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import { GiHummingbird } from "react-icons/gi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

const ResetPassword = () => {

    const router = useRouter()
    const { token } = router.query;
    //   const [status, setstatus] = useState(0);
    //   const [loading, setloading] = useState(true);

    //   if (loading) {
    //     return (
    //       <div className="grid justify-center pt-44 bg-black min-h-screen">
    //         <div className="text-white flex flex-col items-center space-y-6">
    //           <div className="text-5xl font-bold pt-6 text-pinktertiary">Loading . . .</div>
    //         </div>
    //       </div>
    //     );
    //   }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [show1, setShow1] = useState(false)
    const handleClick1 = () => setShow1(!show1)

    const formik = useFormik({
        initialValues : {
            password : "",
            confirmPassword : "",
        },

        validationSchema : Yup.object({
            password : Yup.string().min(8, "Must contain 8 characters or more").matches(/[A-Z]/g, "Should contain at least an uppercase letter").matches(/[a-z]/g, "Should contain at least a lowercase letter").matches(/[0-9]/g, "Should contain at least a number letter").matches(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g, "Should contain at least a special character").matches(/^\S*$/, "Should not contain spaces"),
            confirmPassword : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),

        onSubmit: async (values) => {
            // let token = Cookies.get('token')
            try {
                await axios.post(`${API_URL}/auth/resetpassword`, values,{
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                });
                await Swal.fire(
                    'Password successfully changed!',
                    "Let's get you back in!",
                    'success'
                    )
                router.push('/login')
            } catch (error) {
                console.log(error)
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: (error.response.data.message || "Network Error"),
                  }) 
            }     
        }
    });
    
    return ( 
        <div className='bg-pinktertiary min-h-screen flex'>
            
            <div className="w-1/3 text-9xl font-bold grid justify-center mt-60 text-black">
                <GiHummingbird/>
            </div>

            {/* Header */}
            
            <div className='bg-black pb-6 w-2/3'>
                <div className="border-2 border-white w-fit mt-32 ml-48 py-4 rounded-3xl ">
                    <div className='font-bold text-pinktertiary px-10 pb-4'>
                        <div className='text-2xl pl-4 text-white font-bold'>Reset Password</div>
                    </div>

                    {/* Form */}

                    <form className='text-pinktertiary font-bold text-lg space-y-2 mx-16' onSubmit={formik.handleSubmit}>

                        <div className='flex flex-col pt-5 relative'>
                            <input 
                            className=" bg-black border-2 rounded-full border-white focus:outline-none text-white p-2 placeholder-pinktertiary" 
                            placeholder="Password" 
                            name="password" 
                            type={show ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.password} 
                            required />

                            {formik.touched.password && formik.errors.password ? <p className="text-sm ml-3 text-pinktertiary pt-1">{formik.errors.password}</p> : null}

                            <div className="absolute mt-2 right-4 text-3xl hover:cursor-pointer" onClick={handleClick}>{show ? <BsEyeFill/> : <BsEyeSlashFill/> }</div>
                        </div>

                        <div className='flex flex-col pt-5 relative'>
                            <input 
                            className=" bg-black border-2 rounded-full border-white focus:outline-none text-white p-2 placeholder-pinktertiary" 
                            placeholder="Confirm Password" 
                            name="confirmPassword" 
                            type={show1 ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.confirmPassword}  
                            required/>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="text-sm ml-3 text-pinktertiary pt-1">{formik.errors.confirmPassword}</p> : null}

                            <div className="absolute mt-2 right-4 text-3xl hover:cursor-pointer" onClick={handleClick1}>{show1 ? <BsEyeFill/> : <BsEyeSlashFill/> }</div>
                        </div>

                        <div className='flex space-x-2 text-white pt-5 pb-5'>
                            <div>
                                <input 
                                    className="accent-pinktertiary"
                                    type="checkbox" 
                                    name="terms" 
                                    required/>
                                </div>
                            <div><a href="" className="text-pinktertiary">I agree to the terms and conditions</a></div>
                        </div>

                        <div className='py-2 flex justify-center bg-pinktertiary rounded-full focus:outline-none hover:cursor-pointer hover:text-black duration-700 text-white disabled:bg-black '><button type="submit" className='text-2xl font-bold'>Reset</button>
                        </div>

                        <div className="text-pinktertiary font-thin pt-5">Already have an account? <Link href="/login"><span className="hover:underline-offset-2 hover:underline hover:cursor-pointer">Sign Up</span></Link></div>
                    </form>

                </div>
                
                

            </div>

        </div>
    
    )
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default ResetPassword;
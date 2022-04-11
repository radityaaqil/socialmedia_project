import { GiHummingbird } from "react-icons/gi";
import Link from 'next/link';
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { loginAction } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";

const Login = ({loginAction}) => {
    
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const router = useRouter()

    const { isLogin } = useSelector((state) => state.user);

    const formik = useFormik({
        initialValues : {
            username : "",
            password : "",
        },

        validationSchema : Yup.object({
            username : Yup.string().max(25, "Must contain 15 characters or less").required("Required").matches(/^\S*$/, "Should not contain spaces"), 
            password : Yup.string().min(8, "Must contain 8 characters or more").required("Required")
        }),

        onSubmit: (values) => {
            
            try {
                
                loginAction(values)

            } catch (error) {
                console.log(error)
                  
            }     
        }
    })

    if(isLogin){
        router.push("/home")
    }

    return(
        <div className='bg-pinktertiary min-h-screen flex'>
            
            <div className="w-1/3 text-9xl font-bold grid justify-center mt-60 text-black">
                <GiHummingbird/>
            </div>

            {/* Header */}
            
            <div className='bg-black pb-6 w-2/3'>
                <div className="border-2 border-white w-fit mt-32 ml-48 py-4 rounded-3xl ">
                    <div className='font-bold text-pinktertiary px-10 pb-4'>
                        <div className='text-2xl pl-4 text-white font-bold'>Sign In</div>
                    </div>

                    {/* Form */}

                    <form className='text-pinktertiary font-bold text-lg space-y-6 mx-16' onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col'>
                            
                            <input 
                            placeholder="Email or Username" 
                            className=" bg-black border-2 rounded-full border-white focus:outline-none text-white p-2 w-70 placeholder-pinktertiary" 
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}  />

                            {formik.touched.username && formik.errors.username ? <p className="text-sm ml-3 text-pinktertiary pt-1">{formik.errors.username}</p> : null}
                        
                        </div>

                        <div className='flex flex-col relative'>
                          
                            <input 
                            placeholder="Password" 
                            className=" bg-black border-2 rounded-full border-white focus:outline-none text-white p-2 placeholder-pinktertiary" 
                            type={show ? 'text' : 'password'}
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} 
                            value={formik.values.password}  />

                            <div className="absolute mt-2 right-4 text-3xl hover:cursor-pointer" onClick={handleClick}>{show ? <BsEyeFill/> : <BsEyeSlashFill/> }</div>

                            {formik.touched.password && formik.errors.password ? <p className="text-sm ml-3 text-pinktertiary pt-1">{formik.errors.password}</p> : null}

                        </div>

                        <div className='flex space-x-2 text-white'>
                            <div><input type="checkbox" /></div>
                            <div><a href="" className="text-pinktertiary">Remember Me</a></div>
                        </div>

                        <div className='py-2 flex justify-center bg-pinktertiary rounded-full focus:outline-none hover:cursor-pointer hover:text-black duration-700 text-white'><button className='text-2xl font-bold' type="submit">Sign In</button>
                        </div>

                        <div className="text-pinktertiary font-thin focus:outline-none">Don't have an account? <Link href="/register"><span className="hover:underline-offset-2 hover:underline hover:cursor-pointer">Sign Up</span></Link></div>
                    </form>

                </div>
                
                

            </div>

        </div>
    )
}

export default connect(null, { loginAction })(Login);
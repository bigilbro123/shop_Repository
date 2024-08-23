import React, { useState } from 'react'
import loginicon from '../assest/assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link } from 'react-router-dom'
function Login() {
    const [showPass, setPass] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleOnchge = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve, [name]: value
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

    }
    console.log(data);


    return (

        <>
            <section id='login'>
                <div className="mx-auto container p-4">
                    <div className="bg-white p-2 py-4 w-full max-w-sm mx-auto">
                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginicon} alt="LOIN" />
                        </div>

                        <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label htmlFor="">Email</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 '>
                                    <input onChange={handleOnchge} name='email' value={data.email} type="email" placeholder='Enter Email' className='w-full h-full outline-none bg-transparent' />

                                </div>

                            </div>
                            <div className='grid'>
                                <label htmlFor="">password</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 flex'>
                                    <input onChange={handleOnchge} name='password' value={data.password} type={showPass ? 'text' : 'password'} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' />
                                    <div><span onClick={() => {
                                        showPass ? setPass(false) : setPass(true)
                                    }} className='cursor-pointer text-lg'>{!showPass ? <PiEyeClosedBold /> : <FaEye />}</span></div>
                                </div>

                                <div>
                                    <Link to={"/forgot-password"} className='block w-fit ml-auto  hover:underline hover:text-red-700 '>Forgot Password?</Link>
                                </div>
                            </div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>LOGIN</button>
                        </form>
                        <p className='my-5 hover:text-red-600'>Don't have account? <Link to={"/sign-up"} className='hover:underline'> Sign Up</Link ></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
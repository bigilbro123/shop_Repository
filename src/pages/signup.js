import React, { useState } from 'react'
import loginicon from '../assest/assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link } from 'react-router-dom'
import imageTobase64 from '../helper/ImageTobase64';
function Signup() {
    const [showPass, setPass] = useState(false)
    const [showConPass, setshowConPass] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        Cpassword: '',
        profilepic: ''
    })

    const handleOnchge = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve, [name]: value
            }
        })
    }

    const handleOnchgepic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePic = await imageTobase64(file)
            console.log(imagePic);
            setData((preve) => {
                return {
                    ...preve, Profileimage: imagePic
                }
            })
        }


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
                        <div className='w-20 h-20 mx-auto relative  overflow-hidden rounded-full'>
                            <div>
                                <img src={data.Profileimage || loginicon} alt="LOIN" />

                            </div>
                            <form action="">
                                <label htmlFor="photoInput">
                                    {
                                        !data.Profileimage ? <div className='text-xs bg-slate-200 flex text-center bg-opacity-80 justify-center cursor-pointer py-3 absolute bottom-0 w-full'>
                                            Photo
                                        </div> : <div className='text-xs bg-green-200 flex text-center bg-opacity-80 justify-center cursor-pointer py-3 absolute bottom-0 w-full'>
                                            change
                                        </div>
                                    }
                                    <input type="file" id="photoInput" className='hidden' onChange={handleOnchgepic} />
                                </label>
                            </form>


                        </div>

                        <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label htmlFor="">Name</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 '>
                                    <input onChange={handleOnchge} name='name' value={data.name} type="text" placeholder='Enter Name' className='w-full h-full outline-none bg-transparent' />

                                </div>

                            </div>
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


                            </div>
                            <div className='grid'>
                                <label htmlFor="">confrim password</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 flex'>
                                    <input onChange={handleOnchge} name='Cpassword' value={data.Cpassword} type={showConPass ? 'text' : 'password'} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' />
                                    <div><span onClick={() => {
                                        showConPass ? setshowConPass(false) : setshowConPass(true)
                                    }} className='cursor-pointer text-lg'>{!showConPass ? <PiEyeClosedBold /> : <FaEye />}</span></div>
                                </div>


                            </div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                        </form>
                        <p className='my-5 hover:text-red-600'>I have account <Link to={"/login"} className='hover:underline'> LOGIN</Link ></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
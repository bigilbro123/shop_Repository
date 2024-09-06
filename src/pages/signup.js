import React, { useState } from 'react';
import loginicon from '../assest/assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/ImageTobase64';
import summaryApi from '../common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [showPass, setPass] = useState(false);
    const [showConPass, setshowConPass] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        profilepic: ''
    });

    const handleOnchge = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        });
    };
    const navigate = useNavigate()

    const handleOnchgepic = async (e) => {
        console.log(summaryApi.url);

        const file = e.target.files[0];
        if (file) {
            const imagePic = await imageTobase64(file);
            console.log(imagePic);
            setData((preve) => {
                return {
                    ...preve,
                    profilepic: imagePic
                };
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.profilepic) {
            toast.warning('Please upload a profile picture.');
            return;
        }
        if (data.password === data.confirmpassword) {
            try {
                const datares = await fetch(summaryApi.signup.url, {
                    method: summaryApi.signup.method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (!datares.ok) {
                    throw new Error(`HTTP error! status: ${datares.status}`);
                }

                const datas = await datares.json();
                console.log(datas);

                if (datas.success) {
                    toast.success(datas.message || 'Signup successful!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else if (datas.error) {
                    toast.error(datas.error || 'Signup failed!');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to signup. Please try again later.');
            }
        } else {
            toast.warning('Passwords do not match!');
        }
    };


    return (
        <>
            <section id='login'>
                <div className="mx-auto container p-4">
                    <div className="bg-white p-2 py-4 w-full max-w-sm mx-auto">
                        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                            <div>
                                <img src={data.profilepic || loginicon} alt="LOGIN" />
                            </div>
                            <form>
                                <label htmlFor="photoInput">
                                    {
                                        !data.profilepic ? (
                                            <div className='text-xs bg-slate-200 flex text-center bg-opacity-80 justify-center cursor-pointer py-3 absolute bottom-0 w-full'>
                                                Photo
                                            </div>
                                        ) : (
                                            <div className='text-xs bg-green-200 flex text-center bg-opacity-80 justify-center cursor-pointer py-3 absolute bottom-0 w-full'>
                                                Change
                                            </div>
                                        )
                                    }
                                    <input type="file" id="photoInput" className='hidden' onChange={handleOnchgepic} />
                                </label>
                            </form>
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label>Name</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 '>
                                    <input
                                        required
                                        onChange={handleOnchge}
                                        name='name'
                                        value={data.name}
                                        type="text"
                                        placeholder='Enter Name'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Email</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 '>
                                    <input
                                        required
                                        onChange={handleOnchge}
                                        name='email'
                                        value={data.email}
                                        type="email"
                                        placeholder='Enter Email'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Password</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 flex'>
                                    <input
                                        required
                                        onChange={handleOnchge}
                                        name='password'
                                        value={data.password}
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div>
                                        <span onClick={() => setPass(!showPass)} className='cursor-pointer text-lg'>
                                            {showPass ? <FaEye /> : <PiEyeClosedBold />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='grid'>
                                <label>Confirm Password</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 flex'>
                                    <input
                                        required
                                        onChange={handleOnchge}
                                        name='confirmpassword'
                                        value={data.confirmpassword}
                                        type={showConPass ? 'text' : 'password'}
                                        placeholder='Confirm password'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div>
                                        <span onClick={() => setshowConPass(!showConPass)} className='cursor-pointer text-lg'>
                                            {showConPass ? <FaEye /> : <PiEyeClosedBold />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                                Sign Up
                            </button>
                        </form>
                        <p className='my-5 hover:text-red-600'>
                            I have an account
                            <Link to={"/login"} className='hover:underline'> LOGIN</Link>
                        </p>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Signup;

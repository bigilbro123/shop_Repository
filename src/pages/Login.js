import React, { useState } from 'react';
import loginicon from '../assest/assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../context/index.js';
import { useContext } from 'react';

function Login() {
    const [showPass, setPass] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const GeneralContext = useContext(Context);
    console.log(GeneralContext);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev, [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(summaryApi.login.url, {
                method: summaryApi.login.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                toast.success(result.message || 'Login successful!');
                setTimeout(() => {

                    navigate('/');
                    GeneralContext.fetchUserDetail()
                }, 2000);
            } else {
                toast.error(result.error || 'Email or password is incorrect');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Login error:', error);
        }
    };


    return (
        <>
            <section id='login'>
                <div className="mx-auto container p-4">
                    <div className="bg-white p-2 py-4 w-full max-w-sm mx-auto">
                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginicon} alt="LOGIN" />
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label htmlFor="email">Email</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 '>
                                    <input
                                        onChange={handleOnChange}
                                        name='email'
                                        value={data.email}
                                        type="email"
                                        placeholder='Enter Email'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                </div>
                            </div>

                            <div className='grid'>
                                <label htmlFor="password">Password</label>
                                <div style={{ borderRadius: "10px" }} className='bg-slate-100 p-2 flex'>
                                    <input
                                        onChange={handleOnChange}
                                        name='password'
                                        value={data.password}
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        className='w-full h-full outline-none bg-transparent'
                                    />
                                    <div>
                                        <span onClick={() => setPass(!showPass)} className='cursor-pointer text-lg'>
                                            {!showPass ? <PiEyeClosedBold /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-700'>
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                                LOGIN
                            </button>
                        </form>
                        <p className='my-5 hover:text-red-600'>
                            Don't have an account? <Link to={"/sign-up"} className='hover:underline'> Sign Up</Link >
                        </p>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Login;

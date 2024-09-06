import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summaryApi from '../common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './Logo'
import { setUserDeatil } from '../store/userSlice';
import ROLE from '../common/role';




function Header() {
    const [block, setBlock] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state?.user?.user)
    console.log("HEADER" + user);
    const handleLogout = async () => {
        const fectData = await fetch(summaryApi.LOGOUT.url, {
            method: summaryApi.LOGOUT.method,
            credentials: 'include'
        })
        const data = await fectData.json()
        if (data.error) {
            toast.error("Logout failed")
        }
        if (data.success) {
            toast.success("Logout success");
            setTimeout(() => {
                dispatch(setUserDeatil(null))
            }, 1000)
            setTimeout(() => {
                navigate('/login');
            }, 2000)

        }

    }
    // alert(process.env.CLOUD_NAME)


    return (
        <header className='h-16 shadow-md bg-white'>
            <div className=" h-full container mx-auto flex items-center px-4 justify-between">
                <div>
                    <Link to={'/'}>
                        <Logo h={90} w={50} />
                    </Link>
                </div>

                <div className=' hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow-md pl-2'>
                    <input className='w-full outline-none ' type="text" placeholder='search' />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'> <GrSearch /> </div>
                </div>
                <div className='flex items-center gap-7'>
                    <div className='relative '>
                        <div className='text-3xl cursor-pointer ' onClick={() => setBlock(prev => !prev)}>
                            {
                                !user ? null : (!user?.profilepic ? <FaRegCircleUser /> : <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user?.name} />)

                            }

                        </div>
                        {user?.role === ROLE.ADMIN ? (block && <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg   ' style={{ display: block }}>
                            <nav>
                                <Link to={"admin-panel/product"} className='whitespace-nowrap hover:bg-slate-100 p-2 ' onClick={() => setBlock(prev => !prev)}>Admin panel</Link>
                            </nav>
                        </div>) : null}
                    </div>

                    <div>
                        {!user ? null : <div className='text-2xl cursor-pointer relative rounded'>
                            <span><FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-xs'>0</p>
                            </div>
                        </div>}
                    </div>
                    <div>
                        {!user ?
                            <Link to={"login"}>
                                <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</button>
                            </Link> :
                            <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                        }
                    </div>
                </div>


            </div>
            <ToastContainer />
        </header >
    )
}

export default Header
import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDeatil } from '../store/userSlice';
function AdminPanel() {

    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.user)
    // var names = user?.name
    // var firstL = names.slice(0, 1).toUpperCase()
    const handleLogout = async () => {
        try {
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
                },)
            }
        } catch (error) {
            throw new Error(error)
        }

    }
    return (
        <div className='min-h-[100vh] flex flex-col'>

            <aside className="bg-slate-50 w-full h-20 flex justify-between shadow-2xl">
                <div className='h-32 flex  flex-col '>
                    <div className='text-5xl cursor-pointer p-2 '>
                        {!user?.profilepic ? <FaRegCircleUser /> : <img src={user?.profilepic} title={user?.role} className='w-10 h-fit rounded-lg' alt={user?.name} />}
                    </div>
                    <div>
                        {!user ? <p className='capitalize text-lg font-semibold justify-center items-center'>LOGIN FIRST</p> : <p className='capitalize text-lg font-semibold justify-center items-center'>{user?.name}</p>}

                    </div>
                </div>

                <div>
                    <nav className='flex flex-row'>
                        <Link to={"all-user"} className='p-4 hover:bg-slate-100'>All User</Link>
                        <Link to={"product"} className='p-4 hover:bg-slate-100'>Product</Link>

                    </nav>
                </div>
            </aside>


            <main className='flex-1 bg-gray-100 p-4'>
                <Outlet />
            </main>
        </div>

    )
}

export default AdminPanel


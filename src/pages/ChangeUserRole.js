import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    calllfuction
}) => {
    const [user, setUser] = useState(role);

    const handleOnChangeRole = (e) => {
        setUser(e.target.value);
        console.log(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchRes = await fetch(summaryApi.updateuser.url, {
                method: summaryApi.updateuser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    role: user,
                    userId: userId
                })
            });
            const responseData = await fetchRes.json();
            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                calllfuction()
            } else {
                toast.error("Failed to update user role");
            }
            console.log(responseData);
        } catch (error) {
            throw new Error(error)
        }
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-100 bg-opacity-40'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm '>
                <div className='text-2xl relative flex cursor-pointer items-center justify-end'>
                    <button className='block ml-auto' onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name: {name} </p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role</p>
                    <select
                        name="role"
                        id="role"
                        value={user} // The current role will be the default value
                        onChange={handleOnChangeRole}
                        className='border px-4 py-1'
                    >
                        <option value="" style={{ color: 'red' }}>SELECT ROLE</option>
                        {Object.values(ROLE).map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                </div>
                <button onClick={updateUserRole} className='w-fit mx-auto block py-1 px-2 rounded-full bg-red-500 hover:bg-red-600 text-white'>
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;

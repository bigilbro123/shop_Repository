import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import './Alluser.css';
import { FaRegCircleUser } from "react-icons/fa6";
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import ChangeUserRole from './ChangeUserRole';

function Alluser() {
    const [user, setUser] = useState([]);
    const [openupdate, setOpenupdate] = useState(false);
    const [updateUser, setUpdateuser] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchUser = async () => {
        try {
            const fedata = await fetch(summaryApi.Alluser.url, {
                method: summaryApi.Alluser.method,
                credentials: 'include',
            });
            const datares = await fedata.json();
            console.log(datares);

            if (datares && Array.isArray(datares.data)) {
                setUser(datares.data);
                console.log(datares.data);
            } else {
                toast.error("ERROR: Data format is incorrect");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("ERROR: Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <table className="w-full userTable">
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.no</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? (
                        user.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {!item?.profilepic ? (
                                        <FaRegCircleUser />
                                    ) : (
                                        <img src={item?.profilepic} width="50px" alt="user" />
                                    )}
                                </td>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{item?.role}</td>
                                <td>{moment(item?.createdAt).format('LLL')}</td>
                                <td
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div
                                        className="py-1 px-2 bg-green-200 rounded-full hover:bg-green-300 hover:text-white hover:transition-all"
                                        onClick={() => {
                                            setOpenupdate(true);
                                            setUpdateuser(item);
                                        }}
                                    >
                                        <button>
                                            <MdModeEdit />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {openupdate && (
                <ChangeUserRole
                    onClose={() => setOpenupdate(false)}
                    name={updateUser.name}
                    email={updateUser.email}
                    role={updateUser.role}
                    userId={updateUser._id}
                    calllfuction={fetchUser}
                />
            )}
        </div>
    );
}

export default Alluser;

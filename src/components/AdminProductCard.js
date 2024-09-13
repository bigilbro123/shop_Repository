import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEdit from './AdminEdit';
import displayINRcurrency from '../helper/displayCurrency';

function AdminProductCard({
    data, index, fetchdata
}) {
    const [editProduct, onClose] = useState(false)
    return (
        <>
            <div className=''>
                <div className='bg-white p-4 rounded'>
                    <div className='w-40'>
                        <div className='w-32 h-32 flex justify-center items-center'>
                            <img src={data.productImage[0]} width={120} alt="" className='w-fit mx-auto object-fill h-full' />

                        </div>                        <h1>{data.productName.length > 10 ? data.productName.slice(0, 15) + "...." : data.productName}</h1>


                        <div>
                            <p className='font-semibold'>
                                {
                                    displayINRcurrency(data.selling)
                                }

                            </p>

                            <div className='w-fit ml-auto bg-slate-200 p-2 hover:bg-green-600 rounded-full cursor-pointer hover:text-white transition-all' onClick={() => onClose(prev => !prev)}>
                                <MdEdit />

                            </div>

                        </div>
                    </div>

                </div>

                {editProduct && <AdminEdit fetchdata={fetchdata} datas={data} onClose={onClose} />}


            </div>

        </>
    )
}

export default AdminProductCard
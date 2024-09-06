import React from 'react'
import { IoMdClose } from "react-icons/io";

function DisplayImage({ imageurl, setSeen }) {
    return (
        <div className='flex items-center justify-center '>

            <div className='w-3/4 h-fit flex items-center justify-center   bg-white shadow-xl border-r-2 rounded relative'>
                <div onClick={() => setSeen(false)} className='cursor-pointer absolute right-4 top-2 text-2xl'>
                    <IoMdClose />
                </div>

                <div className='w-2/4 flex items-center justify-center'>
                    <img src={imageurl} alt="" className="max-w-full max-h-full" />
                </div>
            </div>
        </div>
    );
}

export default DisplayImage
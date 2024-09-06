import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

function AllProduct() {
    const [upload, setUpload] = useState(false)
    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg '>ALL Poducts</h2>
                <button onClick={() => setUpload(prev => !prev)} className='border-2 border-red-600 hover:bg-red-600 hover:text-white text-red-600 py-2 px-4 rounded-full  transition-all'>Upload product</button>
            </div>

            {upload && <UploadProduct onClose={setUpload} />}

        </div>
    )
}

export default AllProduct
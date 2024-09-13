import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common'
import { toast, ToastContainer } from 'react-toastify'
import AdminProductCard from '../components/AdminProductCard'

function AllProduct() {
    const [upload, setUpload] = useState(false)
    const [allProducts, setAllproducts] = useState([])
    const Allprod = async () => {
        const dataRes = await fetch(summaryApi.allproduct.url, {
            method: summaryApi.allproduct.method,
            credentials: 'include'
        })

        const resdatares = await dataRes.json()

        setAllproducts(resdatares?.data)
    }



    useEffect(() => {
        Allprod()
    }, [])

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg '>ALL Poducts</h2>
                <button onClick={() => setUpload(true)} className='border-2 border-red-600 hover:bg-red-600 hover:text-white text-red-600 py-2 px-4 rounded-full  transition-all'>Upload product</button>
            </div>


            <div className='flex flex-wrap items-center gap-5 py-4 px-2'>
                {
                    !allProducts ? <h1>no data</h1> : allProducts.map((pro, index) => {
                        return (
                            < AdminProductCard fetchdata={Allprod} data={pro} key={index} />


                        )
                    })
                }
            </div>

            {upload && <UploadProduct Allprod={Allprod} onClose={setUpload} />}













            <ToastContainer />

        </div>

    )
}

export default AllProduct
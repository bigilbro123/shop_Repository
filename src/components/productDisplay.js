import React, { useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fechtCategoryWiseProduct'
import displayINRcurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import addToCart from '../helper/AddToCart';


function ProductDispaly({
    HoriZontal, heading, categorys, display
}) {
    const [scroll, setScroll] = useState(0)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const fectData = async () => {
        try {
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(categorys);
            setLoading(false)
            setData(categoryProduct?.data)
            // console.log(data);
        } catch (error) {
            throw new Error(error)
        }


    }

    useEffect(() => {
        fectData()
    }, [])



    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold  py-4' >
                {heading}
            </h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] md:gap-6 justify-between overflow-x-scroll scrollbar-none transition-all' >

                {loading ? loadingList.map((item, index) => {
                    return (
                        <div className='w-full min-w-[280px] md:min-w-[340px] max-w-[320px]  bg-white rounded-sm shadow ' key={index}>
                            {display ? (
                                <div className='bg-slate-200  h-36 p-4 min-w-[280px]  md:min-w-[145px] flex gap-3 justify-center'>

                                    <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                                        <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                        </svg>
                                        <span class="text-4xl font-medium text-gray-500">Loading...</span>
                                    </div>                                </div>
                            ) : (
                                <div className='bg-slate-200  h-36 p-4 min-w-[280px]  md:min-w-[145px] flex gap-3 justify-center'>

                                    <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                                        <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="24"></line>
                                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                            </line>
                                        </svg>
                                        <span class="text-4xl font-medium text-gray-500">Loading...</span>
                                    </div>                                </div>
                            )}




                            <div className='p-4 grid gap-3'>
                                {<h2 className='font-medium  text-base  md:text-lg text-ellipsis line-clamp-1' >{ }</h2>
                                }
                                <p className='capitalize'>{ }</p>
                                <div className='flex gap-1 flex-wrap'>
                                    <p className='text-red-600 font-medium' >{ }</p>
                                    <del><p className='text-slate-500'>{ }</p></del>

                                </div>
                                <button className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Loading.....</button>

                            </div>
                        </div>
                    )
                }) : (
                    data.map((item, index) => {
                        return (
                            <Link to={"/product/" + item?._id} className='w-full min-w-[280px] md:min-w-[340px] max-w-[320px]  bg-white rounded-sm shadow ' key={index}>
                                {display ? (
                                    <div className='bg-slate-200  h-36 p-4 min-w-[280px]  md:min-w-[145px] flex gap-3 justify-center'>

                                        <img src={item?.productImage[0]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                        <img src={item?.productImage[1]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                    </div>
                                ) : (
                                    <div className='bg-slate-200  h-36 p-4 min-w-[280px]  md:min-w-[145px] flex gap-3 justify-center'>

                                        <img src={item?.productImage[0]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                        <img src={item?.productImage[1]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                        <img src={item?.productImage[2]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                        <img src={item?.productImage[3]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                                    </div>
                                )}




                                <div className='p-4 grid gap-3'>
                                    {<h2 className='font-medium  text-base  md:text-lg text-ellipsis line-clamp-1' >{item?.productName}</h2>
                                    }
                                    <p className='capitalize'>{item?.category}</p>
                                    <div className='flex gap-1 flex-wrap'>
                                        <p title={Math.floor(((item?.price - item?.selling) / item?.price) * 100) + '%'} className='text-red-600 font-medium' >{displayINRcurrency(item.selling)}</p>
                                        <del><p title={Math.floor(((item?.price - item?.selling) / item?.price) * 100) + '%'} className='text-slate-500'>{displayINRcurrency(item.price)}</p></del>

                                    </div>
                                    <button onClick={(e) => addToCart(e, item?._id)} className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>

                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ProductDispaly
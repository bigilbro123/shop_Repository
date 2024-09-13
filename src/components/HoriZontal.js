import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fechtCategoryWiseProduct'
import displayINRcurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'


function HoriZontal({
    HoriZontal, heading, categorys
}) {
    const [scroll, setScroll] = useState(0)
    const scrollelement = useRef()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const fectData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(categorys);
        setLoading(false)
        setData(categoryProduct?.data)
        console.log(data);


    }

    useEffect(() => {
        fectData()
    }, [])

    const scrollRight = () => {
        scrollelement.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    }

    const scrollLeft = () => {
        scrollelement.current.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold  py-4' >
                {heading}
            </h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollelement}>
                <button className='bg-white text-lg hidden md:block shadow-md rounded-full p-1 absolute left-0' onClick={() => scrollLeft()}>
                    <FaAngleLeft />
                </button>
                <button className='bg-white text-lg hidden md:block shadow-md rounded-full p-1 absolute right-0' onClick={() => scrollRight()}><FaAngleRight /></button>

                {data.map((item, index) => {
                    return (
                        <div className='w-full min-w-[280px] md:min-w-[340px] max-w-[320px] h-40 bg-white rounded-sm shadow flex' key={index}>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                <img src={item.productImage[1]} alt="" className='object-scale-down h-full mix-blend-multiply hover:scale-110 transition-all' />
                            </div>
                            <div className='p-4 grid'>
                                {item?.productName.length < 10 ? <h2 className='font-medium  text-base  md:text-lg text-ellipsis line-clamp-1' >{item?.productName}</h2> : <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1' >{item?.productName.slice(0, 17) + ".."}</h2>
                                }
                                <p className='capitalize'>{item?.category}</p>
                                <div className='flex gap-1 flex-wrap'>
                                    <p title={Math.floor(((item?.price - item?.selling) / item?.price) * 100) + '%'} className='text-red-600 font-medium' >{displayINRcurrency(item.selling)}</p>
                                    <del><p title={Math.floor(((item?.price - item?.selling) / item?.price) * 100) + '%'} className='text-slate-500'>{displayINRcurrency(item.price)}</p></del>

                                </div>
                                <button className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HoriZontal
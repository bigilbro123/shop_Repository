import React, { useEffect, useState } from 'react'
import image1 from '../assest/assest/banner/img1.webp'
import imageMoblie from '../assest/assest/banner/img1_mobile.jpg'
import image2 from '../assest/assest/banner/img2.webp'
import image3 from '../assest/assest/banner/img3.jpg'
import image4 from '../assest/assest/banner/img4.jpg'
import image5 from '../assest/assest/banner/img5.webp'
import imageMoblie1 from '../assest/assest/banner/img2_mobile.webp'
import imageMoblie2 from '../assest/assest/banner/img3_mobile.jpg'
import imageMoblie4 from '../assest/assest/banner/img4_mobile.jpg'
import imageMoblie5 from '../assest/assest/banner/img5_mobile.png'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function BannerProduct() {




    const [current, setCurrent] = useState(0)
    const deskTopImg = [
        image3, image2, image5, image1, image4

    ]
    const mobileImag = [
        imageMoblie4, imageMoblie1, imageMoblie, imageMoblie5, imageMoblie2
    ]

    const next = () => {
        if (deskTopImg.length - 1 > current) {
            setCurrent(prev => prev + 1)
        }
    }
    const next1 = () => {
        if (current !== 0) {
            setCurrent(prev => prev - 1)
        }
    }
    useEffect(() => {
        const intervell = setInterval(() => {
            if (mobileImag.length - 1 > current) {
                setCurrent(current + 1)

            } else {
                setCurrent(0)
            }
        }, 5000)
        return () => clearInterval(intervell)
    }, [current])
    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>

                        <button onClick={() => next1()} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={() => next()} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>
                <div className='hidden md:flex h-full w-full overflow-hidden'>

                    {
                        deskTopImg.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full  min-w-full min-h-full transition-all ' key={index} style={{ transform: `translateX(-${current * 100}%)` }}>
                                    <img src={imageUrl} alt="" className='w-full h-full' />

                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex h-full w-full overflow-hidden md:hidden'>

                    {
                        mobileImag.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full  min-w-full min-h-full transition-all ' key={index} style={{ transform: `translateX(-${current * 100}%)` }}>
                                    <img src={imageUrl} alt="" className='w-full h-full object-cover' />

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div >
    )
}

export default BannerProduct
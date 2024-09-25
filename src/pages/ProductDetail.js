import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import summaryApi from '../common'
import HoriZontal from '../components/HoriZontal';
import Vertical from '../components/Vertical';
import { FaStar } from "react-icons/fa";
import displayINRcurrency from '../helper/displayCurrency';
import { useSelector } from 'react-redux';
import ProductDispaly from '../components/productDisplay';
import addToCart from '../helper/AddToCart';
import Context from '../context';

function ProductDetail() {

    const [data, setData] = useState({
        brandName: "",
        category: "",
        description: "",
        price: "",
        productImage: [],
        productName: "",
        selling: ""
    });
    const [loading, setLoading] = useState(false);
    const [zoomtrue, setZoomtrue] = useState(true)
    const params = useParams();
    const productid = params.productid;
    const [zoomimgs, setzoomImage] = useState(
        {
            x: 0, y: 0
        }
    )
    // const user = useSelector(state => state?.user?.user)


    const fetchD = async () => {
        try {
            setLoading(true);

            const fetchData = await fetch(summaryApi.productDetailes.url, {
                method: summaryApi.productDetailes.method,
                headers: {
                    "content-type": "application/json" // Fixed typo
                },
                body: JSON.stringify({
                    productid: productid
                }),
            });

            const response = await fetchData.json();
            console.log(response.data);

            // Correctly updating the state
            setData((prevData) => ({
                ...prevData,
                ...response.data,
            }));
            setimage(response.data?.productImage[0])

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Ensure loading is turned off in case of error
        }
    };

    useEffect(() => {
        if (productid) {
            fetchD();
        }
    }, [productid]); // Re-run the fetch when productid changes
    const productImgList = new Array(4).fill(null)
    const [image, setimage] = useState('')
    const handleMouse = (imageUrl) => {
        setimage(imageUrl)

    }
    const { fechAddtoCart } = useContext(Context);
    const handleAddToCart = async (e, id) => {

        await addToCart(e, id)
        fechAddtoCart()

    }
    const handleZoomImg = (e) => {

        const { left, top, width, height } = e.target.getBoundingClientRect();
        console.log("coordinate", left, top, width, height);
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height
        setzoomImage((prve) => ({
            ...prve, x, y
        }))

    };
    const handelmouseleve = () => {
        setZoomtrue(true)
    }
    const handelmouseEnter = () => {
        setZoomtrue(false)
    }



    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(null);
        setHoveredIndex(index);
    };








    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    {/* Image container */}
                    <div className='relative h-[300px] lg:h-96 lg:w-96 bg-slate-200 flex-shrink-0 p-2'>
                        <img src={image} onMouseLeave={() => handelmouseleve()} onMouseEnter={() => handelmouseEnter()} className='w-full h-full object-scale-down  mix-blend-multiply' onMouseMove={handleZoomImg} alt="" />

                        {!zoomtrue && (
                            <>
                                <div className=' hidden lg:block absolute min-w-[400px] min-h-[400px] rounded-lg bg-slate-300 right-[-450px] top-0'>


                                    <div
                                        className='w-full rounded-lg h-full min-w-[450px] min-h-[450px] mix-blend-multiply'
                                        style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomimgs.x * 100}% ${zoomimgs.y * 90}%`,
                                            backgroundSize: '300%' // Adjust zoom level as needed
                                        }}
                                    >
                                    </div>
                                </div>

                            </>

                        )}




                    </div>

                    {/* Product image thumbnails */}
                    <div className='h-full flex-1'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-hidden scrollbar-none h-full'>
                                {productImgList.map((el, index) => (
                                    <div key={index} className='h-20 w-20 border-black bg-slate-300 animate-pulse rounded'>
                                        {/* Loading placeholder */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className='flex gap-2 lg:flex-col overflow-hidden scrollbar-none h-full'>
                                    {data?.productImage.map((item, index) => (
                                        <div className='h-20 w-20 rounded'
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            key={index}>
                                            <img
                                                onMouseEnter={() => handleMouse(item)}
                                                onClick={() => handleMouse(item)}
                                                src={item}
                                                alt=""
                                                className='w-full h-full object-scale-down mix-blend-multiply p-1'
                                                style={{
                                                    border: hoveredIndex === index ? '5px solid red' : '1px solid black',
                                                    borderRadius: '10px'
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile or additional content section */}
                {loading ? (<>

                    <div>
                        <div className='gap-1 flex flex-col '>
                            <p title='brand' className='bg-red-200 animate-pulse w-64 text-red-600 px-6 h-4 rounded-full py-2'></p>
                            <h2 className='w-3/4 font-medium h-6 bg-slate-200 animate-pulse'></h2>
                            <p className='capitalize text-slate-500 h-6 bg-slate-200 animate-pulse '></p>
                            <p className='text-orange-600 bg-slate-200 py-2 px-2 h-6 w-80 animate-pulse'>

                            </p>
                            <div className='flex items-center gap-2 my-3 '>
                                <p></p>

                                <p className='text-red-600 text-2xl font-medium py-2 px-2 w-8 h-6 animate-pulse '></p>

                                <p className='text-slate-400 line-through'></p>
                            </div>
                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 transition-all hover:text-white'>Buy</button>
                                <button className='border-2 border-red-600 rounded  px-3 py-1 min-w-[120px] bg-red-600 text-white font-medium hover:bg-white transition-all hover:text-red-600'>Add to Cart</button>
                            </div>
                            <div>
                                <p className='text-slate-400'>Description</p>
                                <p className="bg-slate-200 w-full lg:w-screen h-96 animate-pulse">
                                </p>


                            </div>
                        </div>

                    </div>

                </>) : (<div className='gap-1 flex flex-col '>
                    <p title='brand' className='bg-red-200 w-fit text-red-600 px-2 rounded-full'>{data?.brandName}</p>
                    <h2 className='text-2xl md:w-3/4 font-medium '>{data?.productName}</h2>
                    <p className='capitalize text-slate-500'>{data?.category}</p>
                    <div className='text-orange-600 flex items-center gap-1'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <div className='flex items-center gap-2 my-3 '>
                        <p>-{Math.floor(((data?.price - data?.selling) / data?.price) * 100) + '%'}</p>

                        <p className='text-red-600 text-2xl font-medium  '>{displayINRcurrency(data.selling)}</p>

                        <p className='text-slate-400 line-through'>{displayINRcurrency(data.price)}</p>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 transition-all hover:text-white'>Buy</button>
                        <button className='border-2 border-red-600 rounded  px-3 py-1 min-w-[120px] bg-red-600 text-white font-medium hover:bg-white transition-all hover:text-red-600' onClick={(e) => handleAddToCart(e, data?._id)} >Add to Cart</button>
                    </div>
                    <div>
                        <p className='text-slate-400'>Description</p>
                        <p className='w-full'>
                            {
                                data?.description
                            }
                        </p>
                    </div>
                </div>)}
            </div>

            {
                loading ? (
                    "loading"
                ) : (<>
                    <HoriZontal heading={"Similar"} categorys={data?.category} />

                    <ProductDispaly display heading={data?.category} categorys={data?.category} />
                </>)
            }


        </div >
    );
}

export default ProductDetail
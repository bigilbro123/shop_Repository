import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import { Link } from 'react-router-dom'
import displayINRcurrency from '../helper/displayCurrency'

function Cart() {
    const [Data, setData] = useState([])
    const [Loadingcart, setLoadingcart] = useState(false)
    const FetchData = async () => {
        try {
            setLoadingcart(true); // Set Loadingcart to true before fetching data
            const fetchdata = await fetch(summaryApi.viewCartproduct.url, {
                method: summaryApi.viewCartproduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!fetchdata.ok) {
                throw new Error(`Error: ${fetchdata.status}`); // Handle non-2xx responses
            }

            const response = await fetchdata.json();

            setData(response.data); // Assuming response.data is where your actual data is
            console.log(response.data);


        } catch (error) {
            console.error("Fetch error:", error); // Log error in case of failure
        } finally {
            setLoadingcart(false); // Set Loadingcart to false whether the fetch succeeds or fails
        }
    };
    console.log(Data);

    // const context = useContext(Context)

    const ArryCart = new Array(3).fill(null)

    useEffect(() => {
        FetchData()
    }, [])
    return (
        <div className='container mx-auto'>

            <div className='text-center text-lg my-3'>
                {
                    Data?.length === 0 && !Loadingcart && (
                        <div className='bg-white py-5'>
                            <h1>NO DATA</h1>
                        </div>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4  '>
                <div className='w-full max-w-3xl '>
                    {
                        !Loadingcart ? (
                            Data.map((item, index) => {
                                return (
                                    <Link to={"/product/" + item?.productId?._id} key={item._id + "Add to Cart"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={item?.productId?.productImage[0]} width={'100px'} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />

                                        </div>
                                        <div className='px-4 py-2'>
                                            {
                                                item?.productId?.productName.length > 15
                                                    ? <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1' >{item?.productId?.productName.slice(0, 10) + '...'}</h2>
                                                    : <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1' >{item?.productId?.productName}</h2>
                                            }
                                            <p className='capitalize text-slate-500'>{item?.productId?.category}</p>
                                            <p className='font-semibold '>
                                                {displayINRcurrency(item?.productId?.selling)}
                                            </p>
                                            <div className='flex items-center gap-3 mt-2'>
                                                <button className=' border border-red-600 w-6  hover:bg-red-500 hover:text-white h-6 flex justify-center items-center rounded' >-</button><span>{item?.quantity}</span>
                                                <button className=' border border-red-600 w-6 hover:bg-red-500 hover:text-white  h-6 flex justify-center items-center rounded'>+</button>
                                            </div>
                                        </div>


                                    </Link>
                                );
                            })
                        ) : (

                            <p>loading...</p>
                        )
                    }
                </div>

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        Loadingcart ? (
                            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                                Total
                            </div>
                        ) : (
                            <div className='h-36 bg-slate-200'>
                                Total
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Cart

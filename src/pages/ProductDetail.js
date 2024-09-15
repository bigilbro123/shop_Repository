import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import summaryApi from '../common'
import HoriZontal from '../components/HoriZontal';
import Vertical from '../components/Vertical';

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

    const params = useParams();
    const productid = params.productid;

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
    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    {/* Image container */}
                    <div className='h-[300px] lg:h-96 lg:w-96 bg-slate-200 flex-shrink-0'>
                        <img src={image} className='w-full h-full object-scale-down  mix-blend-multiply' alt="" />
                    </div>

                    {/* Product image thumbnails */}
                    <div className='h-full flex-1'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-hidden scrollbar-none h-full'>
                                {productImgList.map((el, index) => (
                                    <div key={index} className='h-20 w-20 bg-slate-300 animate-pulse rounded'>
                                        {/* Loading placeholder */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className='flex gap-2 lg:flex-col overflow-hidden scrollbar-none h-full'>
                                    {data?.productImage.map((item, index) => (
                                        <div className='h-20 w-20 rounded' key={index}>
                                            <img
                                                onMouseEnter={() => handleMouse(item)}
                                                onClick={() => handleMouse(item)}
                                                src={item}
                                                alt=""
                                                className='w-full h-full object-scale-down mix-blend-multiply p-1'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile or additional content section */}
                <div className=''>
                    <p className='bg-red-200 w-fit text-red-600 px-2 rounded-full'>{data?.brandName}</p>
                    <h2 className='text-2xl w-3/4'>{data?.productName}</h2>
                </div>
            </div>

            {/* {
                loading ? (
                    "loading"
                ) : (<>
                    <HoriZontal heading={"Similar"} categorys={data?.category} />

                    <Vertical heading={data?.category} display categorys={data?.category} />
                </>)
            } */}


        </div >
    );
}

export default ProductDetail
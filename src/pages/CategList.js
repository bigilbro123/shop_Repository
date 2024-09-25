
import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CategList = () => {

    const [loading, setLoading] = useState(true)
    const [datas, setDatas] = useState([])
    const categoryArray = new Array(13).fill(null)
    const CategoryPro = async () => {
        try {
            const response = await fetch(summaryApi.category.url, {
                method: summaryApi.category.method
            });

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // Parse the response data
            const data = await response.json();
            // console.log("Fetched data:", data);
            setDatas(data)
            setLoading(false)

            // Show success toast


        } catch (error) {
            throw new Error(error)
        }
    };

    useEffect(() => {
        CategoryPro();
    }, []);



    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {loading &&
                    categoryArray.map((item, index) => {
                        return (
                            <div className="rounded-full h-16 w-16 md:w-20 md:h-20 bg-slate-200 animate-ping" key={index}></div>
                        );
                    })
                }
                {
                    datas.map((item, index) => {
                        return (
                            <Link to={'product-category/' + item?.category} className='cursor-pointer' key={index}>
                                <div className='w-16 h-16 md:w-20 md:h-20 flex rounded-full overflow-hidden p-4 bg-slate-200 items-center justify-center'>
                                    <img src={item?.productImage[0]} title={item.brandName} alt={item.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                </div>
                                <p className='text-sm md:text-base text-center capitalize'>
                                    {item.category === 'mouse pointer' ? "mouse" : item.category}
                                </p>
                            </Link>
                        );
                    })
                }
            </div>
        </div>

    )
}

export default CategList
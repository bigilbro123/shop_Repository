import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDispaly from '../components/productDisplay'
import productCategory from '../helper/productCatogory';
import HoriZontal from '../components/HoriZontal';

function CategoryProduct() {

    const [randomCategory, setRandomCategory] = useState(null);

    useEffect(() => {
        // Randomly select an item from the productCategory array
        const randomIndex = Math.floor(Math.random() * productCategory.length);

        const randomItem = productCategory[randomIndex];
        setRandomCategory(randomItem);


    }, []);

    const params = useParams()
    const categorys = params.categoryname
    return (
        <div><ProductDispaly display heading={categorys} categorys={categorys} />
            {randomCategory && <HoriZontal heading={'Recommended'} categorys={randomCategory?.value} />


            }
        </div>
    )
}

export default CategoryProduct
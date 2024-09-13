import React from 'react'
import CategList from './CategList'
import BannerProduct from '../components/BannerProduct'
import HoriZontal from '../components/HoriZontal'
import Vertical from '../components/Vertical'

function Home() {
    return (
        <div>
            <CategList />
            <BannerProduct />
            <HoriZontal heading={"Top's Aripodes"} categorys={"airports"} />
            <HoriZontal heading={" Camera"} categorys={"camera"} />
            <Vertical heading={"Mobile"} categorys={"mobile"} />
        </div>
    )
}

export default Home
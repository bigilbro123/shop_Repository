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
            <Vertical heading={"Television"} display categorys={"television"} />
            <Vertical heading={"Mouse"} display categorys={"mouse pointer"} />
            <Vertical heading={"Watches"} display categorys={"watches"} />
            <Vertical heading={"Eraphones"} display categorys={"eraphones"} />


            <Vertical heading={"Speakers"} display categorys={"speaker"} />
            <Vertical heading={"Refrigerator"} display categorys={"refrigerator"} />



            <Vertical heading={"Processor"} display categorys={"processor"} />
            <Vertical heading={"Printer"} display categorys={"printer"} />
            <Vertical heading={"Trimmer "} display categorys={"trimmer "} />

        </div>
    )
}

export default Home
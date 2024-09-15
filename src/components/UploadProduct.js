import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import productCategory from '../helper/productCatogory';
// import loginicon from '../assest/assest/signin.gif';
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from '../helper/Uploadimage';
import DisplayImage from './DisplayImage';
import { toast, ToastContainer } from 'react-toastify';
import summaryApi from '../common';


console.log(productCategory);

const UploadProduct = ({
    onClose, Allprod
}) => {


    const [data, setData] = useState({

        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        selling: ''
    })
    const [uplaod, setUpload] = useState('')
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('aaaaaaaaaaaa' + data);
        if (!data.brandName) {

            return toast.error("Enter brand name")

        }
        if (!data.category) {

            return toast.error("select category")

        }
        if (!data.description) {

            return toast.error("Enter description")

        }
        if (!data.price) {

            return toast.error("Enter price")

        }
        if (!data.productName) {

            return toast.error("Enter product name")

        }
        if (!data.selling) {

            return toast.error("Enter selling price")

        }

        const respons = await fetch(summaryApi.uploadproduct.url, {
            method: summaryApi.uploadproduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responsDATA = await respons.json()

        if (responsDATA) {

            toast.success("Product uploaded")
            Allprod()
            setTimeout(() => onClose(), 2000);

        }
        if (!responsDATA) {
            toast.error("something went wrong")
        }
        // console.log(responsDATA);


    };
    const handleuploadChange = async (e) => {
        const files = e.target.files[0]
        // console.log('file' + files);

        // console.log(uplaod);
        const uploadImaga = await UploadImage(files)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImaga.url]
            }
        })




        // console.log('upload', uploadImaga);

    }
    const [selectedImage, setSelectedImage] = useState(null);

    const [seen, setSeen] = useState(false)
    const handleImageClick = (item) => {
        setSelectedImage(item);
        setSeen(true);
    };
    const handledelete = async (item, index) => {
        alert(item)
        const newProducts = [...data.productImage];
        newProducts.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: newProducts, // Update the productImage array
        }));

        toast.success("Image deleted successfully");
    }

    return (
        <div className="bg-slate-200 bg-opacity-40 w-full h-full absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div onClick={() => onClose(prev => !prev)} className="text-xl cursor-pointer hover:text-red-600">
                        <IoMdClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            value={data.productName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandName">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            name="brandName"
                            id="brandName"
                            value={data.brandName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="category"
                        >
                            {productCategory.map((item, index) => (
                                <option key={index} value={item.value} style={{ background: item.style }} >
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                            Product Image
                        </label>
                        <label htmlFor="uploadImageinput" className="cursor-pointer">
                            <div className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 w-full">
                                <div className="text-slate-500 flex justify-center items-center mt-6 flex-col gap-2">
                                    <span className="text-3xl">
                                        <FaCloudUploadAlt />
                                    </span>
                                    <p className="text-sm">Upload product image</p>
                                    <input type="file" id="uploadImageinput" className="hidden" onChange={handleuploadChange} />
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                        <div>
                            {data?.productImage && data.productImage.length > 0 ? (
                                <div className="flex flex-wrap gap-4">
                                    {data.productImage.map((item, index) => (
                                        <div key={index} className="flex-shrink-0 relative group">
                                            <img
                                                src={item}
                                                alt=""
                                                onClick={() => handleImageClick(item)}
                                                style={{ width: '70px', borderRadius: '10px' }}
                                                className="bg-slate-100 border cursor-pointer"
                                            />
                                            <div
                                                className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                                                onClick={() => handledelete(item, index)}
                                            >
                                                <MdDeleteForever />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-red-600 text-sm">Upload image</p>
                            )}
                            {seen && (
                                <div className="flex items-center justify-center z-20 fixed inset-0 bg-black bg-opacity-50">
                                    <DisplayImage imageurl={selectedImage} setSeen={setSeen} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={data.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selling">
                            Selling Price
                        </label>
                        <input
                            type="number"
                            name="selling"
                            id="selling"
                            value={data.selling}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="submit" className="px-3 py-1 bg-red-600 text-white font-bold w-full hover:bg-red-700 transition-all">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>




    )
}

export default UploadProduct
import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryProduct() {
    const params = useParams()
    const categorys = params.categoryname
    return (
        <div>{categorys || "category"}</div>
    )
}

export default CategoryProduct
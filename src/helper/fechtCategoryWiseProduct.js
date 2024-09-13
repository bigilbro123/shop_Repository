import summaryApi from '../common'

const fetchCategoryWiseProduct = async (categorys) => {
    const response = await fetch(summaryApi.categoryWiseProduct.url, {
        method: summaryApi.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            categorys: categorys
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct
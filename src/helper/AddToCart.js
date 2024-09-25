import { toast } from "react-toastify"
import summaryApi from "../common"





const addToCart = async (e, id,) => {
    e?.stopPropagation()
    e?.preventDefault()





    try {
        const response = await fetch(summaryApi.Addtocart.url, {
            method: summaryApi.Addtocart.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                productId: id
            })
        })
        const dataResponse = await response.json()


        return dataResponse
    } catch (error) {
        throw new Error(error)
    }
}
export default addToCart
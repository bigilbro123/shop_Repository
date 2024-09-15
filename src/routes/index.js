import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Forgotpassword from '../pages/Forgotpassword'
import Signup from '../pages/signup'
import AdminPanel from '../pages/AdminPanel'
import Alluser from '../pages/Alluser'
import AllProduct from '../pages/AllProduct'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetail from '../pages/ProductDetail'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <Forgotpassword />,
            },
            {
                path: "sign-up",
                element: <Signup />
            },
            {
                path: "product-category/:categoryname",
                element: <CategoryProduct />
            },
            {
                path: "product/:productid",
                element: <ProductDetail />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-user",
                        element: <Alluser />
                    }, {
                        path: "product",
                        element: <AllProduct />
                    }
                ]
            }
        ]

    }
])
export default router

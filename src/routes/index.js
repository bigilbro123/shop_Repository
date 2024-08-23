import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Forgotpassword from '../pages/Forgotpassword'
import Signup from '../pages/signup'

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
            }
        ]

    }
])
export default router

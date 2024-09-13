

const BackendDomian = "http://localhost:8000"

const summaryApi = {
    signup: {
        url: `${BackendDomian}/api/signup`,
        method: "post"
    },
    login: {
        url: `${BackendDomian}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${BackendDomian}/api/user-details`,
        method: "get"
    },
    LOGOUT: {
        url: `${BackendDomian}/api/logout`,
        method: "get"
    },
    Alluser: {
        url: `${BackendDomian}/api/alluser`,
        method: "get"
    },
    updateuser: {
        url: `${BackendDomian}/api/update-user`,
        method: "post",
    },
    uploadproduct: {
        url: `${BackendDomian}/api/upload-product`,
        method: 'post'
    },
    allproduct: {
        url: `${BackendDomian}/api/Get-allproduct`,
        method: 'get'
    },
    updateproduct: {
        url: `${BackendDomian}/api/update-product`,
        method: 'post'
    },
    category: {
        url: `${BackendDomian}/api/get-catogory`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${BackendDomian}/api/category-product`,
        method: 'post'
    }
}
export default summaryApi
import { createContext, useState } from 'react'

const AdminContext = createContext()

export const AdminContextProvider = ({ children }) => {
    const [services, setServices] = useState([])
    const [priceList, setPriceList] = useState([])

    const [AuthToken, setAuthToken] = useState('')

    // Authorize
    const Authorize = () => {
        var authToken = document.cookie
        
        if(!authToken) {
            window.location.href = '/login'
        } else {
            authToken = authToken.split(';').filter(cookie => cookie.includes('auth'))
            authToken = authToken.toString().split('=')[1]
            setAuthToken(authToken)
        }
    }


    const values = {
        Host: 'http://localhost:5000/admin/',
        services, setServices,
        AuthToken, Authorize,
        priceList, setPriceList
    }

    return(
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext;
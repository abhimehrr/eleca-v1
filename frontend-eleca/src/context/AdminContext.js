import { createContext, useState } from 'react'

const AdminContext = createContext()

export const AdminContextProvider = ({ children }) => {
    const [services, setServices] = useState([])
    const [priceList, setPriceList] = useState([])

    const [AuthToken, setAuthToken] = useState('')

    // Authorize
    const Authorize = () => {
        var auth
        try {
            auth = JSON.parse(localStorage.getItem('auth'))
            
            if(auth) {
                if(auth.exp < Date.now()) {
                    localStorage.removeItem('auth')
                    return false
                }
                
                setAuthToken(auth.token)
                return true
            } else {
                return false
            }
        } catch (err) {
            localStorage.removeItem('auth')
            return false
        }
    }


    const values = {
        // Host: 'https://api.eleca.shre.in/admin/',
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
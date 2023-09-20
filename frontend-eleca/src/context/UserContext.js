import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [services, setServices] = useState([])
    const [tempServiceDetails, setTempServiceDetails] = useState([])
    
    const values = {
        Host: 'http://localhost:5000/',
        services, setServices,
        tempServiceDetails, setTempServiceDetails
    }

    return(
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
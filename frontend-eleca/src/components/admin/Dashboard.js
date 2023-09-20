import React, { useEffect, useContext, useState, useRef } from "react";

// Custom CSS
import '../../css/table.css'

// Importing Components
import Header from "../partials/admin/AdminHeader";
import AdminSecondaryHeader from '../partials/admin/AdminSecondaryHeader'
import Footer from "../partials/Footer";
import TableRow from '../partials/admin/TableRow'
import Pagination from '../partials/Pagination'
import Instruction from '../partials/admin/Instruction'

import BackToTop from '../partials/BackToTop'

// Admin Context
import AdminContext from '../../context/AdminContext'

export default function Home() {
  const { Host, services, setServices } = useContext(AdminContext)

  // Status
  const [tempServices, setTempServices] = useState([])
  
  // Filter
  const [acceptedStatus, setAcceptedStatus] = useState('')
  const [pendingStatus, setPendingStatus] = useState('')
  const [cancelledStatus, setCancelledStatus] = useState('')
  const [deliveredStatus, setDeliveredStatus] = useState('')

  const resultShowing = 20

  // Handle Search  
  const handleSearch = (e) => {
    var search = e.target.value.toLowerCase()
    var filter = services.filter(ser => ser.ID.toString().includes(search) || ser.cName.toLowerCase().includes(search) || ser.itemName.toLowerCase().includes(search))
    setTempServices(filter)
  }

  // Handle Filter
  const handleFilter = e => {
    var f = e.target.value

    if(f === 'All') {
      fetchServices()
    } else if(f === 'Accepted') {
      setTempServices(acceptedStatus)
    } else if(f === 'Pending') {
      setTempServices(pendingStatus)
    } else if(f === 'Cancelled') {
      setTempServices(cancelledStatus)
    } else if(f === 'Delivered') {
      setTempServices(deliveredStatus)
    }
  }
  

  // Pagination
  const paginationFilter = (pageNumber) => {
    var skip = resultShowing * (pageNumber - 1)

    var temp = []
    var ts = services

    for (let i = skip; i < pageNumber * resultShowing; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i])
    }

    setTempServices(temp)
  }

  // Set Temp Services
  const TempServices = (s) => {
    // Filter will be applied for pagination
    var pageNumber = parseInt(sessionStorage.getItem('pageNumber'))
    var skip = resultShowing * (pageNumber - 1)

    var temp = []
    var ts = services

    for (let i = skip; i < pageNumber * resultShowing; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i])
    }
    
    setTempServices(temp)
  }


  // Set Status
  const setStatus = (s) => {
    var filter = s.filter(ser => ser.currentStatus === 'Accepted')
    setAcceptedStatus(filter)
    
    filter = s.filter(ser => ser.currentStatus === 'Pending')
    setPendingStatus(filter)
    
    filter = s.filter(ser => ser.currentStatus === 'Cancelled')
    setCancelledStatus(filter)
    
    filter = s.filter(ser => ser.currentStatus === 'Delivered')
    setDeliveredStatus(filter)
  }


  // Fetch Data
  const [authToken, setAuthToken] = useState('')

  const fetchServices = () => {
    fetch(Host + 'fetch-all-services', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authtoken: authToken
      }
    })
    .then(res => res.json())
    .then(data => {
      var s = []
      for(var i = data.data.length - 1; i >= 0; i--) {
        s.push(data.data[i])
      }

      setStatus(s)
      TempServices(s)
      setServices(s)
    })
  }

  useEffect(() => {
    var authToken = document.cookie

    if(!authToken) {
      window.location.href = '/login'
    } else {
      authToken = authToken.split(';').filter(cookie => cookie.includes('auth'))
      authToken = authToken.toString().split('=')[1]
      setAuthToken(authToken)
    }

    if(services.length < 1) {
      fetch(Host + 'fetch-all-services', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authtoken: authToken
        }
      })
      .then(res => res.json())
      .then(data => {
        var s = []
        for(var i = data.data.length - 1; i >= 0; i--) {
          s.push(data.data[i])
        }
        
        sessionStorage.setItem('pageNumber', 1)

        var pageNumber = parseInt(sessionStorage.getItem('pageNumber'))
        var skip = resultShowing * (pageNumber - 1)

        var temp = []
        
        for (let i = skip; i < pageNumber * resultShowing; i++) {
          if (s[i] === undefined) {
            break;
          }
          temp.push(s[i])
        }
        
        setStatus(s)
        setTempServices(temp)
        setServices(s)
      })
    } else {
      setStatus(services)
      TempServices(services)
    }

    document.title = 'Dashboard | Admin'
  }, [])

  return (
    <>
      {/* Header */}
      <Header />

      <div className="divider mb-5"></div>

      <div className="py-5 px-4 mb-3 bg-gray-900 rounded-lg">
        <AdminSecondaryHeader/>
      </div>
      
      {/* Main Start */}
      <main initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className="py-4 px-1 bg-gray-900 rounded-lg text-gray-200">
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-white">
                <span className="text-teal-500 font-bold">Dashboard</span>
              </h1>
              
              {/* Statics */}
              <div className="flex w-full justify-center items-center mt-3">
                <div className="text-gray-400 bg-gray-900 body-font">
                  <div className="container py-0 mx-auto">
                    <div className="flex justify-between gap-x-5">
                      <div className="w-1/2">
                        <h2 className="title-font font-medium text-xl text-gray-400">{services.length}</h2>
                        <p className="leading-relaxed">Total</p>
                      </div>
                      <div className="w-1/2">
                        <h2 className="title-font font-medium text-xl text-gray-400">{pendingStatus.length}</h2>
                        <p className="leading-relaxed">Pending</p>
                      </div>
                      <div className="w-1/2">
                        <h2 className="title-font font-medium text-xl text-gray-400">{cancelledStatus.length}</h2>
                        <p className="leading-relaxed">Cancelled</p>
                      </div>
                      <div className="w-1/2">
                        <h2 className="title-font font-medium text-xl text-gray-400">{deliveredStatus.length}</h2>
                        <p className="leading-relaxed">Delivered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Card */}
              <div className="text-gray-400 body-font w-full">
                <div className="container px-2 mt-8 mx-auto">
                  <div className="flex items-center mb-3">
                    <h2 className="sm:text-2xl text-xl font-bold title-font text-white">
                      Service Requests
                    </h2>
                    <button onClick={fetchServices} title="Refresh Page" className='ml-3 text-sms px-2 py-1 bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-gray-200 transition-all rounded'>
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                  </div>

                  {/* Filter */}
                  <div className="mb-1 flex items-center justify-between px-1">
                    <div className="my-1">
                      <span className="mr-3 font-medium">Filter</span>
                      <select onChange={handleFilter} className="bg-transparent border outline-none px-2 py-0.5 rounded border-gray-200 cursor-pointer">
                        <option value='All' className="bg-gray-800 text-gray-300">All</option>
                        <option value='Accepted' className="bg-gray-800 text-gray-300">Accepted</option>
                        <option value='Pending' className="bg-gray-800 text-gray-300">Pending</option>
                        <option value='Cancelled' className="bg-gray-800 text-gray-300">Cancelled</option>
                        <option value='Delivered' className="bg-gray-800 text-gray-300">Delivered</option>
                      </select>
                    </div>
                    <div className="my-1">
                      <input onChange={handleSearch} type="text" placeholder="Search..." className="px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all w-40"/>
                    </div>
                  </div>
                  
                  <div className="flex flex-col pb-4">
                    <table>
                      <thead>
                        <tr className="text-gray-200 bg-teal-800 rounded gap-x-3">
                          <td>ID</td>
                          <td>Customer</td>
                          <td>Item</td>
                          <td>Status</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          tempServices.map(d => <TableRow key={d.ID} values={d} />)
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {services.length > resultShowing &&
                    <div className="my-5">
                      <Pagination data={services} resultShowing={resultShowing} paginationFilter={paginationFilter} tempServices={tempServices} setTempServices={setTempServices}/>
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Main End */}

      {/* Instructions */}
      <Instruction/>
      
      {/* Footer */}
      <Footer />

      {/* Back To Top */}
      <BackToTop/>
    </>
  );
}

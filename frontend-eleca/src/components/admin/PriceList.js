import React, { useState, useContext, useEffect } from 'react'

// Components
import Header from '../partials/admin/AdminHeader'
import AdminSecondaryHeader from '../partials/admin/AdminSecondaryHeader'
import Footer from '../partials/Footer'

import AddNewProduct from '../partials/admin/AddNewProduct'
import UpdateProduct from '../partials/admin/UpdateProduct'
import PriceTableRow from '../partials/admin/PriceTableRow'


// Admin Context
import AdminContext from '../../context/AdminContext'

export default function PriceList() {
  const { Host, priceList, setPriceList } = useContext(AdminContext)

  // Price List
  const [tempPriceList, setTempPriceList] = useState([])
  const [authToken, setAuthToken] = useState('')

  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showUpdateProduct, setShowUpdateProduct] = useState(false)
  const [productId, setProductId] = useState('')
  
  const resultShowing = 20
  
  const handleAddProduct = () => {
    if(showAddProduct) setShowAddProduct(false)
    else setShowAddProduct(true)

    setShowUpdateProduct(false)
  }


  // Handle Search  
  const handleSearch = (e) => {
    var search = e.target.value.toLowerCase()
    var filter = priceList.filter(pl => pl.ID.toString().includes(search) || pl.productId.toString().includes(search) || pl.product.toLowerCase().includes(search) || pl.mrp.toString().includes(search) || pl.rlp.toString().includes(search))
    setTempPriceList(filter)
  }


  // Pagination
  const paginationFilter = (pageNumber) => {
    var skip = resultShowing * (pageNumber - 1)

    var temp = []
    var ts = priceList

    for (let i = skip; i < pageNumber * resultShowing; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i])
    }

    setTempPriceList(temp)
  }

  const [next, setNext] = useState(2)
  const [pre, setPre] = useState(1)

  // Handle Previous
  const handlePrevious = () => {
    if(pre >= 1) {
        paginationFilter(pre)
        sessionStorage.setItem('pricePageNumber', pre)
        setPre(pre - 1)
        setNext(pre + 1)
    }
  }

  // Handle Next
  const handleNext = () => {
    if(tempPriceList.length >= resultShowing) {
        paginationFilter(next)
        sessionStorage.setItem('pricePageNumber', next)
        setPre(next - 1)
        setNext(next + 1)
    }
  }


  // Set Temp Price List
  const TempPriceList = (s) => {
    // Filter will be applied for pagination
    var pageNumber = parseInt(sessionStorage.getItem('pricePageNumber'))
    var skip = resultShowing * (pageNumber - 1)

    var temp = []
    var ts = priceList

    for (let i = skip; i < pageNumber * resultShowing; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i])
    }
    
    setTempPriceList(temp)
  }

  
  // Fetch Price List
  const fetchPriceList = () => {
    fetch(Host + 'fetch-price-list', {
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

      // Filter will be applied for pagination
      var pageNumber = parseInt(sessionStorage.getItem('pricePageNumber'))
      var skip = resultShowing * (pageNumber - 1)

      var temp = []
      var ts = priceList

      for (let i = skip; i < pageNumber * resultShowing; i++) {
        if (ts[i] === undefined) {
          break;
        }
        temp.push(ts[i])
      }
    
      setTempPriceList(temp)

      setPriceList(s)
    }).catch(err => console.log('Error (Price List) : ', err))
  }

  // Use Effect
  useEffect(() => {
    var authToken = document.cookie

    if(!authToken) {
      window.location.href = '/login'
    } else {
      authToken = authToken.split(';').filter(cookie => cookie.includes('auth'))
      authToken = authToken.toString().split('=')[1]
      setAuthToken(authToken)
    }

    if(priceList.length < 1) {
      fetch(Host + 'fetch-price-list', {
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

        sessionStorage.setItem('pricePageNumber', 1)
        
        // Filter will be applied for pagination
        var pageNumber = 1
        var skip = resultShowing * (pageNumber - 1)

        var temp = []
        var ts = s

        for (let i = skip; i < pageNumber * resultShowing; i++) {
          if (ts[i] === undefined) {
            break;
          }
          temp.push(ts[i])
        }

        setTempPriceList(temp)
        setPriceList(s)
      }).catch(err => console.log('Error (Price List) : ', err))
    } else {
      TempPriceList(priceList)
    }

    document.title = 'Price List | Admin'
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
        <main className="py-4 px-1 bg-gray-900 rounded-lg text-gray-200">
          <section className="text-gray-400 body-font">
            <div className="containers  mx-auto flex flex-col justify-center items-center">
              <div className="flex w-full flex-col items-center text-center">
                <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-white">
                  <span className="text-teal-500 font-bold">Price List</span>
                </h1>
                
                
                {/* Service Card */}
                <div className="text-gray-400 body-font w-full">
                  <div className="container px-2 mt-4 mx-auto">
                    <div className="flex items-center justify-between text-left mb-3">
                      <div className='flex items-center'>
                        <h2 className="sm:text-2xl text-xl font-bold title-font text-white">
                          Products
                        </h2>
                        <button onClick={fetchPriceList} title="Refresh Page" className='ml-3 text-sms px-2 py-1 bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-gray-200 transition-all rounded'>
                          <i className="fa-solid fa-arrows-rotate"></i>
                        </button>
                      </div>

                      <button onClick={handleAddProduct} className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
                        <i className="fa-solid fa-plus text-teal-600 mr-2"></i>
                        Add Product
                      </button>
                    </div>

                    {/* Add New Product */}
                    {showAddProduct && <AddNewProduct setShowAddProduct={setShowAddProduct} tempPriceList={tempPriceList} setTempPriceList={setTempPriceList} />}
                    
                    {/* Add New Product */}
                    {showUpdateProduct && <UpdateProduct setShowUpdateProduct={setShowUpdateProduct} productId={productId} />}

                    {/* Filter */}
                    <div className="mb-3 mt-8 px-1">
                      <div className="w-full my-1 flex items-center justify-between gap-x-3">
                        <label htmlFor='search-product' className='w-1/4 text-left font-medium text-lg'>Search</label>
                        <input type="text" onChange={handleSearch} placeholder="Search Product..." className="w-3/4 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                      </div>
                    </div>

                    <div className="flex flex-col mb-4">
                      <table>
                        <thead>
                          <tr className="text-gray-200 bg-teal-800 rounded gap-x-3">
                            <td>ID</td>
                            <td>Product</td>
                            <td>RLP</td>
                            <td>MRP</td>
                            <td>Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          {tempPriceList.map(pl => <PriceTableRow key={pl.ID} values={pl} setProductId={setProductId} setShowAddProduct={setShowAddProduct} setShowUpdateProduct={setShowUpdateProduct} />)}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {priceList.length > resultShowing && 
                      <div className="my-4 flex items-center justify-between">
                          <button onClick={handlePrevious} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-gray-800 transition-all rounded">
                              <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <div className="flex items-center justify-center gap-x-2">
                              <div className="text-left mb-2">
                                  [ Showing {(next - 1) * resultShowing > priceList.length ? priceList.length : (next - 1) * resultShowing} of {priceList.length} results ]
                              </div> 
                          </div>
                          <button onClick={handleNext} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-teal-800 transition-all rounded">
                              <i className="fa-solid fa-arrow-right"></i>
                          </button>    
                      </div>
                    }

                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Main End */}
  
        
        {/* Footer */}
        <Footer/>
      </>
    )
}

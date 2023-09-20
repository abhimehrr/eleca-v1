import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing Components
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ServiceCard from '../partials/user/ServiceCard'
import Contact from '../partials/Contact'

import BackToTop from '../partials/BackToTop'
import ClearInput from '../partials/tiny/ClearInput'

// User Context
import UserContext from '../../context/UserContext'

export default function Home() {
  const { Host, services, setServices } = useContext(UserContext)

  const [search, setSearch] = useState('')
  const [serviceContainer, setServiceContainer] = useState(false)


  // Fetch Services
  const fetchServices = async (search) => {
    var data = await fetch(Host + 'check-service-request', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({search})
    })
    data = await data.json()

    sessionStorage.setItem('search', search)

    var s = []
    for(var i = data.data.length - 1; i >= 0; i--) {
      s.push(data.data[i])
    }

    setServices(s) 
    setServiceContainer(true)
  }

  useEffect(() => {
    var search = sessionStorage.getItem('search')

    if(search !== null) {
      fetchServices(search)   
    }

    document.title = 'Eleca | Home'
  }, [])

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Start */}
      <main className="p-4 bg-gray-900 rounded-lg text-gray-200">
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex flex-col p-4 justify-center items-center">
            <div className="flex flex-col mb-5 items-center text-center">
              <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-white">
                Welcome to <span className="text-teal-500">Ashok Electronics</span>
              </h1>
              
              {/* Serch Box */}
              <div className="flex w-full justify-center items-end mt-3">
                <div className="relative mr-4 text-left">
                  <label htmlFor="mobile-number" className="leading-7 text-sm text-gray-400">
                    Mobile Number or Service ID
                  </label>
                  <input onBlur={()=>fetchServices(search)} value={search} onChange={e=>setSearch(e.target.value)} type="number" id="mobile-number" className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-teal-900 focus:bg-transparent focus:border-teal-700 text-base  transition-all outline-none text-gray-100 py-1 pl-3 pr-10 leading-8 duration-200 ease-in-out"/>
                  <ClearInput resetValue={setSearch} position={['bottom-2', 'right-3']} color='text-gray-400'/>
                </div>
                <button onClick={()=>fetchServices(search)} className="flex items-center justify-center text-white bg-teal-700 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 hover:text-gray-900 transition-all rounded text-lg">
                  {/* <i className="fa-solid fa-check-double mr-2"></i> */}
                  Check
                </button>
              </div>
              <p className="text-sm text-left mt-2 text-gray-500 mb-3 w-full">
                Check your service status.
              </p>

              {/* Service Card */}
              {serviceContainer &&
              <div className="text-gray-400 body-font w-full">
                <div className="container px-2 pt-5 mx-auto">
                  <div className="flex flex-col text-center mb-2">
                    <h2 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">Service Request
                      <span className='ml-3'>⚙️</span>
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    {/* Service Card */}
                    {services.length < 1 ? <span className="text-red-400">Result not found!</span> :
                      services.map(s =>  <ServiceCard key={s.ID} value={s} />)
                    }
                  </div>
                </div>
              </div> 
              }

              <div className="divider mt-4 mb-4"></div>

              {/* About */}
              <div className="flex flex-col text-gray-300">
                <h2 className="sm:text-3xl text-2xl font-bold title-font my-3 text-white">You Trust Us
                  <span className='ml-3'>👍</span>
                </h2>
                <div className="bg-gray-800 my-3 inline-flex p-5 rounded-lg items-center focus:outline-none">
                  <span className="flex items-start flex-col leading-none">
                    <span className="text-sm font-semibold text-gray-200 mb-3">WHY US ?</span>
                    <span className="title-font text-gray-500 text-base text-left">
                      Established over 15 years ago, <span className="text-teal-600 font-medium">Ashok Electronics</span> has been a reputable electronics shop offering a diverse range of new electronic and electric items. Our extensive inventory includes cutting-edge electronics products as well as a variety of electric devices. Alongside our retail offerings, we proudly provide top-notch servicing for various items, including fans, televisions, LED TVs, and a wide array of other electronic gadgets. We at <span className="text-teal-600 font-medium">Ashok Electronics</span> are committed to delivering quality products and reliable services to cater to your electronic needs.
                    </span>
                  </span>
                </div>

                {/* Contact */}
                <Contact/>

              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-200">
              Terms and Conditions :
              <Link className="text-teal-600 hover:text-teal-500 transition-all ml-2" to="/term-and-conditions">
                Click Here
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Main End */}

      {/* Footer */}
      <Footer />

      {/* Back To Top */}
      <BackToTop/>
    </>
  );
}

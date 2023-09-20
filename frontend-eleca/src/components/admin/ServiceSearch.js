import React from "react";
import { Link } from "react-router-dom";

// Importing Components
import Header from "../partials/admin/AdminHeader";
import AdminSecondaryHeader from '../partials/admin/AdminSecondaryHeader'
import Footer from "../partials/Footer";
import ServiceCard from "../partials/admin/ServiceCard";
import Pagination from '../partials/Pagination'

import BackToTop from '../partials/BackToTop'


export default function ServiceSearch () {
  return (
    <>
      {/* Header */}
      <Header />

      <div className="divider mb-5"></div>
      
      <div className="py-5 px-4 mb-3 bg-gray-900 rounded-lg">
        <AdminSecondaryHeader/>
      </div>
      
      {/* Main Start */}
      <main className="p-4 bg-gray-900 rounded-lg text-gray-200">
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container mx-auto flex flex-col p-4 justify-center items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="title-font sm:text-3xl text-3xl mb-4 text-teal-500 font-bold">
                  Search
                <span className="text-teal-500">
                </span>
              </h1>
              
              {/* Serch Box */}
              <div className="flex w-full justify-center items-end mt-3">
                <div className="relative mr-4 text-left">
                  <label htmlFor="search-value" className="leading-7 text-sm text-gray-400">
                    Name / Mobile / Service ID
                  </label>
                  <input type="text" id="search-value" className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-teal-900 focus:bg-transparent focus:border-teal-700 text-base  transition-all outline-none text-gray-100 py-1 px-3 leading-8 duration-200 ease-in-out"/>
                </div>
                <button className="inline-flex text-white bg-teal-700 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 hover:text-gray-900 transition-all rounded text-lg">
                  Check
                </button>
              </div>
              <p className="text-sm text-left mt-2 text-gray-500 mb-3 w-full">
                Search service requests
              </p>

              {/* Service Card */}
              <div className="text-gray-400 body-font w-full">
                <div className="container px-2 pt-5 mx-auto">
                  <div className="flex flex-col text-center mb-2">
                    <h2 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">
                        Service Requests
                        <span className='ml-3'>⚙️</span>
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    {/* Service Card */}
                    <ServiceCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pagination */}
        {/* <section className="px-4 my-3">
            <Pagination/>
        </section> */}
      </main>
      {/* Main End */}

      {/* Footer */}
      <Footer />

      {/* Back To Top */}
      <BackToTop/>
    </>
  );
}

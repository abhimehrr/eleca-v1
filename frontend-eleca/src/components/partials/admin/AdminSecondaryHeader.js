import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AdminSecondaryHeader() {
  const route = window.location.pathname.split('/')[2]

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className='flex items-center flex-wrap gap-2'>
      {route !== 'dashboard' ?
      <Link to="/admin/dashboard" className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
        <i className="fa-solid fa-chart-line text-teal-600 mr-2"></i>
        Dashboard
      </Link> : false
      }
      {route !== 'new-service-request' ?
      <Link to="/admin/new-service-request" className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
        <i className="fa-solid fa-plus text-teal-600 mr-2"></i>
        New Service
      </Link> : false
      }
      {route !== 'price-list' ?
      <Link to="/admin/price-list" className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
        <i className="fa-solid fa-tag text-teal-600 mr-2"></i>
        Price List
      </Link> : false
      }
      {/* {route !== 'search' ?
      <Link to="/admin/search" className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
        <i className="fa-solid fa-magnifying-glass text-teal-600 mr-2"></i>
        Search
      </Link> : false
      } */}
      {route !== 'warranty-info' ?
      <Link to="/admin/warranty-info" className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
        <i className="fa-solid fa-user-check text-teal-600 mr-2"></i>
        Warranty Info
      </Link> : false
      }
    </motion.div>
  )
}

import React from "react";
import {Link} from 'react-router-dom'

export default function Header() {
  const Route = window.location.pathname.split('/')[1]
  
  return (
    <>
    <header initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className="text-gray-400 body-font my-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to='/' className="title-font font-bold text-teal-400 hover:text-teal-500 transition-all md:mb-0">
          <span className="text-2xl">eleca .</span>
        </Link>
        {/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a>
        </nav> */}
        <div className="flex gap-x-3">
          {Route.length !== 0 &&
          <Link to='/' className="inline-flex text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 rounded md:mt-0">
            <i className="fa-solid fa-home mr-2 text-teal-600"></i>
            Home
          </Link>
          }
          {Route !== 'warranty-card' &&
          <Link to='/warranty-card' className="inline-flex text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 rounded md:mt-0">
            <i className="fa-solid fa-user-check mr-2 text-teal-600"></i>
            Warranty Card
          </Link>
          }
          {Route !== 'pay' &&
          <Link to='/pay' className="inline-flex text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none hover:bg-teal-500 transition-all hover:text-gray-800 rounded md:mt-0">
            <i className="fa-solid fa-indian-rupee-sign mr-2 text-teal-600"></i>
            Pay
          </Link> 
          }
        </div>
      </div>
    </header>
    </>
  );
}

import React from "react";
import { Link } from 'react-router-dom'

export default function AdminHeader() {
  // Logout
  const logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload()
  }
  
  return (
    <>
    <header initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className="text-gray-400 body-font my-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to='/admin/dashboard' className="title-font font-bold text-teal-400 hover:text-teal-500 transition-all md:mb-0">
          <span className="text-2xl">eleca .</span>
        </Link>
        <button onClick={logout} className="inline-flex text-sm text-gray-300 font-medium items-center bg-gray-900 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 transition-all hover:text-gray-100 rounded md:mt-0">
          Logout
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
    </header>
    </>
  );
}

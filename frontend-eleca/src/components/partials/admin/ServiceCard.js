import React from 'react'
import { Link } from "react-router-dom";

export default function ServiceCard() {
  return (
    <Link to='/admin/view-service-details/292' className="my-1">
      <div className="flex items-center hover:border-gray-300 transition-all border-gray-700 border p-4 rounded-lg">
        {/* <img alt="team" className="w-25 h-25 bg-gray-100 object-cover object-center flex-shrink-0 rounded mr-4" src="https://dummyimage.com/80x80"/> */}
        <div className="image-box mr-4 w-20 rounded transition-all cursor-pointer" style={{'--src': "url(https://images.unsplash.com/photo-1609519479841-5fd3b2884e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80)"}}></div>

        <div className="flex-grow text-left">
          <p className="text-gray-300 text-sm">Rajeev Mehta</p>
          <h2 className="text-teal-500 title-font font-bold my-1">Toofan Ceiling Fan 48"</h2>
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 mr-2 rounded-full'></div>
            <p className="text-gray-400 text-sm">Delivered</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

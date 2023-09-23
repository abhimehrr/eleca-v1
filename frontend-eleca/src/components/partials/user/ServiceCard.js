import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ value, Host }) {
  var {ID, itemName, cName, currentStatus, image} = value
  image = Host + 'static/images/' + image

  const [status, setStatus] = useState('')

  useEffect(() => {
    if(currentStatus === 'Completed' || currentStatus === 'Delivered') {
      setStatus('bg-green-500')
    } else if(currentStatus === 'Pending') {
      setStatus('bg-yellow-500')
    } else if(currentStatus === 'Cancelled' || currentStatus === 'Rejected') {
      setStatus('bg-red-500') 
    } else if(currentStatus === 'Processing') {
      setStatus('bg-green-500')
    } else {
      setStatus('bg-gray-200')
    }
  }, [])


  return (
    <Link to={`/service-request/${ID}`} className="my-1">
      <div className="flex items-center hover:border-gray-300 transition-all border-gray-700 border p-4 rounded-lg">
        {/* <img alt="team" className="w-25 h-25 bg-gray-100 object-cover object-center flex-shrink-0 rounded mr-4" src="https://dummyimage.com/80x80"/> */}
        <div className="image-box mr-4 w-20 rounded transition-all cursor-pointer" style={{'--src': `url(${image})`}}></div>

        <div className="flex-grow text-left">
          <p className="text-gray-300 text-sm">{cName}</p>
          <h2 className="text-teal-500 title-font font-bold my-1">{itemName}</h2>
          <div className='flex items-center'>
            <div className={`w-2 h-2 ${status} mr-2 rounded-full`}></div>
            <p className="text-gray-400 text-sm">{currentStatus}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

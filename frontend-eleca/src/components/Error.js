import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    const route = window.location.pathname.split('/')[1]
    const [HomeRoute, setHomeRoute] = useState('/')

    useEffect(() => {
        if(route === 'admin') setHomeRoute('/admin/dashboard')
        else setHomeRoute('/')
    }, [])

    if(window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
        window.location.href = '/admin/dashboard'
        return 
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='mb-5'>
                <Link to={HomeRoute} className="title-font font-bold text-teal-400 hover:text-teal-500 transition-all md:mb-0">
                    <span className="text-2xl">eleca .</span>
                </Link>
            </div>
            <div className='min-w-full text-center bg-gray-900 p-10 rounded-lg'>
                <div className='text-base'>
                    <span className='text-gray-500'>
                        {window.location.href} 
                    </span>
                    <span className='text-gray-200 ml-2'>
                        is not found!
                    </span>
                </div>
                <div className='my-10 text-5xl text-red-500 font-extrabold tracking-widest'>
                    400
                </div>
                <button onClick={()=>window.history.back()} className='px-5 py-2 font-bold text-base cursor-pointer transition-all text-gray-400 hover:text-teal-500 hover:bg-gray-800 rounded'>
                    <i className='fa-solid fa-arrow-left'></i>
                    <span className='ml-3'>Back</span>
                </button>
            </div>
        </div>
    )
}

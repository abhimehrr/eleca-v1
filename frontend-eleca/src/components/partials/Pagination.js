import React, { useState, useEffect } from 'react'

export default function Pagination({ data, tempServices, resultShowing, paginationFilter, setTempServices }) {
    const [next, setNext] = useState(2)
    const [pre, setPre] = useState(1)

    // Handle Previous
    const handlePrevious = () => {
        if(pre >= 1) {
            paginationFilter(pre)
            sessionStorage.setItem('pageNumber', pre)
            setPre(pre - 1)
            setNext(pre + 1)
        }
    }

    // Handle Next
    const handleNext = () => {
        if(tempServices.length >= resultShowing) {
            paginationFilter(next)
            sessionStorage.setItem('pageNumber', next)
            setPre(next - 1)
            setNext(next + 1)
        }
    }


    return (
        <div className="flex items-center justify-between">
            <button onClick={handlePrevious} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-gray-800 transition-all rounded">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="flex items-center justify-center gap-x-2">
                <div className="text-left mb-2">
                    [ Showing {(next - 1) * resultShowing > data.length ? data.length : (next - 1) * resultShowing} of {data.length} results ]
                </div> 
            </div>
            <button onClick={handleNext} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-teal-800 transition-all rounded">
                <i className="fa-solid fa-arrow-right"></i>
            </button>    
        </div>
    )
}

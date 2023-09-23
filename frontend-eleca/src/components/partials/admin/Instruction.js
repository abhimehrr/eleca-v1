import React from 'react'
import { motion } from 'framer-motion'

export default function Instruction() {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className="mt-4 p-4 bg-gray-900 rounded-lg">
        <h3 className="flex items-center sm:text-2xl text-xl font-bold title-font text-white">
            Instructions
            <i className="fa-regular fa-flag ml-3"></i>
        </h3>

        <div className="flex justify-between px-4">
            <div className="mt-2">
            <h3 className="mb-2 text-lg font-medium text-teal-600">Status</h3>
            
            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <div className="inline-block bg-gray-400 w-3 h-3 mr-2 rounded-full"></div>
                    Accepted
                </div>
            </div>
            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <div className="inline-block bg-yellow-500 w-3 h-3 mr-2 rounded-full"></div>
                    Pending
                </div>
            </div>
            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <div className="bg-red-700 inline-block w-3 h-3 mr-2 rounded-full"></div>
                    Recjected / Cancelled
                </div>
            </div>
            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <div className="inline-block bg-green-700 w-3 h-3 mr-2 rounded-full"></div>
                    Completed / Delivered
                </div>
            </div>
            </div>
            
            <div className="mt-2">
            <h3 className="mb-2 text-lg font-medium text-teal-600">Actions</h3>

            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <i className="fa-regular fa-eye text-gray-400 mr-3"></i>
                    View Details
                </div>
            </div>
            <div className="my-1 ml-5">
                <div className="text-gray-400">
                    <i className="fa-regular fa-trash-can mr-3 text-red-600"></i>
                    Delete Request
                </div>
            </div>
            </div>
        </div>
    </motion.div>
  )
}

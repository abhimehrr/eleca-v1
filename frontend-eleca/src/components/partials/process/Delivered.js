import React from 'react'

export default function Delivered({ values, scaleLarge, Host }) {
    return (
        <div key={values.ID} className="flex relative">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500 inline-flex items-center justify-center text-white relative z-10">
                <i className="fa-solid fa-check-double"></i>
            </div>
            
            <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-teal-500 mb-1 tracking-wider">
                    Delivered
                </h2>
                <p className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
                    {values.time}
                </p>
                <p className="leading-relaxed">
                    Item has been delivered : <span className="text-teal-600">{values.comments}</span>
                </p>
                <div className="mt-3">
                    {values.image.length > 1 &&
                        <div onClick={scaleLarge} className="image-box w-36 rounded transition-all cursor-pointer" 
                            style={{
                                '--src': "url("+ Host +"static/images/"+ values.image +")"
                            }}>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

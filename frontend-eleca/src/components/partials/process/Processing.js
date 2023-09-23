import React from 'react'

// Download Image
import DonwloadImage from '../tiny/DonwloadImage'

export default function valuesing({ values, scaleLarge, Host}) {
    const route = window.location.pathname.split('/')[1]
    const imgUrl = Host +"static/images/"+ values.image

    return (
        <div key={values.ID} className="flex relative pb-5">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                <i className="fa-solid fa-arrows-rotate text-gray-800"></i>
            </div>
            
            <div className="flex-grow pl-4">
                <h2 className="font-medium title-font text-sm text-green-500 mb-1 tracking-wider">
                    Processing
                </h2>
                <p className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
                    {values.time}
                </p>
                <p className="leading-relaxed">
                    Request is now being process :
                    <span className='text-teal-600 mx-2'>
                        {values.comments}
                    </span>
                </p>
                <div className="mt-3">
                    {values.image.length > 1 &&
                        <div onClick={scaleLarge} className="image-box relative w-36 rounded transition-all cursor-pointer" 
                            style={{
                                '--src': "url("+ imgUrl +")"
                            }}>
                                {route === 'admin' &&
                                <DonwloadImage imgUrl={imgUrl} imgName={values.image} />
                                }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

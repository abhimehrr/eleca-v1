import React, { useContext, useState, useEffect, useRef } from "react";

// Importing Components
import Header from "../partials/Header";
import Footer from "../partials/Footer";

import BackToTop from '../partials/BackToTop'
import Loader from '../partials/tiny/LoaderSm'

// User Context
import UserContext from '../../context/UserContext'

// Invalid Image
import invalidImg from '../../img/invalid.jpg'

export default function WarrantyCard() {
    const { Host } = useContext(UserContext)

    const [loader, setLoader] = useState(false)
    
    // Error
    const [errMsg, setErrMsg] = useState('')
    
    // Cards
    const [warrantyCards, setWarrantyCards] = useState([])
    const [wCard, setWCard] = useState([])
    const [showInvalidCard, setShowInvalidCard] = useState(false)
    const [shwoWarrantyCard, setShwoWarrantyCard] = useState(false)
    const [showPagination, setShowPagination] = useState(false)
    const [currentCardIndex, setCurrentCardIndex] = useState(1)

    // Search Ref
    const searchRef = useRef(null)

    // Check Warranty Card
    const checkWarrantyCard = () => {
        var search = searchRef.current.value

        if(search.length < 1) {
            searchRef.current.classList.add('border-red-500')
            setErrMsg('Please enter mobile or serial number')
        } else {
            searchRef.current.classList.remove('border-red-500')
            setErrMsg('')
            setLoader(true)
            
            // Check Warranty Card
            fetch(Host + 'check-warranty-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search })
            })
            .then(res => res.json())
            .then(data => {
                var temp = []
                for(var i = data.data.length - 1; i >= 0; i--) {
                    temp.push(data.data[i])
                }
                setWarrantyCards(temp)
                setWCard(data.data[data.data.length - 1])
                setCurrentCardIndex(1)
                setLoader(false)
                
                if(data.data.length > 1) {
                    setShowPagination(true)
                    setNext(2)
                    setPrevious(1)
                }

                if(data.data.length >= 1) {
                    setShwoWarrantyCard(true)
                    setShowInvalidCard(false)
                }
                
                if(data.data.length < 1) {
                    setShwoWarrantyCard(false)
                    setShowInvalidCard(true)
                    setShowPagination(false)
                }
            })
            .catch(err => console.log('Error (Check Warranty Card) : ', err))
        }        
    }


    // Handle Next
    const [next, setNext] = useState(2)
    const handleNext = () => {
        if(next <= warrantyCards.length + 1) {
            setPrevious(next - 1)
            setNext(next + 1)
            setWCard(warrantyCards[next - 2])
            setCurrentCardIndex(next - 1)
        }
    }

    // Handle Previous
    const [previous, setPrevious] = useState(1)
    const handlePrevious = () => {
        if(previous > 1) {
            setPrevious(previous - 1)
            setNext(previous + 1)
            setWCard(warrantyCards[previous - 2])
            setCurrentCardIndex(previous - 1)
        }
    }
    

    return (
        <>
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="py-4 px-5 bg-gray-900 rounded-lg text-gray-200">
                <div className="p-2 bg-gray-900 rounded-lg">
                    <h1 className="title-font sm:text-3xl text-3xl text-center font-medium text-white">
                        <span className="text-teal-500 font-bold">Warranty Card</span>
                    </h1>

                    <div className="mt-10 w-full">
                        <div className="my-4 w-full relative">
                            {/* <label className="mr-3 font-medium" htmlFor='mobile'>Mobile</label> */}
                            <div className="absolute -top-5 text-sm text-red-500">
                                {errMsg}
                            </div>

                            <div className="leading-7 mb-1 text-sm text-gray-400">
                                Check If warranty card is valid.
                            </div>
                            <div className='w-full'>
                                <input type="number" ref={searchRef} onBlur={checkWarrantyCard} placeholder='Mobile or Serial Number' id='mobile' className="w-full px-2 py-2 bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                            </div>
                            <div className='w-full flex items-center mt-3 gap-x-3'>
                                {loader ?
                                    <button className='w-full flex items-center justify-center py-2 rounded transition-all'>
                                        <Loader/>
                                    </button>
                                    :
                                    <button onClick={checkWarrantyCard} className='w-full flex items-center justify-center font-medium bg-teal-600 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all'>
                                        <i className='fa-solid fa-check-double mr-2 text-sm'></i>
                                        Check Validity
                                    </button>
                                }
                            </div>
                        </div>
                        
                        
                        {/* Warranty Card */}
                        {shwoWarrantyCard &&
                            <div className="mt-10 mb-2">
                                <div className="flex flex-col hover:border-gray-300 transition-all border-gray-700 border p-4 rounded-lg">
                                    <h2 className="text-green-500 text-center title-font text-xl font-bold mt-2 mb-4">Genuine and Valid Card</h2>
                                    
                                    <div className="relative image-box mb-4 w-full rounded transition-all cursor-pointer" style={{'--src':  `url(${Host}static/images/${wCard.image})`}}>
                                        {/* Signaute */}
                                        <div className="absolute bottom-0 right-0">
                                            <div className='flex flex-col items-center justify-end text-xs py-1 px-2 bg-slate-700 opacity-60 rounded'>
                                                <span className='mb-1 text-white'>Digitally Sign</span>
                                                <span className='px-2 py-1 mb-1 font-medium bg-teal-500 text-gray-800 rounded'>
                                                    {wCard.adminName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-grow text-left">
                                        <div className='flex flex-wrap gap-x-3 text-gray-400'>
                                            <p className="capitalize">{wCard.cName}</p>
                                            <span className='capitalize text-teal-600'>|</span>
                                            <p className="capitalize">{wCard.cAddress}</p>
                                            <span className='text-teal-600'>|</span>
                                            <p>********{wCard.cMobile.toString().substring(wCard.cMobile.toString().length - 4, wCard.cMobile.toString().length)}</p>
                                        </div>
                                        <h2 className="capitalize text-teal-500 title-font text-xl font-bold my-2">{wCard.itemName}</h2>
                                        <div className='text-gray-400 text-sm'>
                                            <div className="flex items-center gap-x-2">
                                                <span>Serial Number</span>
                                                :
                                                <span className='font-medium text-gray-200'>{wCard.ID}</span>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <span>Warranty Period</span>
                                                :
                                                <span className='font-medium text-gray-200'>{wCard.period} Month</span>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <span>Date of Purchase</span>
                                                :
                                                <span className='font-medium text-gray-200'>
                                                    {wCard.dop.split(',')[0]}
                                                    <span className='mx-1 text-teal-500'>|</span>
                                                    {wCard.dop.split(',')[1]}
                                                </span>
                                            </div>
                                            {wCard.comments.length > 1 &&
                                                <div className="my-2">
                                                    <span>Comments :</span>
                                                    <ul className='ml-10'>
                                                        {wCard.comments.split(',').map(c => <li style={{textWrap: 'wrap'}} className='list-disc my-1 capitalize text-gray-200' key={c}>{c}</li>)}
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {showInvalidCard &&
                            <div className="mt-10 mb-2">
                                <div className="flex flex-col hover:border-gray-300 transition-all border-gray-700 border p-4 rounded-lg">
                                    <h2 className="text-red-500 text-center title-font text-xl font-bold mt-2 mb-4">Oops! Invalid Card</h2>
                                    <div className="image-box mb-4 w-full rounded transition-all cursor-pointer" style={{'--src': `url(${invalidImg})`}}></div>
                                </div>
                            </div>
                        }

                        {showPagination && 
                            <div className="mt-5 flex items-center justify-between">
                                <button onClick={handlePrevious} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-gray-800 transition-all rounded">
                                    <i className="fa-solid fa-arrow-left"></i>
                                </button>
                                <div className="flex items-center justify-center gap-x-2">
                                    <div className="text-left mb-2">
                                        [ Showing {currentCardIndex} of {warrantyCards.length} results ]
                                    </div> 
                                </div>
                                <button onClick={handleNext} className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-teal-800 transition-all rounded">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>    
                            </div>
                        }
                    </div>
                </div>
            </main>


            {/* Footer */}
            <Footer />

            {/* Back To Top */}
            <BackToTop/>
        </>
    )
}

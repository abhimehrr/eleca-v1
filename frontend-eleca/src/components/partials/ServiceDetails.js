import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import BackToTop from '../partials/BackToTop'
import Loader from '../partials/tiny/Loader'

// Process
import Accepted from '../partials/process/Accepted'
import Pending from '../partials/process/Pending'
import Processing from '../partials/process/Processing'
import CancelledOrRejected from '../partials/process/CancelledOrRejected'
import Completed from '../partials/process/Completed'
import Delivered from '../partials/process/Delivered'

// UserContext
import UserContext from '../../context/UserContext'


export default function ServiceDetails() {
    const { Host } = useContext(UserContext)
    
    // Services
    const [serviceDetails, setServiceDetails] = useState([])
    const [serviceProcess, setServiceProcess] = useState([])
    const [mNum, setMNum] = useState(0)
    const [issues, setIssues] = useState([])
    const [imageShow, setImageShow] = useState('')
    const [loader, setLoader] = useState(true)
    
    const { id } = useParams();
  
    const scaleLarge = (e) => {
      e.target.classList.toggle('w-full')
    }

    useEffect(() => {
        fetch(Host + 'service-details', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({ sid : id })
        })
        .then(res => res.json())
        .then(data => {
            if(data.data[0].length < 1) {
                window.alert('Wrong service id or data\nGo back and check id')
                window.history.back()
                return
            }
            
            setMNum('********' + data.data[0].cMobile.toString().substring(6, 10))
            setIssues(data.data[0].issues.split(','))
            setImageShow(data.data[0].image)
            setServiceDetails(data.data[0])
            setServiceProcess(data.data[1])
            setLoader(false)
        })

        document.title = 'Service Details | Eleca'

        window.scrollTo({
            top: 0
        });
    }, [])

    return (
        loader ? 
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <Loader/> 
                <div className="text-lg font-medium text-gray-400">
                    Loading...
                </div>
            </div>
        :
        <>
            <section className="py-5 body-font">
                <h1 className="title-font text-2xl font-medium text-gray-300">{serviceDetails.itemName}</h1>
                <div className='flex items-center mb-2 max-[400px]:flex-col max-[400px]:items-start'>
                    <h2 className="text-gray-400 mt-1">Request Id : {serviceDetails.ID}</h2>
                    <span className="text-teal-500 mx-3 max-[400px]:hidden">|</span>
                    <p className="text-gray-400">{serviceDetails.currentStatus}</p>
                </div>
                {/* <img className="w-full object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/> */}
                <div style={{padding: '2px'}}>
                    {imageShow.length > 1 &&
                        <div className="image-box w-full rounded transition-all cursor-pointerr" 
                            style={{
                                '--src': "url("+ Host +"static/images/"+ imageShow +")"
                            }}>
                        </div>
                    }
                </div>
            </section>

            <section className="bg-gray-900 rounded-lg mt-1 mb-5 p-5 text-gray-400 body-font">
                <div className="mb-3">
                    <h2 className="text-teal-500 font-bold">Customer</h2>
                    <div className="ml-4 mt-2">
                        <ul>
                            <li className="my-1">
                                <span>Name : </span>
                                <span className='capitalize'>{serviceDetails.cName}</span>
                            </li>
                            <li className="my-1">
                                <span>Address : </span>
                                <span className='capitalize'>{serviceDetails.cAddress}</span>
                            </li>
                            <li className="my-1">
                                <span>Mobile : </span>
                                <span>{mNum}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-3">
                    <h2 className="text-teal-500 font-bold">Issues</h2>
                    <div className="ml-4 mt-2">
                        <ul className="ml-4">
                            {issues.map(i => <li key={i} className="my-1 list-disc capitalize">{i.trim()}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-teal-500 font-bold">Payment</h2>
                    <div className="ml-4 mt-2">
                        <ul className="ml-4">
                            <li className="my-1 list-disc text-gray-500">
                                <span>Estimate Amount : </span>
                                <span>{serviceDetails.estAmt}</span>
                            </li>
                            <li className="my-1 list-disc font-medium">
                                <span>Advance Amount : </span>
                                <span className="text-teal-500">{serviceDetails.advanceAmt}</span>
                            </li>
                            <li className="my-1 list-disc font-medium">
                                <span>Total Amount : </span>
                                <span className="text-teal-500">{serviceDetails.totalAmt}</span>
                            </li>
                            <li className="my-1 list-disc">
                                <span>Due Amount : </span>
                                {serviceDetails.totalAmt - serviceDetails.advanceAmt < 1 ?
                                    <span className="font-medium">{serviceDetails.advanceAmt - serviceDetails.totalAmt}</span>
                                    : <span className="text-red-500 font-medium">{serviceDetails.totalAmt - serviceDetails.advanceAmt}</span>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 rounded-lg py-2 text-gray-200 body-font">
                <div className="container p-5 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:pr-10 md:py-6">
                            {serviceProcess.map(process => {
                                if(process.status === 'Accepted') {
                                    return <Accepted key={process.ID} values={process}/>
                                }
                                if(process.status === 'Pending') {
                                    return <Pending key={process.ID} Host={Host} values={process} scaleLarge={scaleLarge}/>
                                }
                                if(process.status === 'Processing') {
                                    return <Processing key={process.ID} Host={Host} values={process} scaleLarge={scaleLarge}/>
                                }
                                if(process.status === 'Cancelled' || process.status === 'Rejected') {
                                    return <CancelledOrRejected key={process.ID} Host={Host} values={process} scaleLarge={scaleLarge}/>
                                }
                                if(process.status === 'Completed') {
                                    return <Completed key={process.ID} Host={Host} values={process} scaleLarge={scaleLarge}/>
                                }
                                if(process.status === 'Delivered') {
                                    return <Delivered key={process.ID} Host={Host} values={process} scaleLarge={scaleLarge}/>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Top */}
            <BackToTop/>
        </>
    )
}
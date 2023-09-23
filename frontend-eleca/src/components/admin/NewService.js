import React, { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import Header from '../partials/admin/AdminHeader'
import AdminSecondaryHeader from '../partials/admin/AdminSecondaryHeader'
import Footer from '../partials/Footer'

import BackToTop from '../partials/BackToTop'
import Loader from '../partials/tiny/LoaderSm'

// Admin Context
import AdminContext from '../../context/AdminContext'
import UserContext from '../../context/UserContext'

export default function NewService() {
    const { Host, AuthToken, Authorize } = useContext(AdminContext)
    const UserContextData = useContext(UserContext)

    const Route = useNavigate()

    // Loaders
    const [checkLoader, setCheckLoader] = useState(false)
    const [submitLoader, setSubmitLoader] = useState(false)
    
    // Option
    const [fanOpt, setFanOpt] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [showMsg, setShowMsg] = useState('Check If customer already exists')
    
    // Image States
    const [imgSrc, setImgSrc] = useState('')
    const [imgTitle, setImgTitle] = useState('')
    const [imgFile, setImgFile] = useState(null)

    // Ref
    const mobileRef = useRef(null)
    const itemNameRef = useRef(null)
    const cNameRef = useRef(null)
    const cAddressRef = useRef(null)
    const estAmtRef = useRef(null)
    const advanceAmtRef = useRef(null)
    const imgRef = useRef(null)
    const checkBtnRef = useRef(null)

    const comments = useRef(null)

    // Handling File Changes
    const changeFile = e => {
        if(e.target.files.length < 1) return

        var file = e.target.files[0]

        var reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = e => {
            var img = document.createElement('img')
            img.src = e.target.result

            img.onload = e => {
                var canvas = document.createElement('canvas')

                var Width = 500
                canvas.width = Width
                canvas.height = e.target.height * (Width / e.target.width)

                var context = canvas.getContext('2d')
                context.drawImage(img, 0, 0, canvas.width, canvas.height)

                var imgUrl = context.canvas.toDataURL()
                setImgSrc(imgUrl)
                
                var newFile = urlToImage(imgUrl)
                setImgFile(newFile)
                setImgTitle(newFile.name)
            }
        }
    }

    // Get Image File from URL
    const urlToImage = (url) => {
        var [type, data] = url.split(',')
        type = type.match(/:(.*?);/)[1]
        
        var dataStr = atob(data)
        var n = dataStr.length
        var dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n)
        }
        
        var file = new File([dataArr], Date.now() + '.png', { type })
        return file
    }

    // Submit Status Changes
    const submitStatus = (e) => {
        var issues = []

        issues.push(fanIssueRadio)
        issuesValues.map(i => issues.push(i))
        
        issues = issues.toString()

        if(comments.current.value.length > 1 && issues.length < 1) {
            issues = comments.current.value
        } else if(comments.current.value.length < 1 && issues.length < 1) {
            issues = ''
        } else {
            issues = issues + ',' + comments.current.value
        }

        if(issues.length < 1) {
            comments.current.classList.add('border-red-500')
            setErrMsg('Please describe issues')
        } else {
            comments.current.classList.remove('border-red-500')
            setErrMsg('')
        }

        if(!imgFile) {
            imgRef.current.classList.add('bg-red-500')
            setErrMsg('Please add a image for future reference.')
        } else {
            imgRef.current.classList.remove('bg-red-500')
            setErrMsg('')
        }

        if(
            mobileRef.current.value.length === 10 &&
            cNameRef.current.value.length > 1 &&
            cAddressRef.current.value.length > 1 &&
            itemNameRef.current.value.length > 1 &&
           imgFile
        ) {
            setSubmitLoader(true)
            setErrMsg('')

            // Register Service
            fetch(Host + 'add-new-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: AuthToken
                },
                body: JSON.stringify({
                    name: cNameRef.current.value,
                    mobile: mobileRef.current.value,
                    address: cAddressRef.current.value,
                    itemName: itemNameRef.current.value,
                    estAmt: estAmtRef.current.value,
                    advanceAmt: advanceAmtRef.current.value,
                    itemType, issues, image: imgFile.name
                })
            })
            .then(res => res.json())
            .then(data => {
                // Upload Image
                var formData = new FormData()
                formData.append('image', imgFile)
                
                fetch(Host + 'upload', {
                    method: 'POST',
                    headers: {
                        authtoken: AuthToken
                    },
                    body: formData
                })
                .then(res => res.json())
                .then(d => {
                    window.alert(data.msg + '\nService id : ' + data.data.insertId)
                    cNameRef.current.value = ''
                    mobileRef.current.value = ''
                    cAddressRef.current.value = ''
                    itemNameRef.current.value = ''
                    estAmtRef.current.value = ''
                    advanceAmtRef.current.value = ''
                    comments.current.value = ''
                    setItemType('')
                    setImgSrc('')
                    setImgFile(null)
                    setSubmitLoader(false)
                }).catch(err => {
                    console.log('Error (New Service): ', err)
                })
            })
        } else {
            setErrMsg('Check all fields are correct...')
        }
        
    }

    // Handle Fan Checked
    const [itemType, setItemType] = useState('')
    const handleCheckBtns= (e) => {
        if(e.target.value === 'fan') {
            setFanOpt(true)
        } else {
            setIssuesValues([])
            setFanIssueRadio('')
            setFanOpt(false)
        }
        setItemType(e.target.value)
    } 

    
    // Handle Fan Checked
    const [issuesValues, setIssuesValues] = useState([])
    const [fanIssueRadio, setFanIssueRadio] = useState('')

    const handleFanIssuesRadio = e => {
        setFanIssueRadio(e.target.value)
    }

    const handleFanIssuesCheckbox = (e) => {
        if(e.target.checked) {
            setIssuesValues(i => [...i, e.target.value])
        } else {
            var values = issuesValues
            values.map((v, i) => {
                if(v === e.target.value){
                    values.splice(i, 1)
                }
            })
            setIssuesValues(values)
        }
    } 

    // Check Customer Exists
    const checkCustomer = () => {
        if(mobileRef.current.value.length === 10) {
            setCheckLoader(true)

            fetch(UserContextData.Host + 'search-customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile : mobileRef.current.value})
            })
            .then(res => res.json())
            .then(data => {
                var d = data.data
                if(d) {
                    cNameRef.current.value = d.name
                    cAddressRef.current.value = d.address
                    setShowMsg('Customer found...')
                } else {
                    cNameRef.current.value = ''
                    cAddressRef.current.value = ''
                    setShowMsg('Customer not found...')
                }
                setCheckLoader(false)
            })
        }
        

    }


    // Handle Mobile Validation
    const validMobile = (e) => {
        if(e.length < 1) {
            setErrMsg('Please enter mobile number')
            mobileRef.current.classList.add('border-red-500')
        } else if(e.length < 10 || e.length > 10) {
            setErrMsg('Mobile number must be 10 character')
            mobileRef.current.classList.add('border-red-500')
        } else {
            setErrMsg('')
            mobileRef.current.classList.remove('border-red-500')
        }
    }
 
    // Auth
    useEffect(() => {
        var auth = Authorize()
        if(!auth) {
            Route('/login')
        }
    }, [])

    return (
        <>
          {/* Header */}
          <Header />
    
          <div className="divider mb-5"></div>
    
          <div className="py-5 px-4 mb-3 bg-gray-900 rounded-lg">
            <AdminSecondaryHeader/>
          </div>
    
          {/* Main */}
          <main className="py-4 px-5 bg-gray-900 rounded-lg text-gray-200">
            <div className="p-2 bg-gray-900 rounded-lg">
                <h1 className="title-font sm:text-3xl text-3xl text-center font-medium text-white">
                    <span className="text-teal-500 font-bold">Add New Service</span>
                </h1>

                <div className="mt-10 w-full relative">
                    <div className="absolute -top-6 text-sm text-red-400">
                        {errMsg}
                    </div>
                    <div className="my-4 w-full flex items-center gap-x-3">
                        {/* <label className="mr-3 font-medium" htmlFor='mobile'>Mobile</label> */}
                        <input type="number" onKeyDown={e => e.key === 'Enter' ? checkBtnRef.current.click() : false} onBlur={e => {validMobile(e.target.value);checkBtnRef.current.click()}} ref={mobileRef} placeholder='Mobile Number' id='mobile' className="w-3/5 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                        {checkLoader ?
                            <button className='w-1/2 flex items-center justify-center py-1 font-medium rounded transition-all'>
                                <Loader/>
                            </button>
                        :
                            <button ref={checkBtnRef} onClick={checkCustomer} className='w-1/2 flex items-center justify-center font-medium bg-teal-600 py-1 text-gray-900 hover:bg-teal-500 rounded transition-all'>
                                <i className='fa-solid fa-check mr-2 text-sm'></i>
                                Check
                            </button>
                        }
                    </div>
                    <div className="leading-7 -mt-2 text-sm text-gray-400">
                        {showMsg}
                    </div>

                    <div className='flex items-center flex-wrap gap-3 mt-5'>
                        <div className="w-full">
                            <input type="text" ref={itemNameRef} placeholder='Item Name' id='item' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                        </div>
                        <div className="w-full">
                            <input type="text" ref={cNameRef} placeholder='Customer Name' id='customer-name' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                        </div>
                        <div className="w-full">
                            <input type="text" ref={cAddressRef} placeholder='Address' id='address' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                        </div>

                        <div className="customer-field">
                            <div className="mr-3">
                                <input type="number" ref={advanceAmtRef} placeholder='Advance Amount' id='advance-amount' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                            </div>
                            <div className="">
                                <input type="number" ref={estAmtRef} id='estimate' placeholder='Estimate Amount' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" required/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <div className="text-gray-300">
                            <span className="font-medium text-teal-700 text-lg">
                                Item Type
                            </span>
                            <div className='ml-5 pt-2 flex flex-wrap items-centers'>
                                <div className="w-1/3 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="fan-type" type="radio" name='item-type' value="fan" className="w-4 h-4"/>
                                    <label htmlFor="fan-type" className="ml-3 text-gray-400">
                                        Fan
                                    </label>
                                </div>
                                <div className="w-1/3 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="amplifier" name='item-type' type="radio" value="amplifier" className="w-4 h-4"/>
                                    <label htmlFor="amplifier" className="ml-3 text-gray-400">
                                        Amplifier
                                    </label>
                                </div>
                                <div className="w-1/3 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="speaker" name='item-type' type="radio" value="speaker" className="w-4 h-4"/>
                                    <label htmlFor="speaker" className="ml-3 text-gray-400">
                                        Speaker
                                    </label>
                                </div>
                                <div className="w-1/3 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="tv-led" name='item-type' type="radio" value="tv" className="w-4 h-4"/>
                                    <label htmlFor="tv-led" className="ml-3 text-gray-400">
                                        TV / LED
                                    </label>
                                </div>
                                <div className="w-1/3 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="set-top-box" name='item-type' type="radio" value="settopbox" className="w-4 h-4"/>
                                    <label htmlFor="set-top-box" className="ml-3 text-gray-400">
                                        Set Top Box
                                    </label>
                                </div>
                                <div className="w-1/2 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="home-theater" name='item-type' type="radio" value="home-theater" className="w-4 h-4"/>
                                    <label htmlFor="home-theater" className="ml-3 text-gray-400">
                                        Home Theater
                                    </label>
                                </div>
                                <div className="w-1/2 flex items-center mb-2">
                                    <input onClick={handleCheckBtns} id="others" name='item-type' type="radio" value="others" className="w-4 h-4"/>
                                    <label htmlFor="others" className="ml-3 text-gray-400">
                                        Others
                                    </label>
                                </div>
                            </div>

                            <span className="font-medium text-teal-700 text-xl">
                                Issues
                            </span>
                            {fanOpt &&
                            <div className='ml-5 pt-2 flex gap-x-5 flex-wrap'>
                                <div className="w-full flex items-center mb-2">
                                    <input id="repair" onClick={handleFanIssuesRadio} type="radio" name='coil' value="repair" className="w-4 h-4"/>
                                    <label htmlFor="repair" className="ml-3 text-gray-400">
                                        Repair
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="copper-coil" onClick={handleFanIssuesRadio} name='coil' type="radio" value="copper-coil" className="w-4 h-4"/>
                                    <label htmlFor="copper-coil" className="ml-3 text-gray-400">
                                        Copper Coil
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="aluminium-coil" onClick={handleFanIssuesRadio} name='coil' type="radio" value="aluminium-coil" className="w-4 h-4"/>
                                    <label htmlFor="aluminium-coil" className="ml-3 text-gray-400">
                                        Aluminium Coil
                                    </label>
                                </div>
                                
                                <div className="w-2/5 flex mb-2">
                                    <input id="shaft" onClick={handleFanIssuesCheckbox} type="checkbox" value="shaft" className="w-4 h-4"/>
                                    <label htmlFor="shaft" className="ml-3 text-gray-400">
                                        Shaft {'(Dhuri)'}
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="bearing" onClick={handleFanIssuesCheckbox} type="checkbox" value="bearing" className="w-4 h-4"/>
                                    <label htmlFor="bearing" className="ml-3 text-gray-400">
                                        Bearing
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="capacitor" onClick={handleFanIssuesCheckbox} type="checkbox" value="capacitor" className="w-4 h-4"/>
                                    <label htmlFor="capacitor" className="ml-3 text-gray-400">
                                        Capacitor
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="capacitor-clip" onClick={handleFanIssuesCheckbox} type="checkbox" value="capacitor-clip" className="w-4 h-4"/>
                                    <label htmlFor="capacitor-clip" className="ml-3 text-gray-400">
                                        Capacitor Clip
                                    </label>
                                </div>
                                <div className="w-2/5 flex mb-2">
                                    <input id="varnish" onClick={handleFanIssuesCheckbox} type="checkbox" value="varnish" className="w-4 h-4"/>
                                    <label htmlFor="varnish" className="ml-3 text-gray-400">
                                        Varnish
                                    </label>
                                </div>
                            </div> }

                        </div>
                        
                    </div>

                    <div className="my-4 w-full">
                        <input type="text" ref={comments} placeholder="Comments..." className="w-full px-2 py-2 text-base bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                        <div className="mt-1 text-sm text-gray-400">
                            Seperate with commas {'( , )'} for multiple entries.
                        </div>
                    </div>
                     

                    <div className="my-5 flex items-center gap-x-5">
                        <label htmlFor='files' ref={imgRef} className='bg-gray-400 w-full flex items-center justify-center hover:bg-teal-600 text-gray-900 text-sm font-medium py-2.5 px-4 cursor-pointer transition-all rounded'>
                            <i className='fa-solid fa-image mr-2'></i>
                            Add Image
                            <input type='file' onChange={changeFile} id='files' accept='image/png, image/jpeg, image/jpg' className='hidden'/>
                        </label>
                        {submitLoader ?
                            <button className='w-full flex items-center justify-center px-4 py-2 rounded transition-all'>
                                <Loader/>
                            </button>
                            :
                            <button onClick={submitStatus} className='w-full flex items-center justify-center font-medium bg-teal-600 px-4 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all'>
                                <i className='fa-solid fa-check-double mr-2'></i>
                                Submit
                            </button>
                        }
                    </div>

                    {/* Image */}
                    {imgSrc.length > 1 ?
                    <div className="my-5 bg-gray-200 p-1 rounded-lg w-full hiddens">
                        <img className="w-full object-cover object-center rounded" alt={imgTitle} title={imgTitle} src={imgSrc}/>
                    </div> : false
                    }
                </div>
            </div>
          </main>
    
          
          {/* Footer */}
          <Footer/>

          {/* Back To Top */}
          <BackToTop/>
        </>
      )
}

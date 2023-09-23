import React, { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Loader 
import Loader from '../tiny/LoaderSm'

// Admin Context
import AdminContext from '../../../context/AdminContext'
import UserContext from '../../../context/UserContext'

export default function RegisterWarrantyCard({ setThankYou, showWarrantyCard, showInvalidCard, showRegCard }) {
    const { Host, AuthToken, Authorize } = useContext(AdminContext)
    const UserContextData = useContext(UserContext)

    const Route = useNavigate()
    
    const [imgSrc, setImgSrc] = useState('')
    const [imgTitle, setImgTitle] = useState('')
    const [imgFile, setImgFile] = useState(null)

    const [errMsg, setErrMsg] = useState('')
    const [loader, setLoader] = useState(false)

    const itemNameRef = useRef(null)
    const cNameRef = useRef(null)
    const cMobileRef = useRef(null)
    const cAddressRef = useRef(null)
    const periodRef = useRef(null)
    const commentsRef = useRef(null)
    const imgLabel = useRef(null)

    // Handling File Changes
    const changeFile = e => {
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

    // Fetch Customer Data
    const fetchCustomerData = () => {
        fetch(UserContextData.Host + 'search-customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile : cMobileRef.current.value})
        })
        .then(res => res.json())
        .then(data => {
            var d = data.data
            if(d) {
                cNameRef.current.value = d.name
                cAddressRef.current.value = d.address
            } else {
                cNameRef.current.value = ''
                cAddressRef.current.value = ''
            }
        }).catch(err => console.log('Error (Warranty Fetch Customer) : ', err))
    }


    // Submit Status Changes
    const submitStatus = (e) => {
        var itemName = itemNameRef.current.value
        var cName = cNameRef.current.value
        var cMobile = cMobileRef.current.value
        var cAddress = cAddressRef.current.value
        var period = periodRef.current.value
        var comments = commentsRef.current.value

        if(cMobile.length < 1) {
            cMobileRef.current.classList.add('border-red-500')
            setErrMsg('Please enter mobile number')
        } else if((cMobile.length > 10 || cMobile.length < 10) && cMobile.length > 1) {
            cMobileRef.current.classList.add('border-red-500')
            setErrMsg('Mobile number must be 10 character')
        } else if(itemName.length < 1) {
            itemNameRef.current.classList.add('border-red-500')
            setErrMsg('Please enter item name')
        } else if(cName.length < 1) {
            cNameRef.current.classList.add('border-red-500')
            setErrMsg('Please enter customer name')
        } else if(cAddress.length < 1) {
            cAddressRef.current.classList.add('border-red-500')
            setErrMsg('Please enter customer address')
        } else if(period < 1) {
            periodRef.current.classList.add('border-red-500')
            setErrMsg('Please enter period in month')
        } else if(!imgFile) {
            imgLabel.current.classList.add('bg-red-500')
            setErrMsg('Please add a image')
        } else {
            itemNameRef.current.classList.remove('border-red-500')
            cNameRef.current.classList.remove('border-red-500')
            cMobileRef.current.classList.remove('border-red-500')
            cAddressRef.current.classList.remove('border-red-500')
            periodRef.current.classList.remove('border-red-500')
            imgLabel.current.classList.remove('bg-red-500')
            setErrMsg('')
        }

        if(
            cMobile.length > 1 && 
            cName.length > 1 && 
            cAddress.length > 1 && 
            itemName.length > 1 && 
            period > 0 && 
            imgFile
        ) {
            setLoader(true)

            // Register Warranty Card
            fetch(Host + 'register-warranty-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: AuthToken
                }, 
                body: JSON.stringify({ 
                    itemName, name : cName,
                    mobile: cMobile, address : cAddress,
                    period, comments, image: imgFile.name
                })
            })
            .then(res => res.json())
            .then(data => {
                var d = data.data
                if(d) {
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
                        setThankYou({
                            id: data.data.insertId, itemName,
                            cName, cMobile, cAddress, period
                        })
                        setLoader(false)
                        showRegCard(false)
                        showInvalidCard(false)
                        showWarrantyCard(false)
                        // window.alert(data.msg + '\nService id : ' + data.data.insertId)
                        cNameRef.current.value = ''
                        cMobileRef.current.value = ''
                        cAddressRef.current.value = ''
                        itemNameRef.current.value = ''
                        periodRef.current.value = ''
                        commentsRef.current.value = ''
                        setImgSrc('')
                        setImgFile(null)
                    })
                }
            }).catch(err => console.log('Error (Register Warranty) : ', err))
        }
    }


    useEffect(() => {
        var auth = Authorize()
        if(!auth) {
            Route('/login')
        }
    }, [])

    return (
        <>
        <div className='px-3 py-4 bg-gray-800 rounded-lg mt-8'>
            <div className='relative flex items-center flex-wrap gap-3'>
                <span className="font-medium mb-3 text-teal-700 text-xl">
                    Register a new product
                </span>
                <div className="absolute top-10 text-sm text-red-400">
                    {errMsg}
                </div>
                <div className="w-full mt-3">
                    <input ref={cMobileRef} onBlur={fetchCustomerData} type="text" placeholder='Mobile Number' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="w-full">
                    <input ref={itemNameRef} type="text" placeholder='Item Name' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="w-full">
                    <input ref={cNameRef} type="text" placeholder='Customer Name' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="w-full">
                    <input ref={cAddressRef} type="text" placeholder='Address' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="w-full">
                    <input ref={commentsRef} type="text" placeholder='Comments...' className="w-full p-2 text-base bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="w-full text-sm -mt-2 text-gray-400">
                    Seperate with commas {'( , )'} for multiple enteries.
                </div>
                <div className="w-full text-gray-400">
                    Date of Purchase and Warranty Period
                </div>
                <div className="w-full flex items-center gap-x-3">
                    <input type="text" value={`${new Date().toLocaleDateString().split('/')[1]} / ${new Date().toLocaleDateString().split('/')[0]} / ${new Date().toLocaleDateString().split('/')[2]}`} readOnly className="w-1/2 px-2 py-1 text-sm bg-teal-900 border border-gray-200 text-gray-100 outline-none focus:border-teal-500 rounded transition-all"/>
                    <input ref={periodRef} type="number" placeholder='Period (in month)' className="w-1/2 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
            </div>
                        

            <div className="my-5 flex items-center gap-x-5">
                <label htmlFor='files' ref={imgLabel} className='bg-gray-400 w-full flex items-center justify-center hover:bg-teal-600 text-gray-900 text-sm font-medium py-2.5 px-4 cursor-pointer transition-all rounded'>
                    <i className='fa-solid fa-image mr-2'></i>
                    Add Image
                    <input onChange={changeFile} type='file' id='files' accept='image/png, image/jpeg, image/jpg' className='hidden'/>
                </label>
                {loader ?
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
        </>
    )
}

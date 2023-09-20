import React, { useState, useRef } from 'react'

export default function ProcessService({ status, Host, sid }) {
    // Error
    const [errMsg, setErrMsg] = useState('')

    // Image State
    const [imgSrc, setImgSrc] = useState('')
    const [imgTitle, setImgTitle] = useState('')
    const [imgFile, setImgFile] = useState(null)

    const select = useRef(null)
    const comments = useRef(null)

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

    // Submit Status Changes
    const submitStatus = (e) => {
        var authToken = document.cookie
        authToken = authToken.split(';').filter(cookie => cookie.includes('auth'))
        authToken = authToken.toString().split('=')[1]

        if(comments.current.value.length < 1) {
            comments.current.classList.add('border-red-500')
            setErrMsg('Please add some comment')
        } else {
            comments.current.classList.remove('border-red-500')
            setErrMsg('')
        }

        var imageName = ''
        if(imgFile) {
            imageName = imgFile.name
        }
        
        
        // Process Service
        if(comments.current.value.length > 1) {
            comments.current.classList.remove('border-red-500')
            setErrMsg('')

            fetch(Host + "admin/service-process", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authtoken: authToken
                },
                body: JSON.stringify({ 
                    sid, status: select.current.value,
                    comments: comments.current.value, image: imageName
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.data) {
                    if(imgFile) {
                        var formData = new FormData()
                        formData.append('image', imgFile)
                        
                        fetch(Host + 'admin/upload', {
                            method: 'POST',
                            headers: {
                                authtoken: authToken
                            },
                            body: formData
                        })
                        .then(res => res.json())
                        .then(d => {})
                    }

                    window.alert(data.msg)
                    // console.log(data)
                    window.location.reload()

                } else {
                    console.log(data)
                    window.alert(data.msg)
                }
            });

        } else {
            comments.current.classList.add('border-red-500')
            setErrMsg('Please add some comment')
        }
    }


    return (
        <div className="p-2 bg-gray-900 rounded-lg">
            <h3 className="mb-8 flex items-center sm:text-2xl text-xl font-bold title-font text-teal-600">
                Update Service Status
            </h3>

            <div className="mt-5 w-full relative">
                <div className="absolute -top-6 text-sm text-red-400">
                    {errMsg} 
                </div>
                <div className="my-4 flex items-center justify-between">
                    <div className="text-gray-300">
                        <span className="mr-3 font-medium">Status</span>
                        <select ref={select} className=" bg-transparent border outline-none px-2 py-0.5 rounded border-gray-200 cursor-pointer">
                            {status === 'Accepted' &&
                                <>
                                    <option value="Pending" className="bg-gray-800 text-gray-300">Pending</option>
                                    <option value="Processing" className="bg-gray-800 text-gray-300">Processing</option>
                                    <option value="Completed" className="bg-gray-800 text-gray-300">Completed</option>
                                    <option value="Cancelled" className="bg-gray-800 text-gray-300">Cancelled</option>
                                    <option value="Rejected" className="bg-gray-800 text-gray-300">Rejected</option>
                                    <option value="Delivered" className="bg-gray-800 text-gray-300">Delivered</option>
                                </>
                            }
                            
                            {status === 'Pending' &&
                                <>
                                    <option value="Processing" className="bg-gray-800 text-gray-300">Processing</option>
                                    <option value="Completed" className="bg-gray-800 text-gray-300">Completed</option>
                                    <option value="Cancelled" className="bg-gray-800 text-gray-300">Cancelled</option>
                                    <option value="Rejected" className="bg-gray-800 text-gray-300">Rejected</option>
                                    <option value="Delivered" className="bg-gray-800 text-gray-300">Delivered</option>
                                </>
                            }
                            
                            {status === 'Processing' &&
                                <>
                                    <option value="Pending" className="bg-gray-800 text-gray-300">Pending</option>
                                    <option value="Completed" className="bg-gray-800 text-gray-300">Completed</option>
                                    <option value="Cancelled" className="bg-gray-800 text-gray-300">Cancelled</option>
                                    <option value="Rejected" className="bg-gray-800 text-gray-300">Rejected</option>
                                    <option value="Delivered" className="bg-gray-800 text-gray-300">Delivered</option>
                                </>
                            }
                            {status === 'Rejected' || status === 'Cancelled' &&
                                <>
                                    <option value="Delivered" className="bg-gray-800 text-gray-300">Delivered</option>
                                </>
                            }
                            {status === 'Completed' &&
                                <>
                                    <option value="Delivered" className="bg-gray-800 text-gray-300">Delivered</option>
                                </>
                            }
                        </select>
                    </div>
                    <label htmlFor='files' className='bg-gray-400 hover:bg-teal-600 text-gray-900 text-sm font-medium py-1.5 px-4 cursor-pointer transition-all rounded'>
                        <i className='fa-solid fa-image mr-2'></i>
                        Add Image
                        <input type='file' onChange={changeFile} id='files' accept='image/png, image/jpeg, image/jpg' className='hidden'/>
                    </label>
                </div>

                <div className="my-4 w-full">
                    <input type="text" ref={comments} placeholder="Comments..." className="w-full px-2 py-2 text-base bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="-mt-2 text-sm text-gray-400">
                    Seperate with commas {'( , )'} for multiple entries. 
                </div>

                <div className="my-4 w-full">
                    <button onClick={submitStatus} className='flex items-center font-medium bg-teal-600 px-4 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all'>
                        <i className='fa-regular fa-pen-to-square mr-2 text-sm'></i>
                        Submit
                    </button>
                </div>

                {imgSrc.length > 1 ?
                <div className="my-5 bg-gray-200 p-1 rounded-lg w-full hiddens">
                    <img className="w-full object-cover object-center rounded" title={imgTitle} src={imgSrc}/>
                </div> : '' 
                }
            </div>
        </div>
    )
}

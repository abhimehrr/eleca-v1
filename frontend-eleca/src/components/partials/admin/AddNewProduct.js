import React, { useContext, useRef, useState, useEffect } from 'react'

// Admin Context
import AdminContext from '../../../context/AdminContext'

export default function AddNewProduct({ setTempPriceList, tempPriceList, setShowAddProduct }) {
    const { Host, AuthToken, Authorize } = useContext(AdminContext)

    const [errMsg, setErrMsg] = useState('')


    // Ref
    const productRef = useRef(null)
    const productIdRef = useRef(null)
    const rlpRef = useRef(null)
    const mrpRef = useRef(null)

    
    // Add New Product
    const addNewProduct = () => {
        var product = productRef.current.value
        var mrp = mrpRef.current.value
        var rlp = rlpRef.current.value

        if(product.length < 1) {
            productRef.current.classList.add('border-red-500')
            setErrMsg('Please enter product name')
        } else {
            productRef.current.classList.remove('border-red-500')
            setErrMsg('')
        }
        
        if(mrp < 1) {
            mrpRef.current.classList.add('border-red-500')
            setErrMsg('Please enter MRP')
        } else {
            mrpRef.current.classList.remove('border-red-500')
            setErrMsg('')
        }

        if(rlp < 1) {
            rlpRef.current.classList.add('border-red-500')
            setErrMsg('Please enter RLP')
        } else {
            rlpRef.current.classList.remove('border-red-500')
            setErrMsg('')
        }

        if(product.length > 1 && mrp > 1 && rlp > 1) {
            fetch(Host + 'add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: AuthToken
                },
                body: JSON.stringify({
                    product, productId: productIdRef.current.value, mrp, rlp
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Data : ', data.data)
                var pro = { ID : data.data.insertId, productId: productIdRef.current.value, product, mrp, rlp }
                var ntp = [pro]
                for(var i = 0; i < tempPriceList.length - 1; i++) {
                    ntp.push(tempPriceList[i])
                }
                setTempPriceList(ntp)

                window.alert(data.msg)
                productRef.current.value = ''
                mrpRef.current.value = ''
                rlpRef.current.value = ''

                productRef.current.focus()
            }).catch(err => console.log('Error (Add Product) : ', err))
        }
    }


    useEffect(() => {
        Authorize()
    }, [])
    
    return (
        <div className='px-3 py-4 my-8 bg-gray-800 rounded-lg'>
            <div className='flex items-center flex-wrap gap-3 relative'>
                <span className="font-medium mb-3 text-teal-700 text-xl">
                    Add a new product
                </span>

                <div className="absolute top-10 left-1 text-sm text-red-400">
                    {errMsg} 
                </div>
                
                <div className="w-full mt-3">
                    <input type="text" ref={productRef} placeholder='Product Name' className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" autoFocus/>
                </div>
                <div className="w-full flex items-center justify-between gap-x-3">
                    <input type="number" ref={rlpRef} placeholder='RLP' className="w-1/2 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                    <input type="number" ref={mrpRef} placeholder='MRP' className="w-1/2 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                    <input type="number" ref={productIdRef} placeholder='Product Id (Optional)' className="w-1/2 px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
            </div>

            <div className="my-5 flex items-center gap-x-5">
                <button onClick={() => setShowAddProduct(false)} className='w-full flex items-center justify-center font-medium bg-red-700 px-4 py-2 text-gray-100 hover:bg-red-800 rounded transition-all'>
                    <i className='fa-solid fa-xmark mr-2'></i>
                    Cancel
                </button>
                <button onClick={addNewProduct} className='w-full flex items-center justify-center font-medium bg-teal-600 px-4 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all'>
                    <i className='fa-solid fa-check mr-2'></i>
                    Submit
                </button>
            </div>
        </div>
    )
}

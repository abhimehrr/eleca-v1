import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import QrCode from "qrcode";
import { motion } from 'framer-motion'

// Components
import Header from "../partials/Header";
import Footer from "../partials/Footer";

export default function Payment() {
  const [qrValue, setQrValue] = useState('');
  const [linkURL, setLinkURL] = useState('')

  const [errMsg, setErrMsg] = useState('')

  const amRef = useRef()
  const tnRef = useRef()

  const generateQr = () => {
    if(amRef.current.value.length < 1) {
      setErrMsg('Please enter amount')
      amRef.current.classList.add('border-red-500')
      return
    }
    else if(amRef.current.value < 1) {
      setErrMsg('Enter amount more than RS 1')
      amRef.current.classList.add('border-red-500')
      return
    } else {
      setErrMsg('')
      amRef.current.classList.remove('border-red-500')
    }

    if(tnRef.current.value.length > 50) {
      setErrMsg('Message must be less than 50 characters.')
      tnRef.current.classList.add('border-red-500')
      return
    } else {
      setErrMsg('')
      tnRef.current.classList.remove('border-red-500')
    }
    
    const baseURL = `upi://pay?pa=7361092810@okbizaxis&pn=Ashok%20Electronics&am=${amRef.current.value}&tn=eleca:${tnRef.current.value}`
   
    QrCode.toDataURL(baseURL, (err, url) => {
      if(err) return
      setQrValue(url)
      setLinkURL(baseURL)
    });
  };


  return (
    <>
      {/* Header */}
      <Header />

      <motion.main initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className="max-[500px]:my-20 py-4 px-5 bg-gray-900 rounded-lg text-gray-200">
        <div className="p-2 bg-gray-900 rounded-lg">
          <h1 className="title-font sm:text-3xl text-3xl text-center font-medium text-white">
            <span className="text-teal-500 font-bold">Make a Payment</span>
          </h1>

          <div className="mt-10 mb-3 w-full">
            <div className="mb-1 text-sm text-red-400">
              {errMsg}
            </div>
            <div className="flex items-center justify-centers flex-wrap gap-3">
              <div className="payment-field">
                <div className="mr-3">
                  <input type="number" ref={amRef} placeholder="Amount" className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
                <div className="">
                  <input type="text" ref={tnRef} placeholder="Message (Optional)" className="w-full px-2 py-1 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all"/>
                </div>
              </div>

              {qrValue.length < 1 ? false :
                <div className="w-full relative">
                  <div className="flex justify-center my-4">
                    <Link to={linkURL}>
                      <img className="w-48 object-cover object-center rounded" alt='payment qrcode' src={qrValue}/>
                    </Link>
                  </div>

                  <div className="mt-5 text-sm flex flex-col items-center justify-center text-gray-400">
                    <div className="text-teal-500">
                      QR Code Generated
                    </div>
                    Click on QR Code if you are on mobile.
                  </div>

                  <Link to={qrValue} download={`eleca-qr-code-${Date.now()}.png`} className="absolute bottom-12 right-24 px-2 py-0.5 max-[500px]:right-16 max-[393px]:right-10 bg-teal-700 hover:bg-teal-500 transition-all rounded">
                    <i className="fa-solid fa-arrow-down"></i>
                  </Link>
                </div>
              }

              <button onClick={generateQr} className="w-full mt-2 flex items-center justify-center font-medium bg-teal-600 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all">
                <i className="fa-solid fa-qrcode mr-2 text-sm"></i>
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </>
  );
}

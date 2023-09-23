import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import UserContext from '../../context/UserContext'
import AdminContext from '../../context/AdminContext'

export default function AdminLogin() {
  const { Host } = useContext(UserContext)
  const AdminContextData = useContext(AdminContext)

  const [showLogin, setShowLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const Route = useNavigate()
  
  // Ref
  const inputRef = useRef(null)
  const passowrdRef = useRef(null)

  const newInputRef = useRef(null)
  const newPassowrdRef = useRef(null)
  const pinRef = useRef(null)

  const [err, setErr] = useState('')
  

  // Login
  const login = async () => {
    if(inputRef.current.value.length < 1) {
      inputRef.current.classList.add('border-red-500')
      return setErr('Please enter email or mobile')
    } else {
      inputRef.current.classList.remove('border-red-500')
      setErr('')
    }
    
    if(passowrdRef.current.value.length < 1) {
      passowrdRef.current.classList.add('border-red-500')
      return setErr('Please enter password')
    } else {
      passowrdRef.current.classList.remove('border-red-500')
      setErr('')
    }

    var data = await fetch(Host + 'login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username : inputRef.current.value,
        password: passowrdRef.current.value
      })
    })

    data = await data.json()

    if(data.access === 'allowed') {
      localStorage.setItem('auth', JSON.stringify({
        token: data.authToken,
        exp: Date.now() + 1000 * 60 * 60 * 24
      }))
      Route('/admin/dashboard')
    } else {
      console.log(data)
      setErr(data.msg)
    }
  }


  useEffect(() => {
    var auth = AdminContextData.Authorize()
    if(auth) return Route('/admin/dashboard')
  }, [])


  const resetPassword = () => {
    fetch(Host + 'reset-password', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username : newInputRef.current.value,
        password: newPassowrdRef.current.value,
        pin: pinRef.current.value
      })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.data) {
        setErr(data.msg)
      }
      if(data.data) {
        window.alert(data.msg)
        setErr('')
        setShowLogin(true)
        setShowForgotPassword(false)
      }
    })
  }

  
  return (
    <main className="flex items-center flex-col justify-center min-h-screen">
      <Link to="/" className="mb-5 title-font font-bold text-3xl text-teal-500 hover:text-teal-600 transition-all text-center">
        eleca .
      </Link>

      {showLogin &&
        <section className="text-gray-400 bg-gray-900 body-font pt-1 pb-6 rounded-lg">
          <div className="container py-5 px-10 mx-auto flex flex-wrap items-center">
            <div className="w-full">
              <h2 className="title-font font-medium text-2xl text-gray-300 text-center">
                Admin Login
              </h2>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5">
              <div className="relative mb-4">
                <label htmlFor="username" className="leading-7 text-sm text-gray-400">
                  Email / Mobile
                </label>
                <input ref={inputRef} type="text" id="username" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
              <div className="relative mb-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-400">
                    Password
                  </label>
                  <button onClick={() => {setShowLogin(false);setShowForgotPassword(true);setErr('')}} className="text-sm text-teal-600 hover:text-gray-200 transition-all">
                    Forgot Password?
                  </button>
                </div>
                <input ref={passowrdRef} onKeyDown={e => e.key === 'Enter' ? login() : false} type="password" id="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <div className="leading-7 mb-1 -mt-2 text-sm text-red-400">
                {err}
              </div>
              
              <button onClick={login} className="text-white bg-teal-900 border-0 py-2 mt-3 focus:outline-none hover:bg-teal-600 hover:text-gray-800 transition-all rounded text-lg">
                Login
              </button>
            </div>
          </div>
        </section>
      }

      {showForgotPassword &&
        <section className="text-gray-400 bg-gray-900 body-font pt-1 pb-6 rounded-lg">
          <div className="container py-5 px-10 mx-auto flex flex-wrap items-center">
            <div className="w-full">
              <h2 className="title-font font-medium text-2xl text-gray-300 text-center">
                Reset Password
              </h2>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5">
              <div className="mb-4 w-full flex items-center justify-between gap-x-3">
                <div className="relative w-3/5">
                  <label htmlFor="username" className="leading-7 text-sm text-gray-400">
                    Email / Mobile
                  </label>
                  <input ref={newInputRef} type="text" id="username" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative w-2/6">
                  <label htmlFor="pin" className="leading-7 text-sm text-gray-400">
                    Reset PIN
                  </label>
                  <input ref={pinRef} type="password" id="pin" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>

              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-400">
                  New Password
                </label>
                <input ref={newPassowrdRef} onKeyDown={e => e.key === 'Enter' ? login() : false} type="password" id="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <div className="mb-1 -mt-2 text-sm text-red-400">
                {err}
              </div>
              
              <div className="w-full flex items-center justify-between gap-x-3 mb-4">
                <button onClick={()=>{setShowForgotPassword(false);setShowLogin(true);setErr('')}} className="w-1/2 text-white bg-gray-700 border-0 py-2 mt-3 focus:outline-none hover:bg-red-600 hover:text-gray-100 transition-all rounded text-lg">
                  <i className="fa-solid fa-xmark mr-2"></i>
                  Cancel
                </button>

                <button onClick={resetPassword} className="w-1/2 text-gray-800 bg-yellow-500 border-0 py-2 mt-3 focus:outline-none hover:bg-yellow-600 transition-all rounded text-lg">
                  <i className="fa-solid fa-check mr-2"></i>
                  Reset
                </button>  
              </div>

            </div>
          </div>
        </section>
      }
    </main>
  );
}

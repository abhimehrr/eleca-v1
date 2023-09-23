import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Admin Context
import AdminContext from '../../../context/AdminContext'

export default function TableRow({ values }) {
  const { Host, Authorize, AuthToken } = useContext(AdminContext)

  const Route = useNavigate()
  
  const { ID, itemName, cName, currentStatus } = values

  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')


  // Delete Service
  const deleteService = (id, itemName) => {
    var c = window.confirm('Deleting service request for  "' + itemName + '"  with id  "' + id + '"\nAre you sure?')
    
    if(c) {
      fetch(Host + 'delete-service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authtoken: AuthToken
        },
        body: JSON.stringify({ sid: id })
      })
      .then(res => res.json())
      .then(data => {
        window.alert(data.msg)
        window.location.reload()
      }).catch(err => console.log('Error (Add Product) : ', err))
    }
  }
  
  
  useEffect(() => {
    var auth = Authorize()
    if(!auth) {
        Route('/login')
    }

    if(currentStatus === 'Processing') {
      setStatus('bg-green-400')
      setTitle('Processing')
    } else if(currentStatus === 'Completed' || currentStatus === 'Delivered') {
      setStatus('bg-green-600')
      setTitle('Completed / Delivered')
    } else if(currentStatus === 'Pending') {
      setStatus('bg-yellow-500')
      setTitle('Pending')
    } else if(currentStatus === 'Cancelled' || currentStatus === 'Rejected') {
      setStatus('bg-red-500') 
      setTitle('Cancelled / Rejected')
    } else if(currentStatus === 'Accepted') {
      setStatus('bg-gray-200')
      setTitle('Accepted')
    }
  }, [])
  
  return (
    <tr className="gap-x-3 justify-center items-center">
        <td>{ID}</td>
        <td style={{textTransform: 'capitalize'}}>{cName}</td>
        <td style={{textTransform: 'capitalize'}}>{itemName}</td>
        <td className='flex items-center justify-center'>
          <div title={title} className={`w-4 h-4 ${status} mr-2 rounded-full`}></div>
        </td>
        <td className="flex gap-x-3 justify-center items-center">
          <Link title='View Service' to={`/admin/view-service-details/${ID}`}>
            <i className="fa-regular fa-eye"></i>
          </Link>
          <i title='Delete' onClick={e=>deleteService(ID, itemName)} className="fa-regular fa-trash-can text-red-600"></i>
        </td>
    </tr>
  )
}

import React, { useContext, useEffect } from 'react'

// Admin Context
import AdminContext from '../../../context/AdminContext'

export default function PriceTableRow({ values, setShowUpdateProduct, setShowAddProduct, setProductId }) {
  const { Host, AuthToken, Authorize } = useContext(AdminContext)

  // Delete Product
  const deleteProduct = (id, product) => {
    var c = window.confirm(`Deleting product  " ${product} "  with  " ${id} "\nAre you sure?`)

    if(c) {
      // Delete Product
      fetch(Host + 'delete-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: AuthToken
        },
        body: JSON.stringify({ id })
      }) 
      .then(res => res.json())
      .then(data => {
        window.alert(data.msg)
        window.location.reload()
      }).catch(err => console.log('Error (Price List) : ', err))
    }
  }

  // Update Product
  const updateProduct = (id) => {
    setProductId(id)
    setShowAddProduct(false)
    setShowUpdateProduct(true)
  }

  useEffect(() => {
    Authorize()
  }, [])
  
  return (
    <tr className="gap-x-3 justify-center items-center">
        <td>{values.productId ? values.productId : values.ID}</td>
        <td style={{textTransform: 'capitalize'}}>{values.product}</td>
        <td>{values.rlp}</td>
        <td>{values.mrp}</td>
        <td className="flex gap-x-3 justify-center items-center">
          <i onClick={e => updateProduct(values.ID)} title="Update Product" className="fa-regular fa-pen-to-square text-yellow-500"></i>
          <i onClick={e => deleteProduct(values.ID, values.product)} title="Delete Product" className="fa-regular fa-trash-can text-red-600"></i>
        </td>
    </tr>
  )
}

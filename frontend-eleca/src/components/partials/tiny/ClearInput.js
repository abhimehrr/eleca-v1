import React from 'react'

export default function ClearInput({ resetValue, position, color }) {

    return <i onClick={()=>resetValue('')} className={`fa-solid fa-xmark text-xl font-bold cursor-pointer hover:text-red-500 absolute ${position[0]} ${position[1]} ${color} transition-all rounded`}></i>
}

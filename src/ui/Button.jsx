
import React from 'react'

export default function Button({btnText,onClick}) {
  return (
    <>
     <button className='bg-black hover:bg-black/80 text-white p-2 px-4 rounded  mt-2' onClick={onClick}>{btnText}</button> 
    </>
  )
}


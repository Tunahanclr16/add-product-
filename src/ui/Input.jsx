import React from 'react'

export default function Input({type, value, onChange, id,placeholder,name}) {
  return (
    <div>
      <input className='h-10 w-full border rounded-md p-2 outline-none mt-3' type={type} value={value} placeholder={placeholder} id={id} name={name} onChange={onChange} />
    </div>
  )
}

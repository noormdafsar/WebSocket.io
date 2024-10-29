import React from 'react'

const Input = ({ placeholder, name, value, onChange }) => {
  return (
    <div>
        <input className='input-field' name = {name} placeholder={placeholder}
         value={value} onChange={onChange} />
    </div>
  )
}

export default Input

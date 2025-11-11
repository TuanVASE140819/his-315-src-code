import React from 'react'

const LayoutDefault = ({ Component }) => {
  return (
    <div className='p-2 bg-[#EFEFEF] h-full'>
      <div className='bg-white shadow-2xl rounded-md border h-full'>
        {Component}
      </div>
    </div>
  )
}

export default LayoutDefault

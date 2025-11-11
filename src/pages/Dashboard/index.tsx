import React from 'react'
import srcLogo from '../../assets/images/logo/logo11.png'

const Dashboard = () => {
  return (
    <div className='p-2 bg-[#EFEFEF] h-full'>
      <div className='rounded-md p-2 h-full flex flex-col items-center pt-32 '>
        {/* shadow-2xl bg-white */}
        <div className='flex justify-center'>
          <img src={srcLogo} className='w-72 h-72 img-outline-2'></img>
        </div>
        <div className='flex flex-col justify-center text-amber-500 font-bold font-sans text-center'>
          <p className='leading-10 text-[2.5rem] font-outline-2 mt-5'>
            Bệnh viện Sản 315 - Admin
          </p>
          <p className='leading-10 text-[1.8rem] font-outline-1'>
            Hệ thống quản lý bệnh viện
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

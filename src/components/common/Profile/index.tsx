import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../redux/store/hooks'

const Profile = () => {
  const infoUser = useAppSelector((state: any) => state.User?.infoUser)

  if (!infoUser) {
    return (
      <div className='flex items-center'>
        <Avatar icon={<UserOutlined />} size='large' />
      </div>
    )
  }

  return (
    <div className='flex items-center'>
      <Avatar icon={<UserOutlined />} size='large' />
      <div className='text-start flex flex-col  ml-2 justify-center  text-black  text-sm'>
        <p className='font-semibold'>{infoUser.fullName}</p>
        <span className='text-gray-400'>{infoUser.email}</span>
      </div>
    </div>
  )
}

export default Profile

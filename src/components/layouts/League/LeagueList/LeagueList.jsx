import React from 'react'
import { Avatar, Checkbox } from 'antd'
import { TrophyOutlined, EditOutlined } from '@ant-design/icons'

const LeagueList = ({ list }) => {
  return (
    <ul className='flex flex-col gap-2 mt-2 border rounded-md p-2 h-[45.7rem] overflow-auto'>
      {list?.map((item) => (
        <li className='hover:bg-sky-100 transition-all duration-300 border rounded-md p-2 flex gap-2 cursor-pointer'>
          <Avatar
            shape='square'
            icon={<TrophyOutlined className='text-2xl' />}
            className='bg-amber-500 bg-opacity-70 w-12 h-12'
          />
          <div className='w-full grid content-between'>
            <div className='flex justify-between items-center'>
              <div className='font-medium text-gray-600 leading-4'>
                Giải {item}
              </div>
              <EditOutlined className='text-lg text-green-500 hover:text-green-700 transition-all duration-300' />
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xs text-gray-500 italic'>Bóng đá</div>
              <Checkbox className='w-4 h-4' />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default LeagueList

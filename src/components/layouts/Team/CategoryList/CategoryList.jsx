import React from 'react'
import { Avatar, Checkbox } from 'antd'
import { BarsOutlined, EditOutlined } from '@ant-design/icons'

const CategoryList = ({ list }) => {
  return (
    <ul className='flex flex-col gap-2 mt-2 border rounded-md p-2 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {list?.map((item, index) => (
        <li
          key={index}
          className='bg-white hover:bg-sky-50 transition-all duration-300 border rounded-md p-2 flex gap-2 cursor-pointer'
        >
          <Avatar
            shape='square'
            size={30}
            icon={<BarsOutlined className='text-lg' />}
            className='bg-amber-500 bg-opacity-70'
          />
          <div className='w-full flex justify-start items-center gap-2'>
            <div className='font-medium text-gray-600 leading-4'>
              Giải {item}
            </div>
            <Checkbox className='w-4 h-4 ml-auto' />
            <EditOutlined className='text-lg text-green-500 hover:text-green-700 transition-all duration-300' />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList

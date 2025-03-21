import React from 'react'
import { Avatar, Checkbox, Popconfirm, Empty } from 'antd'
import { FileImageOutlined, EditOutlined } from '@ant-design/icons'

const TeamList = ({ list, onClickEdit, handleSubmit }) => {
  return (
    <ul className='flex flex-col gap-2 mt-2 border rounded-md p-2 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!list?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      {list?.map((item, index) => (
        <li
          key={index}
          className='bg-white hover:bg-slate-100 transition-all duration-300 border rounded-md p-2 flex gap-2 cursor-pointer'
        >
          <Avatar
            shape='square'
            size={30}
            icon={
              item?.imageUrl ? (
                <img src={item?.imageUrl} />
              ) : (
                <FileImageOutlined className='text-lg' />
              )
            }
            className='bg-amber-500 bg-opacity-70'
          />

          <div className='w-full flex justify-start items-center gap-2'>
            <div className='font-medium text-gray-600 leading-4'>
              {item?.name}
            </div>
            <Popconfirm
              placement='topRight'
              title='Thay đổi sử dụng'
              description={
                <p>
                  Bạn thực sự muốn
                  <span className='font-medium'>
                    &nbsp;{item?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'}&nbsp;-&nbsp;
                    {item?.name}?
                  </span>
                </p>
              }
              onConfirm={() => handleSubmit(item)}
              okText='Xác nhận'
              cancelText='Hủy bỏ'
              className='ml-auto'
            >
              <Checkbox checked={item?.isActive} />
            </Popconfirm>
            <EditOutlined
              onClick={() => onClickEdit(item)}
              className='text-lg text-green-500 hover:text-green-700 transition-all duration-300'
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TeamList

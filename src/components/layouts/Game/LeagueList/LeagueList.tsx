import React from 'react'
import { Avatar, Checkbox, Popconfirm, Empty } from 'antd'
import { TrophyOutlined, EditOutlined } from '@ant-design/icons'

const LeagueList = ({
  list,
  itemSelected,
  onClickItem,
  onClickEdit,
  handleSubmit,
}) => {
  const safeList = Array.isArray(list) ? list : []

  return (
    <ul className='flex flex-col gap-2 mt-2 border rounded-md p-2 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!safeList?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      {safeList?.map((item, index) => (
        <li
          key={index}
          onClick={() => onClickItem(item)}
          className={`${itemSelected?.id && itemSelected?.id === item?.id ? 'bg-pink-100' : 'bg-white'} hover:bg-slate-100 transition-all duration-300 border rounded-md shadow-md p-2 flex gap-2 cursor-pointer`}
        >
          <Avatar
            shape='square'
            icon={<TrophyOutlined className='text-2xl' />}
            className='bg-amber-500 bg-opacity-70 w-[56.35px] h-[48px]'
          />
          <div className='w-full grid content-between'>
            <div className='flex justify-between items-center'>
              <div className='font-medium text-gray-600 leading-4'>
                {item?.name}
              </div>
              <EditOutlined
                onClick={() => onClickEdit(item)}
                className='text-lg text-green-500 hover:text-green-700 transition-all duration-300'
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xs text-gray-500 italic'>
                {item?.categoryName}
              </div>
              <Popconfirm
                placement='topRight'
                title='Thay đổi sử dụng'
                description={
                  <p>
                    Bạn thực sự muốn
                    <span className='font-medium'>
                      &nbsp;{item?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'}
                      &nbsp;-&nbsp;
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
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default LeagueList

import React from 'react'
import { Avatar, Checkbox, Popconfirm, Empty } from 'antd'
import { EditOutlined, FileImageOutlined } from '@ant-design/icons'

const GameList = ({ list }) => {
  return (
    <ul className='flex flex-col gap-4 mt-2 border rounded-md p-4 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!list?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      {list?.map((item, index) => (
        <li
          key={index}
          className={`bg-white hover:bg-slate-100 transition-all duration-300 border shadow-md rounded-md p-3`}
        >
          <div className='w-full flex justify-start items-center gap-2'>
            <div className='text-base font-medium text-gray-700'>
              Ngoại hạng Anh: Manchester United vs Newcastle
            </div>
            <div className='text-gray-500'>17:00 21/03/2025</div>
            <Popconfirm
              placement='topRight'
              title='Thay đổi sử dụng'
              description={
                <p>
                  Bạn thực sự muốn
                  <span className='font-medium'>
                    {/* &nbsp;{item?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'} */}
                    &nbsp;-&nbsp;
                    {/* {item?.name}? */}
                  </span>
                </p>
              }
              // onConfirm={() => handleSubmit(item)}
              okText='Xác nhận'
              cancelText='Hủy bỏ'
              className='ml-auto'
            >
              <Checkbox
              // checked={item?.isActive}
              />
            </Popconfirm>
            <EditOutlined
              // onClick={() => onClickEdit(item)}
              className='text-lg text-green-500 hover:text-green-700 transition-all duration-300 cursor-pointer'
            />
          </div>
          <ul className='w-full mt-2 flex flex-wrap justify-start gap-2'>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <li
                key={index}
                className='min-[1900px]:w-[32.88%] w-[32.5%] border rounded-md p-2 bg-[#fafafa] flex gap-2'
              >
                <Avatar
                  shape='square'
                  size={30}
                  icon={<FileImageOutlined className='text-lg' />}
                  className='bg-amber-500 bg-opacity-70'
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default GameList

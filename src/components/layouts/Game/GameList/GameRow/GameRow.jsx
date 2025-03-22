import React from 'react'
import { Avatar, Checkbox, Popconfirm, Button, Tag } from 'antd'
import {
  EditOutlined,
  FileImageOutlined,
  CrownOutlined,
  ClockCircleOutlined,
  CrownTwoTone,
} from '@ant-design/icons'

const GameRow = ({ item }) => {
  return (
    <li className='bg-white hover:bg-slate-50 transition-all duration-300 border shadow-md rounded-md p-3'>
      <div className='w-full flex justify-start items-center gap-2'>
        <div className='text-base font-medium text-gray-700'>
          Ngoại hạng Anh: Manchester United vs Newcastle
        </div>
        <Tag className='m-0 p-0 px-1.5 flex justify-start items-center gap-1'>
          <ClockCircleOutlined />
          17:00 21/03/2025
        </Tag>
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
      <ul className='w-full mt-2 flex flex-wrap justify-start gap-3'>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <li
            key={index}
            className='min-[1900px]:w-[32.65%] w-[32.3%] border rounded-md p-2 bg-[#fff] flex gap-2'
          >
            <Avatar
              shape='square'
              icon={<FileImageOutlined className='text-lg' />}
              className='bg-amber-500 bg-opacity-70 w-[50.6px] h-[40px]'
            />
            <div className='w-full flex flex-col text-sm'>
              <div className='font-medium text-gray-700'>Newcastle thắng</div>
              <div className='text-gray-500'>x1.5 số points</div>
            </div>
            <div className='w-8 flex items-center'>
              {false ? (
                <CrownTwoTone className='text-lg' twoToneColor='#f59e0b' />
              ) : (
                <div>
                  <Popconfirm
                    placement='topRight'
                    title='Trả kết quả trận đấu'
                    description={
                      <>
                        <p>
                          Bạn thực sự muốn trả kết quả
                          <span className='font-medium'>
                            {/* &nbsp;{item?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'} */}
                            &nbsp;Newcastle thắng&nbsp;
                            {/* {item?.name}? */}
                          </span>
                        </p>
                        <p className='italic text-xs text-red-500'>
                          *Thao tác này không thể hoàn tác, vui lòng cân nhắc kỹ
                        </p>
                      </>
                    }
                    // onConfirm={() => handleSubmit(item)}
                    okText='Xác nhận'
                    cancelText='Hủy bỏ'
                    className='ml-auto'
                  >
                    <style>
                      {`.custom-btn:hover{
                        --tw-border-opacity: 1 !important;
                        border-color: rgb(209 213 219 / var(--tw-border-opacity, 1)) /* #d1d5db */ !important;
                        --tw-text-opacity: 1 !important;
                        color: rgb(245 158 11 / var(--tw-text-opacity, 1)) /* #f59e0b */ !important;
                    }`}
                    </style>
                    <Button
                      // shape='circle'
                      type='text'
                      icon={<CrownOutlined />}
                      className='border border-gray-200 text-gray-600 custom-btn'
                    />
                  </Popconfirm>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default GameRow

import React from 'react'
import { Avatar, Input, DatePicker, Popover, Button, Select } from 'antd'
import {
  FileImageOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import dayjs from 'dayjs'

const dateView = 'HH:mm - DD/MM/YYYY'

const AddGameRow = () => {
  return (
    <li className='bg-white hover:bg-slate-50 transition-all duration-300 border shadow-md rounded-md p-3'>
      <div className='w-full grid grid-cols-3 items-center'>
        <div className='col-span-2 pr-1.5'>
          <Input
            size='small'
            allowClear
            placeholder='Nhập tiêu đề trận đấu...'
            className='font-medium text-gray-700'
          />
        </div>
        <div className='pl-1.5 flex justify-between items-center'>
          <DatePicker
            showTime
            size='small'
            className='w-1/2'
            allowClear
            needConfirm={false}
            placeholder='Chọn thời điểm diễn ra...'
            format={dateView}
            panelRender={(panel) => (
              <div className='custom-datepanel'>
                <style>
                  {`.custom-datepanel .ant-picker-datetime-panel {
                      flex-direction: row-reverse !important;
                    }
                    .custom-datepanel .ant-picker-datetime-panel .ant-picker-time-panel .ant-picker-content {
                      border-left: 0px solid rgb(229, 231, 235) !important;
                      border-right: 1px solid rgba(5, 5, 5, 0.06) !important;
                    }`}
                </style>
                {panel}
              </div>
            )}
          />
          <DeleteOutlined className='text-lg text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer' />
        </div>
      </div>
      <ul className='w-full mt-3 flex flex-wrap justify-start gap-3'>
        {[1, 2, 3, 4].map((item, index) => (
          <li
            key={index}
            className='min-[1900px]:w-[32.65%] w-[32.3%] border rounded-md p-2 bg-[#fff] flex gap-2'
          >
            <Avatar
              shape='square'
              icon={<FileImageOutlined className='text-lg' />}
              className='bg-amber-500 bg-opacity-70 w-[50.6px] h-[40px]'
            />
            <div className='w-full flex flex-col text-sm gap-[1.5px]'>
              <Input
                size='small'
                allowClear
                placeholder='Nhập kết quả trận đấu...'
                className='font-medium text-gray-700'
                style={{ fontSize: '11px' }}
              />
              <Input
                size='small'
                allowClear
                placeholder='Nhập tỷ lệ thưởng...'
                className='text-gray-500'
                style={{ fontSize: '11px' }}
                prefix='x'
                suffix='số points'
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Popover
                trigger='click'
                placement='topRight'
                title='Đội thi đấu'
                content={<Select allowClear size='small' className='w-full' />}
              >
                <CopyOutlined className='text-lg text-blue-500 hover:text-blue-700 transition-all duration-300 cursor-pointer' />
              </Popover>
              <DeleteOutlined className='text-lg text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer' />
            </div>
          </li>
        ))}
        <li
          key={'add'}
          className='min-[1900px]:w-[32.65%] w-[32.3%] border border-dashed hover:border-blue-500 text-gray-600 hover:text-blue-500 hover:bg-sky-50 rounded-md p-2 bg-[#fff] flex justify-center items-center gap-2'
        >
          <PlusOutlined className='text-base' />
        </li>
      </ul>
    </li>
  )
}

export default AddGameRow

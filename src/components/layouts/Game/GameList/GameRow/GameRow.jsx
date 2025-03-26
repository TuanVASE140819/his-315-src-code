import React, { useMemo } from 'react'
import { Avatar, Checkbox, Popconfirm, Button, Tag } from 'antd'
import {
  EditOutlined,
  FileImageOutlined,
  CrownOutlined,
  ClockCircleOutlined,
  CrownTwoTone,
} from '@ant-design/icons'
import moment from 'moment'

const GameRow = ({
  info,
  onClickEdit,
  handleToggleActive,
  handleMatchResult,
}) => {
  const isDone = useMemo(
    () => (info?.status === 'Done' ? true : false),
    [info?.status],
  )
  const isLive = useMemo(
    () =>
      info?.startTime && moment().isAfter(moment(info?.startTime))
        ? true
        : false,
    [info?.startTime, moment],
  )
  return (
    <li className='bg-white hover:bg-slate-50 transition-all duration-300 border shadow-md rounded-md p-3'>
      <div className='w-full flex justify-start items-center gap-2'>
        <div className='text-base font-medium text-gray-700'>
          {info?.description}
        </div>
        <Tag
          color={isDone ? 'blue' : isLive ? 'red' : ''}
          className='m-0 p-0 px-1.5 flex justify-start items-center gap-1'
        >
          <ClockCircleOutlined />
          {moment(info?.startTime).format('HH:mm - DD/MM/YYYY')}&nbsp;
          {isDone ? '(Đã trả kết quả)' : isLive ? '(Chờ trả kết quả)' : ''}
        </Tag>
        <Popconfirm
          placement='topRight'
          title='Thay đổi sử dụng'
          description={
            <p>
              Bạn thực sự muốn
              <span className='font-medium'>
                &nbsp;{info?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'}
                &nbsp;-&nbsp;
                {info?.description}?
              </span>
            </p>
          }
          onConfirm={() => handleToggleActive(info)}
          okText='Xác nhận'
          cancelText='Hủy bỏ'
          className='ml-auto'
        >
          <Checkbox checked={info?.isActive} />
        </Popconfirm>
        <EditOutlined
          onClick={() => onClickEdit(info)}
          className={`text-lg ${isDone ? 'text-gray-500 hover:text-gray-700' : 'text-green-500 hover:text-green-700'}  transition-all duration-300 cursor-pointer`}
        />
      </div>
      <ul className='w-full mt-2 flex flex-wrap justify-start gap-3'>
        {info?.gameItems?.map((item, index) => {
          const isWin = isDone && item?.isWin ? true : false
          return (
            <li
              key={index}
              className={`min-[1900px]:w-[32.65%] w-[32.3%] border ${isWin ? 'border-amber-500 bg-amber-50 bg-opacity-70' : 'bg-[#fff]'} rounded-md p-2 flex gap-2`}
            >
              <Avatar
                key={item?.imageUrl}
                shape='square'
                className='bg-amber-500 bg-opacity-70 w-[50.6px] h-[40px]'
                icon={
                  item?.imageUrl ? (
                    <img src={item?.imageUrl} />
                  ) : (
                    <FileImageOutlined className='text-lg' />
                  )
                }
              />
              <div className='w-full flex flex-col text-sm'>
                <div className={`font-medium text-gray-700`}>{item?.name}</div>
                <div className='text-gray-500'>
                  x{item?.odds}&nbsp;số points
                </div>
              </div>
              <div className='w-8 flex items-center'>
                {isWin && (
                  <CrownTwoTone className='text-lg' twoToneColor='#f59e0b' />
                )}
                {!isDone && isLive && (
                  <div>
                    <Popconfirm
                      placement='topRight'
                      title='Trả kết quả trận đấu'
                      description={
                        <>
                          <p>
                            Bạn thực sự muốn trả kết quả
                            <span className='font-medium'>
                              &nbsp;{item?.name}&nbsp;
                            </span>
                          </p>
                          <p className='italic text-xs text-red-500'>
                            *Thao tác này không thể hoàn tác, vui lòng cân nhắc
                            kỹ
                          </p>
                        </>
                      }
                      onConfirm={() => handleMatchResult(info, item)}
                      okText='Xác nhận'
                      cancelText='Hủy bỏ'
                      className='ml-auto'
                    >
                      <style>
                        {`.custom-btn:hover{
                          --tw-border-opacity: 1 !important;
                          border-color: rgb(245 158 11 / var(--tw-text-opacity, 1)) /* #f59e0b */ !important;
                          --tw-text-opacity: 1 !important;
                          color: rgb(245 158 11 / var(--tw-text-opacity, 1)) /* #f59e0b */ !important;
                      }`}
                      </style>
                      <Button
                        // shape='circle'
                        // type='text' rgb(209 213 219 / var(--tw-border-opacity, 1)) /* #d1d5db */ !important;
                        icon={<CrownOutlined />}
                        className='border border-gray-200 text-gray-600 custom-btn'
                      />
                    </Popconfirm>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default GameRow

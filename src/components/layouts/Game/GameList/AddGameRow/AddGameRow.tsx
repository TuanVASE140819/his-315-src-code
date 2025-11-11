import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Input, DatePicker, Popover, Select } from 'antd'
import {
  FileImageOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/vi_VN'
import 'moment/locale/vi'
import 'dayjs/locale/vi'
moment.locale('vi')

const dateView = 'HH:mm - DD/MM/YYYY'
const dateMoment = 'YYYY-MM-DDTHH:mm:00'

const AddGameRow = ({ info, setlistAdd }) => {
  const { listTeam } = useSelector((state) => state.Common)
  const valueDate = useMemo(
    () => (info?.startTime ? dayjs(info?.startTime, dateMoment) : null),
    [info?.startTime],
  )

  const onClickDeleteGame = () => {
    setlistAdd((prev) => prev?.filter((item, index) => index !== info?.index))
  }
  const onChangeDescription = (e) => {
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const editedItem = { ...item, description: e.target.value }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onChangeStartTime = (date, dateString) => {
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const editedItem = {
          ...item,
          startTime: dateString
            ? moment(dateString, dateView).format(dateMoment)
            : null,
        }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onClickAddGameItem = () => {
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const newGameItem = {
          imageUrl: null,
          name: null,
          odds: null,
          teamId: null,
        }
        const editedItem = {
          ...item,
          gameItems: [...item?.gameItems, newGameItem],
        }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onClickDeleteGameItem = (idx) => {
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const editedItem = {
          ...item,
          gameItems: item?.gameItems?.filter((itemGI, idxGI) => idxGI !== idx),
        }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onChangeNameGameItem = (value, idx) => {
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const editedGameItem = item?.gameItems?.map((itemGI, idxGI) => {
          const editedItemGI = { ...itemGI, name: value, teamId: null }
          return idxGI === idx ? editedItemGI : itemGI
        })
        const editedItem = {
          ...item,
          gameItems: editedGameItem,
        }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onChangeOddsGameItem = (value, idx) => {
    const newValue = value?.replaceAll(',', '.')?.replace(/[^0-9.]/g, '')
    setlistAdd((prev) =>
      prev?.map((item, index) => {
        const editedGameItem = item?.gameItems?.map((itemGI, idxGI) => {
          const editedItemGI = {
            ...itemGI,
            odds:
              (newValue >= 0 && newValue <= 5) || !newValue
                ? newValue
                : itemGI?.odds,
          }
          return idxGI === idx ? editedItemGI : itemGI
        })
        const editedItem = {
          ...item,
          gameItems: editedGameItem,
        }
        return index === info?.index ? editedItem : item
      }),
    )
  }
  const onChangeTeamIdGameItem = async (value, opt, idx) => {
    const newImageUrlGI = opt?.info?.imageUrl
    const newNameGI = opt?.info?.name ? `${opt?.info?.name ?? ''} thắng` : null
    await setlistAdd((prev) => {
      const newList = prev?.map((item, index) => {
        const editedGameItem = item?.gameItems?.map((itemGI, idxGI) => {
          const editedItemGI = {
            ...itemGI,
            imageUrl: newImageUrlGI,
            name: newNameGI,
            teamId: value,
          }
          return idxGI === idx ? editedItemGI : itemGI
        })
        const editedItem = {
          ...item,
          gameItems: editedGameItem,
        }
        return index === info?.index ? editedItem : item
      })
      return newList
    })
  }
  return (
    <li className='bg-white hover:bg-slate-50 transition-all duration-300 border shadow-md rounded-md p-3'>
      <div className='w-full grid grid-cols-3 items-center'>
        <div className='col-span-2 pr-1.5'>
          <Input
            size='small'
            allowClear
            placeholder='Nhập tiêu đề trận đấu...'
            className='font-medium text-gray-700'
            value={info?.description}
            status={!info?.description ? 'error' : ''}
            onChange={onChangeDescription}
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
            locale={{ ...locale, week: { start: 1 } }}
            format={dateView}
            value={valueDate}
            status={!valueDate ? 'error' : ''}
            onChange={onChangeStartTime}
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
          <DeleteOutlined
            className='text-lg text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer'
            onClick={onClickDeleteGame}
          />
        </div>
      </div>
      <ul className='w-full mt-3 flex flex-wrap justify-start gap-3'>
        {info?.gameItems?.map((item, index) => (
          <li
            key={index}
            className='min-[1900px]:w-[32.65%] w-[32.3%] border rounded-md p-2 bg-[#fff] flex gap-2'
          >
            <Avatar
              key={item?.imageUrl}
              shape='square'
              className='bg-amber-500 bg-opacity-70 w-[50.6px] h-[40px]'
              icon={
                item?.imageUrl ? (
                  <img
                    src={item?.imageUrl}
                    // src='https://dl.dropboxusercontent.com/scl/fi/rd8f8wquibc0mr8n593bw/Bournemouth8885955555?rlkey=61w2qtrlryagdr1dqg05gu7lf&raw=1'
                  />
                ) : (
                  <FileImageOutlined className='text-lg' />
                )
              }
            />
            <div className='w-full flex flex-col text-sm gap-[1.5px]'>
              <Input
                size='small'
                allowClear
                placeholder='Nhập kết quả trận đấu...'
                className='font-medium text-gray-700'
                style={{ fontSize: '11px' }}
                value={item?.name}
                status={!item?.name ? 'error' : ''}
                onChange={(e) => onChangeNameGameItem(e.target.value, index)}
              />
              <Input
                size='small'
                allowClear
                placeholder='Nhập tỷ lệ thưởng...'
                className='text-gray-500'
                style={{ fontSize: '11px' }}
                prefix='x'
                suffix='số points'
                value={item?.odds}
                status={!item?.odds && item?.odds !== 0 ? 'error' : ''}
                onChange={(e) => onChangeOddsGameItem(e.target.value, index)}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <Popover
                trigger='click'
                placement='topRight'
                title={<div className='w-80'>Đội thi đấu</div>}
                content={
                  <Select
                    allowClear
                    size='small'
                    className='w-full'
                    showSearch
                    placeholder=''
                    filterOption={(input, option) =>
                      `${option?.label ?? ''}`
                        ?.toLowerCase()
                        ?.includes(`${input ?? ''}`?.toLowerCase())
                    }
                    value={item?.teamId}
                    onChange={(value, opt) =>
                      onChangeTeamIdGameItem(value, opt, index)
                    }
                    options={listTeam?.map((item) => ({
                      key: item?.id,
                      value: item?.id,
                      label: item?.name,
                      info: item,
                    }))}
                  />
                }
              >
                <CopyOutlined className='text-lg text-[#E97195] hover:text-[#C3215F] transition-all duration-300 cursor-pointer' />
              </Popover>
              <DeleteOutlined
                className='text-lg text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer'
                onClick={() => onClickDeleteGameItem(index)}
              />
            </div>
          </li>
        ))}
        <li
          key={'add'}
          className={`min-[1900px]:w-[32.65%] w-[32.3%] h-[58.0625px] border border-dashed ${!info?.gameItems?.length ? 'border-red-500 text-red-500 bg-red-50 bg-opacity-30' : ''} hover:border-[#E97195] text-gray-600 hover:text-[#E97195] hover:bg-pink-50 rounded-md p-2 bg-[#fff] flex justify-center items-center gap-2 cursor-pointer`}
          onClick={onClickAddGameItem}
        >
          <PlusOutlined className='text-base' />
        </li>
      </ul>
    </li>
  )
}

export default AddGameRow

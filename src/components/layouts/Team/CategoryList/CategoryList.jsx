import React from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Checkbox, Popconfirm } from 'antd'
import { BarsOutlined, EditOutlined } from '@ant-design/icons'
import { putActiveCategoryAction } from '../../../../redux/actions/categoryActions'

const CategoryList = ({ list, itemSelected, onClickItem, onClickEdit }) => {
  const dispatch = useDispatch()
  const handleSubmit = (info) => {
    dispatch(putActiveCategoryAction(info))
  }

  return (
    <ul className='flex flex-col gap-2 mt-2 border rounded-md p-2 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {list?.map((item, index) => (
        <li
          key={index}
          onClick={() => onClickItem(item)}
          className={`${itemSelected?.id === item?.id ? 'bg-sky-100' : 'bg-white'} hover:bg-slate-100 transition-all duration-300 border rounded-md p-2 flex gap-2 cursor-pointer`}
        >
          <Avatar
            shape='square'
            size={30}
            icon={<BarsOutlined className='text-lg' />}
            className='bg-amber-500 bg-opacity-70'
          />
          <div className='w-full flex justify-start items-center gap-2'>
            <div className='font-medium text-gray-600 leading-4'>
              {item?.name}
            </div>
            <div className='w-4 h-4 ml-auto'>
              <Popconfirm
                placement='topRight'
                title='Thay đổi sử dụng'
                description={
                  <p>
                    Bạn thực sự muốn
                    <span className='font-medium'>
                      &nbsp;{item?.isActive ? 'NGỪNG SỬ DỤNG' : 'SỬ DỤNG'} -{' '}
                      {item?.name}?
                    </span>
                  </p>
                }
                onConfirm={() => handleSubmit(item)}
                okText='Xác nhận'
                cancelText='Hủy bỏ'
              >
                <Checkbox checked={item?.isActive} />
              </Popconfirm>
            </div>
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

export default CategoryList

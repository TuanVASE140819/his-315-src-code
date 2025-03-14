import React, { useState } from 'react'
import { Button, Input, Divider, Spin } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import CategoryList from './CategoryList/CategoryList'

const Team = () => {
  const [searchCategory, setsearchCategory] = useState(null)
  const [isLoadingCategory, setisLoadingCategory] = useState(false)
  const onChangeSearchCategory = (e) => {
    setsearchCategory(e.target.value)
  }
  const onClickSearchCategory = () => {
    const keyword = `${searchCategory ?? ''}`?.trim()
    setsearchCategory(keyword)
    getListCategory(keyword)
  }
  const getListCategory = (kw) => {
    try {
      setisLoadingCategory(true)
      console.log(kw)
    } catch (error) {
      console.log('getListCategory : ', error)
    } finally {
      setisLoadingCategory(false)
    }
  }

  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='h-full border-e p-2'>
        <div className='flex justify-between items-center'>
          <div className='font-medium text-xl text-gray-500'>Bộ môn</div>
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
        <Divider style={{ margin: '0.5rem 0', padding: 0 }} />

        <div className='flex justify-between items-center gap-2'>
          <Input
            className='w-full'
            placeholder='Nhập từ khóa...'
            allowClear
            value={searchCategory}
            onChange={onChangeSearchCategory}
          />
          {/* <div className='flex justify-between items-center gap-2 w-full'>
          </div> */}
          <Button
            type='primary'
            icon={<SyncOutlined />}
            className='w-8'
            onClick={onClickSearchCategory}
          />
        </div>
        <Spin spinning={isLoadingCategory}>
          <CategoryList
            list={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            ]}
          />
        </Spin>
      </div>
      <div className='h-full col-span-3 p-2'>
        <div className='flex justify-between items-center'>
          <div className='font-medium text-xl text-gray-500'>Đội thi đấu</div>
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
        <Divider style={{ margin: '0.5rem 0', padding: 0 }} />
      </div>
    </div>
  )
}

export default Team

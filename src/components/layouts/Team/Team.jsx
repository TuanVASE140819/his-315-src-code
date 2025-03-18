import React, { useState, useEffect } from 'react'
import { Button, Input, Divider, Spin } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { categoryServices } from '../../../redux/services/categoryServices'
import CategoryList from './CategoryList/CategoryList'
import CategoryModal from './CategoryModal/CategoryModal'

const Team = () => {
  const [searchCategory, setsearchCategory] = useState('')
  const [isModalCategory, setisModalCategory] = useState(false)
  const [isLoadingCategory, setisLoadingCategory] = useState(false)
  const [listCategory, setlistCategory] = useState([])
  const [isLoadingInfoCategory, setisLoadingInfoCategory] = useState(false)
  const [infoCategory, setinfoCategory] = useState(null)
  const [itemSelectedCategory, setitemSelectedCategory] = useState(null)

  const handleOpenModalCategory = () => {
    setisModalCategory(true)
  }
  const handleCloseModalCategory = () => {
    setisModalCategory(false)
  }
  const onClickAddCategory = () => {
    setinfoCategory(null)
    handleOpenModalCategory()
  }
  const onClickEditCategory = (info) => {
    const { id } = info
    getInfoCategory(id)
    handleOpenModalCategory()
  }
  const onChangeSearchCategory = (e) => {
    setsearchCategory(e.target.value)
  }
  const onClickSearchCategory = () => {
    const keyword = `${searchCategory ?? ''}`?.trim()
    setsearchCategory(keyword)
    getListCategory(keyword)
  }
  const onLoadCategory = () => {
    getListCategory(searchCategory)
  }
  const onClickItemCategory = (info) => {
    setitemSelectedCategory(info)
  }
  const getListCategory = async (kw) => {
    try {
      setisLoadingCategory(true)
      const { data } = await categoryServices.getListCategorySearch(kw)
      setlistCategory(data)
    } catch (error) {
      console.log('getListCategory : ', error)
    } finally {
      setisLoadingCategory(false)
    }
  }
  const getInfoCategory = async (id) => {
    try {
      setisLoadingInfoCategory(true)
      const { data } = await categoryServices.getInfoCategoryById(id)
      setinfoCategory(data)
    } catch (error) {
      console.log('getListCategory : ', error)
    } finally {
      setisLoadingInfoCategory(false)
    }
  }
  useEffect(() => {
    onLoadCategory()
  }, [])
  return (
    <>
      <div className='grid grid-cols-4 h-full'>
        <div className='h-full border-e p-2'>
          <div className='flex justify-between items-center'>
            <div className='font-medium text-xl text-gray-500'>Bộ môn</div>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={onClickAddCategory}
            >
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
            <Button
              loading={isLoadingCategory}
              type='primary'
              className='w-8'
              icon={<SyncOutlined />}
              onClick={onClickSearchCategory}
            />
          </div>
          <Spin spinning={isLoadingCategory}>
            <CategoryList
              list={listCategory}
              itemSelected={itemSelectedCategory}
              onClickItem={onClickItemCategory}
              onClickEdit={onClickEditCategory}
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
          <div className='flex justify-between items-center gap-2'>
            <Input
              className='w-full'
              placeholder='Nhập từ khóa...'
              allowClear
              value={searchCategory}
              onChange={onChangeSearchCategory}
            />
            <Button
              loading={isLoadingCategory}
              type='primary'
              className='w-8'
              icon={<SyncOutlined />}
              onClick={onClickSearchCategory}
            />
          </div>
          <Spin spinning={isLoadingCategory}>
            <CategoryList
              list={listCategory}
              itemSelected={itemSelectedCategory}
              onClickItem={onClickItemCategory}
              onClickEdit={onClickEditCategory}
            />
          </Spin>
        </div>
      </div>
      <CategoryModal
        open={isModalCategory}
        loading={isLoadingInfoCategory}
        infoEdit={infoCategory}
        handleClose={handleCloseModalCategory}
        onLoad={onLoadCategory}
      />
    </>
  )
}

export default Team

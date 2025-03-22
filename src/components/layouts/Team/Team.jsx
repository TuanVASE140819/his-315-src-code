import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input, Divider, Spin, Tag } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { categoryServices } from '../../../redux/services/categoryServices'
import { teamServices } from '../../../redux/services/teamServices'
import { putActiveCategoryAction } from '../../../redux/actions/categoryActions'
import { putActiveTeamAction } from '../../../redux/actions/teamActions'
import CategoryList from './CategoryList/CategoryList'
import CategoryModal from './CategoryModal/CategoryModal'
import TeamList from './TeamList/TeamList'
import TeamModal from './TeamModal/TeamModal'
import ToastCus from '../../common/Toast'

const Team = () => {
  const dispatch = useDispatch()
  const [searchCategory, setsearchCategory] = useState('')
  const [listCategory, setlistCategory] = useState([])
  const [infoCategory, setinfoCategory] = useState(null)
  const [itemSelectedCategory, setitemSelectedCategory] = useState(null)
  const [isModalCategory, setisModalCategory] = useState(false)
  const [isLoadingCategory, setisLoadingCategory] = useState(false)
  const [isLoadingInfoCategory, setisLoadingInfoCategory] = useState(false)

  const [searchTeam, setsearchTeam] = useState('')
  const [listTeam, setlistTeam] = useState([])
  const [infoTeam, setinfoTeam] = useState(null)
  const [isModalTeam, setisModalTeam] = useState(false)
  const [isLoadingTeam, setisLoadingTeam] = useState(false)
  const [isLoadingInfoTeam, setisLoadingInfoTeam] = useState(false)

  
//****************************** CATEGORY ****************************************//
  const handleSubmitActiveCategory = (info) => {
    dispatch(putActiveCategoryAction(info, onLoadCategory))
  }
  const errorToastCus = () => {
    ToastCus.fire({
      icon: 'error',
      title: 'Lấy dữ liệu thất bại',
    })
  }
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
    getInfoCategory(info?.id)
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
  const onLoadCategory = async () => {
    await getListCategory(searchCategory)
  }
  const onClickItemCategory = (info) => {
    if (isLoadingTeam) {
      return
      ToastCus.fire({
        icon: 'warning',
        title: 'Vui lòng đợi tải dữ liệu',
      })
    }
    setitemSelectedCategory(info)
    getListTeam(info?.id, searchTeam)
  }
  const getListCategory = async (kw) => {
    try {
      setisLoadingCategory(true)
      const { data } = await categoryServices.getListCategorySearch(kw)
      setlistCategory(data)
    } catch (error) {
      console.log('getListCategory : ', error)
      errorToastCus()
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
      handleCloseModalCategory()
      console.log('getInfoCategory : ', error)
      errorToastCus()
    } finally {
      setisLoadingInfoCategory(false)
    }
  }
  useEffect(() => {
    onLoadCategory()
  }, [])

//****************************** TEAM ****************************************// 
  const handleSubmitActiveTeam = (info) => {
    dispatch(putActiveTeamAction(info, onLoadTeam))
  }
  const handleOpenModalTeam = () => {
    setisModalTeam(true)
  }
  const handleCloseModalTeam = () => {
    setisModalTeam(false)
  }
  const onClickAddTeam = () => {
    if (!itemSelectedCategory) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Vui lòng chọn bộ môn',
      })
    }
    setinfoTeam(null)
    handleOpenModalTeam()
  }
  const onClickEditTeam = (info) => {
    getInfoTeam(info?.id)
    handleOpenModalTeam()
  }
  const onChangeSearchTeam = (e) => {
    setsearchTeam(e.target.value)
  }
  const onClickSearchTeam = () => {
    const keyword = `${searchTeam ?? ''}`?.trim()
    setsearchTeam(keyword)
    getListTeam(itemSelectedCategory?.id, keyword)
  }
  const onLoadTeam = async () => {
    await getListTeam(itemSelectedCategory?.id, searchTeam)
  }
  const getListTeam = async (ctId, kw) => {
    if (!ctId) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Vui lòng chọn bộ môn',
      })
    }
    try {
      setisLoadingTeam(true)
      const { data } = await teamServices.getListTeamSearch(ctId, kw)
      setlistTeam(data)
    } catch (error) {
      console.log('getListTeam : ', error)
      errorToastCus()
    } finally {
      setTimeout(() => {
        setisLoadingTeam(false)
      }, 500)
    }
  }
  const getInfoTeam = async (id) => {
    try {
      setisLoadingInfoTeam(true)
      const { data } = await teamServices.getInfoTeamById(id)
      setinfoTeam(data)
    } catch (error) {
      handleCloseModalTeam()
      console.log('getInfoTeam : ', error)
      errorToastCus()
    } finally {
      setisLoadingInfoTeam(false)
    }
  }
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
              handleSubmit={handleSubmitActiveCategory}
            />
          </Spin>
        </div>
        <div className='h-full col-span-3 p-2'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <div className='font-medium text-xl text-gray-500'>
                Đội thi đấu
              </div>

              <Tag
                color={itemSelectedCategory ? 'blue' : 'red'}
                className='m-0 p-0 px-2 flex items-center text-base'
              >
                {itemSelectedCategory
                  ? itemSelectedCategory?.name
                  : 'Chưa chọn bộ môn'}
              </Tag>
            </div>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={onClickAddTeam}
            >
              Thêm
            </Button>
          </div>
          <Divider style={{ margin: '0.5rem 0', padding: 0 }} />
          <div className='flex justify-start items-center gap-2'>
            <Input
              className='w-96'
              placeholder='Nhập từ khóa...'
              allowClear
              value={searchTeam}
              onChange={onChangeSearchTeam}
            />
            <Button
              loading={isLoadingTeam}
              type='primary'
              className='w-8'
              icon={<SyncOutlined />}
              onClick={onClickSearchTeam}
            />
          </div>
          <Spin spinning={isLoadingTeam}>
            <TeamList
              list={isLoadingTeam ? [] : listTeam}
              onClickEdit={onClickEditTeam}
              handleSubmit={handleSubmitActiveTeam}
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
      <TeamModal
        open={isModalTeam}
        loading={isLoadingInfoTeam}
        infoEdit={infoTeam}
        infoCategory={itemSelectedCategory}
        handleClose={handleCloseModalTeam}
        onLoad={onLoadTeam}
      />
    </>
  )
}

export default Team

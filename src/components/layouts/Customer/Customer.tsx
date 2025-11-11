import React, { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../redux/store/hooks'
import { Button, Input, Divider, Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { getListTransactionTypeAction } from '../../../redux/actions/commonActions'
import { putToggleActiveCustomerAction } from '../../../redux/actions/customerActions'
import { customerServices } from '../../../redux/services/customerServices'
import CustomerList from './CustomerList/CustomerList'
import CustomerModal from './CustomerModal/CustomerModal'
import ToastCus from '../../common/Toast'
const PAGE_SIZE = 50
const HEIGHT = 730

const Customer = () => {
  const dispatch = useAppDispatch()
  const [isModal, setisModal] = useState(false)
  const [searchText, setsearchText] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [customerList, setcustomerList] = useState([])
  const [pageInfo, setpageInfo] = useState(null)
  const [isLoadingInfo, setisLoadingInfo] = useState(false)
  const [customerInfo, setcustomerInfo] = useState(null)

  const errorToastCus = () => {
    ToastCus.fire({
      icon: 'error',
      title: 'Lấy dữ liệu thất bại',
    })
  }
  const handleOpenModal = () => {
    setisModal(true)
  }
  const handleCloseModal = () => {
    setisModal(false)
  }
  const handleReset = () => {
    setcustomerList([])
    setpageInfo(null)
  }
  const handleToggleActive = (info) => {
    dispatch(putToggleActiveCustomerAction(info, onLoad))
  }
  const onClickItem = (info) => {
    handleOpenModal()
    setcustomerInfo(info)
    // getInfoCustomer(id)
  }
  const onChangeSearch = (e) => {
    setsearchText(e.target.value)
  }
  const onClickSearch = () => {
    handleReset()
    const keyword = `${searchText ?? ''}`?.trim()
    setsearchText(keyword)
    getListCustomer(keyword, 1)
  }
  const onLoad = () => {
    getListCustomer(searchText, 1)
  }
  const onScrollList = (e) => {
    if (
      !isLoading &&
      pageInfo?.pageNumber < pageInfo?.totalPages &&
      Math.abs(
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop - HEIGHT,
      ) <= 1
    ) {
      getListCustomer(searchText, pageInfo?.pageNumber + 1)
    }
  }
  const getListCustomer = async (kw, page) => {
    try {
      setisLoading(true)
      const { data } = await customerServices.getListCustomer(
        kw,
        page,
        PAGE_SIZE,
      )
      setcustomerList((prev) => [
        ...(data?.pagination?.pageNumber > 1 ? prev : []),
        ...data?.data,
      ])
      setpageInfo(data?.pagination)
    } catch (error) {
      console.log('getListCustomer : ', error)
      errorToastCus()
    } finally {
      setisLoading(false)
    }
  }
  // const getInfoCustomer = async (id) => {
  //   try {
  //     setisLoadingInfo(true)
  //     // const {data}=await
  //     // setcustomerInfo(data)
  //   } catch (error) {
  //     handleCloseModal()
  //     console.log('getInfoCustomer : ', error)
  //     errorToastCus()
  //   } finally {
  //     setisLoadingInfo(false)
  //   }
  // }
  useEffect(() => {
    onLoad()
    dispatch(getListTransactionTypeAction())
  }, [])
  return (
    <>
      <div className='p-2 flex flex-col gap-2 pt-3'>
        <div className='flex justify-between items-center'>
          <div className='font-medium text-xl text-gray-500'>Khách hàng</div>
        </div>
        <Divider style={{ margin: 0, padding: 0 }} />
        <div className='flex justify-start items-center gap-2'>
          <Input
            allowClear
            className='w-96'
            placeholder='Nhập từ khóa...'
            value={searchText}
            onChange={onChangeSearch}
          />
          <Button
            loading={isLoading}
            className='w-8'
            type='primary'
            icon={<SyncOutlined />}
            onClick={onClickSearch}
          />
        </div>
        <Spin spinning={isLoading}>
          <CustomerList
            height={HEIGHT}
            list={customerList}
            onClickItem={onClickItem}
            onScroll={onScrollList}
            handleToggleActive={handleToggleActive}
          />
        </Spin>
      </div>
      <CustomerModal
        open={isModal}
        loading={isLoadingInfo}
        info={customerInfo}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default Customer

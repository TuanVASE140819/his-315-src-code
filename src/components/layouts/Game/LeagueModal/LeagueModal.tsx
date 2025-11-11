import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import { useFormik } from 'formik'
import { Modal, Input, Select } from 'antd'
import { addLeagueSchema } from '../../../../schemas/leagueSchemas'
import {
  postInfoLeagueAction,
  putInfoLeagueAction,
} from '../../../../redux/actions/leagueActions'
// import ToastCus from '../../../common/Toast'
import moment from 'moment'
// const dateMoment = 'YYYY-MM-DDTHH:mm:ss' //moment.ISO_8601
const dateView = 'DD/MM/YYYY HH:mm:ss'
const LeagueModal = ({ open, loading, infoEdit, handleClose, onLoad }) => {
  const dispatch = useAppDispatch()
  const { listCategory } = useAppSelector((state) => state.Common)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoEdit?.id,
      name: infoEdit?.name ?? '',
      categoryId: infoEdit?.categoryId,
      isActive: infoEdit?.isActive,
    },
    onSubmit: (values) => {
      if (infoEdit) return handleSubmitEdit(values)
      handleSubmitAdd(values)
    },
    validationSchema: addLeagueSchema,
  })

  const isErrorName = useMemo(() => {
    const touched = formik?.touched?.name
    const error = formik?.errors?.name
    if (touched) {
      if (error) return error //`*${error}`
    }
    return ''
  }, [formik])
  const isErrorCategoryId = useMemo(() => {
    const touched = formik?.touched?.categoryId
    const error = formik?.errors?.categoryId
    if (touched) {
      if (error) return error //`*${error}`
    }
    return ''
  }, [formik])
  const onChangeCategoryId = (value) => {
    formik.setFieldValue('categoryId', value)
  }

  const onChangeActive = (e) => {
    const { checked } = e.target
    formik.setFieldValue('isActive', checked ? true : false)
  }

  const handleSubmitAdd = (values) => {
    handleClose()
    dispatch(postInfoLeagueAction(values, handleReload))
  }
  const handleSubmitEdit = (values) => {
    // ToastCus.fire({
    //   icon: 'success',
    //   title: 'Chỉnh sửa bộ môn thành công',
    // })
    handleClose()
    dispatch(putInfoLeagueAction(values, handleReload))
  }
  const handleOk = () => {
    formik.handleSubmit()
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleReload = async () => {
    handleClose()
    formik.resetForm()
    await onLoad()
  }

  return (
    <Modal
      open={open}
      loading={loading}
      width={400}
      title={
        <p className='text-center'>
          {loading
            ? 'Đang tải dữ liệu'
            : infoEdit
              ? 'Chỉnh sửa giải đấu'
              : 'Thêm giải đấu'}
        </p>
      }
      okText='Lưu'
      onOk={handleOk}
      cancelText='Đóng'
      onCancel={handleCancel}
    >
      <div className='grid grid-flow-row gap-2'>
        <div>
          <div className='font-medium flex'>
            Tên giải đấu<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Input
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            status={isErrorName ? 'error' : ''}
          />
        </div>
        <div>
          <div className='font-medium flex'>
            Bộ môn<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Select
            showSearch
            className='w-full'
            filterOption={(input, option) =>
              `${option?.label ?? ''}`
                .toLowerCase()
                .includes(`${input ?? ''}`.toLowerCase())
            }
            value={formik.values.categoryId}
            onChange={onChangeCategoryId}
            status={isErrorCategoryId ? 'error' : ''}
            options={listCategory?.map((item) => ({
              key: item?.id,
              value: item?.id,
              label: item?.name,
            }))}
          />
        </div>
        {infoEdit && (
          <>
            <div>
              <div className='font-medium'>Người tạo</div>
              <Input readOnly variant='filled' value={infoEdit?.createdBy} />
            </div>
            <div>
              <div className='font-medium'>Ngày tạo</div>
              <Input
                readOnly
                variant='filled'
                value={
                  infoEdit?.createdAt
                    ? moment(infoEdit?.createdAt).format(dateView)
                    : ''
                }
              />
            </div>
            <div>
              <div className='font-medium'>Người Sửa</div>
              <Input readOnly variant='filled' value={infoEdit?.updatedBy} />
            </div>
            <div>
              <div className='font-medium'>Ngày Sửa</div>
              <Input
                readOnly
                variant='filled'
                value={
                  infoEdit?.updatedAt
                    ? moment(infoEdit?.updatedAt).format(dateView)
                    : ''
                }
              />
            </div>
            {/* <div className='flex items-center gap-2'>
              <div className='font-medium'>Sử dụng</div>
              <Checkbox
                checked={formik.values.isActive}
                // onChange={onChangeActive}
              />
            </div> */}
          </>
        )}
      </div>
    </Modal>
  )
}

export default LeagueModal

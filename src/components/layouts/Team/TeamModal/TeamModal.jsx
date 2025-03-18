import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Input, Checkbox } from 'antd'
// import { addCategorySchema } from '../../../../schemas/categorySchemas'
// import {
//   postInfoCategoryAction,
//   putInfoCategoryAction,
// } from '../../../../redux/actions/categoryActions'
// import ToastCus from '../../../common/Toast'
import moment from 'moment'
// const dateMoment = 'YYYY-MM-DDTHH:mm:ss' //moment.ISO_8601
const dateView = 'DD/MM/YYYY HH:mm:ss'
const TeamModal = ({ open, loading, infoEdit, handleClose, onLoad }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoEdit?.id,
      name: infoEdit?.name ?? '',
      isActive: infoEdit?.isActive,
    },
    onSubmit: (values) => {
      if (infoEdit) return handleSubmitEdit(values)
      handleSubmitAdd(values)
    },
    // validationSchema: addCategorySchema,
  })

  const isErrorName = useMemo(() => {
    const touched = formik?.touched?.name
    const error = formik?.errors?.name
    if (touched) {
      if (error) return error //`*${error}`
    }
    return ''
  }, [formik])
  const onChangeActive = (e) => {
    const { checked } = e.target
    formik.setFieldValue('isActive', checked ? true : false)
  }

  const handleSubmitAdd = (values) => {
    handleClose()
    // dispatch(postInfoCategoryAction(values, handleReload))
  }
  const handleSubmitEdit = (values) => {
    // ToastCus.fire({
    //   icon: 'success',
    //   title: 'Chỉnh sửa bộ môn thành công',
    // })
    handleClose()
    // dispatch(putInfoCategoryAction(values, handleReload))
  }
  const handleOk = () => {
    formik.handleSubmit()
  }
  const handleCancel = () => {
    handleClose()
  }
  const handleReload = () => {
    handleClose()
    formik.resetForm()
    onLoad()
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
              ? 'Chỉnh sửa đội thi đấu'
              : 'Thêm đội thi đấu'}
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
            Tên đội<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Input
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            status={isErrorName ? 'error' : ''}
          />
          {/* <div className='text-left text-red-500 h-4 text-xs'>
            {isErrorName}
          </div> */}
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

export default TeamModal

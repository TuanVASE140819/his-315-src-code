import React, { useMemo, useState } from 'react'
import { useAppDispatch } from '../../../../redux/store/hooks'
import { useFormik } from 'formik'
import { Modal, Input, Checkbox, Image } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { addTeamSchema } from '../../../../schemas/teamSchemas'
import {
  postInfoTeamAction,
  putInfoTeamAction,
} from '../../../../redux/actions/teamActions'
import UploadImage from '../../../common/UploadImage/UploadImage'
import ToastCus from '../../../common/Toast'
import moment from 'moment'
const dateView = 'DD/MM/YYYY HH:mm:ss'

const TeamModal = ({
  open,
  loading,
  infoEdit,
  infoCategory,
  handleClose,
  onLoad,
}) => {
  const dispatch = useAppDispatch()
  const [fileImage, setfileImage] = useState([])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoEdit?.id,
      name: infoEdit?.name ?? '',
      categoryId: infoCategory?.id,
      isActive: infoEdit?.isActive,
      imageUrl: infoEdit?.imageUrl,
    },
    onSubmit: (values) => {
      if (infoEdit) return handleSubmitEdit(values)
      handleSubmitAdd(values)
    },
    validationSchema: addTeamSchema,
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
    dispatch(
      postInfoTeamAction(
        {
          ...values,
          files: fileImage,
        },
        handleReload,
      ),
    )
  }
  const handleSubmitEdit = (values) => {
    if (infoEdit?.imageUrl && !values?.imageUrl && !fileImage?.length) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Vui lòng tải ảnh lên',
      })
    }
    handleClose()
    dispatch(
      putInfoTeamAction(
        {
          ...values,
          files: fileImage,
        },
        handleReload,
      ),
    )
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
    setfileImage([])
    await onLoad()
  }
  const onClickDeleteImage = (e) => {
    e.stopPropagation()
    formik.setFieldValue('imageUrl', null)
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
        <div className='flex justify-center items-center overflow-hidden h-[102px]'>
          {infoEdit && formik.values.imageUrl ? (
            <div className='w-[102px] h-full p-2 border rounded-md flex justify-center items-center'>
              <div className='w-full h-full overflow-hidden flex justify-center items-center'>
                <Image
                  loading='lazy'
                  src={formik.values.imageUrl}
                  preview={{
                    mask: (
                      <div className='flex justify-center items-center gap-2'>
                        <EyeOutlined className='text-[16px]' />
                        <DeleteOutlined
                          className='text-[16px]'
                          onClick={onClickDeleteImage}
                        />
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
          ) : (
            <UploadImage
              fileList={fileImage}
              setfileList={setfileImage}
              maxLength={1}
            />
          )}
        </div>
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
        </div>
        <div>
          <div className='font-medium flex'>Bộ môn</div>
          <Input readOnly variant='filled' value={infoCategory?.name} />
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

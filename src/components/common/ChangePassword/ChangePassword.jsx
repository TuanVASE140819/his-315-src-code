import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Modal, Input, Divider } from 'antd'
// import ToastCus from '../../../components/common/Toast'
import { changePasswordSchema } from '../../../schemas/userSchemas'
import { putChangePasswordAction } from '../../../redux/actions/userActions'

const ChangePassword = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: (value) => {
      handleSubmit(value)
    },
    validationSchema: changePasswordSchema,
  })

  const isErrorNew = useMemo(() => {
    const { oldPassword, newPassword } = formik?.values
    const touched = formik?.touched?.newPassword
    const error = formik?.errors?.newPassword
    if (touched) {
      if (error) return `*${error}`
      if (oldPassword && newPassword && oldPassword === newPassword)
        return '*Mật khẩu mới giống mật khẩu hiện tại'
    }
    return ''
  }, [formik])

  const isErrorConfirm = useMemo(() => {
    const { newPassword, confirmNewPassword } = formik?.values
    const touched = formik?.touched?.newPassword
    const error = formik?.errors?.confirmNewPassword
    if (touched) {
      if (error) return `*${error}`
      if (
        newPassword &&
        confirmNewPassword &&
        newPassword !== confirmNewPassword
      )
        return '*Mật khẩu mới giống mật khẩu hiện tại'
    }
    return ''
  }, [formik])

  const handleSubmit = (values) => {
    if (isErrorConfirm || isErrorNew) return false
    handleClose()
    dispatch(putChangePasswordAction(values, handleReload))
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
  }

  return (
    <Modal
      open={open}
      width={400}
      title={<p className='text-center'>Đổi mật khẩu</p>}
      okText='Lưu'
      onOk={handleOk}
      cancelText='Đóng'
      onCancel={handleCancel}
    >
      <div className='grid grid-flow-row gap-2'>
        <div>
          <div className='font-medium flex'>
            Mật khẩu hiện tại<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Input.Password
            name='oldPassword'
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            status={
              formik.errors.oldPassword && formik.touched.oldPassword
                ? 'error'
                : ''
            }
          />
          <div className='text-left text-red-500 h-4 text-xs'>
            {formik.touched.oldPassword && formik.errors.oldPassword
              ? `*${formik.errors.oldPassword}`
              : ''}
          </div>
        </div>
        <Divider style={{ margin: 0, padding: 0 }} />
        <div>
          <div className='font-medium flex'>
            Mật khẩu mới<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Input.Password
            name='newPassword'
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            status={isErrorNew ? 'error' : ''}
          />
          <div className='text-left text-red-500 h-4 text-xs'>{isErrorNew}</div>
        </div>
        <div>
          <div className='font-medium flex'>
            Nhập lại mật khẩu mới<span className='text-red-500'>&nbsp;(*)</span>
          </div>
          <Input.Password
            name='confirmNewPassword'
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            status={isErrorConfirm ? 'error' : ''}
          />
          <div className='text-left text-red-500 h-4 text-xs'>
            {isErrorConfirm}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePassword

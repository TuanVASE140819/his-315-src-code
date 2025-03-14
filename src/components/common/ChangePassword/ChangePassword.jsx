import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Modal, Input, Divider } from 'antd'
// import ToastCus from '../../../components/common/Toast'
import { changePasswordSchema } from '../../../schemas/userSchemas'
import {
  putChangePasswordAction,
  logoutUser,
} from '../../../redux/actions/userActions'

const ChangePassword = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal()

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
    countDown()
  }
  const handleLogout = () => {
    dispatch(logoutUser(navigate))
  }
  const countDown = () => {
    let secondsToGo = 5
    const renderContent = (seconds) => {
      return (
        <p>
          Hệ thống sẽ tự đăng xuất sau
          <span className='text-red-500 font-medium'>
            &nbsp;{seconds} giây&nbsp;
          </span>
        </p>
      )
    }
    const instance = modal.success({
      title: 'Đổi mật khẩu thành công',
      content: renderContent(secondsToGo),
      okText: 'Đăng xuất',
      onOk: handleLogout,
    })
    const timer = setInterval(() => {
      secondsToGo -= 1
      instance.update({
        content: renderContent(secondsToGo),
      })
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      instance.destroy()
      handleLogout()
    }, secondsToGo * 1000)
  }
  return (
    <>
      {contextHolder}
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
            <div className='text-left text-red-500 h-4 text-xs'>
              {isErrorNew}
            </div>
          </div>
          <div>
            <div className='font-medium flex'>
              Nhập lại mật khẩu mới
              <span className='text-red-500'>&nbsp;(*)</span>
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
    </>
  )
}

export default ChangePassword

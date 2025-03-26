import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Modal, Input, Divider } from 'antd'
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
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
    validationSchema: changePasswordSchema,
  })

  const isErrorOld = useMemo(() => {
    const touched = formik?.touched?.oldPassword
    const error = formik?.errors?.oldPassword
    if (touched) {
      if (error) return `*${error}`
    }
    return ''
  }, [formik])

  const isErrorNew = useMemo(() => {
    const { oldPassword, newPassword } = formik?.values
    const touched = formik?.touched?.newPassword
    const error = formik?.errors?.newPassword
    if (touched) {
      if (error) return `*${error}`
      if (oldPassword && newPassword && oldPassword === newPassword)
        return '*Mật khẩu mới phải khác mật khẩu hiện tại'
    }
    return ''
  }, [formik])

  const isErrorConfirm = useMemo(() => {
    const { newPassword, confirmNewPassword } = formik?.values
    const touched = formik?.touched?.confirmNewPassword
    const error = formik?.errors?.confirmNewPassword
    if (touched) {
      if (error) return `*${error}`
      if (
        newPassword &&
        confirmNewPassword &&
        newPassword !== confirmNewPassword
      )
        return '*Mật khẩu nhập lại phải giống mật khẩu mới'
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
        <form>
          <input
            type='text'
            name='username'
            autoComplete='username'
            readOnly
            hidden
          />
          <div className='grid grid-flow-row gap-2'>
            <div>
              <div className='font-medium flex'>
                Mật khẩu hiện tại<span className='text-red-500'>&nbsp;(*)</span>
              </div>
              <Input.Password
                name='oldPassword'
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                status={isErrorOld ? 'error' : ''}
                autoComplete='current-password'
              />
              <div className='text-left text-red-500 h-4 text-xs'>
                {isErrorOld}
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
                autoComplete='new-password'
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
                autoComplete='new-password'
              />
              <div className='text-left text-red-500 h-4 text-xs'>
                {isErrorConfirm}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ChangePassword

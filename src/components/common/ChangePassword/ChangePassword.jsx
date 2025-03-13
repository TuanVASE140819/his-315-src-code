import React from 'react'
import { Modal } from 'antd'

const ChangePassword = ({ open, handleClose }) => {
  const handleOk = () => {}
  const handleCancel = () => {
    handleClose()
  }

  return (
    <Modal
      open={open}
      title={<p className='text-center'>Đổi mật khẩu</p>}
      okText='Lưu'
      onOk={handleOk}
      cancelText='Đóng'
      onCancel={handleCancel}
    >
      dsadsa
    </Modal>
  )
}

export default ChangePassword

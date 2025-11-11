import React, { useEffect } from 'react'
import { Modal, Input, Button, Form } from 'antd'

const ModalEditPartner = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  onUpdate,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isModalOpenEdit?.data) {
      form.setFieldsValue(isModalOpenEdit.data)
    }
  }, [isModalOpenEdit])

  const handleOk = async () => {
    const values = await form.validateFields()
    onUpdate({ ...isModalOpenEdit.data, ...values })
    form.resetFields()
    setIsModalOpenEdit({ show: false, data: {} })
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpenEdit({ show: false, data: {} })
  }

  return (
    <Modal
      title='Chỉnh sửa đối tác'
      open={isModalOpenEdit.show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Lưu'
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='maDoiTac'
          label='Mã đối tác'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='tenDoiTac'
          label='Tên đối tác'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='tenVietTat' label='Tên viết tắt'>
          <Input />
        </Form.Item>
        <Form.Item name='diaChi' label='Địa chỉ'>
          <Input />
        </Form.Item>
        <Form.Item name='dienThoai' label='SĐT'>
          <Input />
        </Form.Item>
        <Form.Item name='maSoThue' label='Mã số thuế'>
          <Input />
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <Input />
        </Form.Item>
        <Form.Item name='website' label='Website'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalEditPartner

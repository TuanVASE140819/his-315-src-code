import React, { useState } from 'react'
import { Modal, Input, Button, Form } from 'antd'

const ModalCreatePartner = ({ isModalOpen, setIsModalOpen, onCreate }) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    const values = await form.validateFields()
    onCreate(values)
    form.resetFields()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Tạo đối tác'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Tạo'
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

export default ModalCreatePartner

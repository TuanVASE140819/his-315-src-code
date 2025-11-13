import React, { useState } from 'react'
import { Modal, Input, Form } from 'antd'
import type { PartnerFormValues } from '../../../../types/partner.types'

interface ModalCreatePartnerProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreate: (values: PartnerFormValues) => void
}

const ModalCreatePartner: React.FC<ModalCreatePartnerProps> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate,
}) => {
  const [form] = Form.useForm<PartnerFormValues>()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onCreate(values)
      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Validation failed:', error)
    }
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
          rules={[{ required: true, message: 'Vui lòng nhập mã đối tác' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='tenDoiTac'
          label='Tên đối tác'
          rules={[{ required: true, message: 'Vui lòng nhập tên đối tác' }]}
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

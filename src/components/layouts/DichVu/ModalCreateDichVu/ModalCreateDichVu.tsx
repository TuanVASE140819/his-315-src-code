import React from 'react'
import { Modal, Input, Form, InputNumber } from 'antd'
import type { DichVuFormValues } from '../../../../types'

interface ModalCreateDichVuProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreate: (values: DichVuFormValues) => void
}

const ModalCreateDichVu: React.FC<ModalCreateDichVuProps> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate,
}) => {
  const [form] = Form.useForm<DichVuFormValues>()

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
      title='Tạo dịch vụ'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Tạo'
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='maDichVu'
          label='Mã dịch vụ'
          rules={[{ required: true, message: 'Vui lòng nhập mã dịch vụ' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='tenDichVu'
          label='Tên dịch vụ'
          rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='moTa' label='Mô tả'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='gia'
          label='Giá'
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='donvi' label='Đơn vị'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreateDichVu

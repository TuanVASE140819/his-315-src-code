import React, { useEffect } from 'react'
import { Modal, Input, Form } from 'antd'
import type {
  PartnerUI,
  PartnerFormValues,
  ModalEditPartnerState,
} from '../../../../types/partner.types'

interface ModalEditPartnerProps {
  isModalOpenEdit: ModalEditPartnerState
  setIsModalOpenEdit: React.Dispatch<
    React.SetStateAction<ModalEditPartnerState>
  >
  onUpdate: (updated: PartnerUI) => void
}

const ModalEditPartner: React.FC<ModalEditPartnerProps> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  onUpdate,
}) => {
  const [form] = Form.useForm<PartnerFormValues>()

  useEffect(() => {
    if (
      isModalOpenEdit.show &&
      isModalOpenEdit.data &&
      'id' in isModalOpenEdit.data
    ) {
      form.setFieldsValue(isModalOpenEdit.data)
    }
  }, [isModalOpenEdit, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if ('id' in isModalOpenEdit.data) {
        onUpdate({ ...isModalOpenEdit.data, ...values } as PartnerUI)
      }
      form.resetFields()
      setIsModalOpenEdit({ show: false, data: {} })
    } catch (error) {
      console.error('Validation failed:', error)
    }
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

export default ModalEditPartner

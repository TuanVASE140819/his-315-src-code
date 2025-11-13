import React, { useEffect } from 'react'
import { Modal, Input, Form, InputNumber } from 'antd'
import type {
  DichVu,
  DichVuFormValues,
  ModalEditDichVuState,
} from '../../../../types'

interface ModalEditDichVuProps {
  isModalOpenEdit: ModalEditDichVuState
  setIsModalOpenEdit: React.Dispatch<React.SetStateAction<ModalEditDichVuState>>
  onUpdate: (updated: DichVu) => void
}

const ModalEditDichVu: React.FC<ModalEditDichVuProps> = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  onUpdate,
}) => {
  const [form] = Form.useForm<DichVuFormValues>()

  useEffect(() => {
    if (
      isModalOpenEdit.show &&
      isModalOpenEdit.data &&
      'id' in isModalOpenEdit.data
    ) {
      form.setFieldsValue({
        maDichVu: isModalOpenEdit.data.maDichVu,
        tenDichVu: isModalOpenEdit.data.tenDichVu,
        moTa: isModalOpenEdit.data.moTa,
        gia: isModalOpenEdit.data.gia,
        donvi: isModalOpenEdit.data.donvi,
      })
    }
  }, [isModalOpenEdit, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if ('id' in isModalOpenEdit.data) {
        onUpdate({ ...isModalOpenEdit.data, ...values } as DichVu)
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
      title='Chỉnh sửa dịch vụ'
      open={isModalOpenEdit.show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Cập nhật'
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

export default ModalEditDichVu

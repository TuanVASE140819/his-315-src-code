import React from 'react'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../redux/store/hooks'
import { phongKhamServices } from '../../../redux/services/phongkhamServices'
import { PHONGKHAM } from '../../../redux/constants/constants'

interface Props {
  open: boolean
  onClose: () => void
}

const ModalCreatePhongKham: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const khoaPhongList = useAppSelector(
    (s: any) => s.Common?.listKhoaPhong || [],
  )

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        mapk: values.maPhongKham || '',
        tenpk: values.tenPhongKham || '',
        nguoitao: values.nguoTao || undefined,
        ghichu: values.moTa || '',
        idkhoaphong: values.idKhoaPhong || null,
      }
      dispatch({
        type: PHONGKHAM.POST_INFO_PHONGKHAM,
        payload,
        onDone: () => {
          form.resetFields()
          onClose()
          // reload first page
          dispatch({
            type: PHONGKHAM.GET_LIST_PHONGKHAM,
            payload: { pageNumber: 1 },
          })
        },
      })
    } catch (err: any) {
      if (err?.errorFields) return
      console.error('Prepare insert PhongKham error', err)
      message.error('Có lỗi khi tạo phòng khám')
    }
  }

  return (
    <Modal
      width={700}
      title='Tạo phòng khám'
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form layout='vertical' form={form}>
        <Form.Item name='maPhongKham' label='Mã PK'>
          <Input placeholder='Mã PK' />
        </Form.Item>
        <Form.Item
          name='tenPhongKham'
          label='Tên phòng khám'
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng khám' }]}
        >
          <Input placeholder='Tên phòng khám' />
        </Form.Item>
        <Form.Item name='moTa' label='Ghi chú'>
          <Input placeholder='Ghi chú' />
        </Form.Item>
        <Form.Item name='idKhoaPhong' label='Khoa phòng'>
          <Select placeholder='Khoa phòng' allowClear>
            {khoaPhongList.map((k: any) => (
              <Select.Option key={k.idKhoaPhong} value={k.idKhoaPhong}>
                {k.tenKhoaPhong}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <div className='flex justify-end gap-2'>
            <Button onClick={onClose}>Hủy</Button>
            <Button type='primary' onClick={handleSave}>
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreatePhongKham

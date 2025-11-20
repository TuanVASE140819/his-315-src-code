import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import { useAppSelector, useAppDispatch } from '../../../redux/store/hooks'
import { PHONGKHAM } from '../../../redux/constants/constants'

interface Props {
  open: boolean
  onClose: () => void
  data?: any
}

const ModalEditPhongKham: React.FC<Props> = ({ open, onClose, data }) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const khoaPhongList = useAppSelector(
    (s: any) => s.Common?.listKhoaPhong || [],
  )

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        maPhongKham: data.maPhongKham,
        tenPhongKham: data.tenPhongKham,
        moTa: data.moTa,
        idKhoaPhong: data.idKhoaPhong,
      })
    }
  }, [data])

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        idpk: data?.id,
        mapk: values.maPhongKham || '',
        tenpk: values.tenPhongKham || '',
        ghichu: values.moTa || '',
        idkhoaphong: values.idKhoaPhong || null,
      }
      dispatch({
        type: PHONGKHAM.PUT_INFO_PHONGKHAM,
        payload,
        onDone: () => {
          message.success('Cập nhật thành công')
          onClose()
          dispatch({
            type: PHONGKHAM.GET_LIST_PHONGKHAM,
            payload: { pageNumber: 1 },
          })
        },
      })
    } catch (err: any) {
      if (err?.errorFields) return
      console.error('Update PhongKham error', err)
      message.error('Có lỗi khi cập nhật phòng khám')
    }
  }

  return (
    <Modal
      width={700}
      title='Cập nhật phòng khám'
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

export default ModalEditPhongKham

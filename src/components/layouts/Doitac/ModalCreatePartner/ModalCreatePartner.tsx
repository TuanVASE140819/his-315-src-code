import React, { useEffect } from 'react'
import { Modal, Input, Form, Row, Col, Select, Divider, message } from 'antd'
import type { PartnerFormValues } from '../../../../types/partner.types'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import {
  getListTinhAction,
  getListPhuongXaAction,
} from '../../../../redux/actions/commonActions'

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
  const dispatch = useAppDispatch()
  const common = useAppSelector((s) => s.Common)

  useEffect(() => {
    dispatch(getListTinhAction())
  }, [dispatch])

  const handleTinhChange = (value: number | string | undefined) => {
    if (value) {
      dispatch(getListPhuongXaAction(value))
    } else {
      ;(form as any).setFieldsValue({ phuong: undefined })
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        madoitac: values.maDoiTac ?? '',
        tendoitac: values.tenDoiTac ?? '',
        diachi: values.diaChi ?? '',
        idtinh: values.tinh ?? null,
        idphuong: values.phuong ?? null,
        dienthoai: values.dienThoai ?? values.diDong ?? '',
        masothue: values.maSoThue ?? '',
        fax: values.fax ?? '',
        email: values.email ?? '',
        website: values.website ?? '',
        nguoilienhe: values.nguoiLienHe ?? '',
        didong: values.diDong ?? '',
        ghichu: values.ghiChu ?? '',
        sudung: 1,
        nguoitao: 0,
        ngaytao: new Date().toISOString(),
        tknganhang: values.taiKhoanNganHang ?? '',
        nganhang: values.nganHang ?? '',
        tentaikhoan: values.tenTaiKhoan ?? '',
        tenviettat: values.tenVietTat ?? '',
      }

      const { partnerServices } = await import(
        '../../../../redux/services/partnerServices'
      )
      const hide = message.loading({
        content: 'Đang tạo...',
        key: 'createPartner',
      })
      const res = await partnerServices.createPartner(payload)
      hide()
      if (res && res.status === 200) {
        message.success({
          content: 'Tạo đối tác thành công',
          key: 'createPartner',
        })
        onCreate(res.data)
        form.resetFields()
        setIsModalOpen(false)
      } else {
        message.error({ content: res?.data?.message || 'Tạo đối tác thất bại' })
      }
    } catch (err: any) {
      message.error({ content: err?.message || 'Có lỗi khi tạo đối tác' })
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const rawTinh = common.listTinh || []
  const rawPhuong = common.listPhuongXa || []

  const tinhList = rawTinh.map((t: any) => ({
    id: t.idtinh ?? t.id,
    ten: t.tentinh ?? t.ten,
  }))
  const phuongList = rawPhuong.map((p: any) => ({
    id: p.idphuong ?? p.id,
    ten: p.tenphuong ?? p.ten,
  }))

  return (
    <Modal
      title='Thêm đối tác'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Thêm mới'
      cancelText='Hủy bỏ'
      width={920}
      centered
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: 24 }}
    >
      <Form form={form} layout='vertical'>
        <div className='mb-4'>
          <div className='text-lg font-semibold mb-2'>Thông tin cơ bản</div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='tenDoiTac'
                label='Tên đối tác'
                rules={[{ required: true }]}
              >
                <Input placeholder='Tên đối tác' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='maDoiTac'
                label='Mã đối tác'
                rules={[{ required: true }]}
              >
                <Input placeholder='Mã đối tác' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='tenVietTat' label='Tên viết tắt'>
                <Input placeholder='Tên viết tắt' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='maSoThue' label='Mã số thuế'>
                <Input placeholder='Mã số thuế' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className='mb-4'>
          <div className='text-lg font-semibold mb-2'>Thông tin liên hệ</div>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name='email'
                label='Email'
                rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
              >
                <Input placeholder='Email' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='website' label='Website'>
                <Input placeholder='Website' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='nguoiLienHe' label='Người liên hệ'>
                <Input placeholder='Người liên hệ' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='dienThoai' label='Điện thoại'>
                <Input placeholder='Điện thoại' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='diDong' label='Di động'>
                <Input placeholder='Di động' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='fax' label='Fax'>
                <Input placeholder='Fax' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className='mb-4'>
          <div className='text-lg font-semibold mb-2'>Thông tin địa chỉ</div>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='tinh' label='Tỉnh / Thành phố'>
                <Select
                  showSearch
                  optionFilterProp='children'
                  onChange={handleTinhChange}
                  allowClear
                  placeholder='Chọn tỉnh'
                  dropdownStyle={{ background: '#ffffff' }}
                  getPopupContainer={(trigger) =>
                    trigger?.parentElement || document.body
                  }
                >
                  {tinhList.map((t) => (
                    <Select.Option key={t.id} value={t.id}>
                      {t.ten}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='phuong' label='Phường / Xã'>
                <Select
                  showSearch
                  optionFilterProp='children'
                  allowClear
                  placeholder='Chọn phường/xã'
                  dropdownStyle={{ background: '#ffffff' }}
                  getPopupContainer={(trigger) =>
                    trigger?.parentElement || document.body
                  }
                  disabled={!phuongList || phuongList.length === 0}
                >
                  {phuongList.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.ten}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='diaChi' label='Địa chỉ'>
                <Input placeholder='Số nhà, tên đường, thôn/xóm' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className='mb-4'>
          <div className='text-lg font-semibold mb-2'>Thông tin ngân hàng</div>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='taiKhoanNganHang' label='Tài khoản ngân hàng'>
                <Input placeholder='Số tài khoản' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='nganHang' label='Ngân hàng'>
                <Input placeholder='Ngân hàng' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='tenTaiKhoan' label='Tên tài khoản'>
                <Input placeholder='Tên chủ tài khoản' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        <div>
          <div className='text-lg font-semibold mb-2'>Ghi chú</div>
          <Form.Item name='ghiChu'>
            <Input.TextArea rows={4} placeholder='Ghi chú' />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalCreatePartner

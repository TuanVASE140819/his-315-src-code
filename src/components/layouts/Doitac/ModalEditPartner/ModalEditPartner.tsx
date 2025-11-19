import React, { useEffect } from 'react'
import { Modal, Input, Form, Row, Col, Select, Divider } from 'antd'
import type {
  PartnerUI,
  PartnerFormValues,
  ModalEditPartnerState,
} from '../../../../types/partner.types'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import {
  getListTinhAction,
  getListPhuongXaAction,
} from '../../../../redux/actions/commonActions'

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
  const dispatch = useAppDispatch()
  const common = useAppSelector((s) => s.Common)

  React.useEffect(() => {
    dispatch(getListTinhAction())
  }, [dispatch])

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
      if ('iddoitac' in isModalOpenEdit.data || 'id' in isModalOpenEdit.data) {
        const id =
          (isModalOpenEdit.data as any).iddoitac ??
          (isModalOpenEdit.data as any).id
        const payload = {
          iddoitac: id,
          madoitac: values.maDoiTac ?? isModalOpenEdit.data['maDoiTac'] ?? '',
          tendoitac:
            values.tenDoiTac ?? isModalOpenEdit.data['tenDoiTac'] ?? '',
          diachi: values.diaChi ?? isModalOpenEdit.data['diaChi'] ?? '',
          idtinh: values.tinh ?? isModalOpenEdit.data['idtinh'] ?? null,
          idphuong: values.phuong ?? isModalOpenEdit.data['idphuong'] ?? null,
          dienthoai:
            values.dienThoai ?? isModalOpenEdit.data['dienThoai'] ?? '',
          masothue: values.maSoThue ?? isModalOpenEdit.data['maSoThue'] ?? '',
          fax: values.fax ?? isModalOpenEdit.data['fax'] ?? '',
          email: values.email ?? isModalOpenEdit.data['email'] ?? '',
          website: values.website ?? isModalOpenEdit.data['website'] ?? '',
          nguoilienhe:
            values.nguoiLienHe ?? isModalOpenEdit.data['nguoiLienHe'] ?? '',
          didong: values.diDong ?? isModalOpenEdit.data['diDong'] ?? '',
          ghichu: values.ghiChu ?? isModalOpenEdit.data['ghiChu'] ?? '',
          sudung: 1,
          nguoitao: 0,
          ngaytao: new Date().toISOString(),
          tknganhang:
            values.taiKhoanNganHang ??
            isModalOpenEdit.data['taiKhoanNganHang'] ??
            '',
          nganhang: values.nganHang ?? isModalOpenEdit.data['nganHang'] ?? '',
          tentaikhoan:
            values.tenTaiKhoan ?? isModalOpenEdit.data['tenTaiKhoan'] ?? '',
          tenviettat:
            values.tenVietTat ?? isModalOpenEdit.data['tenVietTat'] ?? '',
        }

        const { partnerServices } = await import(
          '../../../../redux/services/partnerServices'
        )
        const hide = (await import('antd')).message.loading({
          content: 'Đang lưu...',
          key: 'updatePartner',
        })
        const res = await partnerServices.updatePartner(payload)
        hide()
        if (res && res.status === 200) {
          ;(await import('antd')).message.success({
            content: 'Cập nhật thành công',
            key: 'updatePartner',
          })
          onUpdate(res.data)
        } else {
          ;(await import('antd')).message.error({
            content: res?.data?.message || 'Cập nhật thất bại',
          })
        }
      }
      form.resetFields()
      setIsModalOpenEdit({ show: false, data: {} })
    } catch (error) {
      console.error('Validation failed:', error)
      ;(await import('antd')).message.error('Có lỗi khi lưu đối tác')
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpenEdit({ show: false, data: {} })
  }

  const handleTinhChange = (value: number | string | undefined) => {
    if (value) dispatch(getListPhuongXaAction(value))
    else (form as any).setFieldsValue({ phuong: undefined })
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
      title='Chỉnh sửa đối tác'
      open={isModalOpenEdit.show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Lưu'
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
                name='maDoiTac'
                label='Mã đối tác'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='tenDoiTac'
                label='Tên đối tác'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='tenVietTat' label='Tên viết tắt'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='maSoThue' label='Mã số thuế'>
                <Input />
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
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='website' label='Website'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='nguoiLienHe' label='Người liên hệ'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='dienThoai' label='Điện thoại'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='diDong' label='Di động'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='fax' label='Fax'>
                <Input />
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

export default ModalEditPartner

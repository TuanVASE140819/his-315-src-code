import React, { useEffect } from 'react'
import {
  Modal,
  Input,
  Form,
  InputNumber,
  Row,
  Col,
  Select,
  Checkbox,
  Divider,
  message,
} from 'antd'
import type {
  DichVu,
  DichVuFormValues,
  ModalEditDichVuState,
} from '../../../../types'
import axiosInstance from '../../../../utils/axiosConfig'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import { putInfoDichVuAction } from '../../../../redux/actions/dichvuActions'

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
  const [groups, setGroups] = React.useState<any[]>([])
  const [chuyenkhoas, setChuyenkhoas] = React.useState<any[]>([])
  const dispatch = useAppDispatch()
  const infoUser = useAppSelector((s: any) => s.User?.infoUser)

  useEffect(() => {
    if (
      isModalOpenEdit.show &&
      isModalOpenEdit.data &&
      'id' in isModalOpenEdit.data
    ) {
      const d: any = isModalOpenEdit.data
      form.setFieldsValue({
        maDichVu: d.maDichVu,
        tenDichVu: d.tenDichVu,
        moTa: d.moTa,
        gia: d.gia,
        donvi: d.donvi,
        nhomDichVu: d.raw?.idnhom || d.idNhomDV || undefined,
        chuyenKhoa: d.raw?.idchuyenkhoa || d.idChuyenKhoa || undefined,
        tienGuiMau: d.raw?.tienGuiMau || d.tienGuiMau || undefined,
        tienChietKhau: d.raw?.tienChietKhau || d.tienChietKhau || undefined,
        tienGiaCong: d.raw?.tienGiaCong || d.tienGiaCong || undefined,
        tienVanChuyen: d.raw?.tienCongVanChuyen || d.tienVanChuyen || undefined,
        giaVon: d.raw?.giaVon || d.giaVon || undefined,
        tenVietTat: d.raw?.tenVietTat || d.tenVietTat || undefined,
        ghiChu: d.raw?.ghichu || d.moTa || undefined,
        bhyt: d.raw?.bhyt === 1 || d.bhyt === 1 || false,
      })
    }
  }, [isModalOpenEdit, form])

  React.useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get(
          'https://benhviennhi.api.315healthcare.com/api/DichVuNhom/GetAllDichVuNhom',
        )
        const items = res?.data?.data || []
        setGroups(items)
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    }
    fetchGroups()
  }, [])

  React.useEffect(() => {
    const controller = new AbortController()
    const fetchChuyenKhoa = async () => {
      try {
        const res = await axiosInstance.get(
          'https://benhviennhi.api.315healthcare.com/api/ChuyenKhoa/GetAllChuyenKhoa',
          { signal: controller.signal },
        )
        const raw = res?.data?.data?.data ?? res?.data?.data ?? res?.data ?? []
        const items = Array.isArray(raw) ? raw : []
        setChuyenkhoas(items)
      } catch (error: any) {
        if (error.name === 'AbortError') return
        console.error('Error fetching chuyen khoa:', error)
      }
    }

    fetchChuyenKhoa()

    return () => {
      try {
        controller.abort()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if ('id' in isModalOpenEdit.data) {
        const payload = {
          iddv: (isModalOpenEdit.data as any).id,
          maDichVu: values.maDichVu,
          tenDichVu: values.tenDichVu,
          idNhomDV: values.nhomDichVu ?? null,
          donGia: values.gia ?? 0,
          donVi: values.donvi ?? '',
          ghiChu: values.ghiChu ?? '',
          tenVietTat: values.tenVietTat ?? '',
          tienGuiMau: values.tienGuiMau ?? 0,
          tienChietKhau: values.tienChietKhau ?? 0,
          tienGiaCong: values.tienGiaCong ?? 0,
          tienCongVanChuyen: values.tienVanChuyen ?? 0,
          giaVon: values.giaVon ?? 0,
          idChuyenKhoa: values.chuyenKhoa ?? null,
          bhyt: values.bhyt ? 1 : 0,
          nguOiSUA: infoUser?.id ?? null,
        }

        // Dispatch redux action to handle update
        dispatch(
          putInfoDichVuAction(payload, () => {
            onUpdate({ ...(isModalOpenEdit.data as any), ...values } as DichVu)
          }),
        )
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
      width={880}
      centered
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: 24 }}
    >
      <Form form={form} layout='vertical'>
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
          Thông tin chính
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='maDichVu'
              label='Mã dịch vụ'
              rules={[{ required: true }]}
            >
              <Input placeholder='Nhập mã dịch vụ' allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='tenDichVu'
              label='Tên dịch vụ'
              rules={[{ required: true }]}
            >
              <Input placeholder='Nhập tên dịch vụ' allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='nhomDichVu'
              label='Nhóm dịch vụ'
              rules={[{ required: true }]}
            >
              <Select
                placeholder='Chọn nhóm'
                allowClear
                options={groups.map((g: any) => ({
                  label: g.tennhom,
                  value: g.idnhom,
                }))}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='gia' label='Đơn giá'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
          Giá & Chi phí
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name='tienGuiMau' label='Tiền gửi mẫu'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='tienGiaCong' label='Tiền gia công'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name='donvi' label='Đơn vị'>
              <Input placeholder='Ví dụ: gói, cái, bộ' allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='tenVietTat' label='Tên viết tắt'>
              <Input placeholder='Nhập tên viết tắt' allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
          Chi tiết bổ sung
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name='tienChietKhau' label='Tiền chiết khấu'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='tienVanChuyen' label='Tiền vận chuyển'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name='giaVon' label='Giá vốn'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
                parser={(value: any) =>
                  (value
                    ? Number(String(value).replace(/\$|,/g, ''))
                    : 0) as any
                }
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='chuyenKhoa' label='Chuyên khoa'>
              <Select
                placeholder='Chọn chuyên khoa'
                allowClear
                options={chuyenkhoas.map((c: any) => ({
                  label: c.tenchuyenkhoa || c.ten,
                  value: c.idchuyenkhoa || c.id,
                }))}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', marginTop: 8 }}>
          <Col>
            <Form.Item
              name='bhyt'
              valuePropName='checked'
              style={{ marginBottom: 0 }}
            >
              <Checkbox>BHYT</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name='ghiChu' label='Ghi chú'>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalEditDichVu

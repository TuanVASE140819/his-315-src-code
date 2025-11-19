import React from 'react'
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
import type { DichVuFormValues } from '../../../../types/dichvu.types'
import axiosInstance from '../../../../utils/axiosConfig'

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
  const [groups, setGroups] = React.useState<any[]>([])
  const [chuyenkhoas, setChuyenkhoas] = React.useState<any[]>([])

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
    const fetchChuyenKhoa = async () => {
      try {
        const res = await axiosInstance.get(
          'https://benhviennhi.api.315healthcare.com/api/ChuyenKhoa/GetAllChuyenKhoa',
        )
        const items = res?.data?.data || []
        setChuyenkhoas(items)
      } catch (error) {
        console.error('Error fetching chuyen khoa:', error)
      }
    }

    fetchChuyenKhoa()
  }, [])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()

      const payload = {
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
      }

      await axiosInstance.post('/DichVu/InsertDichVu', payload)
      message.success('Tạo dịch vụ thành công')

      // Call parent with minimal shape expected by DichVuFormValues
      onCreate({
        maDichVu: payload.maDichVu,
        tenDichVu: payload.tenDichVu,
        moTa: payload.ghiChu,
        gia: payload.donGia,
        donvi: payload.donVi,
      })

      form.resetFields()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Validation or API failed:', error)
      message.error('Không thể tạo dịch vụ. Vui lòng thử lại.')
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Thêm dịch vụ mới'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Thêm'
      cancelText='Hủy'
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

export default ModalCreateDichVu

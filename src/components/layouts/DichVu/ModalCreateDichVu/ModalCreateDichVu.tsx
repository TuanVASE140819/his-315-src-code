import { useMemo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import { COMMON, DICHVU } from '../../../../redux/constants/constants'
import { postInfoDichVuAction } from '../../../../redux/actions/dichvuActions'
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
import {
  numberFormatter,
  numberParser,
} from '../../../../utils/numberFormatter'

interface ModalCreateDichVuProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCreate: (values: DichVuFormValues) => void
  currentFilters?: {
    idNhomDv?: number | null
    pageNumber?: number
    keyword?: string
  }
}

const ModalCreateDichVu: React.FC<ModalCreateDichVuProps> = ({
  isModalOpen,
  setIsModalOpen,
  onCreate,
  currentFilters,
}) => {
  const [form] = Form.useForm<DichVuFormValues>()
  const dispatch = useAppDispatch()

  const listChuyenKhoa = useAppSelector(
    (s: any) => s.Common?.listChuyenKhoa || [],
  )
  const listDichVuNhom = useAppSelector(
    (s: any) => s.Common?.listDichVuNhom || [],
  )

  useEffect(() => {
    dispatch({ type: COMMON.GET_LIST_DICHVU_NHOM })
    dispatch({ type: COMMON.GET_LIST_CHUYENKHOA })
  }, [dispatch])

  const groupOptions = useMemo(
    () =>
      listDichVuNhom.map((g: any) => ({
        label: g.tennhom,
        value: g.idnhom,
      })),
    [listDichVuNhom],
  )

  const chuyenKhoaOptions = useMemo(
    () =>
      listChuyenKhoa.map((c: any) => ({
        label: c.tenchuyenkhoa || c.ten,
        value: c.idchuyenkhoa || c.id,
      })),
    [listChuyenKhoa],
  )

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

      dispatch(
        postInfoDichVuAction(payload, () => {
          if (currentFilters) {
            dispatch({
              type: DICHVU.GET_LIST_DICHVU,
              payload: currentFilters,
            })
          }

          onCreate({
            maDichVu: payload.maDichVu,
            tenDichVu: payload.tenDichVu,
            moTa: payload.ghiChu,
            gia: payload.donGia,
            donvi: payload.donVi,
          })

          form.resetFields()
          setIsModalOpen(false)
        }),
      )
    } catch (error) {
      console.error('Validation failed:', error)
      message.error('Vui lòng kiểm tra lại thông tin.')
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
                options={groupOptions}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='gia' label='Đơn giá'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={numberFormatter}
                parser={numberParser}
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
                formatter={numberFormatter}
                parser={numberParser}
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='tienGiaCong' label='Tiền gia công'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={numberFormatter}
                parser={numberParser}
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
                formatter={numberFormatter}
                parser={numberParser}
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='tienVanChuyen' label='Tiền vận chuyển'>
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={numberFormatter}
                parser={numberParser}
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
                formatter={numberFormatter}
                parser={numberParser}
                placeholder='0'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='chuyenKhoa' label='Chuyên khoa'>
              <Select
                placeholder='Chọn chuyên khoa'
                allowClear
                options={chuyenKhoaOptions}
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

import React from 'react'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  message,
  Row,
  Col,
  Divider,
} from 'antd'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { CreateNhanVienPayload } from '../../../../types'
import { nhanVienServices } from '../../../../redux/services/nhanVienServices'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hooks'
import {
  getListBangCapAction,
  getListChucDanhAction,
  getListTinhAction,
  getListPhuongXaAction,
} from '../../../../redux/actions/commonActions'
import { UserAddOutlined } from '@ant-design/icons'
import StyledModal from '../../../common/StyledModal/StyledModal'

const { Option } = Select

interface Props {
  visible: boolean
  onClose: () => void
  onCreated?: () => void
}

const ModalCreateNhanVien: React.FC<Props> = ({
  visible,
  onClose,
  onCreated,
}) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const common = useAppSelector((s: any) => s.Common)

  // Debug: log common slice so we can see lists returned from sagas at runtime
  React.useEffect(() => {
    console.debug('ModalCreateNhanVien common state:', common)
  }, [common])

  useEffect(() => {
    dispatch(getListBangCapAction())
    dispatch(getListChucDanhAction())
    dispatch(getListTinhAction())
    // Prefetch phường/xã for idTinh=3 (useful for testing/populating list)
    dispatch(getListPhuongXaAction(3))
  }, [dispatch])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload: CreateNhanVienPayload = {
        manv: values.manv,
        tennv: values.tennv,
        ngaysinh: values.ngaysinh
          ? moment(values.ngaysinh).format('YYYY-MM-DD')
          : undefined,
        gioitinh: values.gioitinh,
        dienthoai: values.dienthoai,
        chucdanhviettat: values.chucdanhviettat,
        tenchucdanh: values.tenchucdanh,
        bangcap: values.bangcap,
        tenmaychamcong: values.tenmaychamcong,
        thoiviec: !!values.thoiviec,
        diachi: values.diachi,
        tinh: values.tinh,
        phuong: values.phuong,
      }

      const res: AxiosResponse =
        await nhanVienServices.postInfoNhanVien(payload)
      if (res.status === 200 || res.status === 201) {
        message.success('🎉 Tạo nhân viên thành công!')
        form.resetFields()
        onCreated?.()
        onClose()
      } else {
        message.error('Có lỗi xảy ra, vui lòng thử lại.')
      }
    } catch {
      message.error('Vui lòng kiểm tra lại thông tin.')
    }
  }

  return (
    <StyledModal
      title={
        <div className='flex items-center gap-2 text-lg font-semibold text-blue-600'>
          <UserAddOutlined />
          <span>Thêm mới nhân viên</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText='Tạo nhân viên'
      cancelText='Hủy'
      width={760}
      okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700 text-white' }}
    >
      <Divider className='mt-0 mb-2' />

      <Form form={form} layout='vertical' requiredMark={false}>
        {/* --- Thông tin cơ bản --- */}
        <div>
          <h3 className='text-base font-semibold text-blue-500 mb-1'>
            Thông tin cơ bản
          </h3>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name='manv'
                label='Mã nhân viên'
                rules={[{ required: true, message: 'Nhập mã nhân viên' }]}
              >
                <Input placeholder='VD: NV001' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='tennv'
                label='Tên nhân viên'
                rules={[{ required: true, message: 'Nhập tên nhân viên' }]}
              >
                <Input placeholder='Nguyễn Văn A' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='ngaysinh'
                label='Ngày sinh'
                rules={[{ required: true, message: 'Chọn ngày sinh' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder='Chọn ngày' />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name='gioitinh' label='Giới tính'>
                <Select placeholder='Chọn giới tính'>
                  <Option value='Nam'>Nam</Option>
                  <Option value='Nữ'>Nữ</Option>
                  <Option value='Khác'>Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='dienthoai' label='Số điện thoại'>
                <Input placeholder='0987xxxxxx' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='chucdanhviettat' label='Tên tắt chức danh'>
                <Input placeholder='VD: TP, NV...' />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider className='my-2' />

        {/* --- Thông tin công việc --- */}
        <div>
          <h3 className='text-base font-semibold text-blue-500 mb-1'>
            Thông tin công việc
          </h3>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='tenchucdanh' label='Chức danh'>
                <Select placeholder='Chọn chức danh' allowClear>
                  {(common.listChucDanh || []).map((c: any) => (
                    <Select.Option
                      key={c.idcd || c.id || c.idChucDanh}
                      value={
                        c.tenchucdanh ||
                        c.tenChucDanh ||
                        c.chucdanh ||
                        c.machucdanh
                      }
                    >
                      {c.tenchucdanh ||
                        c.tenChucDanh ||
                        c.chucdanh ||
                        c.machucdanh}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='bangcap' label='Bằng cấp'>
                <Select placeholder='Chọn bằng cấp' allowClear>
                  {(common.listBangCap || []).map((b: any) => (
                    <Select.Option key={b.idbangcap} value={b.bangcap}>
                      {b.bangcap}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='tenmaychamcong' label='Tên máy chấm công'>
                <Input placeholder='Nhập tên máy chấm công' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name='thoiviec' valuePropName='checked'>
                <Checkbox>Đã nghỉ việc</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider className='my-2' />

        {/* --- Thông tin địa chỉ --- */}
        <div>
          <h3 className='text-base font-semibold text-blue-500 mb-1'>
            Thông tin địa chỉ
          </h3>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='tinh' label='Tỉnh / Thành phố'>
                <Select
                  placeholder='Chọn tỉnh / thành phố'
                  showSearch
                  optionFilterProp='children'
                  onChange={(val) => {
                    if (val) dispatch(getListPhuongXaAction(val))
                  }}
                >
                  {(common.listTinh || []).map((t: any) => (
                    <Select.Option
                      key={t.idtinh || t.id || t.idTinh}
                      value={t.idtinh || t.id || t.idTinh}
                    >
                      {t.tentinh || t.tenTinh || t.name || t.ten}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='phuong' label='Phường / Xã'>
                <Select placeholder='Chọn phường / xã' allowClear>
                  {(common.listPhuongXa || []).map((p: any) => (
                    <Select.Option
                      key={p.idphuong || p.id || p.idPhuong}
                      value={p.idphuong || p.id || p.idPhuong}
                    >
                      {p.tenphuong || p.tenPhuong || p.name || p.ten}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='diachi' label='Địa chỉ chi tiết'>
                <Input placeholder='Nhập địa chỉ cụ thể' />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </StyledModal>
  )
}

export default ModalCreateNhanVien

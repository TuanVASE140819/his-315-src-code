import React, { useEffect } from 'react'
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
  data: any
  onUpdated?: (updated?: any) => void
}

const ModalUpdateNhanVien: React.FC<Props> = ({
  visible,
  onClose,
  data,
  onUpdated,
}) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const common = useAppSelector((s: any) => s.Common)
  const currentUser = useAppSelector((s: any) => s.User?.user || s.Auth?.user)

  useEffect(() => {
    dispatch(getListBangCapAction())
    dispatch(getListChucDanhAction())
    dispatch(getListTinhAction())
    if (data?.tinh) dispatch(getListPhuongXaAction(data.tinh))
  }, [dispatch, data])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        manv: data.maNV || data.manv || '',
        tennv: data.tenNV || data.tennv || '',
        ngaysinh: data.ngaySinh
          ? moment(data.ngaySinh)
          : data.ngaysinh
            ? moment(data.ngaysinh)
            : undefined,
        gioitinh: data.gioiTinh || data.gioitinh,
        dienthoai: data.dienThoai || data.dienthoai,
        chucdanhviettat: data.chucDanhVietTat || data.chucdanhviettat,
        tenchucdanh: data.idChucDanh || data.idchucdanh || data.tenchucdanh,
        bangcap: data.idBangCap || data.idbangcap || data.bangcap,
        tenmaychamcong: data.tenMayChamCong || data.tenmaychamcong,
        thoiviec: !!(data.thoiviec || data.thoiViec),
        diachi: data.diaChi || data.diachi,
        tinh: data.idTinh || data.tinh,
        phuong: data.idPhuong || data.phuong,
      })
    } else {
      form.resetFields()
    }
  }, [data, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const payload: any = {
        id: data?.id ?? 0,
        maNV: values.manv,
        chucDanhVietTat: values.chucdanhviettat,
        tenNV: values.tennv,
        dienThoai: values.dienthoai,
        ngaySinh: values.ngaysinh
          ? moment(values.ngaysinh).toISOString()
          : undefined,
        gioiTinh: values.gioitinh,
        idBangCap: Number(values.bangcap) || 0,
        idChucDanh: Number(values.tenchucdanh) || 0,
        tenMayChamCong: values.tenmaychamcong,
        idTinh: Number(values.tinh) || 0,
        idPhuong: Number(values.phuong) || 0,
        diaChi: values.diachi,
        nguoiSua:
          (currentUser &&
            (currentUser.username ||
              currentUser.userName ||
              currentUser.name)) ||
          undefined,
        thoiviec: values.thoiviec ? 1 : 0,
      }

      const res: AxiosResponse = await nhanVienServices.putInfoNhanVien(payload)
      if (res.status === 200 || res.status === 201) {
        message.success('🎉 Cập nhật nhân viên thành công!')
        onUpdated?.(res.data)
        onClose()
      } else {
        message.error('Có lỗi xảy ra, vui lòng thử lại.')
      }
    } catch (err) {
      message.error('Vui lòng kiểm tra lại thông tin.')
    }
  }

  return (
    <StyledModal
      title={
        <div className='flex items-center gap-2 text-lg font-semibold text-blue-600'>
          <UserAddOutlined />
          <span>Cập nhật nhân viên</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText='Cập nhật'
      cancelText='Hủy'
      width={760}
      okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700 text-white' }}
    >
      <Divider className='mt-0 mb-2' />

      <Form form={form} layout='vertical' requiredMark={false}>
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
                      value={c.idcd || c.id || c.idChucDanh}
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
                    <Select.Option
                      key={b.idbangcap || b.id}
                      value={b.idbangcap || b.id}
                    >
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

export default ModalUpdateNhanVien

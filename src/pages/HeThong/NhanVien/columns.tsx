import { Space, Tooltip, Button, Checkbox, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const getColumns = ({ toggleDaNghi, handleDelete }: { toggleDaNghi: any; handleDelete: any }) => {
  return [
    { title: 'STT', dataIndex: 'stt', width: 70, fixed: 'left' },
    {
      title: (
        <div>
          <div>Mã NV</div>
        </div>
      ),
      dataIndex: 'maNV',
      width: 140,
    },
    {
      title: (
        <div>
          <div>Tên tắt chức danh</div>
        </div>
      ),
      dataIndex: 'tenTat',
      width: 140,
    },
    {
      title: (
        <div>
          <div>Tên nhân viên</div>
        </div>
      ),
      dataIndex: 'tenNhanVien',
      width: 320,
    },
    {
      title: (
        <div>
          <div>Giới tính</div>
        </div>
      ),
      dataIndex: 'gioiTinh',
      width: 120,
    },
    {
      title: (
        <div>
          <div>Ngày sinh</div>
        </div>
      ),
      dataIndex: 'ngaySinh',
      width: 140,
    },
    {
      title: (
        <div>
          <div>Địa chỉ</div>
        </div>
      ),
      dataIndex: 'diaChi',
      width: 360,
    },
    {
      title: (
        <div>
          <div>Chức danh</div>
        </div>
      ),
      dataIndex: 'chucDanh',
      width: 180,
    },
    {
      title: 'Đã nghỉ việc',
      dataIndex: 'daNghiViec',
      width: 120,
      render: (_: any, record: any) => (
        <Checkbox checked={record.daNghiViec} onChange={() => toggleDaNghi(record.key)} />
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title='Sửa'>
            <Button type='text' icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm title='Xác nhận xoá?' onConfirm={() => handleDelete(record.key)}>
            <Tooltip title='Xoá'>
              <Button type='text' danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]
}

export default getColumns

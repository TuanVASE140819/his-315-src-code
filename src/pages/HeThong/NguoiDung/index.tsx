import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Input,
  Table,
  Space,
  Tooltip,
  Checkbox,
  Select,
  message,
} from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons'

type UserRow = {
  key: number
  username: string
  staffName?: string
  staffCode?: string
  role?: string
  group?: string
  type?: string
  createdBy?: string
  createdAt?: string
  active?: boolean
}

const NguoiDung: React.FC = () => {
  const [data, setData] = useState<UserRow[]>([])
  const [search, setSearch] = useState('')
  const [groups, setGroups] = useState<Array<{ id: number; name: string }>>([])
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  useEffect(() => {
    import('../../../redux/services/commonServices')
      .then((m) => m.default.getAllNhomNguoiDung())
      .then((res) => {
        const list = res?.data?.data || res?.data || []
        const opts = Array.isArray(list)
          ? list.map((g: any) => ({
              id: g.idnhom ?? g.id ?? g.ID,
              name: (g.tennhom ?? g.ten) || String(g),
            }))
          : []
        setGroups(opts)
      })
      .catch(() => message.warning('Không thể tải danh sách nhóm người dùng'))
  }, [])

  const handleReset = (record: UserRow) => {
    console.log('Reset password for', record.username)
  }

  const handleEdit = (record: UserRow) => {
    console.log('Edit', record.username)
  }

  const handleToggleActive = (key: number, checked: boolean) => {
    setData((prev) =>
      prev.map((r) => (r.key === key ? { ...r, active: checked } : r)),
    )
  }

  const filtered = useMemo(() => {
    const q = (search || '').toLowerCase()
    return data.filter((d) => {
      if (selectedGroup && String(d.group) !== String(selectedGroup))
        return false
      if (!q) return true
      return (
        d.username.toLowerCase().includes(q) ||
        (d.staffName || '').toLowerCase().includes(q) ||
        (d.staffCode || '').toLowerCase().includes(q)
      )
    })
  }, [search, data, selectedGroup])

  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'key', width: 60 },
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Tên nhân viên', dataIndex: 'staffName', key: 'staffName' },
    { title: 'Mã nhân viên', dataIndex: 'staffCode', key: 'staffCode' },
    { title: 'Vai trò', dataIndex: 'role', key: 'role' },
    { title: 'Nhóm quyền', dataIndex: 'group', key: 'group' },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
    { title: 'Người tạo', dataIndex: 'createdBy', key: 'createdBy' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Hiệu lực',
      key: 'active',
      width: 100,
      render: (_: any, record: UserRow) => (
        <Checkbox
          checked={!!record.active}
          onChange={(e) => handleToggleActive(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: 'Reset',
      key: 'reset',
      width: 100,
      render: (_: any, record: UserRow) => (
        <Button onClick={() => handleReset(record)} icon={<ReloadOutlined />}>
          Reset
        </Button>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      render: (_: any, record: UserRow) => (
        <Space>
          <Tooltip title='Chỉnh sửa'>
            <Button
              onClick={() => handleEdit(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex gap-2 items-center'>
          <Input
            placeholder='Tìm kiếm...'
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 360 }}
          />
          <Select
            placeholder='Nhóm quyền'
            style={{ width: 220 }}
            allowClear
            value={selectedGroup ?? undefined}
            onChange={(v) => setSelectedGroup(v ?? null)}
          >
            {groups.map((g) => (
              <Select.Option key={g.id} value={g.id}>
                {g.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1400 }}
      />
    </div>
  )
}

export default NguoiDung

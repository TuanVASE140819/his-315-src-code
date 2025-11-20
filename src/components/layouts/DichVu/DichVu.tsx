import React, { useEffect, useState, useCallback, useRef } from 'react'
import { ExportOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Input, Popconfirm, Table, Tooltip } from 'antd'
import type { TablePaginationConfig } from 'antd'
import {
  PlusOutlined,
  ContainerOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import ModalCreateDichVu from './ModalCreateDichVu/ModalCreateDichVu'
import ModalEditDichVu from './ModalEditDichVu/ModalEditDichVu'
import { debounce } from 'lodash'
import { Select } from 'antd'
import * as XLSX from 'xlsx'
import axiosInstance from '../../../utils/axiosConfig'
import type {
  DichVu,
  DichVuFormValues,
  ModalEditDichVuState,
} from '../../../types'

const defaultData: DichVu[] = [
  {
    id: 1,
    maDichVu: 'DV001',
    tenDichVu: 'Kiểm tra sức khỏe',
    moTa: 'Gói kiểm tra tổng quát',
    gia: 500000,
  },
]

const PAGE_SIZE = 10

const DichVu: React.FC = () => {
  const [list, setList] = useState<DichVu[]>(defaultData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<ModalEditDichVuState>({
    show: false,
    data: {},
  })
  const [search, setSearch] = useState('')
  const [groups, setGroups] = useState<any[]>([])
  const [selectedGroup, setSelectedGroup] = useState<number | null>(1)
  const [valueExport, setValueExport] = useState<DichVu[]>([])
  const [pagination, setPagination] = useState<{
    current: number
    pageSize: number
  }>({
    current: 1,
    pageSize: PAGE_SIZE,
  })
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setValueExport(list)
  }, [list])

  // stable debounced setter to avoid creating a new debounced fn on every call
  const debouncedSetSearch = useRef(
    debounce((keyword: string) => {
      setSearch(keyword)
    }, 400),
  )

  useEffect(() => {
    return () => {
      // cancel any pending debounce on unmount
      debouncedSetSearch.current.cancel()
    }
  }, [])

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch.current(e.target.value)
  }

  const onChangeTable = (pg: TablePaginationConfig) => {
    const { current = 1 } = pg || {}
    setPagination((prev) => ({ ...prev, current }))
  }

  const fetchDichVu = useCallback(
    async ({
      idNhomDv,
      page = 1,
      keyword = '',
    }: {
      idNhomDv?: number | null
      page?: number
      keyword?: string
    } = {}) => {
      try {
        setLoading(true)
        // If idNhomDv is undefined or null (meaning 'Tất cả'), omit idNhomDv param
        const base = '/DichVu/SearchDichVuPhanTrang'
        const groupParam = idNhomDv == null ? '' : `idNhomDv=${idNhomDv}&`
        const url = `${base}?${groupParam}pageNumber=${page}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`
        console.debug('fetchDichVu url:', url)
        const res = await axiosInstance.get(url)
        const items = res?.data?.data?.data || []
        const total = res?.data?.data?.totalCount ?? 0
        const totalPages = res?.data?.data?.totalPages ?? 0
        const mapped: DichVu[] = items.map((it: any) => ({
          id: it.iddv,
          maDichVu: it.madichvu,
          tenDichVu: it.tendichvu,
          moTa: it.ghichu || '',
          gia: it.dongia ?? 0,
          donvi: it.donvi || '',
          raw: it,
        }))
        setList(mapped)
        setTotalCount(total)
        // If backend provides totalPages, compute server pageSize and sync UI
        if (totalPages && total) {
          const serverPageSize = Math.ceil(total / totalPages)
          setPagination((p) => ({ ...p, pageSize: serverPageSize }))
          // Ensure current page is within range
          if (page > totalPages) {
            setPagination((p) => ({ ...p, current: totalPages }))
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // Fetch service groups from external API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get(
          'https://benhviennhi.api.315healthcare.com/api/DichVuNhom/GetAllDichVuNhom',
        )
        const items = res?.data?.data || []
        setGroups(items)
        if (!selectedGroup && items.length) setSelectedGroup(items[0].idnhom)
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    }
    fetchGroups()
  }, [])

  // Reset to first page when group or search changes
  useEffect(() => {
    setPagination((p) => ({ ...p, current: 1 }))
  }, [selectedGroup, search])

  const exportToExcel = () => {
    const headers = ['Mã dịch vụ', 'Tên dịch vụ', 'Mô tả', 'Giá', 'Đơn vị']
    const formatted = filtered(valueExport)?.map((item) => ({
      'Mã dịch vụ': item.maDichVu,
      'Tên dịch vụ': item.tenDichVu,
      'Mô tả': item.moTa,
      Giá: item.gia,
      'Đơn vị': item.donvi,
    }))
    const ws = XLSX.utils.json_to_sheet(formatted, { header: headers })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Dịch vụ')
    XLSX.writeFile(wb, 'DichVu.xlsx')
  }

  const handleModalOpenEdit = useCallback((record: DichVu) => {
    setIsModalOpenEdit({ show: true, data: record })
  }, [])

  const filtered = (data: DichVu[]) =>
    data?.filter((item) =>
      !search
        ? true
        : [item.maDichVu, item.tenDichVu, item.moTa, item.gia]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase()),
    )

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((p) => p.id !== id))
    setTotalCount((t) => Math.max(0, t - 1))
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      width: 60,
      fixed: 'left' as const,
      align: 'center' as const,
      render: (_: any, __: any, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: 'Mã dịch vụ', dataIndex: 'maDichVu', key: 'maDichVu', width: 160 },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'tenDichVu',
      key: 'tenDichVu',
      width: 300,
    },
    { title: 'Mô tả', dataIndex: 'moTa', key: 'moTa', width: 300 },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
      width: 140,
      align: 'right' as const,
    },
    { title: 'Đơn vị', dataIndex: 'donvi', key: 'donvi', width: 120 },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: DichVu) => (
        <ul
          className='flex justify-around m-0 p-0'
          style={{ listStyle: 'none' }}
        >
          <li>
            <Tooltip title='Xem' color='#108ee9'>
              <ContainerOutlined
                onClick={() => handleModalOpenEdit(record)}
                className='text-xl text-[#108ee9] cursor-pointer'
              />
            </Tooltip>
          </li>
          <li>
            <Tooltip title='Xoá' color='red'>
              <Popconfirm
                title='Xóa dịch vụ'
                onConfirm={() => handleDelete(record.id)}
                okText='Xác nhận'
                cancelText='Hủy'
                icon={<DeleteOutlined style={{ color: 'red' }} />}
              >
                <DeleteOutlined className='text-xl text-red-500 cursor-pointer' />
              </Popconfirm>
            </Tooltip>
          </li>
        </ul>
      ),
    },
  ]

  useEffect(() => {
    // Call fetch with explicit selectedGroup to avoid closure issues
    console.debug('calling fetchDichVu with', {
      selectedGroup,
      pagination,
      search,
    })
    fetchDichVu({
      idNhomDv: selectedGroup,
      page: pagination.current,
      keyword: search,
    })
  }, [fetchDichVu, selectedGroup, pagination.current, search])

  return (
    <>
      <div className='p-2 bg-white rounded-xl border'>
        <div className='flex justify-between gap-2'>
          <div className='w-60'>
            <Select
              value={selectedGroup}
              onChange={(v) => setSelectedGroup(v)}
              options={[
                { label: 'Tất cả', value: null },
                ...groups.map((g) => ({
                  label: g.tennhom,
                  value: g.idnhom,
                })),
              ]}
              placeholder='Nhóm dịch vụ'
              allowClear
              style={{ width: '100%' }}
            />
          </div>
          <div className='w-80'>
            <Input
              allowClear
              className='w-full'
              placeholder='Tìm kiếm dịch vụ'
              onChange={handleSearchInput}
              prefix={<SearchOutlined />}
            />
          </div>
          <Button
            onClick={() => setList(defaultData)}
            type='primary'
            shape='circle'
            icon={<SyncOutlined />}
          />
          <Button
            disabled={!filtered(valueExport)?.length}
            onClick={exportToExcel}
            type='text'
            size='middle'
            className='text-green-700 ml-auto'
            icon={<ExportOutlined />}
          >
            Xuất Excel
          </Button>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Tạo dịch vụ
          </Button>
        </div>
        <div className='mt-5'>
          <ConfigProvider
            theme={{
              token: { padding: 5, borderRadius: 0 },
              components: {
                Table: {
                  rowHoverBg: '#ecf0f1',
                  headerBg: '#e6e6e6',
                  footerBg: '#e6e6e6',
                  borderColor: '#BABABA',
                },
              },
            }}
          >
            <Table
              bordered
              loading={loading}
              scroll={{ x: list?.length ? 'max-content' : 1500, y: 500 }}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: totalCount,
                showSizeChanger: false,
              }}
              onChange={onChangeTable}
              columns={columns}
              dataSource={filtered(list)?.map((item) => ({
                key: item.id,
                ...item,
              }))}
            />
          </ConfigProvider>
        </div>
      </div>

      {isModalOpen && (
        <ModalCreateDichVu
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onCreate={(newItem: DichVuFormValues) => {
            setList((prev) => [
              { ...newItem, id: Date.now(), moTa: newItem.moTa || '' },
              ...prev,
            ])
          }}
        />
      )}
      {isModalOpenEdit.show && (
        <ModalEditDichVu
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          onUpdate={(updated: DichVu) =>
            setList((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            )
          }
        />
      )}
    </>
  )
}

export default DichVu

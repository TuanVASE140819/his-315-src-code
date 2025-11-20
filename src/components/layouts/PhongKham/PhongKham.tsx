import React, { useEffect, useState } from 'react'
import {
  ExportOutlined,
  PlusOutlined,
  ContainerOutlined,
  DeleteOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Input,
  Popconfirm,
  Table,
  Tooltip,
  Select,
} from 'antd'
import ModalCreatePhongKham from './ModalCreatePhongKham'
import ModalEditPhongKham from './ModalEditPhongKham'
import type { TablePaginationConfig } from 'antd'
import * as XLSX from 'xlsx'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { COMMON, PHONGKHAM } from '../../../redux/constants/constants'

interface KhoaPhong {
  idKhoaPhong: number
  maKhoaPhong: string
  tenKhoaPhong: string
  ghiChu?: string
  suDung: number
  idChuyenKhoa: number
  maBoPhan?: string
}

interface PhongKham {
  id: number
  maPhongKham: string
  tenPhongKham: string
  diaChi?: string
  soDienThoai?: string
  email?: string
  moTa?: string
  idKhoaPhong?: number
  suDung?: number
}

const defaultData: PhongKham[] = []
const PAGE_SIZE = 10

const PhongKham: React.FC = () => {
  const [list, setList] = useState<PhongKham[]>(defaultData)
  const [search, setSearch] = useState('')
  const dispatch = useAppDispatch()
  const khoaPhongListFromStore = useAppSelector(
    (s: any) => s.Common?.listKhoaPhong || [],
  )
  const [khoaPhongList, setKhoaPhongList] = useState<KhoaPhong[]>([])
  const [selectedKhoaPhong, setSelectedKhoaPhong] = useState<number | null>(
    null,
  )
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<{
    show: boolean
    data: Partial<PhongKham>
  }>({
    show: false,
    data: {},
  })
  const [pagination, setPagination] = useState<{
    current: number
    pageSize: number
  }>({
    current: 1,
    pageSize: PAGE_SIZE,
  })
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const phongKhamState = useAppSelector((s: any) => s.PhongKham || {})
  const storeList = phongKhamState.list || []
  const storeTotal = phongKhamState.totalCount || 0
  const storePageSize = phongKhamState.pageSize || PAGE_SIZE

  useEffect(() => {
    dispatch({ type: COMMON.GET_LIST_KHOAPHONG })
  }, [dispatch])

  useEffect(() => {
    setKhoaPhongList(khoaPhongListFromStore)
  }, [khoaPhongListFromStore])

  const filtered = (data: PhongKham[]) =>
    data?.filter((item) => {
      const matchesKhoaPhong =
        selectedKhoaPhong === null || item.idKhoaPhong === selectedKhoaPhong
      const matchesStatus =
        selectedStatus === null || item.suDung === selectedStatus
      const matchesSearch = !search
        ? true
        : [item.maPhongKham, item.tenPhongKham, item.diaChi, item.soDienThoai]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
      return matchesKhoaPhong && matchesStatus && matchesSearch
    })

  useEffect(() => {
    setLoading(true)
    dispatch({
      type: PHONGKHAM.GET_LIST_PHONGKHAM,
      payload: {
        idKhoaPhong: selectedKhoaPhong,
        pageNumber: pagination.current,
        keyword: search,
        suDung: selectedStatus,
      },
    })
  }, [dispatch, selectedKhoaPhong, selectedStatus, pagination.current, search])

  useEffect(() => {
    setList(storeList)
    setTotalCount(storeTotal)
    setPagination((p) => ({ ...p, pageSize: storePageSize }))
    setLoading(false)
  }, [storeList, storeTotal, storePageSize])

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onChangeTable = (pg: TablePaginationConfig) => {
    const { current = 1 } = pg || {}
    setPagination((prev) => ({ ...prev, current }))
  }

  const exportToExcel = () => {
    const headers = [
      'Mã phòng khám',
      'Tên phòng khám',
      'Địa chỉ',
      'Số điện thoại',
      'Email',
      'Mô tả',
    ]
    const formatted = filtered(list)?.map((item) => ({
      'Mã phòng khám': item.maPhongKham,
      'Tên phòng khám': item.tenPhongKham,
      'Địa chỉ': item.diaChi,
      'Số điện thoại': item.soDienThoai,
      Email: item.email,
      'Mô tả': item.moTa,
    }))
    const ws = XLSX.utils.json_to_sheet(formatted, { header: headers })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'PhongKham')
    XLSX.writeFile(wb, 'PhongKham.xlsx')
  }

  const handleModalOpenEdit = (record: PhongKham) => {
    setIsModalOpenEdit({ show: true, data: record })
  }

  const handleDelete = (id: number) => {
    setList((prev) => prev.filter((p) => p.id !== id))
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
    {
      title: 'Mã phòng khám',
      dataIndex: 'maPhongKham',
      key: 'maPhongKham',
      width: 150,
    },
    {
      title: 'Tên phòng khám',
      dataIndex: 'tenPhongKham',
      key: 'tenPhongKham',
      width: 300,
    },
    { title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi', width: 300 },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
      width: 150,
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: PhongKham) => (
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
                title='Xóa phòng khám'
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

  const memoFiltered = filtered(list)

  return (
    <>
      <div className='p-2 bg-white rounded-xl border'>
        <div className='flex justify-between gap-2'>
          <div className='w-60'>
            <Select
              value={selectedKhoaPhong}
              onChange={(v) => setSelectedKhoaPhong(v)}
              placeholder='Khoa phòng'
              allowClear
              style={{ width: '100%' }}
              options={[
                { label: 'Tất cả', value: null },
                ...khoaPhongList.map((k) => ({
                  label: k.tenKhoaPhong,
                  value: k.idKhoaPhong,
                })),
              ]}
            />
          </div>
          <div className='w-60'>
            <Select
              value={selectedStatus}
              onChange={(v) => setSelectedStatus(v)}
              placeholder='Trạng thái'
              allowClear
              style={{ width: '100%' }}
              options={[
                { label: 'Tất cả', value: null },
                { label: 'Hoạt động', value: 1 },
                { label: 'Tạm dùng', value: 0 },
              ]}
            />
          </div>
          <div className='w-80'>
            <Input
              allowClear
              className='w-full'
              placeholder='Tìm kiếm phòng khám'
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
            disabled={!memoFiltered?.length}
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
            Tạo phòng khám
          </Button>
          <ModalCreatePhongKham
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <ModalEditPhongKham
            open={isModalOpenEdit.show}
            data={isModalOpenEdit.data}
            onClose={() => setIsModalOpenEdit({ show: false, data: {} })}
          />
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
              scroll={{
                x: list?.length ? 'max-content' : 1500,
                y: 500,
              }}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: totalCount,
                showSizeChanger: false,
              }}
              onChange={(pg) => {
                const { current = 1 } = pg || {}
                setPagination((prev) => ({ ...prev, current }))
              }}
              columns={columns}
              dataSource={list?.map((item) => ({ key: item.id, ...item }))}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  )
}

export default PhongKham

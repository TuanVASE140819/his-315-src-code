import React, { useCallback, useEffect, useState } from 'react'
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
import ModalCreatePartner from './ModalCreatePartner/ModalCreatePartner'
import ModalEditPartner from './ModalEditPartner/ModalEditPartner'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import {
  getListPartnerAction,
  deletePartnerAction,
} from '../../../redux/actions/partnerActions'
import { debounce } from 'lodash'
import * as XLSX from 'xlsx'
import type {
  PartnerUI,
  PartnerFormValues,
  ModalEditPartnerState,
  PartnerItem,
} from '../../../types/partner.types'

const defaultData: PartnerUI[] = [
  {
    id: 1,
    maDoiTac: 'DT001',
    maDoiTac_New: 'KT001',
    tenVietTat: 'ABC',
    tenDoiTac: 'Công ty ABC',
    diaChi: '123 Đường A, Phường B, TP C',
    tenPhuongXa: 'Phường B',
    tenTinhTP: 'TP C',
    dienThoai: '0123456789',
    maSoThue: '123456789',
    email: 'abc@example.com',
    website: 'https://abc.example',
  },
]

const PAGE_SIZE = 20

const Partner: React.FC = () => {
  const dispatch = useAppDispatch()
  const statePartner = useAppSelector((s) => s.Partner)
  const [listPartner, setListPartner] = useState<PartnerUI[]>(defaultData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<ModalEditPartnerState>(
    {
      show: false,
      data: {},
    },
  )
  const [search, setSearch] = useState('')
  const [data2, setData2] = useState<PartnerUI[]>(defaultData)
  const [valueExport, setValueExport] = useState<PartnerUI[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    // load first page
    dispatch(getListPartnerAction({ keyword: '', pageNumber: 1 }))
  }, [dispatch])

  useEffect(() => {
    // update local data when store changes
    const payload: PartnerItem[] = statePartner?.list || []
    // normalize to UI shape (map backend fields to front fields)
    const mapped: PartnerUI[] = payload.map((it) => ({
      id: it.iddoitac,
      maDoiTac: (it.madoitac || '').trim(),
      maDoiTac_New: it.madoitac || '',
      tenVietTat: it.tenviettat || '',
      tenDoiTac: it.tendoitac || '',
      diaChi: it.diachi || '',
      tenPhuongXa: it.tenphuongxa || '',
      tenTinhTP: it.tentinh || '',
      dienThoai: it.dienthoai || '',
      maSoThue: it.masothue || '',
      email: it.email || '',
      website: it.website || '',
    }))
    setListPartner(mapped)
    setData2(mapped)
    setValueExport(mapped)
    setPagination((prev) => ({
      ...prev,
      current: statePartner?.pageNumber || 1,
    }))
  }, [statePartner])

  const debounceGetDataSearch = useCallback(
    debounce((keyword: string) => {
      setSearch(keyword)
    }, 400),
    [],
  )

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    debounceGetDataSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const onChangeTable = (pg: TablePaginationConfig) => {
    const { current = 1 } = pg || {}
    setPagination((prev) => ({ ...prev, current }))
    dispatch(getListPartnerAction({ keyword: search, pageNumber: current }))
  }

  // Server-side search/pagination: when `search` changes we request page 1 from server
  useEffect(() => {
    // reset to first page on new search
    setPagination((prev) => ({ ...prev, current: 1 }))
    const page = 1
    dispatch(getListPartnerAction({ keyword: search, pageNumber: page }))
  }, [search, dispatch])

  const filteredData2 = (data: PartnerUI[]) =>
    data?.filter((item) =>
      !search
        ? true
        : [
            item.maDoiTac,
            item.maDoiTac_New,
            item.tenVietTat,
            item.tenDoiTac,
            item.diaChi,
            item.dienThoai,
            item.email,
            item.website,
          ]
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase()),
    )

  const handleDeleteById = (id: number) => {
    dispatch(
      deletePartnerAction(id, () =>
        dispatch(
          getListPartnerAction({
            keyword: search,
            pageNumber: pagination.current,
          }),
        ),
      ),
    )
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
    { title: 'Mã đối tác', dataIndex: 'maDoiTac', key: 'maDoiTac', width: 140 },
    {
      title: 'Mã đối tác KT',
      dataIndex: 'maDoiTac_New',
      key: 'maDoiTac_New',
      width: 140,
    },
    {
      title: 'Tên viết tắt',
      dataIndex: 'tenVietTat',
      key: 'tenVietTat',
      width: 120,
    },
    {
      title: 'Tên đối tác',
      dataIndex: 'tenDoiTac',
      key: 'tenDoiTac',
      width: 300,
    },
    { title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi', width: 300 },
    {
      title: 'SĐT',
      dataIndex: 'dienThoai',
      key: 'dienThoai',
      width: 140,
      align: 'center' as const,
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'maSoThue',
      key: 'maSoThue',
      width: 160,
      align: 'center' as const,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      align: 'center' as const,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      width: 200,
      align: 'center' as const,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: PartnerUI) => (
        <ul
          className='flex justify-around m-0 p-0'
          style={{ listStyle: 'none' }}
        >
          <li>
            <Tooltip title='Xem' color='#108ee9'>
              <ContainerOutlined
                onClick={() => setIsModalOpenEdit({ show: true, data: record })}
                className='text-xl text-[#108ee9] cursor-pointer'
              />
            </Tooltip>
          </li>
          <li>
            <Tooltip title='Xoá' color='red'>
              <Popconfirm
                title='Xóa đối tác'
                onConfirm={() => handleDeleteById(record.id)}
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

  const exportToExcel = () => {
    const headers = [
      'Mã đối tác',
      'Mã đối tác KT',
      'Tên viết tắt',
      'Tên đối tác',
      'Địa chỉ',
      'SĐT',
      'Mã số thuế',
      'Email',
      'Website',
    ]
    const formattedData = filteredData2(valueExport)?.map((item) => ({
      'Mã đối tác': item.maDoiTac,
      'Mã đối tác KT': item.maDoiTac_New,
      'Tên viết tắt': item.tenVietTat,
      'Tên đối tác': item.tenDoiTac,
      'Địa chỉ': `${item.diaChi ?? ''}${item.tenPhuongXa ? ', ' + item.tenPhuongXa : ''}${item.tenTinhTP ? ', ' + item.tenTinhTP : ''}`,
      'SĐT ': item.dienThoai,
      'Mã số thuế': item.maSoThue,
      'Email ': item.email,
      'Website ': item.website,
    }))
    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
      header: headers,
    })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1')
    XLSX.writeFile(wb, 'DoiTac.xlsx')
  }

  useEffect(() => {
    setValueExport(listPartner)
  }, [listPartner])

  return (
    <>
      <div className='p-5 bg-[#EFEFEF]'>
        <div className='p-2 bg-white rounded-xl border'>
          <div className='flex justify-between gap-2'>
            <div className='w-80'>
              <Input
                allowClear
                className='w-full'
                placeholder='Tìm kiếm'
                onChange={handleSearchInput}
                prefix={<SearchOutlined />}
              />
            </div>
            <Button
              onClick={() => setListPartner(defaultData)}
              type='primary'
              shape='circle'
              icon={<SyncOutlined />}
            />
            <Button
              disabled={!filteredData2(valueExport)?.length}
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
              Tạo đối tác
            </Button>
          </div>
          <div className='mt-5'>
            <ConfigProvider
              theme={{
                token: {
                  padding: 5,
                  borderRadius: 0,
                },
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
                scroll={{
                  x: listPartner?.length ? 'max-content' : 1500,
                  // set vertical scroll height so the table has a fixed viewport
                  y: 500,
                }}
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: statePartner?.totalCount || 0,
                  showSizeChanger: false,
                }}
                onChange={onChangeTable}
                columns={columns}
                dataSource={listPartner?.map((item) => ({
                  key: item.id,
                  ...item,
                }))}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalCreatePartner
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onCreate={(newItem: PartnerFormValues) => {
            setListPartner((prev) => [
              {
                ...newItem,
                id: Date.now(),
                maDoiTac_New: newItem.maDoiTac,
                tenVietTat: newItem.tenVietTat || '',
                diaChi: newItem.diaChi || '',
                tenPhuongXa: '',
                tenTinhTP: '',
                dienThoai: newItem.dienThoai || '',
                maSoThue: newItem.maSoThue || '',
                email: newItem.email || '',
                website: newItem.website || '',
              },
              ...prev,
            ])
          }}
        />
      )}
      {isModalOpenEdit.show && (
        <ModalEditPartner
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          onUpdate={(updated: PartnerUI) => {
            setListPartner((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            )
          }}
        />
      )}
    </>
  )
}

export default Partner

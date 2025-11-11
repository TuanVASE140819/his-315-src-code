import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import {
  Table,
  Input,
  Button,
  Space,
  Checkbox,
  Tooltip,
  Popconfirm,
  Spin,
} from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { getListNhanVienAction } from '../../../redux/actions/nhanVienActions'
import getColumns from './columns'

const mapApiToRow = (item, index) => ({
  key: item.id,
  stt: index + 1,
  maNV: item.manv || '-',
  tenTat: item.chucdanhviettat || '-',
  tenNhanVien: item.tennv || '-',
  gioiTinh: item.gioitinh || '-',
  ngaySinh: item.ngaysinh ? new Date(item.ngaysinh).toLocaleDateString() : '-',
  diaChi: item.diachi || '-',
  chucDanh: item.tenchucdanh || '-',
  daNghiViec: !!item.thoiviec,
  raw: item,
})

const NhanVien = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [keyword, setKeyword] = useState('')
  const dispatch = useAppDispatch()
  const stateNhanVien = useAppSelector((s) => s.NhanVien)
  const pageSizeSyncedRef = useRef(false)
  const pageSizeRef = useRef(pageSize)

  // keep ref in sync with state
  useEffect(() => {
    pageSizeRef.current = pageSize
  }, [pageSize])

  useEffect(() => {
    dispatch(getListNhanVienAction({ keyword, pageIndex }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex])

  // When reducer receives totalCount and totalPages from API, compute server page size
  useEffect(() => {
    try {
      if (!pageSizeSyncedRef.current) {
        const totalCount = stateNhanVien?.totalCount || 0
        const totalPages = stateNhanVien?.totalPages || 0
        if (totalCount > 0 && totalPages > 0) {
          const computed = Math.ceil(totalCount / totalPages)
          if (computed && computed !== pageSizeRef.current) {
            setPageSize(computed)
            pageSizeSyncedRef.current = true
            // adjust stt calculation can stay the same, pageIndex used below
          }
        }
      }
    } catch (e) {
      // silent
    }
  }, [stateNhanVien?.totalCount, stateNhanVien?.totalPages])

  const onSearch = () => {
    setPageIndex(1)
    dispatch(getListNhanVienAction({ keyword, pageIndex: 1 }))
  }

  const onResetFilters = () => {
    setKeyword('')
    setPageIndex(1)
    dispatch(getListNhanVienAction({ keyword: '', pageIndex: 1 }))
  }

  const handleDelete = useCallback(async (key) => {
    // Implement delete call if API exists
    setData((prev) => prev.filter((r) => r.key !== key))
  }, [])

  const toggleDaNghi = useCallback((key) => {
    setData((prev) =>
      prev.map((r) =>
        r.key === key ? { ...r, daNghiViec: !r.daNghiViec } : r,
      ),
    )
  }, [])

  const columns = useMemo(
    () => getColumns({ toggleDaNghi, handleDelete }),
    [toggleDaNghi, handleDelete],
  )

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm...'
            style={{ width: 260 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            suffix={<ReloadOutlined onClick={onResetFilters} />}
            onPressEnter={onSearch}
          />
          <Button onClick={onSearch}>Tìm</Button>
        </div>
        <div>
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={(stateNhanVien.list || []).map((it, idx) =>
            mapApiToRow(it, idx + (pageIndex - 1) * pageSize),
          )}
          pagination={{
            current: pageIndex,
            total: stateNhanVien?.totalCount || 0,
            pageSize,
            onChange: (p, size) => {
              setPageIndex(p)
              setPageSize(size)
              dispatch(getListNhanVienAction({ keyword, pageIndex: p }))
            },
          }}
          scroll={{ x: 1600, y: 600 }}
          bordered
          size='middle'
        />
      </Spin>
    </div>
  )
}

export default NhanVien

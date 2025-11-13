import React, { useState, useRef, useEffect } from 'react'
import {
  Tabs,
  AutoComplete,
  Input,
  Select,
  DatePicker,
  Table,
  Button,
  Space,
  Row,
  Col,
  Card,
  Typography,
  Divider,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import axiosInstance from '../../../utils/axiosConfig'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { COMMON } from '../../../redux/constants/constants'

const { Title, Text } = Typography

interface NhapKhoItem {
  key: string
  stt: number
  tenHang: string
  maHang: string
  sl: number
  donVi: string
  quyDoi: number
  slQuyDoi: number
  donGia: number
  sl2: number
  donGia2: number
  giaGpp: number
  tongLe: number
  tongTien: number
  phanVanChuyen: number
  chietKhau: number
  tienChietKhau: number
  vat: number
  tienVat: number
}

const NhapKho: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nhapkho')
  const [dataSource, setDataSource] = useState<NhapKhoItem[]>([])
  const [dataSourceSearch, setDataSourceSearch] = useState<any[]>([])
  const searchTimeoutRef = useRef<number | null>(null)
  const searchControllerRef = useRef<AbortController | null>(null)

  const handleSearchItems = (q: string) => {
    if (searchTimeoutRef.current) window.clearTimeout(searchTimeoutRef.current)
    if (!q || q.trim().length < 2) {
      setDataSourceSearch([])
      return
    }
    // debounce 300ms
    // cancel any previous in-flight request
    if (searchControllerRef.current) {
      try {
        searchControllerRef.current.abort()
      } catch (e) {
        // ignore
      }
      searchControllerRef.current = null
    }
    const controller = new AbortController()
    searchControllerRef.current = controller
    searchTimeoutRef.current = window.setTimeout(async () => {
      try {
        const res = await axiosInstance.get(
          `https://benhviennhi.api.315healthcare.com/api/ThuocVatTu/SearchThuocVatTu?keyword=${encodeURIComponent(q)}`,
          { signal: controller.signal },
        )
        // Normalize the response: handle shapes like { data: { data: [...] } }
        const raw = res?.data?.data?.data ?? res?.data?.data ?? res?.data ?? []
        const list = Array.isArray(raw) ? raw : []
        // Debug: log the raw response and normalized list length
        // Use console.debug so it can be filtered separately in devtools
        console.debug('Search API response raw:', res?.data)
        console.debug('Normalized search list length:', list.length)
        setDataSourceSearch(list)
      } catch (err) {
        // Ignore abort/cancel errors
        const name = (err as any)?.name
        const code = (err as any)?.code
        if (
          name === 'AbortError' ||
          name === 'CanceledError' ||
          code === 'ERR_CANCELED'
        ) {
          return
        }
        console.error('Search items error', err)
        setDataSourceSearch([])
      }
    }, 300)
  }

  // cleanup on unmount: clear timeout and abort controller
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = null
      }
      if (searchControllerRef.current) {
        try {
          searchControllerRef.current.abort()
        } catch (e) {
          // ignore
        }
        searchControllerRef.current = null
      }
    }
  }, [])

  const handleSelectItem = (option: any) => {
    // option is expected to be the full item object (or an index handled elsewhere)
    const item = option || {}
    const gia =
      item.giamua ?? item.giaban ?? item.giagpp ?? item.dongia ?? item.gia ?? 0
    const newRow: NhapKhoItem = {
      key: `${Date.now()}`,
      stt: dataSource.length + 1,
      tenHang: item.tenbietduoc || item.tenVatTu || item.ten || item.Ten || '',
      maHang: item.mathuoc || item.maVatTu || item.mavt || item.ma || '',
      sl: 1,
      donVi: item.dvt || item.donVi || item.donvidung || '',
      quyDoi: item.quycachdonggoi ?? item.quycach ?? 0,
      slQuyDoi: 1,
      donGia: gia,
      sl2: 0,
      donGia2: 0,
      giaGpp: item.giagpp ?? 0,
      tongLe: 0,
      tongTien: gia,
      phanVanChuyen: 0,
      chietKhau: 0,
      tienChietKhau: 0,
      vat: item.ptvatnhap ?? item.ptvatbanle ?? 0,
      tienVat: 0,
    }
    setDataSource((prev) => [...prev, newRow])
  }

  // get logged in user from redux store
  const { infoUser } = useAppSelector((state) => state.User)

  const displayName = infoUser?.fullName

  const [nguoiNhap] = useState(displayName)
  const [congTy] = useState('')
  const [ngayNhap] = useState(dayjs())
  const [phuongThuc, setPhuongThuc] = useState('')
  const [hinhThuc, setHinhThuc] = useState('')
  const dispatch = useAppDispatch()
  const { listKhoaPhong = [], listKhoByKhoaPhong = [] } = useAppSelector(
    (s: any) => s.Common || {},
  )
  const { list: partnerList = [] } = useAppSelector((s: any) => s.Partner || {})
  const [khoaPhongOptions, setKhoaPhongOptions] = useState<any[]>([])
  const [isKhoaPhongLoading, setIsKhoaPhongLoading] = useState(false)
  const [selectedKhoaPhong, setSelectedKhoaPhong] = useState<number | null>(
    null,
  )
  const [khoOptions, setKhoOptions] = useState<any[]>([])
  const [isKhoLoading, setIsKhoLoading] = useState(false)
  const [selectedKho, setSelectedKho] = useState<number | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null)
  const [partnerFields, setPartnerFields] = useState({
    name: '',
    address: '',
    phone: '',
    masothue: '',
    contact: '',
    madoitac: '',
    ghichu: '',
  })

  // load KhoaPhong from redux on mount
  useEffect(() => {
    setIsKhoaPhongLoading(true)
    dispatch({ type: COMMON.GET_LIST_KHOAPHONG })
    // load partners (all)
    dispatch({ type: 'GET_ALL_DOITAC' })
    // listen for update in store
    setIsKhoaPhongLoading(false)
  }, [dispatch])

  const fetchKhoByKhoa = (idKhoaPhong: number | string) => {
    setIsKhoLoading(true)
    dispatch({ type: COMMON.GET_LIST_KHO_BY_KHOAPHONG, idKhoaPhong })
    setIsKhoLoading(false)
  }

  // sync redux lists into local state for the Select components
  useEffect(() => {
    setKhoaPhongOptions(listKhoaPhong)
  }, [listKhoaPhong])

  useEffect(() => {
    // partnerList from store -> nothing else to do here
  }, [partnerList])

  useEffect(() => {
    setKhoOptions(listKhoByKhoaPhong)
  }, [listKhoByKhoaPhong])

  const label = (text: string, required?: boolean) => (
    <Text style={{ fontSize: 13 }}>
      {required && <span style={{ color: 'red' }}>*</span>}
      {text}
    </Text>
  )

  const columns: ColumnsType<NhapKhoItem> = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 50, align: 'center' },
    { title: 'Tên hàng', dataIndex: 'tenHang', key: 'tenHang', width: 200 },
    { title: 'Mã hàng', dataIndex: 'maHang', key: 'maHang', width: 120 },
    { title: 'SL', dataIndex: 'sl', key: 'sl', width: 70, align: 'right' },
    { title: 'Đơn vị', dataIndex: 'donVi', key: 'donVi', width: 70 },
    {
      title: 'Quy cách',
      dataIndex: 'quyDoi',
      key: 'quyDoi',
      width: 90,
      align: 'right',
    },
    {
      title: 'SL quy đổi',
      dataIndex: 'slQuyDoi',
      key: 'slQuyDoi',
      width: 100,
      align: 'right',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      key: 'donGia',
      width: 120,
      align: 'right',
      render: (val) => val?.toLocaleString(),
    },
    {
      title: <span style={{ color: '#ff4d4f' }}>Tổng tiền</span>,
      dataIndex: 'tongTien',
      key: 'tongTien',
      width: 130,
      align: 'right',
      render: (val) => val?.toLocaleString(),
    },
    {
      title: 'VAT (%)',
      dataIndex: 'vat',
      key: 'vat',
      width: 90,
      align: 'right',
    },
    {
      title: 'Tiền VAT',
      dataIndex: 'tienVat',
      key: 'tienVat',
      width: 120,
      align: 'right',
      render: (val) => val?.toLocaleString(),
    },
  ]

  const handleAddRow = () => {
    const newRow: NhapKhoItem = {
      key: `${Date.now()}`,
      stt: dataSource.length + 1,
      tenHang: '',
      maHang: '',
      sl: 0,
      donVi: '',
      quyDoi: 0,
      slQuyDoi: 0,
      donGia: 0,
      sl2: 0,
      donGia2: 0,
      giaGpp: 0,
      tongLe: 0,
      tongTien: 0,
      phanVanChuyen: 0,
      chietKhau: 0,
      tienChietKhau: 0,
      vat: 0,
      tienVat: 0,
    }
    setDataSource([...dataSource, newRow])
  }

  const handleReset = () => setDataSource([])
  const handleSave = () => console.log('Save data:', dataSource)
  const handleSaveAndPrint = () => console.log('Save and print:', dataSource)

  const tabItems = [
    { key: 'nhapkho', label: 'Nhập kho' },
    { key: 'phieunhap', label: 'Phiếu nhập' },
    { key: 'chitiethang', label: 'Chi tiết hàng' },
    { key: 'nhapkhovpp', label: 'Nhập kho VPP' },
    { key: 'hangvppdanhap', label: 'Hàng VPP đã nhập' },
    { key: 'phieuin', label: 'Phiếu in' },
  ]

  return (
    <div style={{ padding: 12, background: '#f5f7fa', minHeight: '100vh' }}>
      <Card
        bordered
        bodyStyle={{ padding: '12px 16px' }}
        style={{
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          borderRadius: 8,
          background: '#fff',
        }}
      >
        <Row justify='space-between' align='middle'>
          <Title level={5} style={{ margin: 0 }}>
            🧾 Phiếu nhập kho
          </Title>
          <Space>
            <Text strong>Ngày nhập:</Text>
            <DatePicker
              value={ngayNhap}
              format='DD-MM-YYYY HH:mm:ss'
              showTime
              size='small'
              style={{ width: 180 }}
            />
          </Space>
        </Row>

        <Divider style={{ margin: '8px 0' }} />

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size='small'
          style={{ marginBottom: 12 }}
        />

        <Row gutter={[12, 6]}>
          <Col span={9}>
            <Row gutter={[6, 6]}>
              <Col span={7}>{label('Người nhập')}</Col>
              <Col span={17}>
                <Input value={nguoiNhap} readOnly size='small' />
              </Col>

              <Col span={7}>{label('Đối tác', true)}</Col>
              <Col span={17}>
                <Select
                  showSearch
                  placeholder='Chọn đối tác'
                  size='small'
                  options={partnerList.map((p: any) => ({
                    value: p.iddoitac,
                    label: p.tendoitac || p.tenviettat || p.madoitac,
                  }))}
                  onChange={(val) => {
                    const p = partnerList.find(
                      (x: any) => x.iddoitac === Number(val),
                    )
                    setSelectedPartner(Number(val))
                    if (p) {
                      setPartnerFields({
                        name: p.tendoitac || '',
                        address: p.diachitonghop || p.diachi || '',
                        phone: p.dienthoai || p.didong || '',
                        masothue: p.masothue || '',
                        contact: p.nguoilienhe || '',
                        madoitac: p.madoitac || '',
                        ghichu: p.ghichu || '',
                      })
                    } else {
                      setPartnerFields({
                        name: '',
                        address: '',
                        phone: '',
                        masothue: '',
                        contact: '',
                        madoitac: '',
                        ghichu: '',
                      })
                    }
                  }}
                />
              </Col>

              <Col span={7}>{label('Địa chỉ')}</Col>
              <Col span={17}>
                <Input
                  value={partnerFields.address}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>

              <Col span={7}>{label('Tên phiếu')}</Col>
              <Col span={17}>
                <Input
                  value={partnerFields.name}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>

              <Col span={7}>{label('Ghi chú')}</Col>
              <Col span={17}>
                <Input
                  value={partnerFields.ghichu}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      ghichu: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>
            </Row>
          </Col>

          <Col span={15}>
            <Row gutter={[6, 6]}>
              <Col span={5}>{label('Nơi nhập')}</Col>
              <Col span={7}>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Chọn'
                  size='small'
                  loading={isKhoaPhongLoading}
                  options={khoaPhongOptions.map((k) => ({
                    value: k.idKhoaPhong,
                    label: k.tenKhoaPhong || k.maKhoaPhong,
                  }))}
                  onChange={(value) => {
                    setSelectedKhoaPhong(Number(value))
                    fetchKhoByKhoa(value)
                  }}
                />
              </Col>
              <Col span={5}>{label('Kho nhập', true)}</Col>
              <Col span={7}>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Chọn kho'
                  size='small'
                  loading={isKhoLoading}
                  options={khoOptions.map((k) => ({
                    value: k.idkhokp || k.idkho || k.idKhoaPhong || k.idkho,
                    label: k.tenkho || k.makho || k.tenkhoaphong,
                  }))}
                  onChange={(val) => setSelectedKho(Number(val))}
                  value={selectedKho ?? undefined}
                />
              </Col>

              <Col span={5}>{label('Mã đối tác')}</Col>
              <Col span={7}>
                <Input
                  value={partnerFields.madoitac}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      madoitac: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>
              <Col span={5}>{label('Số thuế')}</Col>
              <Col span={7}>
                <Input
                  value={partnerFields.masothue}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      masothue: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>

              <Col span={5}>{label('SĐT')}</Col>
              <Col span={19}>
                <Input
                  value={partnerFields.phone}
                  onChange={(e) =>
                    setPartnerFields((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  size='small'
                />
              </Col>

              <Col span={5}>{label('Phương thức')}</Col>
              <Col span={7}>
                <Select
                  style={{ width: '100%' }}
                  value={phuongThuc}
                  onChange={(val) => setPhuongThuc(String(val))}
                  options={[
                    { label: 'Công nợ', value: 'Công nợ' },
                    { label: 'Tiền mặt', value: 'Tiền mặt' },
                  ]}
                  size='small'
                />
              </Col>
              <Col span={5}>{label('Hình thức')}</Col>
              <Col span={7}>
                <Select
                  style={{ width: '100%' }}
                  value={hinhThuc}
                  onChange={(val) => setHinhThuc(String(val))}
                  options={[
                    { label: 'Chuyển khoản', value: 'Chuyển khoản' },
                    { label: 'Tiền mặt', value: 'Tiền mặt' },
                  ]}
                  size='small'
                />
              </Col>

              <Col span={5}>{label('Số HĐ', true)}</Col>
              <Col span={19}>
                <Input size='small' />
              </Col>

              <Col span={5}>{label('Ngày HĐ')}</Col>
              <Col span={7}>
                <DatePicker
                  style={{ width: '100%' }}
                  size='small'
                  placeholder='Chọn ngày'
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider style={{ margin: '10px 0' }} />

        <Space style={{ marginBottom: 8 }}>
          <Button icon={<span>📦</span>} size='small'>
            Hàng hóa
          </Button>
          <Button icon={<span>🔍</span>} size='small'>
            Định kèm
          </Button>
          <Button onClick={handleAddRow} size='small'>
            ➕ Thêm dòng
          </Button>
        </Space>

        {/* Search and autocomplete for items with header and two-column layout (Mã hàng / Tên thuốc) */}
        <AutoComplete
          style={{ width: '100%', marginBottom: 6 }}
          options={
            Array.isArray(dataSourceSearch) && dataSourceSearch.length
              ? dataSourceSearch.map((item, idx) => ({
                  value: String(idx),
                  label: (
                    <div
                      style={{ display: 'flex', gap: 16, padding: '6px 8px' }}
                    >
                      <div style={{ width: 160, color: '#6b7280' }}>
                        {item.mathuoc ||
                          item.maVatTu ||
                          item.mavt ||
                          item.ma ||
                          ''}
                      </div>
                      <div style={{ flex: 1 }}>
                        {item.tenbietduoc || item.tenVatTu || item.ten || ''}
                      </div>
                    </div>
                  ),
                }))
              : [
                  {
                    value: '__no_result__',
                    label: (
                      <div style={{ padding: '8px 12px', color: '#999' }}>
                        Không có kết quả
                      </div>
                    ),
                  },
                ]
          }
          onSearch={handleSearchItems}
          onSelect={(value) => {
            const idx = Number(value)
            const list = Array.isArray(dataSourceSearch) ? dataSourceSearch : []
            const item = list[idx]
            if (item) handleSelectItem(item)
          }}
          placeholder='Nhập tên vật tư hàng hóa (Ctrl + K)'
          size='small'
          filterOption={false}
          dropdownRender={(menu) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  padding: '8px 12px',
                  background: '#fafafa',
                  borderBottom: '1px solid #f0f0f0',
                  fontWeight: 600,
                }}
              >
                <div style={{ width: 160 }}>Mã hàng</div>
                <div style={{ flex: 1 }}>Tên thuốc</div>
              </div>
              {menu}
            </div>
          )}
        />

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size='small'
          scroll={{ x: 1200, y: 300 }}
          locale={{
            emptyText: (
              <div style={{ padding: '30px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 4 }}>📭</div>
                <Text type='secondary' style={{ fontSize: 13 }}>
                  Chưa có dữ liệu
                </Text>
              </div>
            ),
          }}
        />

        <Divider style={{ margin: '10px 0' }} />

        {/* Summary Footer */}
        <Row justify='space-between' align='middle'>
          <Col span={12}>
            <Space>
              <Button onClick={handleReset} size='small'>
                Làm mới (F5)
              </Button>
              <Button type='primary' onClick={handleSave} size='small'>
                Lưu (F9)
              </Button>
              <Button
                type='primary'
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                onClick={handleSaveAndPrint}
                size='small'
              >
                Lưu & In (F4)
              </Button>
            </Space>
          </Col>

          <Col span={8}>
            <div
              style={{
                background: '#fafafa',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #e8e8e8',
              }}
            >
              <Row style={{ marginBottom: 4 }}>
                <Col span={14}>
                  <Text style={{ fontSize: 13 }}>Tổng tiền:</Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 13 }}>0 VNĐ</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 4 }}>
                <Col span={14}>
                  <Text style={{ fontSize: 13 }}>Tiền chiết khấu:</Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 13, color: '#ff4d4f' }}>-0 VNĐ</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 4 }}>
                <Col span={14}>
                  <Text style={{ fontSize: 13 }}>VAT 5%:</Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 13, color: '#ff4d4f' }}>+0 VNĐ</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 4 }}>
                <Col span={14}>
                  <Text style={{ fontSize: 13 }}>VAT 8%:</Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 13, color: '#ff4d4f' }}>+0 VNĐ</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 6 }}>
                <Col span={14}>
                  <Text style={{ fontSize: 13 }}>VAT 10%:</Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 13, color: '#ff4d4f' }}>+0 VNĐ</Text>
                </Col>
              </Row>
              <Row>
                <Col span={14}>
                  <Text strong style={{ fontSize: 13 }}>
                    Thực trả:
                  </Text>
                </Col>
                <Col span={10} style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 14, color: '#1890ff' }}>
                    0 VNĐ
                  </Text>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default NhapKho

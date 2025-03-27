import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Modal,
  Input,
  Divider,
  ConfigProvider,
  Table,
  Tag,
  DatePicker,
  Select,
  Button,
  Pagination,
} from 'antd'
import { CrownOutlined, SyncOutlined } from '@ant-design/icons'
import { formattedNumber } from '../../../../utils/formattedNumber'
import { customerServices } from '../../../../redux/services/customerServices'
import ToastCus from '../../../common/Toast'
import moment from 'moment'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/vi_VN'
import 'moment/locale/vi'
import 'dayjs/locale/vi'
moment.locale('vi')
const PAGE_SIZE = 10
const dateView = 'DD/MM/YYYY'
const dateMoment = 'YYYY-MM-DD'
const typeColor = [
  {
    id: 1,
    color: 'red',
  },
  {
    id: 2,
    color: 'orange',
  },
  {
    id: 3,
    color: 'blue',
  },
]

const CustomerModal = ({ open, loading, info, handleClose }) => {
  const { listTransactionType } = useSelector((state) => state.Common)
  const today = useMemo(() => moment().format(dateMoment), [])
  const [fromDate, setfromDate] = useState(today)
  const [toDate, settoDate] = useState(today)
  const [filterType, setfilterType] = useState('all')
  const [pageIndex, setpageIndex] = useState(1)
  const [pageInfo, setpageInfo] = useState(null)
  const [historyList, sethistoryList] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const valueFromDate = useMemo(
    () => (fromDate ? dayjs(fromDate, dateMoment) : null),
    [fromDate],
  )
  const valueToDate = useMemo(
    () => (toDate ? dayjs(toDate, dateMoment) : null),
    [toDate],
  )
  const handleCancel = () => {
    handleClose()
  }
  const handleReset = () => {
    setfromDate(today)
    settoDate(today)
    setfilterType('all')
    setpageIndex(1)
  }
  const onChangeDate = (type, dateString) => {
    if (type === 'from')
      return setfromDate(moment(dateString, dateView).format(dateMoment))
    else if (type === 'to')
      return settoDate(moment(dateString, dateView).format(dateMoment))
    return false
  }
  const onChangeFilterType = (value) => {
    setfilterType(value)
  }
  const onChangePage = (page) => {
    setpageIndex(page)
    getListHistory(fromDate, toDate, filterType, page)
  }
  const onClickSearch = () => {
    getListHistory(fromDate, toDate, filterType, pageIndex)
  }
  const onLoad = () => {
    getListHistory(fromDate, toDate, filterType, pageIndex)
  }
  const getListHistory = async (from, to, type, page) => {
    try {
      setisLoading(true)
      const { data } = await customerServices.getListTransactionHistory(
        info?.id,
        type === 'all' ? null : type,
        from,
        to,
        page,
        PAGE_SIZE,
      )
      sethistoryList(
        data?.data?.map((item, index) => ({
          ...item,
          key: Number(`${page > 1 ? page : 0}${++index}`),
        })),
      )
      setpageInfo(data?.pagination)
    } catch (error) {
      console.log('getListHistory : ', error)
      ToastCus.fire({
        icon: 'error',
        title: 'Lấy dữ liệu thất bại',
      })
    } finally {
      setisLoading(false)
    }
  }
  useEffect(() => {
    handleReset()
    info?.id && onLoad()
  }, [info])

  const columns = useMemo(
    () => [
      {
        key: 'key',
        dataIndex: 'key',
        title: '#',
        width: 30,
        align: 'center',
        render: (text, record, index) => text,
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        title: 'Thời gian',
        width: 125,
        align: 'center',
        render: (text) =>
          text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : '-',
      },
      {
        key: 'transactionType',
        dataIndex: 'transactionType',
        title: 'Loại giao dịch',
        width: 95,
        align: 'center',
        render: (text, record) => (
          <Tag
            color={
              typeColor?.find((item) => item?.id === record?.transactionTypeId)
                ?.color
            }
            className='m-0'
          >
            {text}
          </Tag>
        ),
      },
      {
        key: 'amount',
        dataIndex: 'amount',
        title: 'Số lượng',
        width: 110,
        align: 'center',
        render: (text) => (
          <div
            className={`text-end ${text > 0 ? 'text-green-600' : text < 0 ? 'text-red-600' : ''}`}
          >
            {`${text > 0 ? '+' : ''}${formattedNumber(text)}`}
          </div>
        ),
      },
      {
        key: 'balance',
        dataIndex: 'balance',
        title: 'Số dư',
        width: 110,
        align: 'center',
        render: (text) => (
          <div className={`text-end ${text < 0 ? 'text-red-600' : ''}`}>
            {formattedNumber(text)}
          </div>
        ),
      },
      {
        key: 'description',
        dataIndex: 'description',
        title: 'Mô tả',
        align: 'center',
        render: (text) => <div className='text-start'>{text}</div>,
      },
    ],
    [],
  )
  return (
    <Modal
      open={open}
      loading={loading}
      width={800}
      title={<p className='text-center'>Lịch sử giao dịch</p>}
      //   okText='Lưu'
      //   onOk={handleOk}
      cancelText='Đóng'
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
        </>
      )}
    >
      <div className='grid grid-flow-row gap-2'>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <div className='font-medium'>Họ và tên</div>
            <Input readOnly variant='filled' value={info?.fullName} />
          </div>
          <div>
            <div className='font-medium'>Email</div>
            <Input readOnly variant='filled' value={info?.email} />
          </div>
        </div>
        <Divider style={{ margin: 0, padding: 0 }} />
        <div className='flex justify-between items-center'>
          <div className='text-base font-medium text-gray-700'>Tra cứu</div>
          <div className='text-sm text-gray-700 flex justify-end items-end gap-1'>
            Số points hiện tại:&nbsp;
            <div className='flex justify-end items-center gap-1'>
              <div className='text-base text-black font-medium'>
                {formattedNumber(info?.points)}
              </div>
              <CrownOutlined className='text-amber-500' />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-72 flex justify-between items-center gap-1'>
            <DatePicker
              allowClear={false}
              needConfirm={false}
              placeholder='dd/mm/yyyy'
              locale={{ ...locale, week: { start: 1 } }}
              format={dateView}
              maxDate={dayjs(today)}
              value={valueFromDate}
              onChange={(date, dateString) => onChangeDate('from', dateString)}
            />
            <span className='text-2xl text-gray-700'>-</span>
            <DatePicker
              allowClear={false}
              needConfirm={false}
              placeholder='dd/mm/yyyy'
              locale={{ ...locale, week: { start: 1 } }}
              format={dateView}
              minDate={valueFromDate}
              maxDate={dayjs(today)}
              value={valueToDate}
              onChange={(date, dateString) => onChangeDate('to', dateString)}
            />
          </div>
          <Select
            className='w-44'
            value={filterType}
            onChange={onChangeFilterType}
            options={[
              { key: 'all', value: 'all', label: 'Tất cả loại giao dịch' },
              ...listTransactionType?.map((item) => ({
                key: item?.id,
                value: item?.id,
                label: item?.typeName,
              })),
            ]}
          />
          <Button
            loading={isLoading}
            type='primary'
            icon={<SyncOutlined />}
            onClick={onClickSearch}
          />
        </div>
        <div className='w-[47rem]'>
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
              },
              components: {
                Table: {
                  rowHoverBg: '#ecf0f1',
                  fontSize: 12,
                },
              },
            }}
          >
            <Table
              bordered
              loading={isLoading}
              scroll={{ y: 400 }}
              pagination={false}
              dataSource={historyList}
              columns={columns}
            />
          </ConfigProvider>
        </div>
        <Pagination
          simple
          align='center'
          disabled={isLoading}
          current={pageIndex}
          pageSize={PAGE_SIZE}
          total={pageInfo?.total}
          onChange={onChangePage}
        />
      </div>
    </Modal>
  )
}

export default CustomerModal

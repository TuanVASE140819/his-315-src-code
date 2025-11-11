import React, { useMemo } from 'react'
import { Table, ConfigProvider, Checkbox } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RollbackOutlined, EditOutlined } from '@ant-design/icons'

const AccountList = () => {
  const dataSource = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [])
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        key: 'stt',
        dataIndex: 'stt',
        title: 'STT',
        width: 50,
        align: 'center',
        render: (_, __, index) => ++index,
      },
      {
        key: 'email',
        dataIndex: 'email',
        title: 'Email',
      },
      {
        key: 'fullName',
        dataIndex: 'fullName',
        title: 'Họ và tên',
      },
      {
        key: 'phone',
        dataIndex: 'phone',
        title: 'Số điện thoại',
        width: 200,
        align: 'center',
        render: () => '0123456789',
      },
      {
        key: 'sex',
        dataIndex: 'sex',
        title: 'Giới tính',
        width: 150,
        align: 'center',
        render: () => 'Nam',
      },
      {
        key: 'dateOfBirth',
        dataIndex: 'dateOfBirth',
        title: 'Ngày sinh',
        width: 200,
        align: 'center',
        render: () => '01/01/2000',
      },
      {
        key: 'isActive',
        dataIndex: 'isActive',
        title: 'Hiệu lực',
        width: 100,
        align: 'center',
        render: () => <Checkbox />,
      },
      {
        key: 'action',
        dataIndex: 'action',
        title: '',
        width: 100,
        align: 'center',
        render: () => (
          <div className='flex justify-center items-center gap-5'>
            <RollbackOutlined className='text-lg text-[#E97195] hover:text-[#C3215F] transition-all duration-300 cursor-pointer' />
            <EditOutlined className='text-lg text-green-500 hover:text-green-700 transition-all duration-300 cursor-pointer' />
          </div>
        ),
      },
    ],
    [],
  )
  return (
    <ConfigProvider
      theme={{
        token: {
          padding: 5,
        },
        components: {
          Table: {
            rowHoverBg: '#ecf0f1',
          },
        },
      }}
    >
      <Table
        bordered
        //   loading={isLoading}
        scroll={{ y: 698 }}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    </ConfigProvider>
  )
}

export default AccountList

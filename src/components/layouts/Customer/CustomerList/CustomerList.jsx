import React, { useMemo } from 'react'
import {
  List,
  Avatar,
  Switch,
  Tag,
  Popconfirm,
  // Skeleton,
  // ConfigProvider,
  // Table,
  // Checkbox,
} from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  CrownOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { formattedNumber } from '../../../../utils/formattedNumber'
import VirtualList from 'rc-virtual-list'

const CustomerList = () => {
  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const dataSource = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [])
  // const columns = useMemo(
  //   () => [
  //     {
  //       key: 'stt',
  //       dataIndex: 'stt',
  //       title: 'STT',
  //       width: 50,
  //       align: 'center',
  //       render: (_, __, index) => ++index,
  //     },
  //     {
  //       key: 'email',
  //       dataIndex: 'email',
  //       title: 'Email',
  //     },
  //     {
  //       key: 'fullName',
  //       dataIndex: 'fullName',
  //       title: 'Họ và tên',
  //     },
  //     {
  //       key: 'phone',
  //       dataIndex: 'phone',
  //       title: 'Số điện thoại',
  //       width: 170,
  //       align: 'center',
  //     },
  //     {
  //       key: 'sex',
  //       dataIndex: 'sex',
  //       title: 'Giới tính',
  //       width: 120,
  //       align: 'center',
  //     },
  //     {
  //       key: 'dateOfBirth',
  //       dataIndex: 'dateOfBirth',
  //       title: 'Ngày sinh',
  //       width: 170,
  //       align: 'center',
  //     },
  //     {
  //       key: 'points',
  //       dataIndex: 'points',
  //       title: 'Số points',
  //       width: 170,
  //       align: 'center',
  //       render: () => {
  //         const randomNumber = (min, max) =>
  //           Math.floor(Math.random() * (max - min + 1)) + min
  //         return formattedNumber(randomNumber(0, 1000000000))
  //       },
  //     },
  //     {
  //       key: 'isActive',
  //       dataIndex: 'isActive',
  //       title: 'Hiệu lực',
  //       width: 100,
  //       align: 'center',
  //       render: (text, record) => (
  //       ),
  //     },
  //     {
  //       key: 'action',
  //       dataIndex: 'action',
  //       title: '',
  //       width: 100,
  //       align: 'center',
  //       render: () => (
  //         <div className='flex justify-center items-center gap-5'>
  //           <EyeOutlined className='text-lg text-blue-500 hover:text-blue-700  transition-all duration-300 cursor-pointer' />
  //         </div>
  //       ),
  //     },
  //   ],
  //   [],
  // )
  return (
    <>
      <List bordered>
        <VirtualList height={730} itemKey={(item) => item} data={dataSource}>
          {(item) => (
            <List.Item key={item}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={48}
                    shape='square'
                    className='bg-amber-500 bg-opacity-70'
                    icon={<UserOutlined className='text-3xl' />}
                  />
                }
                title={
                  <div className='text-gray-700 hover:text-blue-500 cursor-pointer'>
                    {'Nguyễn Hoàng Tiến'}
                    <span
                      className={`ml-3 text-xs font-medium ${item === 1 ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      {'admin@gmail.com'}
                    </span>
                  </div>
                }
                description={
                  <div className='flex justify-start items-center gap-1'>
                    <Tag>0123456789</Tag>
                    <Tag>Nam</Tag>
                    <Tag>01/01/2000</Tag>
                  </div>
                }
              />
              <div className='flex justify-end items-center gap-5'>
                <div className='text-end font-medium flex items-center gap-1 pr-12'>
                  <div className='pt-0.5'>
                    {formattedNumber(randomNumber(0, 1000000000))}
                  </div>
                  <CrownOutlined className='text-amber-500' />
                </div>
                <Popconfirm
                  placement='topRight'
                  title='Thay đổi hiệu lực'
                  description={
                    <p>
                      Bạn thực sự muốn
                      <span className='font-medium'>
                        &nbsp;
                        {/* {text ? 'KHÓA TÀI KHOẢN' : 'KÍCH HOẠT TÀI KHOẢN'} */}
                        &nbsp;-&nbsp;
                        {/* {record?.email}? */}
                      </span>
                    </p>
                  }
                  // onConfirm={() => handleToggleActive(record)}
                  okText='Xác nhận'
                  cancelText='Hủy bỏ'
                  className='ml-auto'
                >
                  <Switch
                    size='small'
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    value={item === 1 ? false : true}
                  />
                </Popconfirm>
                <EyeOutlined className='text-xl text-blue-500 hover:text-blue-700  transition-all duration-300 cursor-pointer' />
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
      {/* <List
        className='overflow-auto h-[79.7vh]'
        itemLayout='horizontal'
        pagination={false}
        dataSource={dataSource?.concat(dataSource, dataSource, dataSource)}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <a key='list-loadmore-edit'>edit</a>,
                <a key='list-loadmore-more'>more</a>,
              ]}
            >
              <Skeleton
                avatar
                title={false}
                loading={item?.loading}
                active={true}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={48}
                      shape='square'
                      className='bg-amber-500 bg-opacity-70'
                      icon={<UserOutlined className='text-3xl' />}
                    />
                  }
                  title={
                    <div className='text-gray-700 hover:text-blue-500 cursor-pointer'>
                      {'Nguyễn Hoàng Tiến'}
                      <span className='text-xs font-medium text-gray-500 ml-3'>
                        {'admin@gmail.com'}
                      </span>
                    </div>
                  }
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                />
                <div className='text-end font-medium flex items-center gap-1'>
                  <div className='pt-0.5'>
                    {formattedNumber(randomNumber(0, 1000000000))}
                  </div>
                  <CrownOutlined className='text-amber-500' />
                </div>
              </Skeleton>
            </List.Item>
          )
        }}
      />
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
      </ConfigProvider> */}
    </>
  )
}

export default CustomerList

import React from 'react'
import { List, Avatar, Switch, Tag, Popconfirm, Button } from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  CrownOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { formattedNumber } from '../../../../utils/formattedNumber'
import VirtualList from 'rc-virtual-list'
import moment from 'moment'
const dateView = 'DD/MM/YYYY'
const dateViewFull = 'DD/MM/YYYY HH:mm:ss'

const CustomerList = ({
  height,
  list,
  onClickItem,
  onScroll,
  handleToggleActive,
}) => {
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
        <VirtualList
          // className='h-[79.4vh] overflow-auto'
          itemKey={(item) => item?.email}
          data={list}
          height={height}
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item key={item?.id}>
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
                  <>
                    <div className='flex justify-start items-center gap-3'>
                      <div
                        className='text-gray-700 hover:text-blue-500 cursor-pointer'
                        onClick={() => onClickItem(item)}
                      >
                        {item?.fullName}
                      </div>
                      <div
                        className={`text-xs ${item?.isActive ? 'text-gray-500' : 'text-red-500'}`}
                      >
                        {item?.email}
                      </div>
                    </div>
                  </>
                }
                description={
                  <div className='text-xs italic'>
                    {item?.createdAt
                      ? moment(item?.createdAt).format(dateViewFull)
                      : ''}
                  </div>
                }
              />
              <div className='flex justify-end items-center gap-5'>
                <div className='flex justify-between items-center w-60'>
                  <Tag>{item?.phone}</Tag>
                  <Tag>{item?.sex}</Tag>
                  <Tag>
                    {item?.dateOfBirth
                      ? moment(item?.dateOfBirth).format(dateView)
                      : ''}
                  </Tag>
                </div>
                <div className='text-end font-medium flex justify-end items-center gap-1 px-12 w-72'>
                  <div className='pt-0.5'>{formattedNumber(item?.points)}</div>
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
                        {item?.isActive
                          ? 'KHÓA TÀI KHOẢN'
                          : 'KÍCH HOẠT TÀI KHOẢN'}
                        &nbsp;-&nbsp;
                        {item?.email}?
                      </span>
                    </p>
                  }
                  onConfirm={() => handleToggleActive(item)}
                  okText='Xác nhận'
                  cancelText='Hủy bỏ'
                  className='ml-auto'
                >
                  <Switch
                    size='small'
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    value={item?.isActive}
                  />
                </Popconfirm>
                <EyeOutlined
                  className='text-xl text-blue-500 hover:text-blue-700  transition-all duration-300 cursor-pointer'
                  onClick={() => onClickItem(item)}
                />
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

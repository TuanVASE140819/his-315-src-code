import React from 'react'
import { Button, Input, Divider } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import AccountList from './AccountList/AccountList'

const Account = () => {
  return (
    <div className='p-2 flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <div className='font-medium text-xl text-gray-500'>Tài khoản</div>
        <Button type='primary' icon={<PlusOutlined />}>
          Thêm
        </Button>
      </div>
      <Divider style={{ margin: 0, padding: 0 }} />
      <div className='flex justify-start items-center gap-2'>
        <Input
          className='w-96'
          placeholder='Nhập từ khóa...'
          allowClear
          // value={searchGame}
          // onChange={onChangeSearchGame}
        />
        <Button
          // loading={isLoadingGame}
          className='w-8'
          type='primary'
          icon={<SyncOutlined />}
          // onClick={onClickSearchGame}
        />
      </div>
      <AccountList />
    </div>
  )
}

export default Account

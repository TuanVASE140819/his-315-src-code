import React from 'react'
import { Button, Select, Input, Divider } from 'antd'
import { PlusOutlined, SyncOutlined } from '@ant-design/icons'
import LeagueList from './LeagueList/LeagueList'

const Game = () => {
  const onClickSearch = () => {}

  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='h-full border-e p-2'>
        <div className='flex justify-between items-center'>
          <div className='font-medium text-xl text-gray-500'>Giải đấu</div>
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
        <Divider style={{ margin: '0.5rem 0', padding: 0 }} />

        <div className='flex justify-between items-center gap-2'>
          <Select className='w-44' placeholder='Chọn bộ môn...' />
          <Input
            className='w-48'
            placeholder='Nhập từ khóa...'
            onClick={onClickSearch}
          />
          {/* <div className='flex justify-between items-center gap-2 w-full'>
          </div> */}
          <Button type='primary' icon={<SyncOutlined />} />
        </div>
        <LeagueList
          list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />
      </div>
      <div className='h-full col-span-3 p-2'>
        <div className='flex justify-between items-center'>
          <div className='font-medium text-xl text-gray-500'>Trận đấu</div>
          <Button type='primary' icon={<PlusOutlined />}>
            Thêm
          </Button>
        </div>
        <Divider style={{ margin: '0.5rem 0', padding: 0 }} /></div>
    </div>
  )
}

export default Game

import React from 'react'
import { Empty } from 'antd'
import GameRow from './GameRow/GameRow'
import AddGameRow from './AddGameRow/AddGameRow'

const GameList = ({ list }) => {
  return (
    <ul className='flex flex-col gap-4 mt-2 border rounded-md p-4 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!list?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      <AddGameRow key={'add'} />
      {list?.map((item, index) => (
        <GameRow key={index} item={item} />
      ))}
    </ul>
  )
}

export default GameList

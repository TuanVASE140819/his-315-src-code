import React from 'react'
import { Empty, Spin } from 'antd'
import GameRow from './GameRow/GameRow'
import AddGameRow from './AddGameRow/AddGameRow'
import EditGameRow from './EditGameRow/EditGameRow'

const GameList = ({
  list,
  listAdd,
  idEdit,
  infoEdit,
  isLoadingInfo,
  setlistAdd,
  setinfoEdit,
  setidEdit,
  onClickEdit,
  handleToggleActive,
  handleMatchResult,
  handleCloseEdit,
}) => {
  return (
    <ul className='flex flex-col gap-4 mt-2 border rounded-md p-4 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!list?.length && !listAdd?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      {listAdd?.map((item, index) => (
        <AddGameRow
          key={index}
          info={{ index, ...item }}
          setlistAdd={setlistAdd}
        />
      ))}
      {list?.map((item, index) =>
        item?.id === idEdit ? (
          <Spin spinning={isLoadingInfo} tip='Đang tải dữ liệu'>
            <EditGameRow
              key={index}
              infoEdit={isLoadingInfo ? null : infoEdit}
              setinfoEdit={setinfoEdit}
              handleCloseEdit={handleCloseEdit}
            />
          </Spin>
        ) : (
          <GameRow
            key={index}
            info={item}
            onClickEdit={onClickEdit}
            handleToggleActive={handleToggleActive}
            handleMatchResult={handleMatchResult}
          />
        ),
      )}
    </ul>
  )
}

export default GameList

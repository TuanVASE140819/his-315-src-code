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
  onClickEdit,
  handleToggleActive,
  handleMatchResult,
  handleCloseEdit,
  handleSubmitEdit,
}) => {
  const safeList = Array.isArray(list) ? list : []
  const safeListAdd = Array.isArray(listAdd) ? listAdd : []

  return (
    <ul className='flex flex-col gap-4 mt-2 border rounded-md p-4 h-[79.5vh] overflow-auto bg-[#fdfdfd]'>
      {!safeList?.length && !safeListAdd?.length && (
        <div className='w-full flex justify-center items-center content-center pt-24'>
          <Empty description='Không tìm thấy dữ liệu' />
        </div>
      )}
      {safeListAdd?.map((item, index) => (
        <AddGameRow
          key={index}
          info={{ index, ...item }}
          setlistAdd={setlistAdd}
        />
      ))}
      {safeList?.map((item, index) =>
        item?.id === idEdit ? (
          <Spin spinning={isLoadingInfo} tip='Đang tải dữ liệu'>
            <EditGameRow
              key={item?.id}
              infoEdit={isLoadingInfo ? null : infoEdit}
              setinfoEdit={setinfoEdit}
              handleCloseEdit={handleCloseEdit}
              handleSubmitEdit={handleSubmitEdit}
            />
          </Spin>
        ) : (
          <GameRow
            key={item?.id}
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

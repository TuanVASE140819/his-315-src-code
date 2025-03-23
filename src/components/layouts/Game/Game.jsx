import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Divider, Spin, Tag, Select } from 'antd'
import { PlusOutlined, SyncOutlined, SaveOutlined } from '@ant-design/icons'
import { leagueServices } from '../../../redux/services/leagueServices'
// import { commonServices } from '../../../redux/services/commonServices'
import { putActiveLeagueAction } from '../../../redux/actions/leagueActions'
import {
  getListCategoryAction,
  getListTeamAction,
} from '../../../redux/actions/commonActions'
import { gameServices } from '../../../redux/services/gameServices'
import { postInfoGameAction } from '../../../redux/actions/gameActions'
import LeagueList from './LeagueList/LeagueList'
import LeagueModal from './LeagueModal/LeagueModal'
import GameList from './GameList/GameList'
import ToastCus from '../../common/Toast'

const Game = () => {
  const dispatch = useDispatch()
  const { listCategory } = useSelector((state) => state.Common)
  // const [listCategory, setlistCategory] = useState([])
  const [filterCategory, setfilterCategory] = useState('all')
  const [searchLeague, setsearchLeague] = useState('')
  const [listLeague, setlistLeague] = useState([])
  const [infoLeague, setinfoLeague] = useState(null)
  const [itemSelectedLeague, setitemSelectedLeague] = useState(null)
  const [isModalLeague, setisModalLeague] = useState(false)
  const [isLoadingLeague, setisLoadingLeague] = useState(false)
  const [isLoadingInfoLeague, setisLoadingInfoLeague] = useState(false)

  const [listAddGame, setlistAddGame] = useState([])
  const [isLoadingGame, setisLoadingGame] = useState(false)

  // const getListCategory = async () => {
  //   try {
  //     const { data } = await commonServices.getListCategory()
  //     setlistCategory(data)
  //   } catch (error) {
  //     console.log('getListCategory : ', error)
  //     errorToastCus()
  //   }
  // }

  useEffect(() => {
    // getListCategory()
    dispatch(getListCategoryAction())
    onLoadLeague()
  }, [])

  //****************************** LEAGUE ****************************************//
  const handleSubmitActiveLeague = (info) => {
    dispatch(putActiveLeagueAction(info, onLoadLeague))
  }
  const errorToastCus = () => {
    ToastCus.fire({
      icon: 'error',
      title: 'Lấy dữ liệu thất bại',
    })
  }
  const handleOpenModalLeague = () => {
    setisModalLeague(true)
  }
  const handleCloseModalLeague = () => {
    setisModalLeague(false)
  }
  const onClickAddLeague = () => {
    setinfoLeague(null)
    handleOpenModalLeague()
  }
  const onClickEditLeague = (info) => {
    getInfoLeague(info?.id)
    handleOpenModalLeague()
  }
  const onChangeFilterCategory = (value) => {
    setfilterCategory(value)
  }
  const onChangeSearchLeague = (e) => {
    setsearchLeague(e.target.value)
  }
  const onClickSearchLeague = () => {
    const keyword = `${searchLeague ?? ''}`?.trim()
    setsearchLeague(keyword)
    if (!filterCategory) setfilterCategory('all')
    getListLeague(filterCategory, keyword)
  }
  const onLoadLeague = async () => {
    await getListLeague(filterCategory, searchLeague)
  }
  const onClickItemLeague = (info) => {
    // if (isLoadingTeam) {
    //   return
    //   ToastCus.fire({
    //     icon: 'warning',
    //     title: 'Vui lòng đợi tải dữ liệu',
    //   })
    // }
    handleResetAddGame()
    setitemSelectedLeague(info)
    // getListTeam(info?.id, searchTeam)
    dispatch(getListTeamAction(info?.categoryId))
  }
  const getListLeague = async (ctId, kw) => {
    try {
      setisLoadingLeague(true)
      const { data } = await leagueServices.getListLeagueSearch(
        ctId === 'all' ? null : ctId,
        kw,
      )
      setlistLeague(data)
    } catch (error) {
      console.log('getListLeague : ', error)
      errorToastCus()
    } finally {
      setisLoadingLeague(false)
    }
  }
  const getInfoLeague = async (id) => {
    try {
      setisLoadingInfoLeague(true)
      const { data } = await leagueServices.getInfoLeagueById(id)
      setinfoLeague(data)
    } catch (error) {
      handleCloseModalLeague()
      console.log('getInfoLeague : ', error)
      errorToastCus()
    } finally {
      setisLoadingInfoLeague(false)
    }
  }

  //****************************** GAME ****************************************//
  const onClickAddGame = () => {
    if (!itemSelectedLeague) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Vui lòng chọn giải đấu',
      })
    }
    setlistAddGame((prev) => {
      const newItem = {
        leagueId: itemSelectedLeague?.id,
        description: null,
        startTime: null,
        // createdBy: 0,
        gameItem: [],
      }
      return [newItem, ...prev]
    })
  }
  const onClickCancelGame = () => {
    handleResetAddGame()
  }
  const handleResetAddGame = () => {
    setlistAddGame([])
  }
  const handleReloadGame = async () => {
    handleResetAddGame()
  }
  const handleSubmitAddGame = () => {
    let arrGame = []
    for (const item of listAddGame) {
      if (!item?.description || !item?.startTime) {
        return ToastCus.fire({
          icon: 'error',
          title: 'Vui lòng kiểm tra lại thông tin trận đấu',
        })
      }
      if (!item?.gameItem?.length) {
        return ToastCus.fire({
          icon: 'error',
          title: 'Vui lòng thêm kết quả',
        })
      }
      let arrGameItem = []
      let tempOrder = 1
      for (const itemGI of item?.gameItem) {
        if (!itemGI?.name || !itemGI?.odds) {
          return ToastCus.fire({
            icon: 'error',
            title: 'Vui lòng kiểm tra lại thông tin kết quả',
          })
        }
        arrGameItem.push({ ...itemGI, displayOrder: tempOrder })
        tempOrder += 1
      }
      arrGame.push({ ...item, gameItem: arrGameItem })
    }
    dispatch(postInfoGameAction(arrGame, handleReloadGame))
  }

  return (
    <>
      <div className='grid grid-cols-4 h-full'>
        <div className='h-full border-e p-2'>
          <div className='flex justify-between items-center'>
            <div className='font-medium text-xl text-gray-500'>Giải đấu</div>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={onClickAddLeague}
            >
              Thêm
            </Button>
          </div>
          <Divider style={{ margin: '0.5rem 0', padding: 0 }} />

          <div className='flex justify-between items-center gap-2'>
            <Select
              showSearch
              className='w-44'
              placeholder='Chọn bộ môn...'
              filterOption={(input, option) =>
                `${option?.label ?? ''}`
                  ?.toLowerCase()
                  ?.includes(`${input ?? ''}`?.toLowerCase())
              }
              value={filterCategory}
              onChange={onChangeFilterCategory}
              options={[
                {
                  key: 'all',
                  value: 'all',
                  label: 'Tất cả bộ môn',
                },
                ...listCategory?.map((item) => ({
                  key: item?.id,
                  value: item?.id,
                  label: item?.name,
                })),
              ]}
            />
            <Input
              className='w-48'
              placeholder='Nhập từ khóa...'
              allowClear
              value={searchLeague}
              onChange={onChangeSearchLeague}
            />
            {/* <div className='flex justify-between items-center gap-2 w-full'>
          </div> */}
            <Button
              loading={isLoadingLeague}
              className='w-8'
              type='primary'
              icon={<SyncOutlined />}
              onClick={onClickSearchLeague}
            />
          </div>
          <Spin spinning={isLoadingLeague}>
            <LeagueList
              list={listLeague}
              itemSelected={itemSelectedLeague}
              onClickItem={onClickItemLeague}
              onClickEdit={onClickEditLeague}
              handleSubmit={handleSubmitActiveLeague}
            />
          </Spin>
        </div>
        <div className='h-full col-span-3 p-2'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <div className='font-medium text-xl text-gray-500'>Trận đấu</div>
              <Tag
                color={itemSelectedLeague ? 'blue' : 'red'}
                className='m-0 p-0 px-2 flex items-center text-base'
              >
                {itemSelectedLeague
                  ? itemSelectedLeague?.name
                  : 'Chưa chọn giải đấu'}
              </Tag>
            </div>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={onClickAddGame}
            >
              Thêm
            </Button>
          </div>
          <Divider style={{ margin: '0.5rem 0', padding: 0 }} />
          <div className='flex justify-start items-center gap-2'>
            <Input
              className='w-96'
              placeholder='Nhập từ khóa...'
              allowClear
              // value={searchLeague}
              // onChange={onChangeSearchLeague}
            />
            <Button
              // loading={isLoadingLeague}
              className='w-8'
              type='primary'
              icon={<SyncOutlined />}
              // onClick={onClickSearchLeague}
            />
            {listAddGame?.length > 0 && (
              <>
                <Button className='ml-auto' onClick={onClickCancelGame}>
                  Hủy bỏ
                </Button>
                <Button
                  type='primary'
                  icon={<SaveOutlined />}
                  onClick={handleSubmitAddGame}
                >
                  Lưu
                </Button>
              </>
            )}
          </div>
          <Spin spinning={isLoadingGame}>
            <GameList
              list={[1,2]}
              listAdd={listAddGame}
              setlistAdd={setlistAddGame}
            />
          </Spin>
        </div>
      </div>
      <LeagueModal
        open={isModalLeague}
        loading={isLoadingInfoLeague}
        infoEdit={infoLeague}
        handleClose={handleCloseModalLeague}
        onLoad={onLoadLeague}
      />
    </>
  )
}

export default Game

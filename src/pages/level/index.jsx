import React, { useState, useEffect } from 'react'
import TableHeader from '@/components/TableHeader'
import SearchContainer from '@/components/SearchContainer'
import Dialog from '@/components/Dialog'
import DrawerComponent from '@/components/Drawer'

import FilterForLevel from './component/FilterForLevel'
import TableLevel from './component/TableLevel'
import LevelForm from './component/levelForm'
import LevelDetail from './component/levelDetail'
import { useDispatch, useSelector } from 'react-redux'

export default function level() {
  const [page, setPage] = useState(1)
  const [dialogStatus, setDialogStatus] = useState(false)
  const { levelList, levelTotal,levelDetail } = useSelector(state => state.level)
  const dispatch = useDispatch()
  const{isShowDetailDialog}=useSelector(state=>state.common)
  useEffect(() => {
    _initData()
  }, [page])
  //初始化数据
  const _initData = (data = {}) => {
    dispatch({
      type: 'level/_initialLevelListAndTotal',
      payload: { page: page, size: 10, queryData: data }
    })
  }
  //标题头翻页
  const changeCurrentPage = (page = 1) => {
    setPage(page);
    _initData();
  }
  //字段搜索  包括按条件搜索和全部重置，重新刷新右边表格
  const handleReload = (data) => {
    // console.log(data)
    _initData(data);
  }
  //打开右侧的dialog
  const handleOpenSideDialog = (_id) => {
    // console.log(_id)
    dispatch({type:'level/_getLevelDetail',payload:{_id}})
  }
  return (
    <div className='main-content'>
      <TableHeader
        page={page}
        size={10}
        total={levelTotal}
        type='level'
        changeCurrentPage={changeCurrentPage}
        openAddDialog={() => { setDialogStatus(true) }}
      ></TableHeader>
      <SearchContainer
      >
        {<FilterForLevel
          reload={data => handleReload(data)}
        />}
      </SearchContainer>
      <TableLevel levelList={levelList} openDetailDialog={handleOpenSideDialog}></TableLevel>
      <Dialog title='add' dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        render={() => {
          return <LevelForm
            setDialogStatus={setDialogStatus}
            reloadList={() => {
              _initData()
            }}></LevelForm>
        }}></Dialog>
      {isShowDetailDialog&&<DrawerComponent
        title={levelDetail?.levelName}
        _id={levelDetail?._id}
        interfaceName="deleteLevel"
        // isShowDetailDialog={isShowDetailDialog}
        reloadList={() => setPage(1) && _initData()}
        render={() => <LevelDetail _initLevelList={_initData}></LevelDetail>}
      ></DrawerComponent>}
    </div>
  )
}


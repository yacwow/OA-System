import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'umi'
import TableHeader from '../../components/TableHeader'
import FilterForm from './component/FilterForm'
import SearchContainer from '../../components/SearchContainer'
import TableList from './component/TableList'
import DrawerComp from '@/components/Drawer'
import DetailForm from './component/DetailForm'
import Dialog from '@/components/Dialog'
import AddForm from './component/AddForm'
export default function index() {
  const [closeStatus, setCloseStatus] = useState(false)
  const [dialogStatus, setDialogStatus] = useState(false)
  const dispatch = useDispatch()
  const { staffTotal, staffList, staffDetail } = useSelector(state => state.staffDetail)
  const { userInfo } = useSelector(state => state.user)
  const { loading } = useSelector(state => state)

  const [page, setPage] = useState(1);

  // console.log(state)
  useEffect(() => {
    handleReload(page)
  }, [page])
  const changeCurrentPage = (page) => {
    // console.log(page)
    setPage(page)
    handleReload(page)
  }
  const handleReload = (page, data) => {
    // console.log(page)
    dispatch({ type: 'staffDetail/initialStaffList', payload: { size: 10, page, ...data} })
  }
  const getQueryData = (data) => {
    // console.log('in')
    handleReload(1, data)
  }
  return (
    <div className="main-content">
      <TableHeader page={page} total={staffTotal}
        size={10} changeCurrentPage={changeCurrentPage}
        interfaceDelMethod={'destroyStaff'}
        openAddDialog={() => { setDialogStatus(true) }}
        te={() => { }}
      />
      <SearchContainer
      >
        {<FilterForm
          reload={data =>  getQueryData(data)&&setPage(1) }
        />}</SearchContainer>
      <TableList userInfo={userInfo}
        staffList={staffList} loading={loading} reloadPage={() => handleReload(page)}>
      </TableList>
      <Dialog title='Add Employee' dialogStatus={dialogStatus}
      setDialogStatus={setDialogStatus}
        render={() => { return <AddForm setDialogStatus={setDialogStatus} staffDetail={staffDetail} reloadList={() => { setPage(1) && handleReload(1) }}></AddForm> }}

        width={800}></Dialog>
      <DrawerComp title={staffDetail?.username}
        _id={staffDetail?._id}
        interfaceName='destroyStaff'
        reloadList={(page) => handleReload(page)}
        render={() => {
          return <DetailForm page={page} staffDetail={staffDetail} _initStaffList={(page) => handleReload(page)} />
        }}>
      </DrawerComp>
    </div>
  )
}

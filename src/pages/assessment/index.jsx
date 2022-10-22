import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from '@/components/TableHeader';
import SearchContainer from '@/components/SearchContainer';
import Dialog from '@/components/Dialog';
import DrawerComponent from '@/components/Drawer';
import CreateData from './components/CreateData';
import FilterForm from './components/FilterForm';
import Table from './components/Table';
import Detail from './components/Detail';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const { assessmentList, total, assessmentDetail } = useSelector(
    (state) => state.assessment,
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    _initAssessmentList();
  }, []);

  const _initAssessmentList = (data = {},page=1) => {
    // console.log(page)
    dispatch({
      type: 'assessment/_initAssessmentList',
      payload: { page: page, queryData: data, size: 5 },
    });
  };

  return (
    <div className="main-content">
      <TableHeader
        page={page}
        size={5}
        total={total}
        changeCurrentPage={(currentPage) =>{
          // console.log(currentPage)
          _initAssessmentList({},currentPage)&& setPage(currentPage) 
        }

        }
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteAssessment'}
      />

      <SearchContainer>

        {<FilterForm
          reload={(data) =>  _initAssessmentList(data)&&setPage(1) }
        />}
        </SearchContainer>

      <Table
        assessmentList={assessmentList}
        reloadPage={() =>  _initAssessmentList()&&setPage(1)}
      />

      <Dialog
        title="Add Assessment"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={850}
        render={() => (
          <CreateData
            setDialogStatus={setDialogStatus}
            reloadPage={() => _initAssessmentList()&&setPage(1)}
          />
        )}
      />

      <DrawerComponent
        title={assessmentDetail?.staffName.userName}
        _id={assessmentDetail?._id}
        interfaceName="deleteAssessment"
        reloadList={() =>  _initAssessmentList()&&setPage(1)}
        render={() => <Detail _initAssessmentList={_initAssessmentList} />}
      />
    </div>
  );
};

export default index;

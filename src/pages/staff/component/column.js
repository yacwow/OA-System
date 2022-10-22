import { Tag, Image } from 'antd';
import { mapData } from '../../../utils/mapData';
import loadErrorImg from '../../../common/img/load_error.png';
import { staffRule } from '@/utils/rules';
import iconMap from '../../../components/iconMap';
import { formatYear, formatBirth } from '../../../utils/format'
export default ({ handleSave, userInfo, openReviewRecord, openDetailDialog }) => {
  /**
   * staffList":[{"identity":0,"_id":"61ab8a65ddfb170680be0147","userName":"刘备","accountName":"liubei","mobile":"13000000000","salary":"1000",
   * "hometown":"四川汉中","onboardingTime":"2015-10-05T15:32:41.890Z","gender":0,"idNumber":"211302190011011","bankNumber":"123123123123123123",
   * "department":{"_id":"61acdb0d33a133710518cc4b","departmentLeader":{"_id":"61ab8a65ddfb170680be0147","userName":"刘备"},"departmentName":"道具部"},
   * "level":{"_id":"6187d61fffc30e354dcb3fa3","levelName":"T9-4","levelDescription":"工程师"},"education":0,"marriage":0,"graduatedSchool":"北京大学",
   * "avatar":"//r3l03lzeo.hd-bkt.clouddn.com/FrcIq9657vgRHNxUcTSg6rdCrfqE","__v":0},
   */
  const normalList = [
    {
      title: 'name',
      dataIndex: "userName",
      editable: true,
      render: (data, { _id }) => {
        // console.log(data, _id)
        return (
          <>
            <span className="user-name">{data}</span>
            {userInfo.identity===1&&<span style={{ cursor: "pointer" }} onClick={(e) => {
              e.stopPropagation();
              openDetailDialog(_id)
            }
            }>{iconMap.detail}</span>}
          </>
        )
      }
    }, { title: 'phone', dataIndex: "mobile", editable: true, width: '200px' }, {
      title: 'level Des',
      dataIndex: 'level',
      editable: true,
      render: data => data?.levelDescription || 'No Data'
    }, {
      title: 'gender',
      dataIndex: 'gender',
      editable: true,
      render: (gender) => <Tag>{gender === 1 ? 'male' : 'female'}</Tag>,
    },
    {
      title: 'department',
      dataIndex: 'department',
      render: (data) => data?.departmentName || '---',
    },
    {
      title: 'departmentLeader',
      dataIndex: 'department',
      render: (data) => data?.departmentLeader?.userName || '---',
    }]


  const authList = [
    {
      title: 'enrolled date',
      dataIndex: 'onboardingTime',
      editable: true,
      render: date => date?.split('T')[0]
    },
    {
      title: 'age',
      dataIndex: 'idNumber',
      editable: true,
      render: (idNumber) => formatYear(idNumber, 'age') || '---',
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      render: (img) => <Image src={img || 'error'} fallback={loadErrorImg} />,
    },
    {
      title: 'hometown',
      editable: true,
      dataIndex: 'hometown',
      render: (hometown) => hometown || '---',
    },
    {
      title: 'education',
      editable: true,
      dataIndex: 'education',
      render: (type) => <Tag> {mapData['education'][type]}</Tag>,
    },
    {
      title: 'marriage',
      editable: true,
      dataIndex: 'marriage',
      render: (type) => <Tag> {mapData['marriage'][type]}</Tag>,
    },
    {
      title: 'birthday',
      dataIndex: 'idNumber',
      render: (id) => formatBirth(id),
    },
    {
      title: 'bankNumber',
      dataIndex: 'bankNumber',
      editable: true,
    },
    {
      title: 'idNumber',
      editable: true,
      dataIndex: 'idNumber',
    },
    {
      title: 'graduatedSchool',
      editable: true,
      dataIndex: 'graduatedSchool',
    },
    {
      title: 'assessment',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: 'assessment',
                interfaceName: 'getAssessmentList',
                requestData: {
                  queryData: { staffName: data._id },
                },
                type: 'assessment',
              })
            }
            className="c-p"
          >
            Show
          </Tag>
        );
      },
    },
    {
      title: 'rewards',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: 'rewards',
                interfaceName: 'getRewardAndPunishment',
                requestData: {
                  staffName: data._id
                },
                type: 'rewards',
              })
            }
            className="c-p"
          >
            Show
          </Tag>
        );
      },
    },
    {
      title: 'salaryAdjust',
      dataIndex: 'record',
      render: (record, data) => {
        return (
          <Tag
            onClick={() =>
              openReviewRecord({
                title: 'salaryAdjust',
                interfaceName: 'getSalaryAdjustment',
                requestData: {
                  staffName: data._id,
                },
                type: 'salary',
              })
            }
            className="c-p"
          >
            Show
          </Tag>
        );
      },
    },
  ]
  let renderList = userInfo.identity === 0 ? normalList : [...normalList, ...authList]
  // console.log(renderList)
  renderList = renderList.map((col) => {
    if (!col.editable||userInfo.identity===0) {
      return col;
    }
    //- 创建一个规定编辑表单类型的属性type
    let type = '';

    switch (col.dataIndex) {
      case 'onboardingTime':
        type = 'dateNode';
        break;
      case 'gender':
      case 'education':
      case 'marriage':
        type = 'selectNode';
        break;
      default:
        type = 'inputNode';
        break;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        rules: staffRule[col.dataIndex],
        title: col.title,
        type,
        handleSave,
      }),
    };
  });
  return renderList;
}


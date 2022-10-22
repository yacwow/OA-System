import iconMap from '@/components/iconMap';
// import { formatDate } from 'utils/format';
import { assessmentRule } from '@/utils/rules/assessmentRule';

const Columns = (handleSave, getAssessmentDetail) => {
  let columns = [
    {
      title: 'staffName',
      dataIndex: 'staffName',
      render: (record, { _id }) => {
        return (
          <div className="staff-wrapper">
            <span className="user-name">{record?.userName}</span>
            <span
              className="detail-icon"
              onClick={(e) => {
                e.stopPropagation();
                getAssessmentDetail(_id);
              }}
            >
              {iconMap.detail}
            </span>
          </div>
        );
      },
    },
    {
      title: 'departmentName',
      dataIndex: 'staffName',
      render: (record) => (
        <span>
          {record.department ? record.department?.departmentName : '---'}
        </span>
      ),
    },
    {
      title: 'initLevel',
      dataIndex: 'initLevel',
      render: (record) => <span>{record?.levelName}</span>,
    },
    {
      title: 'currentLevel',
      dataIndex: 'currentLevel',
      render: (record) => <span>{record?.levelName}</span>,
    },
    {
      title: 'staffName',
      dataIndex: 'staffName',
      render: (record) => record?.onboardingTime.split('')[0],
    },
    { title: 'standardScore', dataIndex: 'standardScore', editable: true },
    { title: 'assessmentScore', dataIndex: 'assessmentScore', editable: true },
    { title: 'result', dataIndex: 'result', editable: true },
    {
      title: 'date',
      dataIndex: 'date',
      editable: true,
      render: (record) => record.split('')[0],
    },
  ];

  columns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => {
        let type = '';
        switch (col.dataIndex) {
          case 'date':
            type = 'dateNode';
            break;
          default:
            type = 'inputNode';
            break;
        }
        return {
          record,
          type,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          rules: assessmentRule[col.dataIndex],
        };
      },
    };
  });
  return columns;
};

export default Columns;

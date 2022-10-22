import { initialEmployee } from '@/service/interface/employeeAnalyze'
export default {
  namespace: 'staff',
  state: {
    amountDataList: [{
      title: 'Total',
      amount: 17,
      styleData: { width: '100%', height: '170px' },
    }, {
      title: 'employee enrolled in 1 year',
      amount: 13,
      styleData: { width: '33%', height: '170px' },
    }, {
      title: 'employee enrolled in 2 year',
      amount: 1,
      styleData: { width: '33%', height: '170px' },
    }, {
      title: 'employee enrolled in 2 year',
      amount: 4,
      styleData: { width: '33%', height: '170px' },
    },],
    staffData: {
      title: 'loyalty employee',
      renderList: [{
        "userName": "badguy",
        "department": "Research"
      },
      {
        "userName": "admin",
        "department": "Service"
      },
      {
        "userName": "test1",
        "department": "Research"
      },
      {
        "userName": "test2",
        "department": "Research"
      },
      {
        "userName": "test3",
        "department": "Research"
      },
      {
        "userName": "test5",
        "department": "Business"
      },
      {
        "userName": "tt1",
        "department": "Technology"
      },
      {
        "userName": "tt2",
        "department": "Technology"
      },
      {
        "userName": "tt3",
        "department": "Technology"
      },
      {
        "userName": "tt5",
        "department": "Test"
      }],
      styleData: { width: '49.8%', height: '350px' }
    },
    pieList: [
      {
        title: 'Eduction',
        renderList: [
          {
            "name": "",
            "value": 0
          },
          {
            "name": "college",
            "value": 1
          },
          {
            "name": "phd",
            "value": 5
          },
          {
            "name": "undergraduate",
            "value": 11
          },
          {
            "name": "unknown",
            "value": 0
          },
          {
            "name": "post-phd",
            "value": 0
          }
        ],
        styleData: { width: '49.8%', height: '350px' },
      },
      {
        title: 'gender ratio',
        renderList: [ // 性别列表
          {
            "name": "male", // 性别
            "value": 7,  // 男性的总人数
            "age": "30.29"  // 所占的百分比
          },
          {
            "name": "female",
            "value": 10,
            "age": "31.70"
          }
        ],
        styleData: { width: '49.8%', height: '350px' },
      },
    ],
    columnList: [
      {
        title: 'employee age',
        renderList: { // 年龄列表
          "xData": [  // 所有年龄
            "11",
            "22",
            "26",
            "28",
            "29",
            "31",
            "32",
            "37",
            "38",
            "39",
            "42",
            "52"
          ],
          "yData": [ // 对应的人数
            1,
            2,
            2,
            3,
            1,
            1,
            1,
            1,
            2,
            1,
            1,
            1
          ]
        },
        styleData: { width: '49.8%', height: '350px' },
        
      },
      {
        title: 'department employee number',
        renderList: { // 部门员工列表  
          "xData": [ // 表示部门
            "research",
            "test",
            "service",
            "tech",
            "business",
            "unknown"
          ],
          "yData": [ // 表示对应的人数
            3,
            1,
            1,
            1,
            1,
            0
          ],
        },
        styleData: { width: '49.8%', height: '350px' },
        br:true,
      },
    ],
    marriageData: {
      title: 'marriage',
      renderList: [
        {
          "name": "unmarried",
          "value": 8
        },
        {
          "name": "married",
          "value": 17
        }
      ],
      styleData: { width: '49.8%', height: '350px' },
    },
    constellationData: {
      title: 'Constellations',
      renderList: [ // 星座列表  name 表示星座， value 表示人数
        {
          "value": 5,
          "name": "aries"
        },
        {
          "value": 15,
          "name": "virgin"
        },
        {
          "value": 4,
          "name": "gemini"
        }
      ],
      styleData: { width: '49.8%', height: '350px' },
    },
  },
  reducers: {
    formatData(state, { payload }) {
      const { data } = payload;
      const filterData = {
        amountDataList: [
          {
            title: 'Total',
            amount: data.total,
            styleData: { width: '100%', height: '170px' },
          },
          {
            title: 'employee enrolled in 1 year',
            amount: data.onboardingTimeData.one,
            styleData: { width: '33%', height: '170px' },
          },
          {
            title: 'employee enrolled in 2 year',
            amount: data.onboardingTimeData.two,
            styleData: { width: '33%', height: '170px' },
          },
          {
            title: 'employee enrolled in 3 year',
            amount: data.onboardingTimeData.three,
            styleData: { width: '33%', height: '170px' },
          },
        ],
        pieList: [
          {
            title: 'education',
            renderList: data.educationList,
            styleData: { width: '49.8%', height: '350px' },
          },
          {
            title: 'gender ratio',
            renderList: data.genderList,
            styleData: { width: '49.8%', height: '350px' },
          },
        ],
        columnList: [
          {
            title: 'age level',
            renderList: data.ageMap,
            styleData: { width: '49.8%', height: '350px' },
          },
          {
            title: 'employee number',
            renderList: data.departmentList,
            styleData: { width: '49.8%', height: '350px' },
          },
        ],
        marriageData: {
          title: 'employee marriage',
          renderList: data.marriageList,
          styleData: { width: '49.8%', height: '350px' },
        },
        staffData: {
          title: 'loyalest employee',
          renderList: data.wordingYearsMaps,
          styleData: { width: '49.8%', height: '350px' },
        },
        constellationData: {
          title: 'employee Constellations',
          renderList: data.constellationList,
          styleData: { width: '49.8%', height: '350px' },
        },
      };
      return { ...state, ...filterData };
    }
  },
  effects: {
    *initialData({ }, { put, call }) {
      //  const {data}= yield call(initialEmployee)
      //  yield put({ type: 'formatData', payload: { data } });
    }
  }
}
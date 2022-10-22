import { getAttendanceTable } from '../../service/interface/attendance'
export default {
    namespace: 'attendance',
    state: {
        tableList: [{
            title: 'earlyLeave', renderList: [
                {
                    "_id": "61b043a78f8ce58d3870b838",
                    "staffName": {
                        "_id": "61ad797f741d9c0331786a8a",
                        "userName": "test",
                        "department": {
                            "_id": "62cfd63964b94b188c64d8ca",
                            "departmentName": "1"
                        }
                    },
                    "createTime": "2021-12-23T05:31:54.452Z",
                    "attendanceType": 3,
                    "__v": 0
                },
                {
                    "_id": "62da4e24eb98dcd1703b71ac",
                    "createTime": "2021-05-02T07:46:46.475Z",
                    "staffName": {
                        "_id": "6133444bed216929c17c02a0",
                        "userName": "manager",
                        "department": {
                            "_id": "633803a291674b256808221e",
                            "departmentName": "whatever"
                        }
                    },
                    "attendanceType": 3,
                    "__v": 0
                },
                {
                    "_id": "63184ea6e843944e292810d2",
                    "staffName": {
                        "_id": "6309daf71076cd00ff4d85f3",
                        "userName": "test1",
                        "department": {
                            "_id": "6340462f18d87b1544e60f95",
                            "departmentName": "111"
                        }
                    },
                    "createTime": "2021-09-08T07:56:16.280Z",
                    "attendanceType": 3,
                    "__v": 0
                }
            ]
        },
        {
            title: 'lateAttendance', renderList: [
                {
                    "_id": "61b043a78f8ce58d3870b838",
                    "staffName": {
                        "_id": "61ad797f741d9c0331786a8a",
                        "userName": "test",
                        "department": {
                            "_id": "62cfd63964b94b188c64d8ca",
                            "departmentName": "1"
                        }
                    },
                    "createTime": "2021-12-23T05:31:54.452Z",
                    "attendanceType": 3,
                    "__v": 0
                },
                {
                    "_id": "62da4e24eb98dcd1703b71ac",
                    "createTime": "2021-05-02T07:46:46.475Z",
                    "staffName": {
                        "_id": "6133444bed216929c17c02a0",
                        "userName": "manager",
                        "department": {
                            "_id": "633803a291674b256808221e",
                            "departmentName": "whatever"
                        }
                    },
                    "attendanceType": 3,
                    "__v": 0
                },
                {
                    "_id": "63184ea6e843944e292810d2",
                    "staffName": {
                        "_id": "6309daf71076cd00ff4d85f3",
                        "userName": "test1",
                        "department": {
                            "_id": "6340462f18d87b1544e60f95",
                            "departmentName": "111"
                        }
                    },
                    "createTime": "2021-09-08T07:56:16.280Z",
                    "attendanceType": 3,
                    "__v": 0
                }
            ]
        }],
        charList: [{
            title: 'earlyLeave Num', renderList: {
                "xData": [
                    "2021-05-02T07:46:46.475Z",
                    "2021-09-08T07:56:16.280Z",
                    "2021-12-23T05:31:54.452Z"
                ],
                "yData": [
                    1,
                    1,
                    1
                ]
            }
        },
        {
            title: 'lateAttendance Num', renderList: {
                "xData": [
                    "2021-05-02T07:46:46.475Z",
                    "2021-09-08T07:56:16.280Z",
                    "2021-12-23T05:31:54.452Z"
                ],
                "yData": [
                    1,
                    1,
                    1
                ]
            }
        }],
    },
    reducers: {
        getInitialData(state, { payload }) {
            // console.log(payload)
            const newForm = {
                tableList: [{ title: '早退', renderList: payload.earlyTable },
                { title: '迟到', renderList: payload.lateTable }],
                charList: [{ title: '早退员工数量', renderList: payload.earlyBI },
                { title: '迟到员工数量', renderList: payload.lateBI }]
            }
            return { ...newForm }
        }
    },
    effects: {
        *initialData({ }, { put, call }) {
            const res = yield call(getAttendanceTable);
            // console.log(res)
            yield put({ type: 'getInitialData', payload: res.data })
        }
    }

}
export const staffRule = {
    userName: [
      { required: true, message: 'required' },
      { max: 16, message: 'no longer than 16' },
      { min: 2, message: 'no shorter than 2' },
    ],
    accountName: [
      { required: true, message: 'required' },
      { max: 16, message: 'no longer than 16' },
      { min: 4, message: 'no shorter than 4' },
    ],
    password: [
      { required: true, message: 'required' },
      { max: 16, message: 'no longer than 16' },
      { min: 4, message: 'no shorter than 4' },
    ],
    mobile: [
      {
        validator: (rule, val, callback) => {
          const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
          switch (true) {
            case !Boolean(val):
              return Promise.reject('required')
            case !mobileReg.test(val):
              return Promise.reject('wrong format')
            default:
              return Promise.resolve()
          }
        },
      }
    ],
    salary: [
      { required: true, message: 'required' },
      { max: 16, message: 'check the amount' },
      { min: 4, message: 'check the amount' },
    ],
    hometown: [
      { required: true, message: 'required' },
    ],
    onboardingTime: [{ type: 'object', required: true, message: 'required' }],
    gender: [{ required: true, message: 'required' }],
    idNumber: [
      { required: true, message: 'required' },
    ],
    bankNumber: [
      { required: true, message: 'required' },
      { max: 18, message: 'check the number' },
      { min: 6, message: 'check the number' },
    ],
    department: [
      { required: true, message: 'required' },
    ],
    level: [
      { required: true, message: 'required' },
    ],
    education: [
      { required: true, message: 'required' },
    ],
    marriage: [
      { required: true, message: 'required' },
    ],
    graduatedSchool: [
      { required: true, message: 'required' },
    ],
    avatar: [
      { required: false, message: 'required' },
    ],
  }
  
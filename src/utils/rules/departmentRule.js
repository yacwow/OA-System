export const departmentRule = {
  departmentName: [
    { required: true, message: 'required' },
    { max: 20, message: 'wrong length' },
    { min: 1, message: 'wrong length' },
  ],
  departmentLeader: [{ required: true, message: 'required' }],
};

export const assessmentRule = {
  staffNameVal: [
    { required: true, message: 'required' },
    { max: 4, message: 'too long' },
    { min: 2, message: 'too short' },
  ],
  date: [{ required: true, message: 'required' }],
  assessmentRequire: [
    { required: true, message: 'required' },
    { max: 16, message: 'too long' },
    { min: 2, message: 'too short' },
  ],
  result: [{ required: true, message: 'required' }],
  currentLevelVal: [{ required: true, message: 'required' }],
  standardScore: [{ required: true, message: 'required' }],
  assessmentScore: [{ required: true, message: 'required' }],
};

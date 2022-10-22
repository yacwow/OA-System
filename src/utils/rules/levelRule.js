export const levelRule = {
  levelName: [
    { required: true, message: 'required' },
    { max: 20, message: 'too long' },
    { min: 2, message: 'too short' },
  ],
  levelDescription: [
    { required: true, message: 'required' },
    { max: 20, message: 'too long' },
    { min: 2, message: 'too short' },
  ],
  assessmentRequire: [
    { required: true, message: 'required' },
    { max: 16, message: 'too long' },
    { min: 2, message: 'too short' },
  ],
  interviewRequire: [
    { required: true, message: 'required' },
    { max: 5, message: 'too long' },
    { min: 1, message: 'too short' },
  ],
  baseNumber: [{ required: true, message: 'required' }],
  levelScore: [{ required: true, message: 'required' }],
};

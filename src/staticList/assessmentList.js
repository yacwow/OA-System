export default [
  [
    {
      itemName: 'staffNameVal',
      initVal: 'please input staff name',
      labelTxt: 'employee',
      renderType: 'popover',
      url: 'getStaffList',
      type: 'userName',
    },

    {
      itemName: 'date',
      initVal: 'please select',
      labelTxt: 'data',
      renderType: 'date',
    },
  ],
  [
    {
      itemName: 'result',
      initVal: 'automatic computed',
      labelTxt: 'result',
      renderType: 'input',
      type: 'levelName',
      readOnly: true,
    },

    {
      itemName: 'currentLevelVal',
      initVal: 'please input',
      labelTxt: 'currentLevelVal',
      renderType: 'popover',
      url: 'getLevelList',
      type: 'levelName',
    },
  ],
  [
    {
      itemName: 'standardScore',
      initVal: 'automatic computed',
      labelTxt: 'standardScore',
      renderType: 'inputNumber',
      readOnly: true,
    },

    {
      itemName: 'assessmentScore',
      initVal: 'please input',
      labelTxt: 'assessmentScore',
      renderType: 'inputNumber',
    },
  ],
];

export const readData = [
  [
    { itemName: 'departmentName', labelTxt: 'departmentName', renderType: 'tag' },
    { itemName: 'onboardingTime', labelTxt: 'onboardingTime', renderType: 'tag' },
  ],
];

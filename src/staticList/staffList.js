import { mapData } from '../utils/mapData';

export default [
  [
    {
      renderType: 'input',
      itemName: 'userName',
      placeholderVal: 'please input username',
      labelTxt: 'Name',
    },
    {
      renderType: 'input',
      itemName: 'accountName',
      placeholderVal: 'input accountName',
      labelTxt: 'accountName',
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'password',
      placeholderVal: 'input password',
      labelTxt: 'password',
    },
    {
      renderType: 'input',
      itemName: 'mobile',
      placeholderVal: 'input mobile',
      labelTxt: 'mobile', 
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'salary',
      placeholderVal: 'input salary',
      labelTxt: 'salary',
    },
    {
      renderType: 'input',
      itemName: 'hometown',
      placeholderVal: 'input hometown',
      labelTxt: 'hometown',
    },
  ],
  [
    {
      renderType: 'date',
      itemName: 'onboardingTime',
      placeholderVal: 'input enrolled time',
      labelTxt: 'onboardingTime',
    },
    {
      renderType: 'select',
      itemName: 'gender',
      placeholderVal: 'please select',
      labelTxt: 'gender',
      optionData: mapData.gender,
    },
  ],
  [
    {
      renderType: 'input',
      itemName: 'idNumber',
      placeholderVal: 'idNumber',
      labelTxt: 'idNumber',
    },
    {
      renderType: 'input',
      itemName: 'bankNumber',
      placeholderVal: 'bankNumber',
      labelTxt: 'bankNumber',
    },
  ],
  [
    {
      renderType: 'popover',
      itemName: 'departmentName',
      placeholderVal: 'please select',
      labelTxt: 'departmentName',
      url: 'getDepartmentList',
    },
    {
      renderType: 'popover',
      itemName: 'levelName',
      placeholderVal: 'please select',
      labelTxt: 'levelName',
      optionName: 'levelName',
      url: 'getLevelList',
    },
  ],
  [
    { itemName: 'department', renderType: 'input', style: { display: 'none' } },
    { itemName: 'level', renderType: 'input', style: { display: 'none' } },
  ],
  [
    {
      renderType: 'select',
      itemName: 'education',
      placeholderVal: 'please select',
      labelTxt: 'education',
      optionData: mapData.education,
    },
    {
      renderType: 'select',
      itemName: 'marriage',
      placeholderVal: 'please select',
      labelTxt: 'marriage',
      optionData: mapData.marriage,
    },
  ],
  [
    {
      itemName: 'graduatedSchool',
      placeholderVal: 'please input',
      labelTxt: 'graduatedSchool',
      renderType: 'input',
      type: 'input',
    },
    {
      labelTxt: 'avatar',
      type: 'upload',
      renderType: 'upload',
      itemName: 'avatar',
    },
  ],
];

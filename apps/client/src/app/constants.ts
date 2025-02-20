export const placeholderItemImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU';

export const capacityFilterOptions = [
  { value: '', label: 'Select Capacity' },
  {
    value: '1',
    label: '1-7 people',
    data: { capacity_gt: '1', capacity_lt: '7' },
  },
  {
    value: '8',
    label: '8 people',
    data: { capacity_gt: '8' },
  },
  {
    value: '9',
    label: '9 people',
    data: { capacity_gt: '9' },
  },
  {
    value: '10',
    label: '10 people',
    data: { capacity_gt: '10' },
  },
  {
    value: '11',
    label: '11 people',
    data: { capacity_gt: '11' },
  },
  {
    value: '12',
    label: '12 people',
    data: { capacity_gt: '12' },
  },
];

export const sizeFilterOptions = [
  { value: '', label: 'Select Size' },
  {
    value: '20',
    label: '20-40ft',
    data: { size_gt: '20', size_lt: '40' },
  },
  {
    value: '40',
    label: '40-60ft',
    data: { size_gt: '40', size_lt: '60' },
  },
  {
    value: '60',
    label: '60-80ft',
    data: { size_gt: '60', size_lt: '80' },
  },
  {
    value: '80',
    label: '80-100ft',
    data: { size_gt: '80', size_lt: '100' },
  },
  {
    value: '100',
    label: '100ft +',
    data: { size_gt: '100' },
  },
];

export const budgetFilterOptions = [
  { value: '', label: 'Select Budget' },
  {
    value: '0',
    label: '0 - €2000',
    data: { size_gt: '0', size_lt: '2000' },
  },
  {
    value: '1000',
    label: '€2000 - €4000',
    data: { size_gt: '2000', size_lt: '4000' },
  },
  {
    value: '4000',
    label: '€4000 - €6000',
    data: { size_gt: '4000', size_lt: '6000' },
  },
  {
    value: '6000',
    label: '€6000 - €8000',
    data: { size_gt: '6000', size_lt: '8000' },
  },
  {
    value: '8000',
    label: '€8000 - €10000',
    data: { size_gt: '8000', size_lt: '10000' },
  },
  {
    value: '10000',
    label: '€10000 +',
    data: { size_gt: '10000' },
  },
];

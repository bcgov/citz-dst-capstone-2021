export const API = {
  BASE_URL: () =>
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api/v1/'
      : `${window.location.origin}/api/v1/`,
};

const Constants = {
  API,
};

/**
 * TODO: (nick) move to database
 */
export const Ministries = [
  'Advanced Education and Skills Training',
  'Agriculture, Food and Fisheries',
  'Attorney General',
  'Children and Family Development',
  "Citizens' Services",
  'Education',
  'Energy, Mines and Low Carbon Innovation',
  'Environment and Climate Change Strategy',
  'Finance',
  'Forests, Lands, Natural Resource Operations and Rural Development',
  'Health',
  'Indigenous Relations and Reconciliation',
  'Jobs, Economic Recovery and Innovation',
  'Labour',
  'Mental Health and Addictions',
  'Municipal Affairs',
  'Public Safety and Solicitor General',
  'Social Development and Poverty Reduction',
  'Tourism, Arts, Culture and Sport',
  'Transportation and Infrastructure',
];

// status summary colour statuses
// TODO: add descriptions to status colors for tooltip functionality
export const ColorStatuses = {
  notStarted: {label: 'Not Started', abbrev: 'NS', color: '#707070'},
  green: {label: 'Green', abbrev: 'G', color: '#479a3b'},
  yellow: {label: 'Yellow', abbrev: 'Y', color: '#e3a82b'},
  red: {label: 'Red', abbrev: 'R', color: '#ff0000'},
  complete: {label: 'Complete', abbrev: 'C', color: '#0029f5'}
};

// status summary trends
export const StatusTrends = [
  {iconName: 'ArrowDownward', trend: 'up'},
  {iconName: 'ArrowForward', trend: 'steady'},
  {iconName: 'ArrowUpward', trend: 'down'}
];

export default Constants;

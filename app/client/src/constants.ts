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
export const ColorStatuses = [
  {label: 'Not Started', abbrev: 'NS', color: '#707070'},
  {label: 'Green', abbrev: 'G', color: '#479a3b'},
  {label: 'Yellow', abbrev: 'Y', color: '#e3a82b'},
  {label: 'Red', abbrev: 'R', color: '#ff0000'},
  {label: 'Complete', abbrev: 'C', color: '#0029f5'}
];

export const SubmitReportSteps = [
  'Project Information',
  'Status Summary',
  'Financial Information',
  'Business Case Objective Tracking',
  'Key Milestone Status',
  'Key Performance Indicators'
];

export default Constants;

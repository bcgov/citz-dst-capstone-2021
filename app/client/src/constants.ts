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

export const EditReportSteps = [
  'Project Information',
  'Status Summary',
  'Financial Information',
  'Business Case Objective Tracking',
  'Key Milestone Status',
  'Key Performance Indicators',
];

export const projectDetailTabs = [
  'Project Information',
  'Key Performance Indicators',
  'Key Milestones',
  'Business Case Objectives',
  'Quarterly Status Reports',
];

export const reportDetailTabs = [
  'Project Information',
  'Status Summary',
  'Financial Information',
  'Business Case Objectives',
  'Key Milestones',
];

export default Constants;

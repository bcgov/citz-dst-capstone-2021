export const ROUTE_PATHS = {
  NOT_FOUND: "/page-not-found",
  LANDING: "/landing",
  DASHBOARD: "/dashboard",
  // DASHBOARD: "/",
  PROFILE_CREATE: "/profile/create",
  PROFILE_EDIT: "/profile/:profileId/:viewName",
};

export const PROFILE_EDIT_VIEW_NAMES = {
  OVERVIEW: "overview",
  PROJECT: "project",
  CONTACT: "contact",
  QUOTA: "quota",
};

export const API = {
  BASE_URL: () =>
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/v1/"
      : `${window.location.origin}/api/v1/`,
};

export const COMPONENT_METADATA = [
  { displayName: "Notification: Email", inputValue: "notificationEmail" },
  { displayName: "Notification: SMS", inputValue: "notificationSms" },
  { displayName: "Notification: MS Teams", inputValue: "notificationMsTeams" },
  { displayName: "Payment processing: Bambora", inputValue: "paymentBambora" },
  { displayName: "Payment processing: PayBC", inputValue: "paymentPayBc" },
  { displayName: "File Transfer", inputValue: "fileTransfer" },
  { displayName: "File Storage", inputValue: "fileStorage" },
  { displayName: "Geo Mapping: Web-based", inputValue: "geoMappingWeb" },
  {
    displayName: "Geo Mapping: Location Services",
    inputValue: "geoMappingLocation",
  },
  { displayName: "Scheduling: Calendar", inputValue: "schedulingCalendar" },
  {
    displayName: "Scheduling: Appointments",
    inputValue: "schedulingAppointments",
  },
  {
    displayName: "Identity Management: SiteMinder",
    inputValue: "idmSiteMinder",
  },
  { displayName: "Identity Management: KeyCloak", inputValue: "idmKeycloak" },
  {
    displayName: "Identity Management: Active Directory",
    inputValue: "idmActiveDir",
  },
];

export const ROLES = {
  PRODUCTOWNER: 1,
  TECHNICAL: 2,
  ADMINISTRATOR: "administrator",
};

export const RESPONSE_STATUS_CODE = {
  UNAUTHORIZED: 401,
};

export const CSV_PROFILE_ATTRIBUTES = [
  "id",
  "name",
  "description",
  "busOrgId",
  "prioritySystem",
  "migratingLicenseplate",
  "primaryClusterDisplayName",
  "namespacePrefix",
  "quotaSize",
  "createdAt",
  "updatedAt",
  "POEmail",
  "POName",
  "POGithubId",
  "TCEmail",
  "TCName",
  "TCGithubId",
];
export const HOME_PAGE_URL = ROUTE_PATHS.DASHBOARD;

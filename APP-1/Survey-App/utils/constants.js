export const APP_NAME = 'Smart Field Survey';
export const APP_VERSION = '1.0.0';

export const STUDENT = {
  name: 'Bhavy Talaviya',
  id: 'CGCE241234',
  course: 'B.E. Computer Engineering',
  department: 'Computer Science',
  year: '1st Year',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLgIaA9UDFg-ipTQgskzaon5Ma7q8V7H8lPAQbATwjvMuK4QOSb=s288-c-no',
};

export const STORAGE_KEYS = {
  surveys: '@smart_field_survey/surveys',
  theme: '@smart_field_survey/theme',
  settings: '@smart_field_survey/settings',
};

export const PRIORITIES = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

export const DEFAULT_SETTINGS = {
  darkMode: false,
  notifications: true,
};

export const SURVEY_STATUS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  PENDING: 'Pending',
};

export const DRAWER_ROUTES = {
  HOME: '/dashboard',
  HISTORY: '/survey-history',
  REPORT: '/inspection-report',
  HELP: '/help',
  ABOUT: '/about',
};

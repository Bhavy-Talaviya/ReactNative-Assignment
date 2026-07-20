export const generateSurveyId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SFS-${timestamp}-${random}`;
};

export const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const capitalize = (value = '') =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

export const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

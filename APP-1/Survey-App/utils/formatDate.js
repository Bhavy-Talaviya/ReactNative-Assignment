const toDate = (value) => (value instanceof Date ? value : new Date(value));

export const formatDate = (value) => {
  if (!value || Number.isNaN(toDate(value).getTime())) return 'Not selected';

  return toDate(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatTime = (value) => {
  if (!value || Number.isNaN(toDate(value).getTime())) return '';

  return toDate(value).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (value) => {
  const date = formatDate(value);
  const time = formatTime(value);
  return time ? `${date} • ${time}` : date;
};

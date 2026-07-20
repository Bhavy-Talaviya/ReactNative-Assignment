const REQUIRED_FIELDS = {
  siteName: 'Site name is required.',
  clientName: 'Client name is required.',
  description: 'Description is required.',
  priority: 'Please select a priority.',
  surveyDate: 'Please select a survey date.',
};

export const validateRequired = (value, message = 'This field is required.') =>
  String(value ?? '').trim() ? '' : message;

export const validateSurvey = (survey) => {
  const errors = {};

  Object.entries(REQUIRED_FIELDS).forEach(([field, message]) => {
    if (field === 'surveyDate') {
      if (!survey[field]) errors[field] = message;
      return;
    }

    const error = validateRequired(survey[field], message);
    if (error) errors[field] = error;
  });

  return errors;
};

export const hasValidationErrors = (errors) => Object.keys(errors).length > 0;

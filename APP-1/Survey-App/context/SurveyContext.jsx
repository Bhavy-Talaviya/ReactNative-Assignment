import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { getItem, saveItem } from '../services/storageService';
import { generateSurveyId } from '../utils/helpers';
import { STORAGE_KEYS, SURVEY_STATUS } from '../utils/constants';

export const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const [isLoadingSurveys, setIsLoadingSurveys] = useState(true);

  useEffect(() => {
    const loadSurveys = async () => {
      const savedSurveys = await getItem(STORAGE_KEYS.surveys, []);
      setSurveys(savedSurveys);
      setIsLoadingSurveys(false);
    };

    loadSurveys();
  }, []);

  const persistSurveys = useCallback(async (nextSurveys) => {
    setSurveys(nextSurveys);
    await saveItem(STORAGE_KEYS.surveys, nextSurveys);
  }, []);

  const addSurvey = useCallback(
    async (surveyData) => {
      const survey = {
        ...surveyData,
        id: generateSurveyId(),
        status: SURVEY_STATUS.SUBMITTED,
        createdAt: new Date().toISOString(),
      };

      await persistSurveys([survey, ...surveys]);
      return survey;
    },
    [persistSurveys, surveys],
  );

  const updateSurvey = useCallback(
    async (id, updates) => {
      const nextSurveys = surveys.map((survey) =>
        survey.id === id ? { ...survey, ...updates, updatedAt: new Date().toISOString() } : survey,
      );

      await persistSurveys(nextSurveys);
    },
    [persistSurveys, surveys],
  );

  const deleteSurvey = useCallback(
    async (id) => {
      await persistSurveys(surveys.filter((survey) => survey.id !== id));
    },
    [persistSurveys, surveys],
  );

  const value = useMemo(
    () => ({
      surveys,
      isLoadingSurveys,
      addSurvey,
      updateSurvey,
      deleteSurvey,
    }),
    [addSurvey, deleteSurvey, isLoadingSurveys, surveys, updateSurvey],
  );

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

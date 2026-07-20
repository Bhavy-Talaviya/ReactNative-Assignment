import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getItem, saveItem } from '../services/storageService';
import { STUDENT } from '../utils/constants';

const PROFILE_STORAGE_KEY = '@smart_field_survey/profile';

const DEFAULT_PROFILE = {
  name: STUDENT.name,
  email: 'bhavy@example.com',
  phone: '+91 9429218355',
  location: 'Gujarat, India',
  avatar: STUDENT.avatar,
  id: STUDENT.id,
  course: STUDENT.course,
  department: STUDENT.department,
  year: STUDENT.year,
};

export const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(DEFAULT_PROFILE);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await getItem(PROFILE_STORAGE_KEY, DEFAULT_PROFILE);
      setProfileState(savedProfile);
      setIsLoadingProfile(false);
    };

    loadProfile();
  }, []);

  const updateProfile = useCallback(async (updates) => {
    let nextProfile = null;

    setProfileState((current) => {
      nextProfile = { ...current, ...updates };
      return nextProfile;
    });

    await saveItem(PROFILE_STORAGE_KEY, nextProfile);
    return nextProfile;
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isLoadingProfile,
      updateProfile,
    }),
    [profile, isLoadingProfile, updateProfile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

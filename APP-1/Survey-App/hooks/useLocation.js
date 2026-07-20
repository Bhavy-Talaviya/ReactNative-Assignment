import { useCallback, useState } from 'react';

import { getCurrentLocation, requestLocationPermission } from '../services/locationService';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const fetchLocation = useCallback(async () => {
    setIsGettingLocation(true);
    setLocationError('');

    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        throw new Error('Location permission is required to add your current location.');
      }

      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      setLocationError(error.message || 'Unable to get your current location.');
      return null;
    } finally {
      setIsGettingLocation(false);
    }
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setLocationError('');
  }, []);

  return {
    location,
    isGettingLocation,
    locationError,
    fetchLocation,
    clearLocation,
  };
};

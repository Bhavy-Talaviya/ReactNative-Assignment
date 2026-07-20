import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
  const permission = await Location.requestForegroundPermissionsAsync();
  return permission.granted;
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const { latitude, longitude, accuracy } = location.coords;
  const addresses = await Location.reverseGeocodeAsync({ latitude, longitude });

  return {
    latitude,
    longitude,
    accuracy,
    address: formatAddress(addresses[0]),
  };
};

const formatAddress = (address) => {
  if (!address) return 'Address unavailable';

  return [
    address.name,
    address.street,
    address.district,
    address.city,
    address.region,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .filter((part, index, values) => values.indexOf(part) === index)
    .join(', ');
};

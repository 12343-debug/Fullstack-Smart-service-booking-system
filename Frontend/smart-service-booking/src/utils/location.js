const parseCoordinate = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const buildMapsUrl = (location = {}) => {
  const latitude = parseCoordinate(location?.latitude);
  const longitude = parseCoordinate(location?.longitude);

  if (latitude !== null && longitude !== null) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }

  const address = String(location?.address || "").trim();
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  return "";
};

export const buildEmbeddedMapsUrl = (location = {}) => {
  const latitude = parseCoordinate(location?.latitude);
  const longitude = parseCoordinate(location?.longitude);

  if (latitude !== null && longitude !== null) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  }

  const address = String(location?.address || "").trim();
  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
  }

  return "";
};

export const buildDirectionsUrl = (destination = {}, origin = {}) => {
  const destinationLatitude = parseCoordinate(destination?.latitude);
  const destinationLongitude = parseCoordinate(destination?.longitude);
  const originLatitude = parseCoordinate(origin?.latitude);
  const originLongitude = parseCoordinate(origin?.longitude);

  let destinationValue = "";
  if (destinationLatitude !== null && destinationLongitude !== null) {
    destinationValue = `${destinationLatitude},${destinationLongitude}`;
  } else {
    destinationValue = String(destination?.address || "").trim();
  }

  if (!destinationValue) {
    return "";
  }

  const baseUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationValue)}`;

  if (originLatitude !== null && originLongitude !== null) {
    return `${baseUrl}&origin=${encodeURIComponent(`${originLatitude},${originLongitude}`)}`;
  }

  return baseUrl;
};

export const formatCoordinates = (location = {}) => {
  const latitude = parseCoordinate(location?.latitude);
  const longitude = parseCoordinate(location?.longitude);

  if (latitude === null || longitude === null) {
    return "";
  }

  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
};

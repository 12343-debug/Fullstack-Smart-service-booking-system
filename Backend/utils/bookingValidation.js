const STATUS_VALUES = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];

const ALL_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const normalizeBookingDate = (value) => {
  const raw = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return { error: "Valid booking date is required" };
  }

  const parsedDate = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return { error: "Invalid booking date" };
  }

  return { value: raw };
};

const normalizeLocation = (location = {}) => {
  const address = String(location.address || "").trim();
  const notes = String(location.notes || "").trim();
  const latitude =
    location.latitude === "" || location.latitude === null || location.latitude === undefined
      ? null
      : Number(location.latitude);
  const longitude =
    location.longitude === "" || location.longitude === null || location.longitude === undefined
      ? null
      : Number(location.longitude);

  if (!address) {
    return { error: "Service address is required" };
  }

  if ((latitude !== null && Number.isNaN(latitude)) || (longitude !== null && Number.isNaN(longitude))) {
    return { error: "Invalid map coordinates" };
  }

  return {
    value: {
      address,
      notes,
      latitude,
      longitude,
    },
  };
};

module.exports = {
  STATUS_VALUES,
  ALL_SLOTS,
  normalizeBookingDate,
  normalizeLocation,
};

import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token,
    },
  };
};

export const createBooking = async (serviceTitle, userName, Phone, bookingDate, slot, location) => {
  const response = await api.post(
    "/book",
    { serviceTitle, userName, Phone, bookingDate, slot, location },
    
    getAuthConfig(),
  );
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings", getAuthConfig());
  return response.data;
};
export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`, getAuthConfig());
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(
    `/bookings/${id}`,
    { status },
    getAuthConfig(),
  );
  return response.data;
};

// edit
export const updateBookingDetails = async (id, userName, Phone, location) => {
  const res = await api.put(
    `/bookings/edit/${id}`,
    { userName, Phone, location },
    getAuthConfig(),
  );
  return res.data;
};

export const rescheduleBooking = async (id, bookingDate, slot, reason = "") => {
  const res = await api.put(
    `/bookings/${id}/reschedule`,
    { bookingDate, slot, reason },
    getAuthConfig(),
  );
  return res.data;
};

export const cancelBooking = async (id, reason = "") => {
  const res = await api.put(
    `/bookings/${id}/cancel`,
    { reason },
    getAuthConfig(),
  );
  return res.data;
};

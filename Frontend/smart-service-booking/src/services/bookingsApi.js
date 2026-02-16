import api from "./api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token,
    },
  };
};

export const createBooking = async (serviceTitle, userName, Phone) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/book",
    // serviceTitle: serviceTitle,
    // userName: userName,
    // Phone: Phone,
    { serviceTitle, userName, Phone },
    {
      headers: {
        Authorization: token,
      },
    },
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
export const updateBookingDetails = async (id, userName, Phone) => {
  const res = await api.put(
    `/bookings/edit/${id}`,
    { userName, Phone },
    getAuthConfig(),
  );
  return res.data;
};

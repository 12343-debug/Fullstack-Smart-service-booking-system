import api from "./api";

export const createBooking = async (serviceTitle, userName, Phone) => {
  const response = await api.post("/book", {
    serviceTitle: serviceTitle,
    userName: userName,
    Phone: Phone,
  });
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};
export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}`, {
    status: status
  });
  return response.data;
};


// edit
export const updateBookingDetails = async (id, userName, Phone) => {
  const res = await api.put(`/bookings/edit/${id}`, {
    userName,
    Phone
  });
  return res.data;
};




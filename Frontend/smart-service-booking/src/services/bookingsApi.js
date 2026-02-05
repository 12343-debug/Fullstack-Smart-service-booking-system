import api from "./api";


const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: token
  }
};


export const createBooking = async (serviceTitle, userName, Phone) => {
  const response = await api.post("/book", 
    // serviceTitle: serviceTitle,
    // userName: userName,
    // Phone: Phone,
    { serviceTitle, userName, Phone },
    config
  );
  return response.data;
};


export const getBookings = async () => {
  const response = await api.get("/bookings",config);
  return response.data;
};
export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`,config);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}`, 
    { status },
    config
  );
  return response.data;
};


// edit
export const updateBookingDetails = async (id, userName, Phone) => {
  const res = await api.put(`/bookings/edit/${id}`, 
    { userName, Phone },
    config
  );
  return res.data;
};




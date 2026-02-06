import api from "./api";

export const getServices =async ()=>{
    const token = localStorage.getItem("token");
    const response = await api.get("/services",{
         headers: {
      Authorization: token
    }
    });
    return response.data;
};
// records api
const axios = require("axios").default;
const recordsUrl  = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:3005";

export  const records = () => axios.get(`${recordsUrl}/records`);

export const creatRecords = (body)=> 
  axios.post(`${recordsUrl}/records`,body)

export const updateRecords = (id, body)=>
  axios.put(`${recordsUrl}/records/${id}`,body)

export const deleteRecords = (id)=>
  axios.delete(`${recordsUrl}/records/${id}`)
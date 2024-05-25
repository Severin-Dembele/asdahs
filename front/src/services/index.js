import axios from "axios";

export function getItem() {
  const storedData = localStorage.getItem(
    "africanhealthstudy"
  );
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}

export function setItem(value) {
  localStorage.setItem(
    "africanhealthstudy",
    JSON.stringify(value)
  );
}

export function removeItem() {
  localStorage.removeItem("africanhealthstudy");
}

export function clear() {
  localStorage.clear();
}

export const SERVERURLS = `http://localhost:5000/`;

const storedData = localStorage.getItem(
  "africanhealthstudy"
);
const DataValue = JSON.parse(storedData);
const token = DataValue?.access_token;

export function postData(endpoint, data, multipart = true) {
  return axios.post(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": multipart ? "multipart/form-data" : "application/json",
    },
  });
}

export function postDataWithNoToken1(endpoint, data) {
  return axios.post(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
}

export function postDataWithNoToken(endpoint, data, multipart = true) {
  return axios.post(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      "content-type": multipart ? "multipart/form-data" : "application/json",
      Accept: "*/*",
    },
  });
}

export function postDataWithNoTokenForm(endpoint, data, multipart = true) {
  return axios.post(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      "content-type": multipart ? "multipart/form-data" : "application/json",
      Accept: "*/*",
      authorization: `Bearer ${token}`,
    },
  });
}

export function putDataWithNoToken(endpoint, data, multipart = true) {
  return axios.put(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      "content-type": multipart ? "multipart/form-data" : "application/json",
    },
  });
}

export function getOne(endpoint, id) {
  return axios.get(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function putData(endpoint, data) {
  return axios.put(`${SERVERURLS}${endpoint}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
}

export function getData(endpoint) {
  
  return axios.get(`${SERVERURLS}${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}

export function deleteData(endpoint) {
  return axios.delete(`${SERVERURLS}${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}

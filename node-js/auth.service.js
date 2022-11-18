import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getMetrics = () => {
  return axios
    .get(API_URL + "get-metrics")
    .then((response) => {
      return response;
    });
};
const addMetrics = (data) => {
  return axios
    .post(API_URL + "add-metrics", data)
    .then((response) => {
      return response;
    });
};
const updateMetrics = (metricId, data) => {
  return axios
    .post(API_URL + "update-metrics", metricId, data)
    .then((response) => {
      return response;
    });
};
const deleteMetrics = (data) => {
  return axios
    .post(API_URL + "delete-metrics", data)
    .then((response) => {
      return response;
    });
};
const getBands = () => {
  return axios
    .get(API_URL + "get-bands")
    .then((response) => {
      return response;
    });
};
const addBands = (data) => {
  return axios
    .post(API_URL + "add-bands", data)
    .then((response) => {
      return response;
    });
};

const updateBands = (data) => {
  return axios
    .post(API_URL + "update-bands", data)
    .then((response) => {
      return response;
    });
};
const updateStatusBands = (data) => {
  return axios
    .post(API_URL + "update-status-bands", data)
    .then((response) => {
      return response;
    });
};

const deleteBands = (data) => {
  return axios
    .post(API_URL + "delete-bands", data)
    .then((response) => {
      return response;
    });
};

const getQuiz = () => {
  return axios
    .get(API_URL + "get-quiz")
    .then((response) => {
      return response;
    });
};
const getQuizById = (data) => {
  return axios
    .post(API_URL + "get-quiz-by-id", data)
    .then((response) => {
      return response;
    });
};

const addQuiz = (data) => {
  return axios
    .post(API_URL + "add-quiz", data)
    .then((response) => {
      return response;
    });
};

const updateQuiz = (data) => {
  return axios
    .post(API_URL + "update-quiz", data)
    .then((response) => {
      return response;
    });
};

const deleteQuiz = (data) => {
  return axios
    .post(API_URL + "delete-quiz", data)
    .then((response) => {
      return response;
    });
};

const getCustomerView = () => {
  return axios
    .get(API_URL + "get-customer-view")
    .then((response) => {
      return response;
    });
};


const getAgentMetrics = () => {
  return axios
    .get(API_URL + "get-agent-metrics")
    .then((response) => {
      return response;
    });
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getMetrics,
  addMetrics,
  updateMetrics,
  deleteMetrics,
  getBands,
  addBands,
  updateBands,
  updateStatusBands,
  deleteBands,
  getQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizById,
  getCustomerView,
  getAgentMetrics
};

export default AuthService;



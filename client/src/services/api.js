// const baseURL = "https://mtest3.herokuapp.com";
const baseURL = "http://localhost:5000";

const endpoints = {
  REGISTER: `${baseURL}/register`,
  LOGIN: `${baseURL}/login`,
  LOGOUT: `${baseURL}/logout`,
  LOGGED_IN: `${baseURL}/loggedIn`,
  LOGGED_USER: `${baseURL}/loggedUser`,
  USERS: `${baseURL}/users`,
  CLIENTS: `${baseURL}/clients`,
  CLIENTS_COUNT: `${baseURL}/clientsAll`,
  PROJECTS: `${baseURL}/projects`,
  PROJECTS_COUNT: `${baseURL}/projectsAll`,
  TASKS: `${baseURL}/tasks`,
  TASKS_COUNT: `${baseURL}/tasksCount`,
  TASKS_ALL: `${baseURL}/tasksAll`,
  TASKS_RESPONSIBLE: `${baseURL}/tasks/responsible`,
  SEND_EMAIL: `${baseURL}/send-email`,
};

export default endpoints;

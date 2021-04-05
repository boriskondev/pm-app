const baseURL = "http://localhost:4000";

const endpoints = {
    REGISTER: `${baseURL}/register`,
    LOGIN: `${baseURL}/login`,
    USERS: `${baseURL}/users`,
    CLIENTS: `${baseURL}/clients`,
    PROJECTS: `${baseURL}/projects`,
    TASKS: `${baseURL}/tasks`,
    TASKS_RESPONSIBLE: `${baseURL}/tasks/responsible`
}

export default endpoints;
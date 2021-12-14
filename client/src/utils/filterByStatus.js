const filterByStatus = (data, status) => {
  return data.tasks.filter((task) => task.status === status);
};

export default filterByStatus;

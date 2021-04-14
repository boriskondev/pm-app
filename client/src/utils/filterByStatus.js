export default (data, status) => {
    return data.tasks.filter(task => task.status === status);
}
export default (id, tasks) => {
    const result = tasks.filter(task => {
        return task.responsible.some(({_id}) => _id === id);
    });
    return result.length;
}
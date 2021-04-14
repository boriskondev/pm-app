export default (data) => {
    data.sort((a, b) =>
        (a.clientId.clientName > b.clientId.clientName)
            ? 1 : (a.clientId.clientName === b.clientId.clientName)
            ? ((a.projectId.projectName > b.projectId.projectName)
                ? 1 : -1) : -1)
    return data;
}
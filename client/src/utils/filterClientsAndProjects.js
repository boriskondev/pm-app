export default (data) => {
    let newArr = []
    for (let task of data) {
        let client = task.clientId.clientName;
        let clientId = task.clientId._id;
        let project = task.projectId.projectName;
        let projectId = task.projectId._id;

        let clientFound = newArr.filter(client => client._id === clientId)[0];

        if (!clientFound) {
            newArr.push({
                clientName: client, _id: clientId,
                projects: [{projectName: project, _id: projectId}]
            });

        } else {
            let projectFound = clientFound.projects.filter(project => project._id === projectId)[0];
            if (!projectFound) {
                clientFound.projects.push({projectName: project, _id: projectId});
            }
        }
    }
    return newArr;
}
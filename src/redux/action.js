
export function addUser(user) {
    return {type:'ADD_USER' ,payLoad:user};
}

export function addCurrentUser(user){
    return{type:'ADD_CURRENT_USER',payload:user};
}

export function taskStatus(task) {
    return{type:'TASK_STATUS' ,payLoad:task}
}

export function deleteTask(taskId) {
    return{type:'DELETE_TASK' ,payLoad:taskId}
}

export function addTask(task) {
    return{type:'ADD_TASK' ,payLoad:task}
}

export function disconnect() {
    return{type:'DISCONNECT' ,payLoad:null}
}

export function addAllTasks(allTasks) {
    return{type:'ADD_ALL_TASKS' ,payLoad:allTasks}
}
export function addAllUsers(allUsers) {
    return{type:'ADD_ALL_USERS' ,payLoad:allUsers}
}
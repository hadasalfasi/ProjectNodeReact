import  {produce} from "immer";


const initialState = {
    taskType: [
        { taskTypeId: 0, taskTypeName: ''},
        { taskTypeId: 1, taskTypeName: 'learn for a test'},
        { taskTypeId: 2, taskTypeName: 'home work' },
        { taskTypeId: 3, taskTypeName: 'project' },
        { taskTypeId: 4, taskTypeName: 'other' }
    ],
    emptyTask: 
        { id:0, taskTypeId: 0, taskName: '',taskDetails:'',date:null, userId: 0,done:false },

    taskList: [
        { id:0, taskTypeId: 0, taskName: '',taskDetails:'',date:null, userId: 0,done:false },
        // { id: 1, taskTypeId: 2, taskName: 'linux exam',taskDetails:'ללמוד למבחן',date:null, userId: 1,done:true },
        // { id: 2, taskTypeId: 3, taskName: 'java',taskDetails:'ללמוד למבחן',date:null, userId:1,done:true },
        // { id: 3, taskTypeId: 4, taskName: 'khbue',taskDetails:'ללמוד למבחן',date:null, userId:2,done:true },
        // { id: 4, taskTypeId: 5, taskName: 'C#',taskDetails:'ללמוד למבחן',date:null, userId: 1,done:false }
    ],
    taskCnt:5
};

export default produce((state,action)=>{
    switch (action.type) {
        case 'TASK_STATUS':
            {state.taskList.find(x=>x.id===action.payLoad.taskId).done=action.payLoad.status;}
            break;
        case 'DELETE_TASK':
            {state.taskList.splice(state.taskList.findIndex(x=>x.id===action.payLoad),1)}
            break;
        case 'ADD_TASK':
            {action.payLoad.id=state.taskCnt++}
            {state.taskList.push(action.payLoad)}
            console.log(state.taskList);
            break;
        case 'ADD_ALL_TASKS':
            {
                state.taskList=action.payLoad;
                state.taskList.push(initialState.emptyTask)
            }
            break;
        default:
            break;
    }
},initialState);
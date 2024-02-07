import {produce} from 'immer'

const initialState = {
    usersList: [
        // {firstName:'Rachely',lastName:'Yaari',email:'rachely4631@gmail.com',password:'1234',id:1},
        // {firstName:'Noa',lastName:'Kraus',email:'nk4110803@gmail.com',password:'3456',id:2},
        // {firstName:'Lali',lastName:'Tesler',email:'lalitesler@gmail.com',password:'5678',id:3}
    ],
    usersCounts: 3
};

export default produce((state,action)=>{
    switch(action.type){
        case 'ADD_USER':
            {action.payLoad.id=++state.usersCounts}
            {state.usersList.push(action.payLoad)}
            break;
        case 'ADD_ALL_USERS':
            {
                state.usersList=action.payLoad;
            }
            break;
    }
},initialState)
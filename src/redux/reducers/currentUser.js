import {produce} from 'immer';
const initialState = {
    // currentUser: {firstName:'Rachely',lastName:'Yaari',email:'rachely4631@gmail.com',password:'1234',id:1}
    currentUser:null
}
export default produce((state,action)=>{
    switch(action.type){
        case 'ADD_CURRENT_USER':
            {state.currentUser=action.payload} 
            break;
        case 'DISCONNECT':
            {state.currentUser=null;}
            break;
        
    }},initialState)

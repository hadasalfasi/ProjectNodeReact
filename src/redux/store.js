import { combineReducers, createStore } from "redux";
import tasks from './reducers/tasks';
import users from './reducers/users';
import currentUser from "./reducers/currentUser";

const reducer=combineReducers({tasks,users,currentUser});

const store=createStore(reducer);
window.store=store;
export default store;
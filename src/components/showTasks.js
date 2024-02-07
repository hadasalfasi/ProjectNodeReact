import React, { Fragment, useState } from "react"
import { connect } from "react-redux"
import ShowTask from './showTask'
import {  Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { IconButton, Snackbar } from "@mui/material"
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { addAllTasks } from "../redux/action"
import axios from "axios"
import { LegendToggleRounded } from "@mui/icons-material"



function mapStateToProps(state) {
    return {
        list: state.tasks.taskList,
        user: state.currentUser.currentUser
    }
}

export default connect(mapStateToProps)(function ShowTasks(props) {

    const { dispatch,list, user,flagConect, setFlagConect} = props;
    const [open, setOpen] = useState(!flagConect);
    const [vec, setVec] = useState([]);
    const[hasTask,setHasTask]=useState(false)
    const newNavigate = useNavigate();
    const [taskList,setTaskList]=useState(list)
    console.log(vec);
    const getData=async()=>{
        try{
            const reaspons = await axios.get('http://localhost:5000/tasks')
            if(reaspons.status===200){
                console.log("from data");
                console.log(reaspons.data);
                dispatch(addAllTasks(reaspons.data))
                setTaskList(reaspons.data)
                console.log(taskList);
                // setHasTask(true)
            }
        }
        catch(error){
            console.error(error);
        }
    }

    const filterTasks = () => {
        if(flagConect)
        { 
            if (taskList === null)
            {
                setHasTask(false)
                return null;
            }
            // setHasTask(false)
            setVec(Array(taskList.filter(item => item.userId === user.id)));
            if(vec===null)
            {
                setHasTask(false)
                return null;
            }
        else{
        }
    }
        else{
            setHasTask(false)
        }
        console.log(vec);
    }
    // const check = () => {
    //     arr = filterTasks();
    //     if (arr !== null) {
    //         // setFlagState(true)
    //         return arr
    //     }
    // }
    useEffect(()=>{
        console.log("in useEffect 2")
        getData()
    },[])
    useEffect(()=>{
       filterTasks()
       console.log("in useEffect 2")
    },[taskList])
    // const arr = filterTasks();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        return newNavigate('/');
    };    
    const action = (
        <Fragment>
            <Button color="inherit" size="small" onClick={()=>{return newNavigate('/login')}}>
                log in
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      );

    
    return (
        <>
            {/* {getData()} */}
            {!flagConect && 
                <>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="you're not connect"
                        action={action}
                    />
                </>
            }
            {
            // hasTask&&flagConect && 
            // hasTask&&taskList.map((x)=>{
            flagConect&&taskList.map((x)=>{
                return(
                    <>
                    <ShowTask task={x}></ShowTask>
                    </>
                )
            })
            // arr.map(x => {<ShowTask task={x}></ShowTask> })
            }
            {/* {!hasTask&&<h1>No tasks found</h1>} */}
            {/* {!flagState&&<h1>No tasks found</h1>} */}
            {
                // flagConect&&<>{
                //     hasTask && <>{arr.map(x => { return <ShowTask task={x}></ShowTask> })}</>
                // }
                // &&{!hasTask&&<h1>No tasks found</h1>}
                // </>
            }
            {/* {user!==null && check()} */}
            {/* {arr=filterTasks()} */}
            
        </>
    )
})
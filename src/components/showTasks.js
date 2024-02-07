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
    const[hasTask,setHasTask]=useState()
    const newNavigate = useNavigate();
    
    const getData=async()=>{
        try{
            if(flagConect) 
            {
                const reaspons = await axios.get('http://localhost:5000/tasks')
                if(reaspons.status===200){
                    dispatch(addAllTasks(reaspons.data.filter(item => item.userId === user.id||item.id===0)))
                    console.log("from data");
                    console.log(reaspons.data);
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }
    
    // const check = () => {
    //     arr = filterTasks();
    //     if (arr !== null) {
    //         // setFlagState(true)
    //         return arr
    //     }
    // }
    useEffect(()=>{
        getData();
    },[])
    // const arr = filterTasks();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        return newNavigate('/');
    };    

    const noTasks=(
        <Fragment>
            <h1>No tasks found</h1>
        </Fragment>
    )
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
            {!flagConect&&
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="you're not connect"
                    action={action}
                />
            }
            {flagConect&&<>{
                    list.map((x)=>{
                        if(x.id!==0)
                            return(
                                <>
                                    <ShowTask task={x}></ShowTask>
                                </>
                            )
                    })
                }</>
            }
        </>
    )
})
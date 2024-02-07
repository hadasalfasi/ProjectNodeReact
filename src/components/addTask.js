import React, { Fragment, useEffect, useRef, useState } from "react";
import {  Autocomplete, Button, Container, IconButton, List, Paper, Snackbar, TextField } from "@mui/material";
import { connect } from "react-redux";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CssBaseline } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Margin, MarginOutlined } from "@mui/icons-material";
import { addTask, deleteTask,addAllUsers, addAllTasks } from "../redux/action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import axios from "axios";


const mapStateToProps=(state)=>{
    return{
        taskType:state.tasks.taskType,
        users:state.users.usersList,
        taskList:state.tasks.taskList,
        currentUser:state.currentUser.currentUser
    }
}


export default connect(mapStateToProps)(function AddTask(props) {
    const {dispatch,taskType,users,taskList,flagConect,currentUser}=props;
    const newNavigate = useNavigate();
    const location=useLocation()
    const taskId=location.state&&location.state.taskId;
    const prevTask=taskList.find(x=>x.id===taskId)   
    const [open, setOpen] = useState(!flagConect);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [date, setDate] =useState(null);
    const [typeRef,setTypeRef]=useState();
    const[cnt,setCnt]=useState()
    let promotionsRef=[];
    let nameRef=useRef();
    let detailsRef=useRef();
    const [current,setCurrent]=useState();
    const typeFunc=(event,value)=>{
        setTypeRef(value)
    }

    const getDataTasks=async()=>{
        try{
            if(flagConect) 
            {
                const reaspons = await axios.get('http://localhost:5000/tasks')
                if(reaspons.status===200){
                    dispatch(addAllTasks(reaspons.data.filter(item => item.userId === currentUser.id||item.id===0)))
                    console.log("from data");
                    console.log(reaspons.data);
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        getDataTasks();
        getData();
        console.log("prevTask "+prevTask );        
    },[])


    const getData=async()=>{
        try{
            const reaspons = await axios.get('http://localhost:5000/users')
            if(reaspons.status==200){
                console.log("from data");
                console.log(reaspons.data);    
                dispatch(addAllUsers(reaspons.data))
            }
        }
        catch(error){
            console.error(error);
        }}

    

   
 

    const removeTask=async()=>{
        try{
            const reaspons = await axios.delete(`http://localhost:5000/tasks/${prevTask.id}`)
            if(reaspons.status===200){
                console.log(reaspons.data);
                dispatch(deleteTask(prevTask.id))
            }
        }
        catch(error){
            console.error(error);
        }
    }

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
    const promotionsFunc=(event,value)=>{
        promotionsRef=value;
    }

    // const addTaskNode = async ()=>{
    //     try{
    //         const reasponsGet = await axios.get('http://localhost:5000/users')
    //         if(reaspons.status==200){
    //             console.log("from data");
    //             console.log(reaspons.data);
    //             dispatch(addAllUsers(reaspons.data))
    //         }
            
    //         const newTask={
    //             id:cnt.cnt,
    //             taskTypeId: typeRef.taskTypeId, 
    //             taskName:nameRef.current.value,
    //             taskDetails:detailsRef.current.value,
    //             date:dayjs(date), 
    //             userId:current,
    //             done:prevTask.done 
    //         }
    //         console.log(newTask);
    //         const reaspons=await axios.post('http://localhost:5000/tasks',newTask)
    //         if(reaspons.status===200){
    //             console.log("add task")
    //             putCnt()
    //         }
    //     }
    //     catch(error){
    //         console.log("lfghfjdk");
    //         console.error(error)
    //     }
    // }

    const addTaskNode = async ()=>{
        try{
           
                const reasponsGetCnt = await axios.get('http://localhost:5000/taskCnt')
                if(reasponsGetCnt.status===200){
                    console.log("from getCnt");
                    console.log(reasponsGetCnt.data);
                    const reasponsPutCnt = await axios.put('http://localhost:5000/taskCnt',{cnt:reasponsGetCnt.data.cnt+1})
                    if(reasponsPutCnt.status===200){
                        console.log("from putCnt");
                        console.log(reasponsPutCnt.data);
                    }
                }
                
                const newTask={
                id:reasponsGetCnt.data.cnt,
                taskTypeId: typeRef.taskTypeId, 
                taskName:nameRef.current.value,
                taskDetails:detailsRef.current.value,
                date:dayjs(date), 
                userId:current,
                done:prevTask.done 
                }
                console.log(newTask);
                const reasponsAddTask=await axios.post('http://localhost:5000/users',newTask)
                if(reasponsAddTask.status===200){
                    console.log("add task")
                }
                dispatch(addTask({ id:0, taskTypeId: typeRef.taskTypeId, taskName:nameRef.current.value,taskDetails:detailsRef.current.value,date:dayjs(date), userId:current,done:prevTask.done }))
            }

    
        
        catch(error){
            console.error(error)
        }
    }


    const buttonFunc=()=>{
        if(typeRef===null||nameRef.current.value===null||detailsRef.current.value===null||promotionsRef===null||date===null){
            alert("Fill in all the fields")
        }
        else{
            setCurrent(currentUser.id);
            promotionsRef.forEach(element => {
                console.log(typeRef);
                setCurrent(element.id);
                addTaskNode()
            });
            if(prevTask.id!==0){
                removeTask()
            }
            newNavigate('/showTasks')
        }
    }
    return(
            <>
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
            {flagConect&&<>
            <Container component="main" maxWidth="sm" >
            <Grid container spacing={3}   justifyContent="space-between" alignItems="flex-end">
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={taskType}
                        sx={{ width: 250 }}
                        // defaultValue={taskType.find(x=>x.taskTypeId===prevTask.taskTypeId)}
                        getOptionLabel={(option) => option.taskTypeName}
                        renderInput={(params) => <TextField {...params} label="Type" />}
                        onChange={typeFunc}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Task Name" inputRef={nameRef} fullWidth />
                    {/* defaultValue={prevTask.taskName} */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Details"
                        fullWidth
                        maxRows={4}
                        inputRef={detailsRef}
                        // defaultValue={prevTask.taskDetails}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={date} onChange={(newValue) => {setDate(newValue);console.log(date);}} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={users}
                        disableCloseOnSelect
                        ref={promotionsRef}
                        onOpen={getData}
                        getOptionLabel={(option) => option.firstName+' '+option.lastName}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.firstName+' '+option.lastName}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="promotions"/>
                        )}
                        onChange={promotionsFunc}
                    />
                </Grid>
                <Grid item xs={12} justifySelf="center">
                    <Button variant="contained" onClick={buttonFunc}>submit</Button>
                </Grid>
            </Grid>
            </Container>
            </>}</>)})
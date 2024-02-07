import { useRef, useState } from "react";
import { connect } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModeEdit } from "@mui/icons-material";
import { deleteTask, taskStatus } from "../redux/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function mapStateToProps(state) {
    return {
    };
}

export default connect(()=>{})(function ShowTask(props) {
    const{dispatch,task}=props;
    const newNavigate=useNavigate();
    const [done,setDone]=useState(task.done)
    
    const removeTask=async()=>{
        try{
            const reaspons = await axios.delete(`http://localhost:5000/tasks/${task.id}`)
            if(reaspons.status===200){
                console.log(reaspons.data);
                deleteFunc()
            }
        }
        catch(error){
            console.error(error);
        }
    }

    const putDone=async()=>{
        try{
            const reaspons = await axios.put(`http://localhost:5000/tasks/${task.id}`,{done:done})
            if(reaspons.status===200){
                console.log("from putCnt");
                console.log(reaspons.data);
            }
        }
        catch(error){
            console.error(error);
        }
    }


    const doneFunc =()=>{
        setDone(!done)
        putDone()
        dispatch(taskStatus({taskId:task.id,status:done}));
    }
    const deleteFunc=()=>{
        dispatch(deleteTask(task.id))
    }
    const updateTask=()=>{
        newNavigate('/addTask',{state:{taskId:task.id}})
    }
    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Checkbox checked={done} onChange={doneFunc} color="secondary"/>
                
                <Typography gutterBottom variant="h5" component="div">
                  {task.taskName}
                  {/* tast1 */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.taskDetails}
                  {/* jiofvi jnfvijeos ijhfio */}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={removeTask} aria-label="delete" >
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="edit" onClick={updateTask}>
                    <ModeEdit/>
                </IconButton>
            </CardActions>
        </Card>
    )
})
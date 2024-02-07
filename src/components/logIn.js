import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Password } from "@mui/icons-material";
import {addAllUsers, addCurrentUser} from '../redux/action';
import { List } from "@mui/material";
import axios from "axios";

function mapStateToProps(state){
    return{
        userList: state.users.usersList,
    }
}
export default connect(mapStateToProps)(function LogIn(props) {
    const {dispatch,userList,flagConect, setFlagConect}=props;
    const emailRef=useRef('');
    const passwordRef=useRef('');
    const newNavigate=useNavigate();
    // const logIn=()=>{
    //     if(!(users.some(user=>(user.email===emailRef.current.value)&&(user.password===passwordRef.current.value))))
    //         alert("The email or password is incorrect")
    //     else{
    //         setFlagConect(true)
    //         dispatch(addCurrentUser(users.find(user=>user.email===emailRef.current.value)))
    //         return newNavigate('/');
    //     }
    // }  
    const getData=async()=>{
        try{
            const reaspons = await axios.get('http://localhost:5000/users')
            if(reaspons.status==200){
                console.log("from data");
                console.log(reaspons.data);
                if(!(reaspons.data).some(user=>(user.email==emailRef.current.value)&&(user.password==passwordRef.current.value)))
                    alert("The email or password is incorrect")
                else{
                    setFlagConect(true)
                    dispatch(addCurrentUser(reaspons.data.find(user=>user.email===emailRef.current.value)))
                    return newNavigate('/');
                }
    
                dispatch(addAllUsers(reaspons.data))

            }
        }
        catch(error){
            console.error(error);
        }}

    return(
        <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={emailRef}
                        autoFocus
                        // onChange={()=>{if(emailRef.current.value==='')setEmail(true) 
                        //                 else setEmail(false)
                        //             }
                        //         }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passwordRef}
                        // onChange={()=>{if(passwordRef.current.value==='')setPassword(true) 
                        //                 else setPassword(false)}
                        //         }
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={getData}
                        // disabled={email||password}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/SignUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
})
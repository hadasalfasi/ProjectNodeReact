import React, { useRef, useState } from "react";
import { addCurrentUser, addUser } from "../redux/action";
import { connect } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";


function mapStateToProps(state){
    return{
        usersEmail: state.users.usersList.map(user=>user.email),
        userCount:state.users.usersCounts
    }
}

export default connect(mapStateToProps)(function SignUp(props) {
    const {dispatch,usersEmail,userCount,flagConect, setFlagConect}=props;
    let firstNameRef=useRef('');
    let lastNameRef=useRef('');
    let emailRef=useRef('');
    let passwordRef=useRef('');
    const newNavigate=useNavigate();




    const addUserNode = async ()=>{
        try{
            if(firstNameRef.current.value===''||emailRef.current.value===''||passwordRef.current.value===''){
                alert('You did not fill in all the required fields');
                return;
            }
            else{    
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
                const newUser={
                    firstName:firstNameRef.current.value,
                    lastName:lastNameRef.current.value,
                    email:emailRef.current.value,
                    password:passwordRef.current.value,
                    id:reasponsGetCnt.data.cnt
                }
                console.log(newUser);
                const reasponsAddUser=await axios.post('http://localhost:5000/users',newUser)
                if(reasponsAddUser.status===200){
                    console.log("add user")
                }
                dispatch(addUser({firstName:firstNameRef.current.value,lastName:lastNameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value,id:reasponsGetCnt.data.cnt}))
                dispatch(addCurrentUser({firstName:firstNameRef.current.value,lastName:lastNameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value,id:reasponsGetCnt.data.cnt}));
                setFlagConect(true);
                return newNavigate('/');
            }

    
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                inputRef={firstNameRef}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            inputRef={lastNameRef}
                            
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            inputRef={emailRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            inputRef={passwordRef}
                            />
                        </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={addUserNode}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/LogIn" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
                
            </Container>
    )
})
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { connect } from 'react-redux';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Card, CardActions, CardContent } from '@mui/material';
import { disconnect } from '../redux/action';
import { Link, useNavigate } from 'react-router-dom';
import { nothing } from 'immer';
import { css } from 'styled-components';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function mapStateToProps(state){
    return{
        user:state.currentUser.currentUser
    }
}


export default connect(mapStateToProps)(function Nav(props) {
    const {dispatch,user,flagConect,setFlagConect}=props
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] =useState(null);
    const newNavigate=useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const addFunc=()=>{
        newNavigate('/addTask',{state:{taskId:0}})
    }

    const taskFunc=()=>{
        newNavigate('/showTasks')
    }

    return (
        <AppBar position="static" color='success'>
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                TODO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >

                    <MenuItem key='my tasks' onClick={taskFunc}>
                        <Typography textAlign="center">my task</Typography>
                    </MenuItem>
                    <MenuItem key='add task' onClick={addFunc}>
                        <Typography textAlign="center">add task</Typography>
                    </MenuItem>
                </Menu>
            </Box> 
            <Link to="/" className='link'>
            <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                TODO
            </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                
                <Button
                    key='my tasks'
                    onClick={taskFunc}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    my tasks
                </Button>
                <Button
                key='add task'
                onClick={addFunc}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                add task
            </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <PersonPinIcon sx={{ fontSize: 50 }} ></PersonPinIcon>
                    </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                    <Box sx={{ minWidth: 150 }}>
                        <Card variant="outlined">
                            {flagConect&& <><CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    hi {user.firstName + ' ' + user.lastName}
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    you're connect
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" onClick={()=>{setFlagConect(false);dispatch(disconnect())}}>disconnect</Button>
                                            </CardActions>
                                            </>
                            }
                            {!flagConect && <>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        you're not connect
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" onClick={()=>{return newNavigate('/login')}}>Log In</Button>
                                                </CardActions>
                                            </>
                            }
                        </Card>
                    </Box>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
  );
})

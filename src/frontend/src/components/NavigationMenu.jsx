import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {NavLink, useNavigate} from 'react-router-dom';
import AuthContext, { AuthDefaults }  from '../shared/contexts/auth.context';
import NotificationContext from "../shared/contexts/notification.context";
import {removeAuthToken} from '../shared/services/auth.service';

function NavigationMenu() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {userAuth, updateUserAuth} = useContext(AuthContext);
    const { setNotification } = useContext(NotificationContext)
    const navigate = useNavigate();

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

    const logout = () => {
        removeAuthToken();
        updateUserAuth(AuthDefaults)
        setNotification({message: 'Logout!', active: true, severity: 'info'});
        navigate('/login');
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                             <NavLink to={"/profile"}>Profile</NavLink>
                             <Button variant="text" onClick={() => logout()}> Logout </Button>
                        </Menu>
                    </Box>
                    {/* Main navigation */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }} to={"/"}> Search </NavLink>
                        <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }} to={"/create-poster"}> Create Ad </NavLink>

                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar>M</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                            <MenuItem>
                                <Button variant="text" href={"/profile"}> Profile </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button variant="text" onClick={() => logout()}> Logout </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationMenu;

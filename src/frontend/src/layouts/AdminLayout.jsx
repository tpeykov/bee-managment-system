import {
    Alert,
    Box, CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Menu,
    Snackbar, styled, Typography, useTheme
} from "@mui/material";
import {NavLink} from 'react-router-dom';

import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {useState} from "react";
import {Outlet} from "react-router-dom";
import NotificationContext from "../shared/contexts/notification.context";

import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {AccountCircle} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function AdminLayout() {
    const theme = useTheme();

    const [notification, setNotification] = useState({active: false, message: '', severity: 'success'});
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            <div className="root-layout">
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && {display: 'none'}),
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Admin view page
                            </Typography>
                            <div style={{marginLeft: 'auto'}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <List>
                            {
                                [{text: 'Users', link: '/admin/users'}, {
                                    text: 'Posters',
                                    link: '/admin/posters'
                                }].map((record, index) => (
                                    <ListItem key={record.text}
                                              component={NavLink}
                                              to={record.link}
                                              disablePadding sx={{display: 'block'}}>
                                        <ListItemButton

                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                            </ListItemIcon>
                                            <ListItemText primary={record.text} sx={{opacity: open ? 1 : 0}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                        <Divider/>
                    </Drawer>
                    <Box component="main" sx={{flexGrow: 1, p: 3}}>
                        <DrawerHeader/>
                        <Outlet/>
                    </Box>
                </Box>
                <Snackbar open={notification.active} autoHideDuration={6000}
                          onClose={() => setNotification({...notification, active: false})}>
                    <Alert onClose={() => setNotification({...notification, active: false})}
                           severity={notification.severity} sx={{width: '100%'}}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </div>
        </NotificationContext.Provider>
    )
}

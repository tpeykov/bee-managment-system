import React, {useContext, useState} from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Button, CircularProgress, Grid, Paper, Tab, TextField, Typography} from "@mui/material";
import {TabContext} from "@mui/lab";
import Box from "@mui/material/Box";
import NotificationContext from "../shared/contexts/notification.context";
import Avatar from "@mui/material/Avatar";
import '../css/profile-view.css'
function HomeView(){

    const {notification, setNotification} = useContext(NotificationContext);

    const [tab, setTab] = useState('user-info');
    const [reservationsTab, setReservationsTab] = useState('future-flights');
    const [userData, setUserData] = useState({});;
    const [isLoading, setIsLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleReservationsTabChange = (event, newValue) => {
        setReservationsTab(newValue);
    };

    const handleDataChange = (event) => {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handlePasswordDataChange = (event) => {
        const {name, value} = event.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    return (
        <>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            }
            {
                !isLoading &&
                <Paper sx={{mt: '2rem'}} className="root">
                    <div className="avatarContainer">
                        <Avatar style={{backgroundColor: '#85586F'}}>M</Avatar>
                    </div>
                    <Typography variant="h4" className="title">
                       Trayan Peykov
                    </Typography>
                    <div>
                        <TabContext value={tab}>
                            <Box sx={{borderBottom: 1, borderColor: '#85586F', color: '#85586F'}}>
                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                    style={{color: '#85586F'}}>
                                    <Tab label="Personal information" value="user-info"/>
                                    <Tab label="Owned Posters" value="created-posters"/>
                                </TabList>
                            </Box>
                            <TabPanel value="user-info">
                                <form>
                                    <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="UIC"
                                                variant="outlined"
                                                name="username"
                                                // value={userData.username}
                                                fullWidth
                                                disabled={true}
                                                readOnly
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                // value={userData.email}
                                                disabled={true}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Company name"
                                                variant="outlined"
                                                name="firstName"
                                                // value={userData.firstName}
                                                // onChange={handleDataChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{backgroundColor: '#85586F'}}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className="submitButton"
                                            >
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </TabPanel>
                            <TabPanel value="created-posters">
                                <Box sx={{display: 'flex', flexDirection: 'column'}}></Box>
                            </TabPanel>
                        </TabContext>
                    </div>
                </Paper>
            }
        </>
    )
}

export default HomeView;

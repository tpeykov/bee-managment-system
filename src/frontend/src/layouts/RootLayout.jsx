import { Alert, Snackbar } from "@mui/material";
import {useContext, useState} from "react";
import { Outlet } from "react-router-dom";
import NotificationContext from "../shared/contexts/notification.context";
import NavigationMenu from "../components/NavigationMenu";
import AuthContext from "../shared/contexts/auth.context";

export default function RootLayout() {
    const [notification, setNotification] = useState({ active: false, message: '', severity: 'success' });

    const { userAuth } = useContext(AuthContext);
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            <div className="root-layout">
                <header>
                    { userAuth.isAuthenticated && <NavigationMenu></NavigationMenu> }
                </header>
                <main>
                    <Outlet />
                </main>
                <Snackbar open={notification.active} autoHideDuration={6000} onClose={() => setNotification({ ...notification, active: false })}>
                    <Alert onClose={() => setNotification({ ...notification, active: false })} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </div>
        </NotificationContext.Provider>
    )
}
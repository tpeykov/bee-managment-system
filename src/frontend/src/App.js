import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthContext, {AuthDefaults} from './shared/contexts/auth.context';
import {useState} from "react";
import ProfileView from "./views/ProfileView";
import NotFoundView from "./views/NotFoundView";
import MerchantSearchView from "./views/MerchantSearchView";
import AdminUsersView from "./views/admin/AdminUsersView";
import AdminLayout from "./layouts/AdminLayout";
import AdminPostersView from "./views/admin/AdminPostersView";
import MerchantCreatPosterView from "./views/merchant/MerchantCreatePosterView";
import SinglePosterView from "./views/SinglePosterView";

function App() {
    const [userAuth, updateUserAuth] = useState(AuthDefaults);

    return (
        <AuthContext.Provider value={{ userAuth, updateUserAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin/' element={<AdminLayout/>}>
                        <Route element={<PublicRoutes/>}>
                            <Route path='users' element={<AdminUsersView/>}/>
                            <Route path='posters' element={<AdminPostersView/>}/>
                        </Route>
                        <Route path='*' element={<NotFoundView/>}/>
                    </Route>
                    <Route path='/' element={<RootLayout/>}>
                        <Route element={<PublicRoutes/>}>
                            <Route path='login' element={<LoginView/>}/>
                            <Route path='register' element={<RegisterView/>}/>
                        </Route>
                        <Route element={<PrivateRoutes/>} exact>
                            <Route path='/' element={<MerchantSearchView/>}/>
                            <Route path='/profile' element={<ProfileView/>}/>
                            <Route path='/create-poster' element={<MerchantCreatPosterView/>}/>
                            <Route path='/poster/:uuid' element={<SinglePosterView/>}/>
                        </Route>
                        <Route path='*' element={<NotFoundView/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}
export default App;

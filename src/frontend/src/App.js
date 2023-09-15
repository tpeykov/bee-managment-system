import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import ManufactureSearchView from "./views/ManufactureSearchView";
import AuthContext, {AuthDefaults} from './shared/contexts/auth.context';
import {useState} from "react";
import CreatePosterView from "./views/CreatePosterView";
import ProfileView from "./views/ProfileView";
import NotFoundView from "./views/NotFoundView";
import RoleRoutes from "./routes/RoleRoutes";
import {USER_ROLES} from "./domain/enums/user-roles.enum";
import MerchantSearchView from "./views/MerchantSearchView";

function App() {
    const [userAuth, updateUserAuth] = useState(AuthDefaults);

    return (
        <AuthContext.Provider value={{ userAuth, updateUserAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RootLayout/>}>
                        <Route element={<PublicRoutes/>}>
                            <Route path='login' element={<LoginView/>}></Route>
                            <Route path='register' element={<RegisterView/>}></Route>
                        </Route>
                        <Route element={<PrivateRoutes/>} exact>
                            <Route element={<RoleRoutes role={USER_ROLES.MERCHANT} />} exact>
                                <Route path='/' element={<MerchantSearchView/>}></Route>
                                <Route path='/profile' element={<ProfileView/>}></Route>
                            </Route>
                            <Route element={<RoleRoutes role={USER_ROLES.MANUFACTURER} />} exact>
                                <Route path='/' element={<ManufactureSearchView/>}></Route>
                                <Route path='/create-poster' element={<CreatePosterView/>}></Route>
                                <Route path='/profile' element={<ProfileView/>}></Route>
                            </Route>
                        </Route>

                        <Route path='*' element={<NotFoundView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}
export default App;

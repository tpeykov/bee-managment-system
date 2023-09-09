import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import SearchView from "./views/SearchView";
import AuthContext, {AuthDefaults} from './shared/contexts/auth.context';
import {useState} from "react";
import CreatePosterView from "./views/CreatePosterView";
import ProfileView from "./views/ProfileView";
import NotFoundView from "./views/NotFoundView";

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
                            <Route path='/' element={<SearchView/>}></Route>
                            <Route path='/create-poster' element={<CreatePosterView/>}></Route>
                            <Route path='/profile' element={<ProfileView/>}></Route>
                        </Route>
                        <Route path='*' element={<NotFoundView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}
export default App;

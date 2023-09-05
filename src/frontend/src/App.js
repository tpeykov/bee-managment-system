// import {useState, useEffect} from "react";
// import {getAllMembers} from "./client";
// import Button from 'react-bootstrap/Button';
import './App.css';
// import data from "bootstrap/js/src/dom/data";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RootLayout/>}>
                    <Route path='login' element={<LoginForm/>}></Route>
                    <Route path='register' element={<RegisterForm/>}></Route>
                    {/*<Route element={<PublicRoutes/>}>*/}
                    {/*    <Route path='/sign-up' element={<SignUp/>}></Route>*/}
                    {/*    <Route path='/sign-in' element={<SignIn/>}></Route>*/}
                    {/*    <Route path='/reset-password' element={<ResetPassword/>}></Route>*/}
                    {/*    <Route path='/forgotten-password' element={<ForgottenPassword/>}></Route>*/}
                    {/*    <Route path='/reset-password/:resetKey' element={<ResetPassword/>}></Route>*/}
                    {/*</Route>*/}
                    {/*<Route element={<PrivateRoutes/>} exact>*/}
                    {/*    <Route path='/profile' element={<Profile/>}></Route>*/}
                    {/*    <Route path='/payment-outcome' element={<PaymentOutcome/>}></Route>*/}
                    {/*</Route>*/}
                    {/*<Route path='/search' element={<SearchPage/>}></Route>*/}
                    {/*<Route path='/hotel/:id' element={<SingleHotelPage/>}></Route>*/}
                    {/*<Route path='/activate' element={<ActivateProfile/>}></Route>*/}
                    {/*<Route path='' element={<Home/>}></Route>*/}
                    {/*<Route path='*' element={<NotFoundPage/>}></Route>*/}
                </Route>
            </Routes>
        </BrowserRouter>

        // <>
        //     <Button variant="primary">Primary</Button>{' '}
        //     <Button variant="secondary">Secondary</Button>{' '}
        //     <Button variant="success">Success</Button>{' '}
        //     <Button variant="warning">Warning</Button>{' '}
        //     <Button variant="danger">Danger</Button>{' '}
        //     <Button variant="info">Info</Button>{' '}
        //     <Button variant="light">Light</Button>{' '}
        //     <Button variant="dark">Dark</Button>
        //     <Button variant="link">Link</Button>
        // </>
    );

  // const [members, setMembers] = useState([]);
  //
  // const fetchMembers = () =>
  //     getAllMembers()
  //         .then(res => res.json())
  //         .then(data => {
  //            console.log(data);
  //            setMembers(data);
  //         })
  //
  // useEffect(() => {
  //     console.log("component is mounted");
  //     fetchMembers();
  // }, []);
  //
  // if (members.length <= 0){
  //     return "no data";
  // }
  //
  // return members.map((member,index) => {
  //   return <p key={index}>{member.id} {member.name}</p>;
  // })
}
export default App;

import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/auth/ForgotPassword';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import VerificationCode from '../components/auth/VerificationCode';
import ResetPassword from '../components/auth/ResetPassword';
import SideBar from '../components/SideBar/SideBar';
import VerifyReset from '../components/auth/VerifyReset';
import RequireAuth from '../components/auth/RequireAuth'
import Dashboard from '../pages/Dashboard/Dashboard';

function AllRoutes() {
    const token = localStorage.getItem("Token")

    return (
        <BrowserRouter>
            <Routes className="main min-h-screen h-ful w-full">
                <Route path='/' >
                    <Route index element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                    <Route path='verificationcode' element={<VerificationCode />} />
                    <Route path='verifyreset' element={<VerifyReset />} />
                    <Route path='resetpassword' element={<ResetPassword />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/*" element={<SideBar />} />
                    </Route>
                    <Route path="*"
                        element={<h1 style={{ color: "red", margin: "50px" }}>
                            404 | PAGE NOT FOUND
                        </h1>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
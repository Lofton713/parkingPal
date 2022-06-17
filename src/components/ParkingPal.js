import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./navi/NavBar"
import "./ParkingPal.css"
import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"


export const ParkingPal = () => {
    return <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            </Authorized>

        } />
    </Routes>
}


/* <Route path="/login" element={<Login />} />

<Route path="*" element={
    <Authorized>
        <>
            <NavBar />
            <ApplicationViews />
        </>
    </Authorized>

} /> */
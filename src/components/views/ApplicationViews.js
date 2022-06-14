import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { ParkingList } from "../parking/ParkingLists"
import { SupportersList } from "../supporters/SupportersList"
import "./ApplicationViews.css"

export const ApplicationViews = () => {
	
       return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="pageHeader">
                        <h1>The NSC Parking Pal</h1>
                        <h3>Everyone N!!</h3>
                    </div>

                    <Outlet />
                </>
            }>
                
                <Route path="parkingLots" element={ <ParkingList /> } />
                <Route path="profile" element={ <Profile /> } />
                <Route path="supporterGroups" element={ <SupportersList /> } />

				
            </Route>
        </Routes>
    )
}

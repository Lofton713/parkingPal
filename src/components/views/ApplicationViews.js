import { Outlet, Route, Routes } from "react-router-dom"
import { ParkingFavsList } from "../favorites/ParkingFavsList"
import { ParkingList } from "../parking/ParkingLists"

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
                <Route path="profile" element={ <ParkingFavsList /> } />

				
            </Route>
        </Routes>
    )
}

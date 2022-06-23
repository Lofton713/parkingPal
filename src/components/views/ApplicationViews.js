import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { ParkingList } from "../parking/ParkingLists"
import { SupportersList } from "../supporters/SupportersList"
import "./ApplicationViews.css"
import { ParkingForm } from "../profile/ParkingForm"
import { Home } from "../auth/Home"
import { MyLots } from "../parking/MyLots"
import { ParkingEdit } from "../parking/ParkingEdit"
import { ParkingDetails } from "../parking/ParkingDetails"
import NSCDarkLogo from '../images/Nashville-SC.png'
import { CommentsForm } from "../parking/CommentsForm"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="pageHeader">
                        <img className='NSCDarkLogo' src={NSCDarkLogo} alt="logo" style={{ width: '200px', height: '100px' }} />
                        <section className="banner">
                            <h1 className="title">NSC Parking: DEFINED</h1>
                            <h2 className="motto">Everyone N!</h2>
                        </section>
                        <img className='NSCDarkLogo' src={NSCDarkLogo} alt="logo" style={{ width: '200px', height: '100px' }} />
                    </div>

                    <Outlet />
                </>
            }>

                <Route path="parkingLots" element={<ParkingList />} />
                <Route path="profile" element={<Profile />} />
                <Route path="supporterGroups" element={<SupportersList />} />
                <Route path="parkingForm" element={<ParkingForm />} />
                <Route path="" element={<Home />} />
                <Route path="myLots" element={< MyLots />} />
                <Route path="parkingEdit/:parkingLotId" element={< ParkingEdit />} />
                <Route path="parkingDetails/:parkingLotId" element={<ParkingDetails />} />
                <Route path="commentsForm/:parkingLotId" element={<CommentsForm />} />


            </Route>
        </Routes>
    )
}

import { Outlet, Route, Routes } from "react-router-dom"

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
                
                {/* <Route path="locations" element={ < /> } />
				 */}

				
            </Route>
        </Routes>
    )
}

import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyLots.css"

export const MyLots = () => {

    const [parkingLots, setParkingLots] = useState([])
    const [filteredLots, setfilteredLots] = useState([])
    

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/parkingLots?_expand=user`)
                .then(res => res.json())
                .then((parkingArray) => {
                    setParkingLots(parkingArray)
                })
        },
        []
    )
    useEffect(
        () => {
            const myLots = parkingLots.filter(parkingLot => parkingLot.userId === currentUserObject.id)
            setfilteredLots(myLots)

        },
        [parkingLots]
    )

    
    return <>
        <main className="container">
            <div className="listLabel">
                <h2> Added Parking Lots </h2>
                <button className="button-32" role="button" onClick={() => navigate("/Parkinglots") }> Back to All Lots </button>
            </div>
             <section className="lots">
                {
                    filteredLots.map(
                        (parkingLot) => {
                            return <article className="lot" key={`parkingLot--${parkingLot.id}`}>
                                <header>
                                    <h2>{parkingLot.name}</h2>
                                </header>
                                
                                <footer>
                                    
                                    <button className="editButton" onClick={() => navigate(`/ParkingEdit/${parkingLot.id}`)}>
                                        Edit</button>

                                    <button className="deleteButton" onClick={() => {
                                        fetch(`http://localhost:8088/parkingLots/${parkingLot.id}`, {
                                            method: "DELETE"
                                        })
                                    }}>
                                        Delete</button>
                                </footer>





                            </article>
                        }
                    )
                }
            </section>
        </main>

    </>
}
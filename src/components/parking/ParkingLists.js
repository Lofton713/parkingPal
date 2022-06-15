import { useEffect } from "react"
import { useState } from "react"
import "./ParkingList.css"

export const ParkingList = () => {

    const [parkingLots, setParkingLots] = useState([])
    const [parkingCopy, setParkingCopy] = useState([])
    const [expensive, setExpensive] = useState(false)
    const [closest, setClosest] = useState(false)

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

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
            setParkingCopy(parkingLots)

        },
        [parkingLots]
    )
    useEffect(
        () => {
            if (expensive) {
                const expensiveLots = parkingCopy.filter(parkingLot => parkingLot.price < 25)
                setParkingCopy(expensiveLots)
            }
            else {
                setParkingCopy(parkingLots)
            }
        },
        [expensive]
    )

    useEffect(
        () => {
            if (closest) {
                const closestLots = parkingCopy.filter(parkingLot => parkingLot.distance <= 0.6)
                setParkingCopy(closestLots)
            }
            else {
                setParkingCopy(parkingLots)
            }
        },
        [closest]
    )

    const showAll = () => {
        setClosest(false)
        setExpensive (false)
    }

    const handleSaveButtonClick = (event, parkingLot) => {
        event.preventDefault()

        const newLotFav = {
            parkingLotId: parkingLot.id,
            userId: currentUserObject.id
        }

        return fetch('http://localhost:8088/parkingFavorites', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newLotFav)
        })
            .then(res => res.json())
            .then(() => {})
    }

    return <>
        <main>
            <div className="listLabel">
                <h2> Available Parking Lots </h2>
            </div>
            <aside className="buttons">
                <button className="cheapButton" onClick={() => { setExpensive(true) }}> Cheapest Lots </button>
                <button className="cheapButton" onClick={() => { setClosest(true) }}> Closest Lots </button>
                <button className="showAllButton" onClick={() => { showAll() }}> See All Lots </button>
            </aside>

            <section className="lots">
                {
                    parkingCopy.map(
                        (parkingLot) => {
                            return <article className="lot" key={`parkingLot--${parkingLot.id}`}>
                                <header>
                                    <h4>{parkingLot.name}</h4>
                                </header>
                                <div>
                                    - Address: {parkingLot.address}
                                    - Distance to Park: {parkingLot.distance} mi.
                                    - Price: ${parkingLot.price} per match
                                </div>
                                <footer>
                                    Added by: {parkingLot.userId}
                                    <button className="favButton" onClick={(clickEvent) => handleSaveButtonClick(clickEvent, parkingLot)}>
                                        Add to Favorites</button>
                                </footer>





                            </article>
                        }
                    )
                }
            </section>
        </main>

    </>
}
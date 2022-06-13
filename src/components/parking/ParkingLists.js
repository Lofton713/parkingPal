import { useEffect } from "react"
import { useState } from "react"
import "./ParkingList.css"

export const ParkingList = () => {

    const [parkingLots, setParkingLots] = useState([])
    const [parkingCopy, setParkingCopy] = useState([])
    const [expensive, setExpensive] = useState(false)

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
            if(expensive) {
                const expensiveLots = parkingCopy.filter(parkingLot => parkingLot.price < 25)
                setParkingCopy(expensiveLots)
            }
            else {
                setParkingCopy(parkingLots)
            }
        },
        [expensive]
    )

    const handleSaveButtonClick = () => {
        //event.preventDefault()
    }

    return <>
        <main>
            <div className="listLabel">
                <h2> Available Parking Lots </h2>
            </div>
            <aside>
                <button className="cheapButton" onClick={() =>{setExpensive(true)}}> Cheapest Lots </button>
                <button className="showAllButton" onClick={() =>{setExpensive(false)}}> See All Lots </button>
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
                                <button className="favButton" onClick={() => handleSaveButtonClick()}>
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
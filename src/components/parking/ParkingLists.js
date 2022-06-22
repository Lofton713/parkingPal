import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ParkingList.css"

export const ParkingList = () => {

    const [parkingLots, setParkingLots] = useState([])
    const [parkingCopy, setParkingCopy] = useState([])
    const [expensive, setExpensive] = useState(false)
    const [closest, setClosest] = useState(false)
    const [searchTerms, setSearchTerms] = useState("")

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedParkingLot = parkingLots.filter(parkingLot =>
                parkingLot.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setParkingCopy(searchedParkingLot)
        },
        [searchTerms] //watching the terms in the search box
    )

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
        setExpensive(false)
    }

    const handleSaveButtonClick = (event, parkingLot) => {
        event.preventDefault()
        alert("Parking Lot Added to Favorites 👍")

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
            .then(() => { })
    }

    return <>
        <main className="container">
            <div className="listLabel">
              
            </div>
            <div className="buttons">
                <button className="button-32" role="button" onClick={() => { setExpensive(true) }}> Cheapest Lots </button>
                <button className="button-32" role="button" onClick={() => { setClosest(true) }}> Closest Lots </button>
                <button className="button-32" role="button" onClick={() => { showAll() }}> Show All Lots </button>
                <button className="button-32" role="button" onClick={() => navigate("/myLots")}> Lots I've Added </button>
            </div>
            <div className="lotSearch">
                <header className="searchtitle">Looking for a specific lot?</header>
                <input className="searchbox"
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    } type="text" placeholder="Enter Lot Name Here" />

            </div>

            <section className="lots">
                {
                    parkingCopy.map(
                        (parkingLot) => {
                            return <article className="lot" key={`parkingLot--${parkingLot.id}`}>
                                <header className="lotHeader">
                                    <Link className="lotname" to={`/parkingDetails/${parkingLot.id}`}> {parkingLot.name}</Link>
                                </header>
                                <ul className="lotInfo">
                                    <li>  {parkingLot.address}</li>
                                    <li>{parkingLot.distance} mi. walk to Geodis Park</li>
                                    <li> ${parkingLot.price} per match</li>
                                </ul>
                                <footer className="lotFooter">
                                    Added by: {parkingLot.user.username}
                                    <button className="button-88" onClick={(clickEvent) => handleSaveButtonClick(clickEvent, parkingLot)}>
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
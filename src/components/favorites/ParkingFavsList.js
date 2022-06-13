import { useState } from "react"
import "./ParkingFavsList.css"
import { useEffect } from "react"

export const ParkingFavsList = () => {
    const [parkingFavorites, setParkingFavorites] = useState([])
    const [filteredParkingFavorites, setFilteredParkingFavorites] = useState([])

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    useEffect(
        () => {

            fetch(`http://localhost:8088/parkingFavorites?_expand=parkingLot`)
                .then(res => res.json())
                .then((favArray) => {
                    setParkingFavorites(favArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {

            // customer
            const myParkingFavs = parkingFavorites.filter(Parkingfavorite => Parkingfavorite.userId === currentUserObject.id) // filter the ticktes to match IDs
            setFilteredParkingFavorites(myParkingFavs)

        },
        [parkingFavorites]
    )

    return <>

        <h2> My Parking Favorites </h2>

        <ul className="parkingFavs">
            {
                filteredParkingFavorites.map(
                    (parkingFavorite) => {
                        return <li className="parkingFav" key={`parkingFavorite--${parkingFavorite.id}`}>
                            {parkingFavorite?.parkingLot?.name}  - Price: ${parkingFavorite?.parkingLot?.price} Each

                        </li>
                    }
                )
            }
        </ul>

    </>



}
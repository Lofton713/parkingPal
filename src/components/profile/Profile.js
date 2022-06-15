import { useState } from "react"
import "./Profile.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const [parkingFavorites, setParkingFavorites] = useState([])
    const [filteredParkingFavorites, setFilteredParkingFavorites] = useState([])
    const [SGFaves, setSGFaves] = useState([])
    const [filteredSGFaves, setFilteredSGFaves] = useState([])

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const navigate = useNavigate()

    useEffect(
        () => {

            fetch(`http://localhost:8088/SGFaves?_expand=supporterGroup`)
                .then(res => res.json())
                .then((favSGArray) => {
                    setSGFaves(favSGArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {

            // customer
            const mySGFavs = SGFaves.filter(SGFave => SGFave.userId === currentUserObject.id) // filter the ticktes to match IDs
            setFilteredSGFaves(mySGFavs)

        },
        [SGFaves]
    )

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

        <div>
            <button className="addLotButton" onClick={() => navigate("/ParkingForm")}> Add Parking Lot</button>
        </div>

        <h2> My Parking Favorites </h2>

        <section className="parkingFavs">
            {
                filteredParkingFavorites.map(
                    (parkingFavorite) => {
                        return <article className="parkingFav" key={`parkingFavorite--${parkingFavorite.id}`}>
                            <p>{parkingFavorite?.parkingLot?.name}  -  ${parkingFavorite?.parkingLot?.price} Per match</p>
                            <p>{parkingFavorite.parkingLot.address}</p>
                            <footer>
                                <button className="reomoveButton" onClick={() => {
                                    fetch(`http://localhost:8088/parkingFavorites/${parkingFavorite.id}`, {
                                        method: "DELETE"
                                    })
                                }
                                }>Remove Favorite
                                </button>
                            </footer>

                        </article>
                    }
                )
            }
        </section>
        <h2> My Favorite Supporter Groups </h2>

        <section className="SGFavs">
            {
                filteredSGFaves.map(
                    (SGFave) => {
                        return <article className="SGFav" key={`supporterGroupFavorite--${SGFave.id}`}>
                            <p>{SGFave.supporterGroup.name}   </p>
                            <a className="SGLink" href={SGFave.supporterGroup.website} rel="noreferrer" target="_blank"> Check out their website </a>
                            <footer>
                                <button className="reomoveButton" onClick={() => {
                                    fetch(`http://localhost:8088/SGFaves/${SGFave.id}`, {
                                        method: "DELETE"
                                    })
                                }
                                }>Remove Favorite
                                </button>
                            </footer>

                        </article>
                    }
                )
            }
        </section>

    </>



}
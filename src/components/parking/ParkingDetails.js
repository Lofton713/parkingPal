import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ParkingDetails = () => {

    const { parkingLotId } = useParams()
    const [parkingLot, updateParkingLot] = useState({ parkingLots: [{}] })

    const navigate =useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/parkingLots/${parkingLotId}?_expand=parkingLotType`)
                .then(res => res.json())
                .then((data) => {
                    const singleLot = data
                    updateParkingLot(singleLot)
                })
        },
        [parkingLotId]
    )

    return (
        <>
        <button className="button-32" role="button" onClick={() => navigate("/Parkinglots") }> Back to All Lots </button>


        <article className="lot" key={`parkingLot--${parkingLot.id}`}>
            <header>
                {parkingLot.name}
            </header>
            <div>
                <ul>
                    <li> {parkingLot.description}</li>
                    <li> {parkingLot.address}</li>
                    <li> {parkingLot.distance} mi. walk to stadium</li>
                    <li> ${parkingLot.price} per match</li>
                    <li> {parkingLot.parkingLotType?.type}</li>

                </ul>
            </div>

        </article>

        </>
    )

}
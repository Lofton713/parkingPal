import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const ParkingDetails = () => {

    const { parkingLotId } = useParams()
    const [parkingLot, updateParkingLot] = useState({parkingLots:[{}]})

    useEffect(
        () => {
            fetch(`http://localhost:8088/parkingLots/${parkingLotId}?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singleLot = data
                    updateParkingLot(singleLot)
                })
        },
        [parkingLotId]
    )

    return (
        

         <article className="lot" key={`parkingLot--${parkingLot.id}`}>
             <header>
                  {parkingLot.name}
             </header>
             <div>
                 - {parkingLot.description}
                 - Address: {parkingLot.address}
                 - Distance to Park: {parkingLot.distance} mi.
                 - Price: ${parkingLot.price} per match
             </div>
             
             </article>

    )
    
}
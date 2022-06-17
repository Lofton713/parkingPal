import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ParkingEdit = () => {

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const [parkingLot, update] = useState({
        name: "",
        price: "",
        address: "",
        distance: "",
        description: "",
        userId: currentUserObject.id,
        parkingLotTypeId: "",
        id: ""
               
    })

    const { parkingLotId } = useParams()
    const navigate = useNavigate()

    // TODO: Get the ticket state from the API.
    useEffect(() => {
        fetch(`http://localhost:8088/parkinglots/${parkingLotId}`)
            .then(res => res.json())
            .then((data) => {
                const parkingLotObject = data
                update(parkingLotObject)
            })
    },
    [parkingLotId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/parkinglots/${parkingLot.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(parkingLot)
            })
                .then(res => res.json())
                .then(() => {
                    navigate("/myLots")
                })
    }

    return(
        <>
        <button
                onClick={() => navigate(`/MyLots`)}
                id="backButton" className="button-32" role="button">
                Back to My Lots
            </button>


    <form className="lotForm">
            <h2 className="lotForm__title">Update Parking Lot</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={parkingLot.name}
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotPrice">Per Game Price:</label>
                    <input
                        // required autoFocus
                        type="number"
                        className="form-control"
                        value={parkingLot.price}
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.price = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotaddress">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={parkingLot.address}
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotDistance">Distance from Stadium:</label>
                    <input
                        required autoFocus
                        type="number"
                        step="any"
                        className="form-control"
                        value={parkingLot.distance}
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.distance = (evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotDescription">Short description:</label>
                    <input
                        required autoFocus
                        type="text"
                        maxLength={250}
                        className="form-control"
                        value={parkingLot.description}
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotType">Parking Lot Type</label>
                    <select
                        required autoFocus
                        type="select"
                        className="form-control"
                        value={parkingLot.parkingLotTypeId}
                        
                        onChange={
                            (evt) => {
                                const copy = { ...parkingLot }
                                copy.parkingLotTypeId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }
                        >
                        <option value="0">Please select option below</option>
                        <option value="1">Private-Residential</option>
                        <option value="2">Private-Commercial</option>
                        <option value="3">NSC on-campus</option>
                        <option value="4">NSC off-Campus</option>
                        <option value="5">Private Parking Company</option>
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="saveButton">
                Save Changes
            </button>
        </form>
    </>
    )
                 
}
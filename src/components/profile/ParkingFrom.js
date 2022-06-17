import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const ParkingForm = () => {

    const [lot, create] = useState({

        name: "",
        price: "",
        address: "",
        distance: "",
        description: "",
        userId: "",
        parkingLotTypeId: ""
    })

    const navigate = useNavigate()

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        const newLot = {
            name: lot.name,
            price: lot.price,
            address: lot.address,
            distance: lot.distance,
            description: lot.description,
            userId: currentUserObject.id,
            parkingLotTypeId: lot.parkingLotTypeId
        }

        return fetch('http://localhost:8088/parkingLots', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newLot)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/parkingLots")
            })

    }





    return (
        <form className="lotForm">
            <h2 className="lotForm__title">Add New Parking Lot</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={lot.name}
                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.name = evt.target.value
                                create(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lotPrice">Per Game Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={lot.price}
                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.price = parseInt(evt.target.value)
                                create(copy)
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
                        value={lot.address}
                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.address = evt.target.value
                                create(copy)
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
                        value={lot.distance}
                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.distance = (evt.target.value)
                                create(copy)
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
                        value={lot.description}
                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.description = evt.target.value
                                create(copy)
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
                        value={lot.parkingLotTypeId}

                        onChange={
                            (evt) => {
                                const copy = { ...lot }
                                copy.parkingLotTypeId = parseInt(evt.target.value)
                                create(copy)
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
                className="submitButton">
                Submit New Parking Lot
            </button>
        </form>
    )

}
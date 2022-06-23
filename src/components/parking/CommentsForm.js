import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./CommentsForm.css"


export const CommentsForm = () => {

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)

    const navigate = useNavigate()
    const { parkingLotId } = useParams()

    const [comments, create] = useState({
        userId: currentUserObject.id,
        parkingLotId: parkingLotId,
        comment: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    

        const newComment = {
            userId: currentUserObject.id,
            parkingLotId: parkingLotId,
            comment: comments.comment
        }

        return fetch('http://localhost:8088/comments',{
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/parkingDetails/${parkingLotId}`)
            })

    }

    return(
        <>
            <button
                onClick={() => navigate(`/Parkinglots`)}
                id="backButton" className="button-32" role="button">
                Back to All Lots
            </button>


    <form className="lotForm">
            <h2 className="commentTitle">Leave Comments below</h2>
                     
            <fieldset>
                <div className="form-group">
                    <input
                        required autoFocus
                        type="text"
                        
                        maxLength={250}
                        className="form-control"
                        value={comments.comment}
                        onChange={
                            (evt) => {
                                const copy = { ...comments }
                                copy.comment = evt.target.value
                                create(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="button-88">
                Submit comment
            </button>
        </form>
        </>
    )
}
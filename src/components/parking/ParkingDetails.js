import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./ParkingDetails.css"

export const ParkingDetails = () => {

    const { parkingLotId } = useParams()
    const [parkingLot, updateParkingLot] = useState({ parkingLots: [{}] })

    const navigate = useNavigate()

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

    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/comments?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const commentArray = data
                    setComments(commentArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const correctComments = comments.filter(comment => comment.parkingLotId === parkingLotId)
            setFilteredComments(correctComments)

        },
        [comments]
    )

    return (
        <>
            <button className="button-32" role="button" onClick={() => navigate("/Parkinglots")}> Back to All Lots </button>


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
                <footer>
                    <Link className="commentsLink" to={`/commentsForm/${parkingLot.id}`}> Leave a comment</Link>
                </footer>
            </article>
            <h2 className="commentsTitle">Comments</h2>

            <section className="comments">
                {
                    filteredComments.map(
                        (comment) => {
                            return <article className="comment" key={`comment--${comment.id}`}>
                                <div>
                                    {comment.comment}
                                </div>
                                <footer className="addedBy">
                                    Added by: {comment.user.username}
                                </footer>
                            </article>
                        }
                    )
                }
            </section>
        </>
    )
}
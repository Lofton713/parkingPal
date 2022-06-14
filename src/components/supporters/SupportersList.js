import { useEffect, useState } from "react"
import "./SupportersList.css"

export const SupportersList = () => {

    const [supporters, setSupporters] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/supporterGroups`)
                .then(res => res.json())
                .then((supporterArray) => {
                    setSupporters(supporterArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (event, supporterGroup) => {
        event.preventDefault()

        const newSGFav = {
            supporterGroupId: supporterGroup.id,
            userId: supporterGroup.userId
        }

        return fetch('http://localhost:8088/SGFaves', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newSGFav)
        })
            .then(res => res.json())
            .then(() => {})
    }

    return <>
        <main>
            <div className="listLabel">
                <h2> Official Supporters Groups </h2>
            </div>
            
            <section className="supporters">
                {
                    supporters.map(
                        (supporterGroup) => {
                            return <article className="SG" key={`supporterGroup--${supporterGroup.id}`}>
                                <header>
                                    <h4>{supporterGroup.name}</h4>
                                </header>
                                <div>
                                    -  {supporterGroup.description}
                                </div>
                                <footer>
                                <a className="SGLink" href={supporterGroup.website} rel="noreferrer" target="_blank"> Check out their website </a>
                                    <button className="favButton" onClick={(clickEvent) => handleSaveButtonClick(clickEvent, supporterGroup)}>
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
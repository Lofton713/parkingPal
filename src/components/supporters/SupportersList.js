import { useEffect, useState } from "react"
import "./SupportersList.css"
import NSCDarkLogo from '../images/TheBackline.png'
import roadiesLogo from '../images/roadiesLogo.png'
import AssemblyLogo from '../images/AssemblyLogo.png'
import EasternFrontLogo from '../images/EasternFrontLogo.png'
import MCHeatersLogo from '../images/MCHeatersLogo.png'
import LBDOLogo from '../images/LBDOLogo.png'
import MixTapeLogo from '../images/MixTapeLogo.png'

export const SupportersList = () => {

    const [supporters, setSupporters] = useState([])

    const currentUser = localStorage.getItem("pal_user")
    const currentUserObject = JSON.parse(currentUser)
    
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
            userId: currentUserObject.id,
            supporterGroupId: supporterGroup.id
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
                {/* <h2 className="SGlabel"> Official Supporters Groups </h2> */}
                <img className='backlineLogo' src={NSCDarkLogo} alt="logo" style={{ width: '700px', height: '250px' }} />
                
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
            <div className="SGlogos">
            <img className='backlineLogo' src={roadiesLogo} alt="logo" style={{ width: '100px', height: '100px' }} />
            <img className='backlineLogo' src={AssemblyLogo} alt="logo" style={{ width: '100px', height: '100px' }} />
            <img className='backlineLogo' src={EasternFrontLogo} alt="logo" style={{ width: '100px', height: '100px' }} />
            <img className='backlineLogo' src={MCHeatersLogo} alt="logo" style={{ width: '100px', height: '100px' }} />
            <img className='backlineLogo' src={LBDOLogo} alt="logo" style={{ width: '100px', height: '100px' }} />
            <img className='backlineLogo' src={MixTapeLogo} alt="logo" style={{ width: '100px', height: '100px' }} />  
            </div>
        </main>

    </>
}
import NSCMural from '../images/NSCmural.png'
import Schedule from '../images/Schedule.png'
import "./Home.css"

export const Home = () => {

    return <>

        <div className='homepage'>
            <img className='Schedule' src={Schedule} alt="Mural" />
            <img className='NSCMural' src={NSCMural} alt="Mural" />
        </div>
    </>
}
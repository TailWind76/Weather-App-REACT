import logo from './icons/logo.svg'
import list from './icons/listMenu.svg'
import map from './icons/mapMenu.svg'
import settings from './icons/settingsMenu.svg'
import weather from './icons/weatherMenu.svg'
import { Link } from 'react-router-dom'

function Sidebar(){

    return(
        <section className="sidebar_wrapper">

                <img className='sidebar_logo' src={logo}></img>

            <nav className='sidebar__navigation'>

                <Link  className='nav_item' to='/Weather-App-REACT'>   <div > 
                        <img src={weather}/>
                        <p>Weather</p>

                     </div>

                     </Link>  
                     <Link  className='nav_item' to='/map'> 
                     <div > 
                        <img src={map}/>
                        <p>map</p>

                     </div>
                     </Link>  

                     <Link className='nav_item' to='/settings'> 
                     <div > 
                        <img src={settings}/>
                        <p>settings</p>

                     </div>
                     </Link>  



            </nav>
        
        
        
        </section>
    )
}




export default Sidebar
import {useState} from 'react'
import logo from "../../imgs/logo.svg"
import Searchbar from "../Searchbar/Searchbar"
import "./Navbar.css"
import {MdNoteAdd} from "react-icons/md"
import {FaUserCircle} from "react-icons/fa"
import {Link} from 'react-router-dom'

import ProfileDropDown from '../ProfileDropDown/ProfileDropDown'


const Navbar = () => {
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(current => !current);
      };

  return (
    <nav>
        <div className='navbarLeft'>
            <Link to="/Dashboard" className='navbarLink'>
                <img src={logo} className="navbarLogo" alt="Logo"></img>     
            </Link>
            <h1 id='navTitle'>Hello-Note</h1>
        </div> 
        <Searchbar />

        <div className='navbarRight'>
            
            <FaUserCircle onMouseEnter={handleClick} className='reactIcons'/>
            {isShown && (
                <ProfileDropDown onMouseOut={handleClick}/>
            )}
        </div>
       
    </nav>
  )
}

export default Navbar
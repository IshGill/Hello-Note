import { UserAuth } from "../../Contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

import './ProfileDropDown.css'

const ProfileDropDown = () => {
    const {user} = UserAuth();
    const navigate = useNavigate();
    const { logout } = UserAuth();

    const handleLogout = async(e) => {
        e.preventDefault();
        try{
            await logout();
            navigate('/')
            
        } catch(e){
            console.log(e.message)
        }

    }

  return (
    <div id='profileOptions'>
        <h4 className='dropDownOptionUser'>{user.displayName}</h4>
        <span id='dropDownBreak'></span>
        <p className='dropDownOption'>Options</p>
        <p className='dropDownOption' onClick={handleLogout}> Log Out </p>
    </div>
  )
}

export default ProfileDropDown
import "./Navbar.css"
import logo from "./image/logo.png"
import { GiPartyFlags } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa';
import { MdInventory } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { MdOutlineMediation } from 'react-icons/md';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FaHatCowboy } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../Firebase/FirebaseConfig';
import { AuthContext } from '../context/Authcontext';
import React, {useContext}  from 'react'
const Navbar = () => {
    const { dispatch } = useContext(AuthContext)
    const handleSignOut = ()=>{
    
        signOut(auth).then(() => {
          
          dispatch({type: "LOGOUT"})
        }).catch((error) => {
          // An error happened.
        });
      }
    return (
        <div className='Navbar_main_container'>
            <div className='Navbar_box box1'>
                <div className='company_logo'>
                    <img className='logo' src={logo} alt=''></img>
                </div>
            </div>
            <div className='Navbar_box box2'>
                <Link to={"/"} >
                    <div className='button'>
                        <div className='icon'>
                            <GiPartyFlags />
                        </div>
                        <h6>Events</h6>
                    </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <FaTruck />
                    </div>
                    <h6>Vehicles</h6>
                </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <MdInventory />
                    </div>
                    <h6>Inventory</h6>
                </div>
                </Link>
                <Link to={"/Employees"} >
                    <div className='button'>
                        <div className='icon'>
                            <BsPeopleFill />
                        </div>
                        <h6>Employees</h6>
                    </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <MdOutlineMediation />
                    </div>
                    <h6>Social media</h6>
                </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <AiOutlineBarChart />
                    </div>
                    <h6>Status</h6>
                </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <FaHatCowboy />
                    </div>
                    <h6>Clients</h6>
                </div>
                </Link>
                <Link to={"/Employees"} >
                <div className='button'>
                    <div className='icon'>
                        <RiPagesLine />
                    </div>
                    <h6>Bill record</h6>
                </div>
                </Link>
            </div>
            <div className='Navbar_box box3'>
                <div className='useProfile'></div>
                <div onClick={handleSignOut} className='signout'>Sign Out</div>
            </div>
        </div>
    )
}

export default Navbar
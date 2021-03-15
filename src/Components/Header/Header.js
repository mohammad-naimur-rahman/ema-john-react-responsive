import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import img from '../../images/logo.png';
import './Header.css';


const Header = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img className='logo d-block mx-auto' src={img} alt="" />
            <nav>
                <ul className='bg-dark text-white'>
                    <li><Link to='/shop'>Shop</Link></li>
                    <li><Link to='/review'>Review</Link></li>
                    <li><Link to='/inventory'>Manage Inventory Here</Link></li>
                    <button className='btn badge-danger px-5' onClick={() => {
                        setloggedInUser({});
                    }}>Sign out</button>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
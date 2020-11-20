import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import  CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';



import {ReactComponent as Logo} from '../../assets/crown.svg';

const Header =({currentUser, hidden})=>(
    <div className='header'>
        <Link className='logo-container' to='/'>
        <Logo className='logo'/>
        </Link>
        <div className='options'>
            <CartIcon/>
        </div>
        {
            hidden ? null: <CartDropdown/>
        }
        
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header) ;
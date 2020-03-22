import React from 'react';
// import './header.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import {Link} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

const Header = ({ currentUser, hidden }) => (

    <HeaderContainer>
		<LogoContainer to="/">
			<Logo />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>
				SHOP
			</OptionLink>
			<OptionLink to='/contact'>
				CONTACT
			</OptionLink>
			{
				currentUser ?
					(<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>)
				:(<OptionLink to='/signin'>SIGN IN</OptionLink>)
			}
			<CartIcon />
		</OptionsContainer>
		{
			hidden?null:<CartDropdown/>
		}
	</HeaderContainer>

);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon-component"
import ChartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { selectCurrentUser } from "../../store/user/user.selector"
import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles"

import { signOutUser } from "../../utils/firebase/firebase.utils"
import { CartContext } from "../../contexts/cart.context"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { isCartOpen } = useContext(CartContext)

  // console.log(currentUser)
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <ChartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation

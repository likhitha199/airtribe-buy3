import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';



function AppContainer(props) {
    const user = useSelector(state => state.user);
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                        <NavLink
                            to="/products"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                            >
                            Products
                        </NavLink>
                        </li>
                        <li>
                            <Link to="/wishlist">Wishlist</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
                {user.user.email}
            </header>
            {props.children}
        </>
    )
}

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AppContainer;
import { Navigate } from "react-router-dom";
const Redirect = () => {
    // regex to match the path
        const path = window.location.pathname.match(/\/(home|careers|testimonials)/);
        if (path) {
            return ( <Navigate to={path[1]} replace={true} /> );
        } else {
            return ( <Navigate to="/" replace={true} /> );
        }
}
 
export default Redirect;
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setUserData } from "../store/slices/userSlice";
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const dummyPayload = {
            email: "airtribe@gmail.com",
            password: 'test'
        }
        if (payload.email === dummyPayload.email && payload.password === dummyPayload.password) {
            localStorage.setItem('airtribe-user-auth', 'authenticated');
            dispatch(setUserData(payload));
            navigate('/products', {
               replace: true,
            });
        } else {
            alert("Invalid Credentials");
        }
    }
    return ( 
        <form onSubmit={submit}>
            <input type="email" name="email" id="" />
            <input type="password" name="password" id="" />
            <button type="submit">Login</button>
        </form>
     );
}
 
export default LoginPage;
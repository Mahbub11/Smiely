import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Auth from '../../components/user/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ourLogo from '../../Assets/images/logos/ourLogo.jpg'
import { LoginUser } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, loginUser } from '../../actions/userAction';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(LoginUser(email, password));
        console.log(password)
    }

    // useEffect(() => {
    //     if (error) {
    //         toast.error(error);
    //         // dispatch(clearErrors());
    //     }
    //     if (isAuthenticated) {
    //         navigate(`/${user.username}`)
    //     }
    // }, [dispatch, error, isAuthenticated, navigate]);


    return (
        <>
            
            <Auth>
                <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
                    <img draggable="false" className="mx-auto h-[100px] w-[100px] object-contain" src={ourLogo} alt="" />
                    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-3 m-3 md:m-8">
                        <TextField
                            label="Email/Username"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            size="small"
                            fullWidth
                        />
                        <button type="submit" className="bg-primary-blue font-medium py-2 rounded text-white w-full">Log In</button>
                        <span className="my-3 text-gray-500">OR</span>
                        <Link to="/password/forgot" className="text-sm font-medium text-blue-800">Forgot password?</Link>
                    </form>
                </div>

                <div className="bg-white border p-5 text-center">
                    <span>Don't have an account? <Link to="/auth/signup" className="text-primary-blue">Sign up</Link></span>
                </div>
            </Auth>
        </>
    )
}

export default Login
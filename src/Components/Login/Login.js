import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSignin, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {


    initializeLoginFramework();

    const [newUser, setnewUser] = useState(false);
    const [user, setuser] = useState({
        isSignedin: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const fbSignin = () => {
        handleFbSignin()
            .then(res => {
                handleResponse(res, true);
            })
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (newUser && user.name && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
    }

    const handleResponse = (res, redirect) => {
        setuser(res);
        setloggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = e => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            const re = /^[^\s@]+@[^\s@]+$/;
            isFieldValid = re.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isValid = e.target.value.length > 5;
            const passHasNum = /\d{1}/.test(e.target.value);
            isFieldValid = isValid && passHasNum;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setuser(newUserInfo);
        }
    }


    return (
        <div>
            {
                user.isSignedin ? <button className='btn btn-danger px-4' style={{ marginRight: '10px' }} onClick={signOut}>Google sign out</button> : <button className='btn btn-warning px-5' style={{ marginRight: '10px' }} onClick={googleSignIn}>Google sign in</button>
            }
            <button onClick={fbSignin} className='btn btn-primary px-4'>Facebook login</button>
            {
                user.isSignedin === true && <>
                    <p>Welcome, {user.name}</p>
                    <img src={user.photo} alt="" />
                    <p>Your email: {user.email}</p>
                </>
            }
            <div style={{ maxWidth: '400px' }} className='mx-auto p-5 m-5 shadow-lg rounded'>
                <h2>Our own authentication</h2>
                <input type="checkbox" onChange={() => setnewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">Register</label>
                <form onSubmit={handleSubmit}>
                    {
                        newUser && <input className='form-control' type="text" name="name" id="" placeholder='Write your name' onBlur={handleBlur} required />
                    }
                    <br />
                    <input className='form-control' type="email" onBlur={handleBlur} name='email' placeholder='Write your email' required />
                    <br />
                    <input className='form-control' type="password" onBlur={handleBlur} name="password" id="" placeholder='Choose password' required />
                    <br />
                    <input type="submit" className='btn btn-success px-5' value={newUser ? 'Register' : 'Log in'} />
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>
                }
            </div>
        </div>
    );
}

export default Login;

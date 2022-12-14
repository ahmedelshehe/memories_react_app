import React, { useState ,useEffect} from 'react';
import {Link ,useNavigate ,useLocation } from 'react-router-dom';
import {AppBar ,Typography,Toolbar,Avatar,Button} from '@material-ui/core'
import useStyles from "./styles"
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
const Navbar =() =>{
    const classes =useStyles()
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const location = useLocation()
    const [user,setUser] =useState(JSON.parse(localStorage.getItem('profile')))
    const logout = ()=>{
        try {
            dispatch({type :'LOGOUT'})
            navigate("/auth")
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        const token =user?.token;
        if(token){
            const decodedToken =decode(token)
            if(decodedToken.exp * 1000 <new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
    return (
            <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={memoriesText} alt="memories"  height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="memories"  height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt ={user.result ? user.result.name :user.profile.name } src={user.result && user.result.imageUrl} >
                            {user.result?user.result.name.charAt(0) :user.profile.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result ? user.result.name :user.profile.name }</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                    ) : 
                    (
                        <Button component={Link} to="/auth" variant="contained" className={classes.login} color="primary" onClick={()=>{}}>
                            Sign in
                        </Button>
                    )}
            </Toolbar>
            </AppBar>
    )
}
export default Navbar;
import React ,{useState ,useEffect} from 'react';
import {Avatar ,Button , Paper ,Grid ,Typography ,Container} from '@material-ui/core'
import Icon from './Icon'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from './styles'
import Input from './Input'
import { gapi } from 'gapi-script';
import {signup ,signin} from '../../actions/auth'
const initialState = {
    firstName :'',lastName :'',email :'',password :'',confirmPassword :''
}
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword]=useState(false)
    const [isSignup,setIsSignup]=useState(false)
    const [formData,setFormData] = useState(initialState)
    const dispatch =useDispatch();
    const navigate =useNavigate ();
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,navigate))
        } else {
            dispatch(signin(formData,navigate))
        }
    }
    const handleChange =(e)=>{
        setFormData({...formData ,[e.target.name] : e.target.value})
    }
    const clientId = '';

    useEffect(() => {
    const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
        });
        };
        gapi.load('client:auth2', initClient);
    });
    const googleSuccess =async (res) => {
        const profile = res?.profileObj
        const token =res?.tokenId
        try {
            dispatch({type :'AUTH' , data :{profile ,token}})
            navigate("/")
        } catch (error) {
            console.log(error)
        }
        console.log(profile);
    }
    const googleFailure = ({error,details}) => {
        console.log(error);
        console.log(details);
        console.log("Google sign in failed");
      }
    const handleShowPassword =()=>setShowPassword((prevState) => !prevState)
    const switchMode =() => setIsSignup((prevState) => !prevState);
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className="classes.form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <React.Fragment>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half  autoFocus/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>        
                                </React.Fragment>
                            )
                        }
                        
                        <Input name="email" label="Email" handleChange={handleChange}  type="email"/>
                        <Input name="password"  label="Password" handleChange={handleChange} type={showPassword? "text": "password"} autoComplete="off" handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && (
                                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" autoComplete="off"/>
                            )
                        }
                        <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {
                            isSignup ? "Sign up" :"Sign in"
                        }
                        </Button>
                        <GoogleLogin
                            clientId={clientId}
                            render={(renderProps)=>(
                                <Button 
                                className={classes.googleButton} 
                                color="primary" fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>} 
                                variant="contained">
                                    Google Sign in
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy ="single_host_origin"
                        />
                        
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account Sign In" :"Don't have an account Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        );
} 

export default Auth;

import React from 'react';
import {Button, Container, Grid, TextField, Card, CardContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {db, auth} from '../firebase'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import Image from '../Assets/img/honey.png'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: '#D53D3D',
    borderRadius: '10px',
    marginTop: '10%'
  },
}));

const Login = () => {
    const [disabled,setDisabled] = React.useState(false);
    const [user,setUser] = React.useState('');
    const [password, setPass] = React.useState('')

    const classes = useStyles();
    const inSesion = async(email, pass) =>{
        setDisabled(!disabled);
        await auth.signInWithEmailAndPassword(user, password).then((userCredential)=>{
            NotificationManager.sucess(userCredential.email, 'Login successful!', 5000);
        }).catch(error=>{
            console.log(error.message);
            NotificationManager.error(error.message, 'Login error', 5000);
            setDisabled(false);
        });
    }
  return (
    <Container className={classes.container} maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img style={{width: '100%'}} src='https://firebasestorage.googleapis.com/v0/b/honeywell-mediscan.appspot.com/o/honey.png?alt=media&token=917ff188-285e-48dc-b3af-3b5bca0dba77'/>
                            <hr/>
                            <TextField
                                fullWidth
                                onChange={e=> setUser(e.target.value)}
                                label="Email"
                                name="email"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                onChange={e=> setPass(e.target.value)}
                                label="Password"
                                name="password"
                                size="small"
                                type="password"
                                variant="outlined"
                            />
                        </Grid>
                        </Grid>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={disabled} onClick={()=> inSesion()} style={{backgroundColor: '#fff', color: '#D53D3D'}} fullWidth variant="contained">
              Login
            </Button>
            <NotificationContainer/>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Login;
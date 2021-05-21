import React from 'react';
import {Button, Container, Grid, TextField, Card, CardContent, Select, InputLabel, MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {db, auth} from '../firebase'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: '#D53D3D',
    borderRadius: '10px',
    marginTop: '10%'
  },
}));

const Login = (props) => {
    const [disabled,setDisabled] = React.useState(false);
    const [logged,setLogged] = React.useState(false);
    const [user,setUser] = React.useState('');
    const [password, setPass] = React.useState('')
    const [level, setLevel] = React.useState(1)
    const classes = useStyles();
    const inSesion = async(email, pass) =>{
        setDisabled(!disabled);
        await auth.createUserWithEmailAndPassword(user, password).then((userCredential)=>{
          db.collection('usuarios').add({
            correo: user,
            nivel: level
          })
          return(
            setLogged(true)
          )
          NotificationManager.sucess(userCredential.email, 'Create successful!', 5000);
        }).catch(error=>{
            console.log(error.message);
            NotificationManager.error(error.message, 'Register error', 5000);
            setDisabled(false);
        });
    }
  return (
    logged===true ? (
      <Redirect to='/'/>
    ):(
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
                      <Grid item xs={12}>
                        <Grid item xs={12}>
                          <InputLabel id="level">Level</InputLabel>
                            <Select
                              fullWidth
                              labelId="level"
                              id="demo-simple-select"
                              value={level}
                              onChange={e=> setLevel(e.target.value)}
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                            </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={disabled} onClick={()=> inSesion()} style={{backgroundColor: '#fff', color: '#D53D3D'}} fullWidth variant="contained">
              Register
            </Button>
            <NotificationContainer/>
          </Grid>
        </Grid>
    </Container>
    )
  );
};

export default Login;
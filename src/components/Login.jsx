import React from 'react';
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {db, auth} from '../firebase'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const Login = () => {
    const classes = useStyles();
    const inSesion = async(email, pass) =>{
        await auth.signInWithEmailAndPassword('j.quezada3131@gmail.com', '123456').then((userCredential)=>{
            console.log(userCredential.user)
        }).catch(error=>{
            console.log(error.message)
        })
    }
  return (
    <Container className={classes.container} maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  //inputRef={register}
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  //inputRef={register}
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={()=> inSesion()} color="secondary" fullWidth variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Login;
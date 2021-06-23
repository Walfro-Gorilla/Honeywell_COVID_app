import React from 'react';
import { Button, Container, Grid, TextField, Card, CardContent, Select, InputLabel, MenuItem, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { db, auth } from '../firebase'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Redirect } from "react-router-dom";
import { Row, Col, message } from 'antd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: '#D53D3D',
    borderRadius: '10px',
    marginTop: '10%'
  },

  root: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },

}));

const Login = (props) => {
  const [users, setUsers] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [password, setPass] = React.useState('')
  const [level, setLevel] = React.useState(1)
  const classes = useStyles();

  const eliminar = async (id)=>{
    await db.collection('usuarios').doc(id).delete()
    message.success('Borrado')
  }

  React.useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...

    document.title = "Honeywell COVID App actions" //Cambiamos el titulo de la pagina.

    const obtenerData = async () => { //Creamos una funcion ASYNC AWAIT.     
      try {
        const docs=[];
        const data = await db.collection('usuarios')
        .orderBy('correo', 'asc')
        .onSnapshot((snapshot)=> {
            const docs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({
                    ...data,
                    id:doc.id,
                    tproovedor: 'Externo'
                });
            });
            setUsers(docs);
        });
      } catch (error) {
        console.log(error)  // Si falla, nos envia un mensaje a la consola
      }
      //alert(newArrayDate[0])
      //setFirstDate(newArrayDate[0])
    }
    obtenerData()  //Ejecutamos la funcion
    console.log(users)
  }, []) //Importante agregar [] para no generar un loop



  const inSesion = async (email, pass) => {
    setDisabled(!disabled);
    await auth.createUserWithEmailAndPassword(user, password).then((userCredential) => {
      db.collection('usuarios').add({
        correo: user,
        nivel: level
      })
      return (
        setLogged(true)
      )
      NotificationManager.sucess(userCredential.email, 'Create successful!', 5000);
    }).catch(error => {
      console.log(error.message);
      NotificationManager.error(error.message, 'Register error', 5000);
      setDisabled(false);
    });
  }
  return (
    logged === true ? (
      <Redirect to='/' />
    ) : (
      <Row gutter={16}>
        <Col className="gutter-row" span={11}>
          <Container className={classes.container} maxWidth="xs">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <img style={{ width: '100%' }} src='https://firebasestorage.googleapis.com/v0/b/honeywell-mediscan.appspot.com/o/honey.png?alt=media&token=917ff188-285e-48dc-b3af-3b5bca0dba77' />
                        <hr />
                        <TextField
                          fullWidth
                          onChange={e => setUser(e.target.value)}
                          label="Email"
                          name="email"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          onChange={e => setPass(e.target.value)}
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
                            onChange={e => setLevel(e.target.value)}
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
                <Button disabled={disabled} onClick={() => inSesion()} style={{ backgroundColor: '#fff', color: '#D53D3D' }} fullWidth variant="contained">
                  Register
                </Button>
                <NotificationContainer />
              </Grid>
            </Grid>
          </Container>
        </Col>
        <Col className="gutter-row" span={2}></Col>
        <Col className="gutter-row" span={11}>
          <List className={classes.root}  dense={false}>
            {
              users.map(user=>{
                return(
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.correo}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={()=> eliminar(user.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                )
              })
            }
          </List>
        </Col>
      </Row>
    )
  );
};

export default Login;
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton, makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';


import MenuIcon from '@material-ui/icons/Menu';

const useStyle = makeStyles((theme => ({
    offset: theme.mixins.toolbar, // min-height: 56px;
    menuButton: {  
        marginRight: theme.spacing(2), // margen opcional
    },
    title: {
        flexGrow: 1,
      },
      root: {
        flexGrow: 1,
      },
})))

const Navbar = () => { 
  const classes = useStyle();

  return (
    <React.Fragment>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
                Honeywell
            </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </React.Fragment>
  );
};

export default Navbar;
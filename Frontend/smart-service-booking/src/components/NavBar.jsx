import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";


const NavBar=()=>{
return(
    <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h4" sx={{flexGrow:1,mr:9}}>
                Smart Service Booking
            </Typography>
            <Button color="inherit" sx={{fontSize:22,fontWeight:500}} component={Link} to="/">
                Home
            </Button>
            <Button color="inherit" sx={{fontSize:22,fontWeight:500}} component={Link} to="/services">
               Services
            </Button>
            <Button color="inherit" component={Link} to="/bookings">
                Bookings
            </Button>
            
        </Toolbar>
    </AppBar>
)
}

export default NavBar;
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles((theme) => ({
    button: {
       '& .MuiButton-label' : {
            color: '#FFFFFF',
            textTransform: 'capitalize',
            fontSize: '18px',
            
         },
    },
  }));



const ProfileButton = props => {
    
    
     const customCss = useStyles();

    return(  <div><Button className={customCss.button}
        variant="text"
        size="large"
        color="inherit"
        startIcon={<PersonIcon style={{ color: 'white', paddingBottom: '3px' }} />}
    >{localStorage.getItem('firstName')}</Button>
    </div> )
  
}  

export default ProfileButton
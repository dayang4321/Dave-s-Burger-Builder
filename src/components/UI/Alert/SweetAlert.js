//import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
export const sweetAlert = (swalProps) => {
    let customText = swalProps.text;
    if (swalProps.icon === 'error') {
        switch (swalProps.text) {
            case 'EMAIL_EXISTS': customText = "You're already signed up! Login instead!"
                break
            case 'MISSING_EMAIL': customText = 'Please enter a valid E-mail'
                break
            default: customText = 'Oops! Something went wrong'
        };
    }
        MySwal.fire({
            ...swalProps,
            text: customText,
        
      
            //   onOpen: () => {
            //     // `MySwal` is a subclass of `Swal`
            //     //   with all the same instance & static methods
            //     MySwal.clickConfirm()
            //   }
        
        
        })
        //     .then(() => {
        //   return MySwal.fire(<p>Shorthand works too</p>)
        // })
}
    
export const sweetComponent = (component,props) => {
    MySwal.fire({
        title: component,
        ...props
    });
}
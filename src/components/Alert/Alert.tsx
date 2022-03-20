import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props{
    text:string
    error:boolean
    setOpen:(state:boolean) => void,
    open:boolean

}

export const CustomizedSnackbars = (props:Props) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.error?"error" : "success"} sx={{ width: '100%' }}>
                    {props.text}
                </Alert>
            </Snackbar>

        </Stack>
    );
}
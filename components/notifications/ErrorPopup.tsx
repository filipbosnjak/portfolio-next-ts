import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import {Fade, Slide, SlideProps, Snackbar} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {useEffect} from "react";

type ErrorPopupProps = {
    message: string,
    isOpen: boolean
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}
export default function ErrorPopup({message, isOpen, setOpen}: ErrorPopupProps) {

    const [state, setState] = React.useState<{
        Transition: React.ComponentType<
            TransitionProps & {
            children: React.ReactElement<any, any>;
        }
        >;
    }>({
        Transition: SlideTransition,
    });

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => {
                setOpen(false)
            }, 3000)
        }
    }, [isOpen])

    return (
        <Box sx={{ width: '100%' }}>
            <Snackbar
                open={isOpen}
                onClose={() => setOpen(!isOpen)}
                TransitionComponent={state.Transition}
                message={message}
                key={state.Transition.name}
                anchorOrigin={{horizontal: "center", vertical: "top"}}
            >
                <Alert onClose={() => setOpen(!isOpen)} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
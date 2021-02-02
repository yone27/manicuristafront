import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Info } from '@material-ui/icons'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ track }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className="card_icon" onClick={handleClickOpen}><Info /></Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Album: {track.album.name}</DialogTitle>
                <DialogContent>
                    <figure>
                        <img src={track.album.images[0].url} className="card__img" alt="Mi Img" />
                    </figure>
                    <p>Autor: {track.artists.map((artist) => artist.name).join(", ")}</p>
                    <p>Canciones: {track.album.total_tracks}</p>
                    <p>Lanzamiento: {track.album.release_date}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Salir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

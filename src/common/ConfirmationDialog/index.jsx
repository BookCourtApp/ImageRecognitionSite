import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Index = ({
                   title,
                   content,
                   acceptText,
                   cancelText,
                   open,
                   setOpen,
                   onConfirmAction,
               }) => {

    const handleAccept = () => {
        onConfirmAction();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    return <Dialog
        open={open}
        onClose={() => {
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAccept} color="primary" autoFocus>
                {acceptText}
            </Button>
            <Button onClick={handleCancel} color="primary">
                {cancelText}
            </Button>
        </DialogActions>
    </Dialog>
}

export default Index
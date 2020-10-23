import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import PreviewBill from '../pdfToHtml/billRunDoc.js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Invoice from '../pdfToHtml/invoice.js';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(props.isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>


      <Dialog
        onClose={()=>props.handleClose()}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        maxWidth={'lg'}
      >
        <DialogTitle id="customized-dialog-title" onClose={()=>props.handleClose()}>
          Preview Invoice Document
        </DialogTitle>
        <DialogContent dividers>
        <PreviewBill />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={()=>{
              alert("Are you sure you want to send this bill off?");
              props.handleClose();
            }}
            style={{ color: 'green' }}
            startIcon={<SendIcon />}
          >
            Approve and Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClientTable from '../data-tables/client-pop-up-table.js';
import { withTranslation } from 'react-i18next';

const ResponsiveDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TextField
        color="primary"
        label={props.t('Alternate Invoice Recipient')}
        value={props.textValue}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="responsive-dialog-title">{props.t('Alternate Client List')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.t('Please Select An Alternate Client')}</DialogContentText>
          <ClientTable
            callbackValue={props.callbackValue}
            handleClose={handleClose}
            isEdit={props.isEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {props.t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withTranslation('common')(ResponsiveDialog);

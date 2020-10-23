import React from 'react';

import { FilePicker } from 'react-file-picker';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

const FileChooser = (props) => {
  return (
    <FilePicker
      key={props.label}
      label={props.label}
      dbid={props.dbid}
      style={{ margin: 10, display: 'inline-flex' }}
      onChange={(fObj) => {
        console.log('attach file:', fObj);
        // setFile({[name]: value, });
        props.callbackValueOnSuccess(props.isEdit ? props.dbid : props.name, fObj);
      }}
      onError={(err) => alert(this.props.t('Failed to upload file...'), err)}
    >
      <Button variant="contained">
        {props.label}: {props.t('Upload')}
        {props.required ? ' *' : ''}
      </Button>
    </FilePicker>
  );
};

export default withTranslation('common')(FileChooser);

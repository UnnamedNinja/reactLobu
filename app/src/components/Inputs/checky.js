import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default function AccountManagerCheckBox(props) {
  const [checked, setChecked] = React.useState(props.checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.callbackValue(props.isEdit ? props.dbid : props.name, event.target.checked);
  };

  return (
    <FormGroup row style={{ display: 'inline', marginRight: 0 }}>
      <FormControlLabel
        style={{ marginTop: 20, marginLeft: 10 }}
        control={
          <Checkbox
            checked={checked || false}
            onChange={(e) => handleChange(e)}
            name={props.label}
          />
        }
        label={props.label + `${props.required ? ' *' : ''}`}
      />
    </FormGroup>
  );
}

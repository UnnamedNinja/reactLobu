import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withTranslation } from 'react-i18next';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
    minWidth: 140,
    maxWidth: 300,
    display: 'inline-flex'
    },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const SimpleSelect = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [menu, setMenu] = React.useState('');

  const handleChange = (newValue) => {
    console.log(newValue);
    console.log('INTERN PROPS');
    console.log(props.intern);
    setValue(newValue);
    props.callbackValue(props.dbid, newValue);
  };

  console.log('BOOBIES');
  console.log(props.intern);
  if (props.intern === 'Intern') {
    return (
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        defaultValue={props.value}
        options={props.options[0].internOptions}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          props.callbackValue(props.isEdit ? props.dbid : props.name, newValue);
          setValue(newValue);
        }}
        getOptionLabel={(option) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              required={props.required}
            />
            {props.t(option)}
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label={props.label} required={props.required} />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        defaultValue={props.value}
        options={props.options[1].externOptions}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          props.callbackValue(props.isEdit ? props.dbid : props.name, newValue);
          setValue(newValue);
        }}
        getOptionLabel={(option) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {props.t(option)}
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label={props.label} required={props.required} />
        )}
      />
    );
  }
};

export default withTranslation(SimpleSelect);
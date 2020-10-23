import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    minWidth: 180,
    maxWidth: 300,
    display: 'inline-flex',
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const SimpleSelect = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.default);
  const [menu, setMenu] = React.useState('');

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    props.callbackValue(props.dbid, newValue);
  };

  let menuItems = props.options.map((option) => {
    return <MenuItem value={option}>{option}</MenuItem>;
  });

  if (value === 'Nothing') {
    return (
      <Autocomplete
        id="combo-box-demo"
        defaultValue={props.default}
        options={props.options}
        onChange={(event, newValue) => {
          props.callbackValue(props.isEdit ? props.dbid : props.name, newValue);
          setValue(newValue);
        }}
        getOptionLabel={(option) => props.t(option)}
        className={classes.formControl}
        renderInput={(params) => (
          <TextField {...params} label={props.label} required={props.required} />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        id="combo-box-demo"
        defaultValue={props.value}
        options={props.options}
        onChange={(event, newValue) => {
          props.callbackValue(props.isEdit ? props.dbid : props.name, newValue);
          setValue(newValue);
        }}
        getOptionLabel={(option) => option}
        className={classes.formControl}
        renderInput={(params) => (
          <TextField error {...params} label={props.label} required={props.required} />
        )}
      />
    );
  }
};

export default withTranslation('common')(SimpleSelect);
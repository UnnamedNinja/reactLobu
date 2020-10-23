import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 180,
    maxWidth: 300,
    // display: 'inline-flex',
    margin: theme.spacing(1),

  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [menu, setMenu] = React.useState('');

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    props.callbackValue(props.dbid, newValue);
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags-standard"
      options={[]}
      defaultValue={props.value ? props.value : []}
      onChange={(event, newValue) => {
        props.callbackValue(props.isEdit ? props.dbid : props.name, newValue);
        setValue(newValue);
      }}
      getOptionLabel={(option) => option}
      className={classes.formControl}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} placeholder="+49" label={props.label} required={props.required} />
      )}
    />
  );
}

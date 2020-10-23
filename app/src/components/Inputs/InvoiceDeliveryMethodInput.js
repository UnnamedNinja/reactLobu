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
    margin: 10,
    minWidth: 140,
    maxWidth: 300,
    display: 'inline-flex',
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const SimpleSelect = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [menu, setMenu] = React.useState('');

  // const handleChange = (newValue) => {
  //   console.log(newValue);
  //   setValue(newValue);
  //   props.callbackValue(props.dbid, newValue);
  // };

  let menuItems = props.options.map((option) => <MenuItem value={option}> {option} </MenuItem>);

  if (props.isEdit) {
    if (props.invoiceDeliveryMethod === 'Email' || value === 'Email') {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.invoiceDeliveryMethod || value}
            options={props.options}
            onChange={(event, newValue) => {
              props.callbackValue(props.dbid, newValue);
              setValue(newValue);
            }}
            getOptionLabel={(option) => props.t(option)}
          style={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label={props.t(props.label)} required={props.required} />
            )}
          />
          <TextField
            key={props.emailName}
            style={{ margin: 10 }}
            onChange={(e) => {
              props.callbackValueText(e, props.methodDbid);
            }}
            name={props.emailName}
            required={props.required}
            label={props.t(props.emailLabel)}
            defaultValue={props.invoiceEmail}
          />
        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.invoiceDeliveryMethod || value}
          options={props.options}
          onChange={(event, newValue) => {
            props.callbackValue(props.dbid, newValue);
            setValue(newValue);
          }}
          getOptionLabel={(option) => props.t(option)}
          className={classes.formControl}
          renderInput={(params) => (
            <TextField {...params} label={props.t(props.label)} required={props.required} />
          )}
        />
      );
    }
  } else {
    if (props.invoiceDeliveryMethod === 'Email' || value === 'Email') {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.invoiceDeliveryMethod || value}
            options={props.options}
            onChange={(event, newValue) => {
              props.callbackValue(props.name, newValue);
              setValue(newValue);
            }}
            getOptionLabel={(option) => props.t(option)}
          style={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label={props.t(props.label)} required={props.required} />
            )}
          />
          <TextField
            key={props.key2}
            style={{ margin: 10 }}
            onChange={(event, newValue) => {
              props.callbackValueText(event, props.emailName);
              setValue(newValue);
            }}
            name={props.emailName}
            required={props.required}
            label={props.t(props.emailLabel)}
          />
        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.invoiceDeliveryMethod || value}
          options={props.options}
          onChange={(event, newValue) => {
            props.callbackValue(props.name, newValue);
            setValue(newValue);
          }}
          getOptionLabel={(option) => props.t(option)}
          // className={classes.formControl}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label={props.t(props.label)} required={props.required} />
          )}
        />
      );
    }
  }
  //   return (
  //     <div>
  //     <Autocomplete
  //       id="combo-box-demo"
  //       defaultValue={props.invoiceDeliveryMethod}
  //       options={props.options}
  //       onChange={(event, newValue) => {
  //         props.callbackValue(props.dbid, newValue);
  //         setValue(newValue);
  //       }}
  //       getOptionLabel={(option) => props.t(option)}
  //       className={classes.formControl}
  //       renderInput={(params) => <TextField {...params} label={props.label} />}
  //     />
  //     <TextField />
  //     </div>
  //   );
  // }else{
  // return (
  //   <Autocomplete
  //     id="combo-box-demo"
  //     defaultValue={props.invoiceDeliveryMethod}
  //     options={props.options}
  //     onChange={(event, newValue) => {
  //       props.callbackValue(props.label, newValue);
  //       setValue(newValue);
  //     }}
  //     getOptionLabel={(option) => props.t(option)}
  //     className={classes.formControl}
  //     renderInput={(params) => <TextField {...params} label={props.label} />}
  //   />
  //
  // );
};

export default withTranslation('common')(SimpleSelect);

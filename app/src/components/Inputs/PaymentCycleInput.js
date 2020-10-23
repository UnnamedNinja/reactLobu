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

  let menuItems = props.options.map((option) => {
    return <MenuItem value={option}>{option}</MenuItem>;
  });

  if (props.isEdit) {
    if (props.paymentCycle === 'Other' || value === 'Other') {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.paymentCycle || value}
            options={props.options}
            onChange={(event, newValue) => {
              props.callbackValue(props.dbid, newValue);
              setValue(newValue);
            }}
            getOptionLabel={(option) => option}
            className={classes.formControl}
            renderInput={(params) => (
              <TextField {...params} label={props.label} required={props.required} />
            )}
          />
          <TextField
            key={props.daysLabel}
            style={{ margin: 10 }}
            onChange={(e) => {
              props.callbackValueText(e, props.methodDbid);
            }}
            name={props.daysLabel}
            required={props.required}
            label={props.daysLabel}
            defaultValue={props.invoiceEmail}
          />
        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.paymentCycle || value}
          options={props.options}
          onChange={(event, newValue) => {
            props.callbackValue(props.dbid, newValue);
            setValue(newValue);
          }}
          getOptionLabel={(option) => option}
          className={classes.formControl}
          renderInput={(params) => (
            <TextField {...params} label={props.label} required={props.required} />
          )}
        />
      );
    }
  } else {
    if (props.paymentCycle === 'Other' || value === 'Other') {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={'Other'}
            options={props.options}
            onChange={(event, newValue) => {
              props.callbackValue(props.name, newValue);
              setValue(newValue);
            }}
            getOptionLabel={(option) => props.t(option)}
            className={classes.formControl}
            renderInput={(params) => (
              <TextField {...params} label={props.label} required={props.required} />
            )}
          />
          <TextField
            key={props.daysLabel}
            style={{ margin: 10 }}
            onChange={(event, newValue) => {
              props.callbackValueText(event, props.daysLabel);
              setValue(newValue);
            }}
            name={props.daysLabel}
            required={props.required}
            // label={props.daysLabel}
            label={props.t(props.daysLabel)}

          />
        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.paymentCycle || value}
          options={props.options}
          onChange={(event, newValue) => {
            props.callbackValue(props.name, newValue);
            setValue(newValue);
          }}
          getOptionLabel={(option) => props.t(option)}
          className={classes.formControl}
          renderInput={(params) => (
            <TextField {...params} label={props.label} required={props.required} />
          )}
        />
      );
    }
  }
  //   return (
  //     <div>
  //     <Autocomplete
  //       id="combo-box-demo"
  //       defaultValue={props.paymentCycle}
  //       options={props.options}
  //       onChange={(event, newValue) => {
  //         props.callbackValue(props.dbid, newValue);
  //         setValue(newValue);
  //       }}
  //       getOptionLabel={(option) => option}
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
  //     defaultValue={props.paymentCycle}
  //     options={props.options}
  //     onChange={(event, newValue) => {
  //       props.callbackValue(props.label, newValue);
  //       setValue(newValue);
  //     }}
  //     getOptionLabel={(option) => option}
  //     className={classes.formControl}
  //     renderInput={(params) => <TextField {...params} label={props.label} />}
  //   />
  //
  // );
};

export default withTranslation('common')(SimpleSelect);

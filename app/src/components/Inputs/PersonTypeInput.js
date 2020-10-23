import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountManagerCheckBox from '../Inputs/Checkbox';
import MultiChoice from '../Inputs/MultiChoice';

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
    if (props.personType === 'Partner' || value === 'Partner') {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.personType || value}
            options={props.options}
            onChange={async (event, newValue) => {
              await props.callbackValue(props.dbid, newValue);
              await setValue(newValue);
            }}
            getOptionLabel={(option) => props.t(option)}
            className={classes.formControl}
            renderInput={(params) => (
              <TextField {...params} label={props.label} required={props.required} />
            )}
          />
          <AccountManagerCheckBox
            isEdit={true}
            checked={props.checked}
            key={props.checkboxLabel}
            id={props.checkboxLabel}
            dbid={props.checkboxDbid}
            callbackValue={props.callbackValueCheckbox}
            name={props.checkboxLabel}
            required={props.required}
            label={props.checkboxLabel}
          />
          <MultiChoice
             callbackValue={props.callbackValue}
             required={false}
             options={['Percentage', 'Fee per day', 'Fee per month', 'Fee per unit', 'none']}
             value={props.calculation}
             label={props.t('Calculation')}
             name={'Calculation'}
             dbid={'calculation'}
             isEdit={true}
           />
          <TextField
            key={"Commission"}
            style={{marginTop:10}}
            defaultValue={props.commission}
            required={true}
            label={"Commission"}
            name={"Commission"}
            placeholder={"Commission Price"}
            onChange={props.callbackValueText}
            isEdit={true}

          />
        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.personType || value}
          options={props.options}
          onChange={async (event, newValue) => {
            await props.callbackValue(props.dbid, newValue);
            await setValue(newValue);
          }}
          getOptionLabel={(option) => props.t(option)}
          className={classes.formControl}
          renderInput={(params) => (
            <TextField {...params} label={props.label} required={props.required} />
          )}
        />
      );
    }
  } else {
    if (props.personType === 'Partner' || value === 'Partner' ) {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            defaultValue={'Partner'}
            options={props.options}
            onChange={async (event, newValue) => {
              await props.callbackValue(props.name, newValue);
              await setValue(newValue);
            }}
            getOptionLabel={(option) => props.t(option)}
            className={classes.formControl}
            renderInput={(params) => (
              <TextField {...params} label={props.label} required={props.required} />
            )}
          />
          <AccountManagerCheckBox
            isEdit={false}
            checked={props.checked}
            key={props.checkboxLabel}
            id={props.checkboxLabel}
            dbid={props.checkboxDbid}
            callbackValue={props.callbackValueCheckbox}
            name={props.checkboxLabel}
            required={false}
            label={props.checkboxLabel}
          />
          <MultiChoice
             callbackValue={props.callbackValue}
             required={false}
             options={['Percentage', 'Fee per day', 'Fee per month', 'Fee per unit', 'none']}
             value={props.value}
             label={props.t('Calculation')}
             name={'Calculation'}
             dbid={'calculation'}
           />

            <TextField
              key={"Commission"}
              style={{marginTop:10}}
              required={true}
              label={"Commission"}
              name={"Commission"}
              placeholder={"Commission Price"}
              onChange={props.callbackValueText}
            />


        </div>
      );
    } else {
      return (
        <Autocomplete
          id="combo-box-demo"
          defaultValue={props.personType || value}
          options={props.options}
          onChange={async (event, newValue) => {
            await props.callbackValue(props.name, newValue);
            await setValue(newValue);
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
  //       defaultValue={props.personType}
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
  //     defaultValue={props.personType}
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

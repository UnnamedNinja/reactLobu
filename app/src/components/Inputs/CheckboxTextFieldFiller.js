import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// when the checkbox is selected, the prefill property is automatically
// placed in the corresponding textfield and callbacks occur to lift that
// event up
const CheckboxPrefillTextField = (props) => {
  const [checked, setChecked] = React.useState(props.checkboxDefaultValue);
  const [text, setText] = React.useState(props.textFieldDefaultValue);

  const tfName = props.isEdit ? props.textFieldDbid : props.textFieldName;
  const cbName = props.isEdit ? props.checkboxDbid : props.checkboxName;

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      setText(props.preFill);
    }
    props.callbackValue(cbName, event.target.checked);
  };

  useEffect(() => {
    // ComponentDidMount
  //alert(props.checkboxDefaultValue+" "+props.textFieldDefaultValue)
  }, []);

  return (
    <FormGroup row style={{ display: 'inline', marginRight: 0 }}>
      <FormControlLabel
        style={{ marginTop: 10, marginLeft: 10 }}
        control={
          <Checkbox
            checked={checked || false}
            onChange={(e) => handleCheckboxChange(e)}
            name={props.checkboxLabel}
            defaultValue={props.checkboxDefaultValue}
            required={props.required}
          />
        }
        label={props.checkboxLabel}
      />
      <TextField
        key={props.textFieldLabel}
        style={{ margin: 10 }}
        name={props.textFieldLabel}
        defaultValue={props.textFieldDefaultValue || " "}
        value={text || ""}
        onChange={(e) => {
          console.log('to the above:', tfName, ':', e.target.value);
          setText(e.target.value);
          props.callbackValue(tfName, e.target.value);
        }}
        required={props.required}
        label={props.textFieldLabel}
        type={props.type}
        disabled={!checked}
      />
    </FormGroup>
  );
};

const mapStateToProps = ({ authentication }) => ({});

CheckboxPrefillTextField.propTypes = {
  callbackValue: PropTypes.func, // sends the Checkbox's value
  checkboxLabel: PropTypes.string, // label for the checkbox
  checkboxName: PropTypes.string, // name for the checkbox
  checkboxDbid: PropTypes.string, // dbid for the checkbox
  checkboxDefaultValue: PropTypes.bool, // default value on render of checkbox
  type: PropTypes.string, // type, e.g. number, string etc. for validation

  callbackValueText: PropTypes.func, // sends the TextField's value
  textFieldName: PropTypes.string, // label for the textField
  textFieldDbid: PropTypes.string, // dbid for the textField
  textFieldDefaultValue: PropTypes.string, // default value on render of textfield
  required: PropTypes.bool, // if true, the textfield has to have a value
  preFill: PropTypes.number, // number to fill the text field if the checkbox is checked
};

export default connect(mapStateToProps, {})(CheckboxPrefillTextField);

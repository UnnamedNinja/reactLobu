import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';

var IBAN = require('iban');
var BICFromIBAN = require('bic-from-iban');

class IbanTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('IBAN');
    console.log(this.props.IBAN);
  }

  handleTextFieldChange = async (evt) => {
    const value = evt.target.value;
    console.log(evt.target.name + ':', value);
    console.log(evt.target.value);
    console.log(evt.target);

    await this.setState({
      [evt.target.name]: value,
    });
    await this.props.callbackValue(event.target.name, value);
    if (IBAN.isValid(value)) {
      let bic = await BICFromIBAN.getBIC(this.state.IBAN);
      // alert(bic);
      await this.setState({ bic: bic });
      await this.props.callbackValue('BIC', bic);
    }
  };

  handleTextFieldChangeBic = async (evt) => {
    const value = evt.target.value;
    await this.props.callbackValue(event.target.name, value);
    await this.setState({ bic: value });
  };

  render() {
    if (this.state.IBAN == undefined || this.state.IBAN == '') {
      return (
        <div style={{ margin: 10, display: 'inline' }}>
          <TextField
            key={this.props.obj.label}
            style={{ marginTop: 10 }}
            onChange={this.handleTextFieldChange}
            name={this.props.obj.label}
            required={this.props.obj.required}
            label={this.props.obj.label}
            id="standard-error-helper-text"
            defaultValue={this.props.IBAN}
            value={this.props.IBAN}
            helperText={this.props.t('Incorrect IBAN') + '.'}
          />
        </div>
      );
    } else if (IBAN.isValid(this.state.IBAN) && this.state.bic != undefined) {
      console.log('biccy');
      console.log(this.state.bic);

      return (
        <div style={{ margin: 10, display: 'inline' }}>
          <TextField
            key={this.props.obj.label}
            style={{ marginTop: 10 }}
            onChange={this.handleTextFieldChange}
            name={this.props.obj.label}
            required={this.props.obj.required}
            label={this.props.obj.label}
          />
          <TextField
            key={'BIC'}
            style={{ marginTop: 10, marginLeft: 20 }}
            name={'BIC'}
            label={'BIC'}
            onChange={this.handleTextFieldChangeBic}
            value={this.state.bic}
            required={this.props.obj.required}
          />
        </div>
      );
    } else {
      return (
        <div style={{ margin: 10, display: 'inline' }}>
          <TextField
            error
            key={this.props.obj.label}
            style={{ marginTop: 10 }}
            onChange={this.handleTextFieldChange}
            name={this.props.obj.label}
            required={this.props.obj.required}
            label={this.props.obj.label}
            id="standard-error-helper-text"
            defaultValue={this.props.IBAN}
            value={this.props.IBAN}
            helperText={this.props.t('Incorrect IBAN') + '.'}
          />
        </div>
      );
    }
  }
}

export default withTranslation('common')(IbanTextInput);

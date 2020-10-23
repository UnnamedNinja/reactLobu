import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import DatePicker from '../Inputs/DatePicker';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import NumberFormat from 'react-number-format';

import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import { getArticles } from '../../redux/modules/article';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';
import { FilePicker } from 'react-file-picker';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';

class MultiWeightSlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      total: 0,
    };
  }

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    cDivs.push('Object');
    this.setState((prevState) => {
      return { customDiv: cDivs, total: prevState.total + 1 };
    });
  };
  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    array.splice(index, 1);
    this.setState((prevState) => {
      return { customDiv: array, total: prevState.total - 1 };
    });
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log(value);
    console.log(evt.target.name);
    this.setState({
      [evt.target.name]: value,
    });
    this.props.callbackValue(evt.target.name, value);
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value,
    });
    this.props.callbackValue(name, value);
  };

  handleDateChange = (name, date) => {
    this.setState({
      [name]: date,
    });
    this.props.callbackValue(name, date);
  };

  handleFilePickerChange = (name, fileObject) => {
    console.log('attach file:', fileObject);
    // this.setState({
    //   [name]: value,
    // });
    this.props.callbackValue(name, fileObject);
  };

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE');
    console.log(name);
    console.log('~~~~~');
    console.log(data);
    this.setState({
      [name]: value,
      [dataLabel]: data,
    });
  };

  render() {
    return (
      <div>
        <Button
          startIcon={<PlusIcon />}
          variant="outlined"
          style={{ color: 'green', marginTop: 10 }}
          onClick={() => {
            this.addNewRow();
          }}
        >
          {this.props.t('Add Additional Weightslip')}
        </Button>
        {this.state.customDiv.map((cdiv, i) => {
          return (
            <div
              style={{ paddingTop: 12, height: '100%' }}
              className="expense-block"
              key={cdiv}
              id="expense-block-`${i}`"
              data-block={i}
            >
              <Paper style={{ backgroundColor: '#e9f0ff' }}>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  style={{ color: 'red', backgroundColor: 'white', float: 'right', margin: 12 }}
                  onClick={() => {
                    this.deleteRow(i);
                  }}
                >
                  Remove From Order
                </Button>
                <br />
                <Grid container spacing={3}>
                  <DatabaseMultiChoice
                    key={i}
                    required={true}
                    method={'getArticles'}
                    getArticles={this.props.getArticles}
                    label={'Article'}
                    callbackValue={this.handleDatabaseMultiChoiceChange}
                    style={{ display: 'inlineFlex', margin: 10 }}
                    name={'articles(' + (i + 1) + ')'}
                    dbid={'articles(' + (i + 1) + ')'}
                  />
                  <FilePicker
                    key={i}
                    name={'weightslipFile(' + (i + 1) + ')'}
                    dbid={'weightslipFile(' + (i + 1) + ')'}
                    style={{ display: 'inlineFlex', margin: 10 }}
                    onChange={this.handleFilePickerChange}
                    onError={(err) => alert('Failed to upload file...', err)}
                  >
                    <Button contained color="secondary">
                      SAVE Weightslip
                    </Button>
                  </FilePicker>
                </Grid>
                <br />
                <Grid container spacing={3} style={{ marginLeft: 20 }}>
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    value={`${
                      this.state['Source: Currency (' + (i + 1) + ')'] == 'USD' ? '$' : '€'
                    } ${
                      this.state['sourcePrice (' + (i + 1) + ')'] *
                        this.state['sourceWeight (' + (i + 1) + ')'] || '0.00'
                    }`}
                    required={false}
                    label={'Article total of source (' + (i + 1) + ')'}
                    name={'Article total of source (' + (i + 1) + ')'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    value={`${
                      this.state['Processor: Currency (' + (i + 1) + ')'] == 'USD' ? '$' : '€'
                    } ${
                      this.state['processorPrice (' + (i + 1) + ')'] *
                        this.state['processorWeight (' + (i + 1) + ')'] || '0.00'
                    }`}
                    required={false}
                    label={'Article total of processor (' + (i + 1) + ')'}
                    name={'Article total of processor (' + (i + 1) + ')'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <br />
                  <DatePicker
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleDateChange}
                    required={false}
                    dbid={'sourceWeightslipDate(' + (i + 1) + ')'}
                    name={'sourceWeightslipDate (' + (i + 1) + ')'}
                    label={'Source: Weight Slip Date (' + (i + 1) + ')'}
                    callbackValue={this.handleDateChange}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'sourceWeightslipNumber(' + (i + 1) + ')'}
                    name={'sourceWeightslipNumber (' + (i + 1) + ')'}
                    label={'Source: Weight Slip Number (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'sourceWeight(' + (i + 1) + ')'}
                    name={'sourceWeight (' + (i + 1) + ')'}
                    label={'Source: Weight (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'sourcePrice(' + (i + 1) + ')'}
                    name={'sourcePrice (' + (i + 1) + ')'}
                    label={'Source: Price (' + (i + 1) + ')'}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Euro', 'USD']}
                    label={'Source: Currency (' + (i + 1) + ')'}
                    dbid={'sourceCurrency(' + (i + 1) + ')'}
                    name={'sourceCurrency (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Tons', 'Kg']}
                    label={'Source: Units (' + (i + 1) + ')'}
                    dbid={'sourceUnits(' + (i + 1) + ')'}
                    name={'sourceUnits (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={true}
                    value={this.props.sourceAmount}
                    dbid={'sourceAmount(' + (i + 1) + ')'}
                    name={'sourceAmount (' + (i + 1) + ')'}
                    label={'Source: Amount (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Bales', 'Packing Units']}
                    label={'Source: Packaging Unit (' + (i + 1) + ')'}
                    dbid={'sourcePackagingUnits(' + (i + 1) + ')'}
                    name={'sourcePackagingUnits (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'sourceDeviatingArticleName(' + (i + 1) + ')'}
                    name={'sourceDeviatingArticleName (' + (i + 1) + ')'}
                    label={'Source: Deviating Article Name (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'sourceCondition(' + (i + 1) + ')'}
                    name={'sourceCondition (' + (i + 1) + ')'}
                    label={'Source: Condition (' + (i + 1) + ')'}
                  />
                </Grid>
                <br />
                <Grid container spacing={3} style={{ marginLeft: 20 }}>
                  <DatePicker
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleDateChange}
                    required={false}
                    dbid={'processorWeightslipDate(' + (i + 1) + ')'}
                    name={'processorWeightslipDate (' + (i + 1) + ')'}
                    label={'Processor: Weight Slip Date (' + (i + 1) + ')'}
                    callbackValue={this.handleDateChange}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'processorWeightslipNumbe(' + (i + 1) + ')'}
                    name={'processorWeightslipNumbe (' + (i + 1) + ')'}
                    label={'Processor: Weight Slip Number (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'processorWeight(' + (i + 1) + ')'}
                    name={'processorWeight (' + (i + 1) + ')'}
                    label={'Processor: Weight (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'processorPrice(' + (i + 1) + ')'}
                    name={'processorPrice (' + (i + 1) + ')'}
                    label={'Processor: Price (' + (i + 1) + ')'}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Euro', 'USD']}
                    label={'Processor: Currency (' + (i + 1) + ')'}
                    dbid={'processorCurrency(' + (i + 1) + ')'}
                    name={'processorCurrency (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Tons', 'Kg']}
                    label={'Processor: Units (' + (i + 1) + ')'}
                    dbid={'processorUnits(' + (i + 1) + ')'}
                    name={'processorUnits (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={true}
                    value={this.props.sourceAmount}
                    dbid={'processorAmount(' + (i + 1) + ')'}
                    name={'processorAmount (' + (i + 1) + ')'}
                    label={'Processor: Amount (' + (i + 1) + ')'}
                  />
                  <MultiChoice
                    key={i}
                    callbackValue={this.handleMultiChoiceChange}
                    required={false}
                    options={['Bales', 'Packing Units']}
                    label={'Processor: Packaging Unit (' + (i + 1) + ')'}
                    dbid={'processorPackagingUnit(' + (i + 1) + ')'}
                    name={'processorPackagingUnit (' + (i + 1) + ')'}
                    style={{ margin: 10 }}
                    isEdit={this.props.isEdit}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'processorDeviatingArticleName(' + (i + 1) + ')'}
                    name={'processorDeviatingArticleName (' + (i + 1) + ')'}
                    label={'Processor: Deviating Article Name (' + (i + 1) + ')'}
                  />
                  <TextField
                    key={i}
                    style={{ margin: 10 }}
                    onChange={this.handleTextFieldChange}
                    required={false}
                    dbid={'processorCondition(' + (i + 1) + ')'}
                    name={'processorCondition (' + (i + 1) + ')'}
                    label={'Processor: Condition (' + (i + 1) + ')'}
                  />
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, { getArticles })(MultiWeightSlip);

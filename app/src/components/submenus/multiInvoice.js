import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import DatePicker from '../Inputs/DatePicker';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import { FilePicker } from 'react-file-picker';
import { getArticles } from '../../redux/modules/article';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';

class MultiInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
    };
  }

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    cDivs.push('Object');
    this.setState({ customDiv: cDivs });
  };
  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    array.splice(index, 1);
    this.setState({ customDiv: array });
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
    console.log(fileObject);
    // this.setState({
    //   [name]: value,
    // });
    this.props.callbackValue(name, fileObject);
  };

  render() {
    return (
      <div style={{ marginTop: '5px' }}>
        <Button
          startIcon={<PlusIcon />}
          variant="outlined"
          style={{ marginTop: 10, color: 'green' }}
          onClick={() => {
            this.addNewRow();
          }}
        >
          {`Add Additional ${this.props.entityType}`}
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
              <Paper style={{ backgroundColor: '#e9f0ff', padding: 5, margin: 10 }}>
                <Grid style={{ margin: 20 }}>
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
                  <Grid item xs={3}>
                    <TextField
                      key={i}
                      id={i}
                      required={true}
                      defaultValue={this.props.defaulltEntityValue}
                      label={this.props.entityType}
                      onChange={this.handleTextFieldChange}
                      InputProps={{ readOnly: true }}
                      style={{ margin: 10 }}
                    />
                    <TextField
                      key={i}
                      id={i}
                      required={true}
                      defaultValue={this.props.invoiceNumber}
                      label={'Invoice number'}
                      onChange={this.handleTextFieldChange}
                      style={{ margin: 10 }}
                      name={'invoiceNumber'}
                      dbid={'invoiceNumber'}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <DatePicker
                      key={i}
                      style={{ margin: 10 }}
                      onChange={this.handleDateChange}
                      required={false}
                      label={'Invoice date'}
                      name={'invoiceDate'}
                      dbid={'invoiceDate'}
                      callbackValue={this.handleDateChange}
                    />
                    <TextField
                      key={i}
                      style={{ margin: 10 }}
                      onChange={this.handleTextFieldChange}
                      required={false}
                      defaultValue={this.props.totalInvoiceAmount}
                      name={'totalInvoiceAmount'}
                      dbid={'totalInvoiceAmount'}
                      label={'Display total invoice amount'}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FilePicker
                      extensions={['pdf', 'png', 'jpg', 'gif']}
                      onChange={this.handleFilePickerChange}
                      onError={(err) => alert('Failed to upload file...', err)}
                      style={{ margin: 10 }}
                      name={'invoiceFile'}
                      dbid={'invoiceFile'}
                    >
                      <button>Attach Invoice</button>
                    </FilePicker>
                    <DatePicker
                      key={i}
                      style={{ margin: 10 }}
                      onChange={this.handleTextFieldChange}
                      required={false}
                      label={'When attached'}
                      name={'whenAttachedDate'}
                      dbid={'whenAttachedDate'}
                      callbackValue={this.handleDateChange}
                    />
                    <DatePicker
                      key={i}
                      style={{ margin: 10 }}
                      onChange={this.handleDateChange}
                      required={false}
                      label={'Transferred to LexOffice Date'}
                      name={'transferredToLexOfficeDate'}
                      dbid={'transferredToLexOfficeDate'}
                      callbackValue={this.handleDateChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
}

// Props: entityType, defaulltEntityValue, invoiceNumber, totalInvoiceAmount

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, { getArticles })(MultiInvoice);

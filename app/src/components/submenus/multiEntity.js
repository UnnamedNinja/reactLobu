import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import DatePicker from '../Inputs/DatePicker';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import { FilePicker } from 'react-file-picker';
import { getCompanys } from '../../redux/modules/company';
import { getBanks } from '../../redux/modules/bank';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { AddInputField, EditInputField } from './submenuUtils';

class MultiEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      [`${this.props.entityName}Total`]: 0,
    };
  }

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    cDivs.push('Object');
    this.setState((prevState) => {
      return {
        customDiv: cDivs,
        [`${this.props.entityName}Total`]: prevState[`${this.props.entityName}Total`] + 1,
      };
    });
    this.props.callbackHandleChildStateChange(
      [`${this.props.entityName}Total`],
      this.state[`${this.props.entityName}Total`],
    );
  };

  deleteRow = (i) => {
    console.log(i);
    let array = this.state.customDiv;
    array.splice(i, 1);
    this.setState((prevState) => {
      return {
        customDiv: array,
        [`${this.props.entityName}Total`]: prevState[`${this.props.entityName}Total`] - 1,
      };
    });
    this.props.callbackHandleChildStateChange(
      [`${this.props.entityName}Total`],
      this.state[`${this.props.entityName}Total`],
    );
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log(value);
    console.log(evt.target.name);
    this.setState({
      [evt.target.name]: value,
    });
    this.props.callbackHandleChildStateChange(evt.target.name, value);
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value,
    });
    this.props.callbackHandleChildStateChange(name, value);
  };

  handleDateChange = (name, date) => {
    this.setState({
      [name]: date,
    });
    this.props.callbackHandleChildStateChange(name, date);
  };

  handleFilePickerChange = (name, fileObject) => {
    console.log(fileObject);
    // this.setState({
    //   [name]: value,
    // });
    this.props.callbackHandleChildStateChange(name, fileObject);
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
          {`Add Additional ${this.props.entityName}`}
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
                  {this.props.entityInputs.map((obj, index) => {
                    // overwrite fields for multiEntity to work properly
                    const multiO = {
                      ...obj,
                      label: obj.label + ' (' + (i + 1) + ')',
                      name: obj.label + ' (' + (i + 1) + ')',
                      dbid: obj.label + '(' + (i + 1) + ')',
                    };

                    console.log('creating a multiEntity field', multiO);

                    return this.props.isEdit ? (
                      <EditInputField
                        key={'M_EIF' + index}
                        obj={multiO}
                        parentState={this.props.parentState}
                        currentEntity={this.currentEntity}
                        callbackHandleCheckboxChange={this.props.handleCheckboxChange}
                        callbackHandleChildStateChange={this.props.handleChildStateChange}
                        callbackHandleDatabaseMultiChoiceChange={
                          this.props.handleDatabaseMultiChoiceChange
                        }
                        callbackHandleDateChange={this.props.handleDateChange}
                        callbackHandleFilePickerChange={this.props.handleFilePickerChange}
                        ccallbackHandleMultiChoiceChange={this.props.handleMultiChoiceChange}
                        callbackhandleTextFieldChange={this.props.handleTextFieldChange}
                        internType={this.props.parentState.type}
                        processorDelivery={this.props.parentState['Processor: Delivery']}
                        invoiceDeliveryMethod={this.props.parentState['Invoice Delivery Method']}
                        parentState={this.props.parentState}
                        getClients={this.props.getClients}
                        getContractors={this.props.getContractors}
                        getArticles={this.props.getArticles}
                        getHolidays={this.props.getHolidays}
                        getPersons={this.props.getPersons}
                        getOrders={this.props.getOrders}
                        getPartners={this.props.getPartners}
                      />
                    ) : (
                      <AddInputField
                        key={'M_AIF' + index}
                        obj={multiO}
                        currentEntity={this.currentEntity}
                        callbackHandleCheckboxChange={this.props.handleCheckboxChange}
                        callbackHandleChildStateChange={this.props.handleChildStateChange}
                        callbackHandleDatabaseMultiChoiceChange={
                          this.props.handleDatabaseMultiChoiceChange
                        }
                        callbackHandleDateChange={this.props.handleDateChange}
                        callbackHandleFilePickerChange={this.props.handleFilePickerChange}
                        callbackHandleMultiChoiceChange={this.props.handleMultiChoiceChange}
                        callbackhandleTextFieldChange={this.props.handleTextFieldChange}
                        internType={this.props.parentState.type}
                        processorDelivery={this.props.parentState['Processor: Delivery']}
                        invoiceDeliveryMethod={this.props.parentState['Invoice Delivery Method']}
                        parentState={this.props.parentState}
                        getClients={this.props.getClients}
                        getContractors={this.props.getContractors}
                        getArticles={this.props.getArticles}
                        getHolidays={this.props.getHolidays}
                        getPersons={this.props.getPersons}
                        getOrders={this.props.getOrders}
                        getPartners={this.props.getPartners}
                      />
                    );
                  })}
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
}

// Props: entityName, defaulltEntityValue, invoiceNumber, totalInvoiceAmount

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, { getCompanys, getBanks })(MultiEntity);

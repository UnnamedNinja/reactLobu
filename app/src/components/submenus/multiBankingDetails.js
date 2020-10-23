import React from 'react';
import DatePicker from '../Inputs/DatePicker';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import AssignmentNoticeMultiChoice from '../Inputs/AssignmentNoticeMultiChoice';

import DatabaseMultiMultiCheckboxChoice from '../Inputs/DatabaseMultiMultiCheckboxChoice';
import FileChooser from '../Inputs/FileChooser';
import CheckBox from '../Inputs/Checkbox';

import { getCompanys } from '../../redux/modules/company';
import { getClients } from '../../redux/modules/client';
import { getContractors } from '../../redux/modules/contractor';
import { getPersons } from '../../redux/modules/person';
import { getOrders } from '../../redux/modules/order';
import { getArticles } from '../../redux/modules/article';
import { getPartners } from '../../redux/modules/partner';
import { getBanks } from '../../redux/modules/bank';

import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class MultiBankingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      totalBankingDetails: 1,
    };
  }

  componentDidMount = () => {
    this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
    if (this.props.totalBankingDetails !== undefined) {
      let newCdiv = this.state.customDiv;
      for (let i = 1; i < this.props.totalBankingDetails; i++) {
        newCdiv.push(1);
      }
      this.setState({ totalBankingDetails: this.props.totalBankingDetails, customDiv: newCdiv });
      this.props.callbackValue(this.state.totalBankingDetails);
    }
  };

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    const updatedTotalBanking = this.state.totalBankingDetails + 1;
    cDivs.push('Object');
    this.setState({ customDiv: cDivs, totalBankingDetails: updatedTotalBanking });
    this.props.callbackValue('totalBankingDetails', updatedTotalBanking);
  };

  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    const updatedTotalBanking = this.state.totalBankingDetails - 1;
    array.splice(index, 1);
    this.setState({ customDiv: array, totalBankingDetails: updatedTotalBanking });
    this.props.callbackValue('totalBankingDetails', updatedTotalBanking);
  };

  handleChildStateChange = (name, value) => {
    this.props.callbackValue(name, value);
    this.setState({
      [name]: value,
    });
    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    // console.log('value:', evt.target.value);
    // console.log('name:', evt.target.name);
    // console.log('dbid:', evt.target.dbid);
    this.props.callbackValue(this.props.isEdit ? evt.target.dbid : evt.target.name, value);
    this.setState({
      [this.props.isEdit ? evt.target.dbid : evt.target.name]: value,
    });
    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.props.callbackValue(name, value);
    this.setState({
      [name]: value,
    });
    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
  };

  handleDateChange = (name, date) => {
    this.props.callbackValue(name, date);
    this.setState({
      [name]: date,
    });
    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
  };

  handleFilePickerChange = (name, fileObject) => {
    console.log('attach file:', fileObject);
    // this.setState({
    //   [name]: value,
    // });
    this.props.callbackValue(name, fileObject);
    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);
  };

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    // console.log(
    //   'UPDATING DB MUTLICHOICE',
    //   this.props.isEdit ? name : dataLabel,
    //   ':',
    //   value,
    //   ',',
    //   data,
    //   value,
    // );
    this.props.callbackValue(this.props.isEdit ? name : dataLabel, value);
    this.props.callbackValue(this.props.isEdit ? name + 'Id' : dataLabel + 'Id', data);

    // this.props.callbackValue('totalBankingDetails', this.state.totalBankingDetails);

    this.setState({
      [name]: value,
      [name + 'Id']: data,
      [dataLabel]: value,
      [dataLabel + 'Id']: data,
    });
  };

  render() {
    console.log('P:', this.state);
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
          {this.props.t('Add Additional ' + this.props.entityType)}
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
                    {this.props.t('Remove From Order')}
                  </Button>
                  <br />
                  <DatabaseMultiChoice
                    key={'company' + i}
                    label={this.props.t('Company') + ' (' + (i + 1) + ')'}
                    name={'Company (' + (i + 1) + ')'}
                    required={false}
                    dbid={'company(' + (i + 1) + ')'}
                    callbackValue={this.handleDatabaseMultiChoiceChange}
                    method={'getCompanysCompanyCodes'}
                    value={this.props['Company (' + (i + 1) + ')']}
                    isEdit={this.props.isEdit}
                    value={
                      this.props.isEdit
                        ? this.props['company(' + (i + 1) + ')']
                        : this.state['Company (' + (i + 1) + ')']
                    }
                    defaultValue={this.props['company(' + (i + 1) + ')']}
                  />
                  <AssignmentNoticeMultiChoice
                    key={'assignmentNotice' + i}
                    label={this.props.t('Assignment Notice') + ' (' + (i + 1) + ')'}
                    name={'Assignment Notice (' + (i + 1) + ')'}
                    required={false}
                    dbid={'assignmentNotice(' + (i + 1) + ')'}
                    callbackValue={this.handleDatabaseMultiChoiceChange}
                    method={'getCompanysFullNames'}
                    value={
                      this.props.isEdit
                        ? this.props['assignmentNotice(' + (i + 1) + ')']
                        : this.state['Assignment Notice (' + (i + 1) + ')']
                    }
                    isEdit={this.props.isEdit}
                    defaultValue={this.props['assignmentNotice(' + (i + 1) + ')']}
                  />
                  <DatabaseMultiChoice
                    key={'companyBank' + i}
                    label={this.props.t('Company Bank') + ' (' + (i + 1) + ')'}
                    name={'Company Bank (' + (i + 1) + ')'}
                    required={false}
                    dbid={'companyBank(' + (i + 1) + ')'}
                    method={'getCompanysFullNames'}
                    callbackValue={this.handleDatabaseMultiChoiceChange}
                    value={
                      this.props.isEdit
                        ? this.props['companyBank(' + (i + 1) + ')']
                        : this.state['Company Bank (' + (i + 1) + ')']
                    }
                    isEdit={this.props.isEdit}
                    defaultValue={this.props['companyBank(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'debitorNumber' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('Debitor Number') + ' (' + (i + 1) + ')'}
                    name={'Debitor Number (' + (i + 1) + ')'}
                    required={false}
                    dbid={'debitorNumber(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'debitorNumber(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['debitorNumber(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'creditorNumber' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('Creditor Number') + ' (' + (i + 1) + ')'}
                    name={'Creditor Number (' + (i + 1) + ')'}
                    required={false}
                    dbid={'creditorNumber(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'creditorNumber(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['creditorNumber(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'clientNumberAtContractor' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('Client number at contractor') + ' (' + (i + 1) + ')'}
                    name={'Client number at contractor (' + (i + 1) + ')'}
                    required={false}
                    dbid={'clientNumberAtContractor(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'clientNumberAtContractor(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['clientNumberAtContractor(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'iban' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('IBAN') + ' (' + (i + 1) + ')'}
                    name={'IBAN (' + (i + 1) + ')'}
                    required={false}
                    dbid={'iban(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'iban(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['iban(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'bic' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('BIC') + ' (' + (i + 1) + ')'}
                    name={'BIC (' + (i + 1) + ')'}
                    required={false}
                    dbid={'bic(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'bic(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['bic(' + (i + 1) + ')']}
                  />
                  <TextField
                    key={'bank' + i}
                    style={{ margin: 10 }}
                    label={this.props.t('Bank') + ' (' + (i + 1) + ')'}
                    name={'Bank (' + (i + 1) + ')'}
                    required={false}
                    dbid={'bank(' + (i + 1) + ')'}
                    onChange={(e) => {
                      e.target.dbid = 'bank(' + (i + 1) + ')';
                      this.handleTextFieldChange(e);
                    }}
                    defaultValue={this.props['bank(' + (i + 1) + ')']}
                  />
                  {this.props.isEdit ? (
                    <DatePicker
                      key={'lastBilled' + i}
                      label={this.props.t('Last Billed') + ' (' + (i + 1) + ')'}
                      name={'Last Billed (' + (i + 1) + ')'}
                      required={false}
                      dbid={'lastBilled(' + (i + 1) + ')'}
                      callbackValue={this.handleDateChange}
                      isEdit={this.props.isEdit}
                      defaultValue={this.props['lastBilled(' + (i + 1) + ')']}
                    />
                  ) : null}
                  <FileChooser
                    key={'contractFile' + i}
                    label={this.props.t('Contract file') + ' (' + (i + 1) + ')'}
                    name={'Contract file (' + (i + 1) + ')'}
                    required={false}
                    dbid={'contractFile(' + (i + 1) + ')'}
                    callbackValueOnSuccess={this.handleFilePickerChange}
                    isEdit={this.props.isEdit}
                    defaultValue={this.props['contractFile(' + (i + 1) + ')']}
                  />
                  <DatePicker
                    key={'contractStartDate' + i}
                    label={this.props.t('Contract Start Date') + ' (' + (i + 1) + ')'}
                    name={'Contract Start Date (' + (i + 1) + ')'}
                    required={false}
                    dbid={'contractStartDate(' + (i + 1) + ')'}
                    callbackValue={this.handleDateChange}
                    isEdit={this.props.isEdit}
                    defaultValue={this.props['contractStartDate(' + (i + 1) + ')']}
                  />
                  <DatePicker
                    key={'contractEndDate' + i}
                    label={this.props.t('Contract End Date') + ' (' + (i + 1) + ')'}
                    name={'Contract End Date (' + (i + 1) + ')'}
                    required={false}
                    dbid={'contractEndDate(' + (i + 1) + ')'}
                    callbackValue={this.handleDateChange}
                    isEdit={this.props.isEdit}
                    defaultValue={this.props['contractEndDate(' + (i + 1) + ')']}
                  />
                  <CheckBox
                    key={'contractOK' + i}
                    label={this.props.t('Contract OK') + ' (' + (i + 1) + ')'}
                    name={'Contract OK (' + (i + 1) + ')'}
                    required={false}
                    dbid={'contractOK(' + (i + 1) + ')'}
                    callbackValue={this.handleChildStateChange}
                    isEdit={this.props.isEdit}
                    checked={this.props['contractOK(' + (i + 1) + ')']}
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

// Props: entityType, defaulltEntityValue, invoiceNumber, totalInvoiceAmount

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getContractors,
  getPersons,
  getOrders,
  getArticles,
  getPartners,
  getCompanys,
  getClients,
  getBanks,
})(withTranslation('common')(MultiBankingDetails));

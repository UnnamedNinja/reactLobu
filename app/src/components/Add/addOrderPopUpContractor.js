import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import MultiMultiChoice from '../Inputs/MultiMultichoice';
import CheckBox from '../Inputs/Checkbox';
import CheckboxPrefillTextField from '../Inputs/CheckboxTextFieldFiller';
import DatePicker from '../Inputs/DatePicker';
import MultiArticle from '../submenus/multiArticle';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import LocationPicker from '../Inputs/LocationPicker';
import DateRangePicker from '../Inputs/DateRangePicker';
import DateRangePicker2 from '../Inputs/DateRangePicker2';
import FileChooser from '../Inputs/FileChooser';
import MultiWeightSlip from '../submenus/multiWeightSlip';
import MultiInvoice from '../submenus/multiInvoice';
import InvoiceDeliveryMethod from '../Inputs/InvoiceDeliveryMethodInput';
import { AddInputField } from '../submenus/submenuUtils';
import MultiBankingDetails from '../submenus/multiBankingDetails';
import FuelPriceTable from '../data-tables/fuel-table';
import SelectEditDeleteTable from '../data-tables/edit-table';
import SpecialOrderMultiArticle from '../submenus/specialOrderMultiArticle.js';
import { withTranslation } from 'react-i18next';
// import Textarea from '../Inputs/Textarea';
import AddForm from './addForm';
import { TextareaAutosize } from '@material-ui/core';
import { FilePicker } from 'react-file-picker';
import {
  TOP_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  CLIENT_NAVIGATION_ROUTES,
  ORDER_TABLE_COLUMNS,
  CLIENT_ADD_MENU_TABS,
  CONTACT_PERSON_TABLE_COLUMNS,
} from '../../constants/ui-constants';
import ClientInputFieldData from '../../Schemas/AddClient.json';
import ContractorInputFieldData from '../../Schemas/AddContractor.json';
import ArticleInputFieldData from '../../Schemas/AddArticle.json';
import PersonInputFieldData from '../../Schemas/AddPerson.json';
import OrderUnderClientInputFieldData from '../../Schemas/SubSchemas/AddOrderUnderClient.json';
import ClientSpecialOrderInputFieldData from '../../Schemas/AddClientSpecialOrder.json';
import ContractorSpecialOrderInputFieldData from '../../Schemas/AddContractorSpecialOrder.json';
import CommentInputFieldData from '../../Schemas/AddComment.json';

import PartnerInputFieldData from '../../Schemas/AddPartner.json';
import BankInputFieldData from '../../Schemas/AddBank.json';
import GroupInputFieldData from '../../Schemas/AddGroup.json';
import HolidayInputFieldData from '../../Schemas/AddHoliday.json';
import CompanyInputFieldData from '../../Schemas/AddCompany.json';
import WeightSlipFieldData from '../../Schemas/AddWeightSlip.json';
import ClaimFieldData from '../../Schemas/AddClaim.json';
import TourInputFieldData from '../../Schemas/AddTour.json';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { addClient, getClients, ADD_CLIENT } from '../../redux/modules/client';
import { addContractor, getContractors } from '../../redux/modules/contractor';
import { addPartner, getPartners, ADD_PARTNER } from '../../redux/modules/partner';
import { addInvoice } from '../../redux/modules/invoice';
import { addPersonComponent } from '../../redux/modules/personComponent';
import { addCompany, getCompanys } from '../../redux/modules/company';

import { addArticle, getArticles, ADD_ARTICLE } from '../../redux/modules/article';
import { addHoliday, getHolidays, ADD_HOLIDAY } from '../../redux/modules/holiday';
import { addPerson, getPersons, ADD_PERSON } from '../../redux/modules/person';
import { addOrder, getOrders, ADD_ORDER } from '../../redux/modules/order';
import {
  addClientSpecialOrder,
  getClientSpecialOrders,
} from '../../redux/modules/clientSpecialOrder';
import {
  addContractorSpecialOrder,
  getContractorSpecialOrders,
} from '../../redux/modules/contractorSpecialOrder';

import { addBank } from '../../redux/modules/bank';
import { addGroup } from '../../redux/modules/group';

import { addTour, getTours } from '../../redux/modules/tour';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { BsFileEarmarkText } from 'react-icons/bs';
import { AiOutlineSend, AiFillEye } from 'react-icons/ai';
import SelectOrderTabs from '../select-order-tabs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
let currentContractor;
const form = reduxForm({
  form: 'add',
});

class AddSpecialOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: [],
      tileData: [],
      tile0: [],
      tile1: [],
      tile2: [],
      tile3: [],
      tile4: [],
      tile5: [],
      header0: '',
      header1: '',
      header2: '',
      header3: '',
    };
  }

  componentDidMount = () => {
    this.currentContractor = this.props.currentContractor;
    this.getSchema();
  };

  getSchema = async () => {
    //Client Route
    await this.setTiles(OrderUnderClientInputFieldData);
    if (this.props.currentContractor) {
      this.setState({ Contractor: this.props.currentContractor });
    }
  };

  setTiles = (data) => {
    console.log('HERE FOR CLIENT INPUT FIELD DATA!');
    console.log(data);
    let headers = Object.keys(data);
    headers.map((header, index) => {
      let stuffer = 'header' + index;
      this.setState({ [stuffer]: header });
    });
    console.log(headers);
    const tiles = Object.values(data).map((tile, index) => {
      let tileValues = Object.values(tile).map((question, index) => {
        // return (
        //   <AddInputField
        //     key={'AIF' + index}
        //     obj={question}
        //     currentEntity={this.currentEntity}
        //     callbackHandleCheckboxChange={this.handleCheckboxChange}
        //     callbackHandleChildStateChange={this.handleChildStateChange}
        //     callbackHandleDatabaseMultiChoiceChange={this.handleDatabaseMultiChoiceChange}
        //     callbackHandleDateChange={this.handleDateChange}
        //     callbackHandleFilePickerChange={this.handleFilePickerChange}
        //     ccallbackHandleMultiChoiceChange={this.handleMultiChoiceChange}
        //     callbackhandleTextFieldChange={this.handleTextFieldChange}
        //     internType={this.state.type}
        //     processorDelivery={this.state['Processor: Delivery']}
        //     invoiceDeliveryMethod={this.state['Invoice Delivery Method']}
        //     parentState={this.state}
        //     getClients={this.props.getClients}
        //     getContractors={this.props.getContractors}
        //     getArticles={this.props.getArticles}
        //     getHolidays={this.props.getHolidays}
        //     getPersons={this.props.getPersons}
        //     getOrders={this.props.getOrders}
        //     getPartners={this.props.getPartners}
        //   />
        // );
        return this.createInputField(question);
      });
      console.log('INDEX');
      let stuff = 'tile' + index;
      // console.log(stuff);
      {
        /**
         Adds the fields to the correct tile.
       */
      }
      this.setState({ [stuff]: tileValues });
    });
    console.log('BRHHH');
    //console.log(tiles);

    this.setState({ tileData: tiles });
    console.log(this.state.tileData);
  };

  createInputField = (obj) => {
    if (obj.default) {
      this.setState({ [obj.label]: obj.default });
    }

    if (obj.type === 'Comment') {
      return (
        <Paper style={{ width: '98%', marginRight: 10 }}>
          <TextField
            key={obj.label}
            variant="outlined"
            required={obj.required}
            label={this.props.t(obj.label)}
            name={obj.label}
            onChange={this.handleTextFieldChange}
            multiline
            rows={10}
            rowsMax={20}
            fullWidth
          />
        </Paper>
      );
    } else if (obj.type === 'TextArea') {
      return (
        <div style={{ margin: 10 }}>
          <TextField
            key={obj.label}
            style={{ width: '100%' }}
            onChange={this.handleTextFieldChange}
            name={obj.label}
            required={obj.required}
            label={this.props.t(obj.label)}
            multiline={true}
            rows={5}
          />
        </div>
      );
    } else if (obj.type === 'AlternateInvoiceRecipientInput') {
      return (
        <div style={{ margin: 10 }}>
          <AlternateInvoiceRecipientInput
            key={obj.label}
            style={{ width: '100%' }}
            name={obj.label}
            required={obj.required}
            label={this.props.t(obj.label)}
            textValue={
              this.state['Alternate Invoice Recipient'] == undefined
                ? this.props.t('Select an Alternate')
                : this.state['Alternate Invoice Recipient']
            }
            multiline={true}
            getCompanys={this.props.getCompanys}
            callbackValue={this.handleChildStateChangeAIR}
            rows={5}
          />
        </div>
      );
    } else if (obj.type === 'MultiPerson') {
      return (
        <div style={{ margin: 10 }}>
          <MultiPerson callbackValue={this.handleChildStateChange} />
        </div>
      );
    } else if (obj.type === 'TextInput') {
      return (
        <div style={{ margin: 10, display: 'inline' }}>
          {obj.required && !this.state[obj.label] ? (
            <TextField
              key={obj.label}
              style={{ marginTop: 10 }}
              error
              onChange={this.handleTextFieldChange}
              name={obj.label}
              required={obj.required}
              label={this.props.t(obj.label)}
              placeholder={obj.placeholder}
            />
          ) : (
            <TextField
              key={obj.label}
              style={{ marginTop: 10 }}
              onChange={this.handleTextFieldChange}
              name={obj.label}
              required={obj.required}
              label={this.props.t(obj.label)}
              placeholder={obj.placeholder}
            />
          )}
          {obj.label === 'VAT Ex. 19%' ? <br /> : null}
        </div>
      );
    } else if (obj.type === 'IbanTextInput') {
      return (
        <IbanTextInput
          handleTextFieldChange={this.handleTextFieldChange}
          IBAN={this.state['IBAN']}
          obj={obj}
          callbackValue={this.handleChildStateChange}
        />
      );
    } else if (obj.type === 'MultiChoice') {
      return (
        <MultiChoice
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          default={obj.default}
        />
      );
    } else if (obj.type === 'MultiPhoneNumber') {
      return (
        <MultiPhoneNumber
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          default={obj.default}
        />
      );
    } else if (obj.type === 'PaymentStopMultiChoice') {
      return (
        <PaymentStopMultiChoice
          key={obj.label}
          id={obj.id}
          default={obj.default}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
        />
      );
    } else if (obj.type === 'MultiMultiChoice') {
      return (
        <MultiMultiChoice
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          intern={this.state.type}
        />
      );
    } else if (obj.type === 'DeliveryDateRangeMultiChoice') {
      return (
        <DateRangePicker
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueRange={this.handleChildStateChange}
          callbackDateChange={this.handleDateChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          sourceCollection={this.state['Source: Collection']}
        />
      );
    } else if (obj.type === 'DeliveryDateRangeMultiChoice2') {
      return (
        <DateRangePicker2
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueRange={this.handleChildStateChange}
          callbackDateChange={this.handleDateChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          processorDelivery={this.state['Processor: Delivery']}
        />
      );
    } else if (obj.type === 'InvoiceDeliveryMethod') {
      return (
        <InvoiceDeliveryMethod
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          emailLabel={obj.emailLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          emailName={obj.emailName}
          emailDbid={obj.emailDbid}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          invoiceDeliveryMethod={
            this.state['Invoice Delivery Method'] || this.state.invoiceDeliveryMethod
          }
        />
      );
    } else if (obj.type === 'PaymentCycleMultiChoice') {
      return (
        <PaymentCycleInput
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          daysLabel={obj.daysLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          daysDbid={obj.daysDbid}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          paymentCycle={this.state['Payment Cycle'] || this.state.paymentCycle}
        />
      );
    } else if (obj.type === 'TerminationTimeMultiChoice') {
      return (
        <TerminationTimeInput
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          daysLabel={obj.daysLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          daysDbid={obj.daysDbid}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          paymentCycle={this.state['Termination Time'] || this.state.terminationTime}
        />
      );
    } else if (obj.type === 'PersonTypeInput') {
      return (
        <PersonTypeInput
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          checkboxLabel={obj.checkboxLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          checkboxDbid={obj.checkboxDbid}
          callbackValueCheckbox={this.handleCheckboxChange}
          checked={this.state[obj.checkboxDbid]}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          personType={this.state['Type']}
          name={obj.label}
        />
      );
    } else if (obj.type === 'CheckBox') {
      return (
        <CheckBox
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          callbackValue={this.handleCheckboxChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
        />
      );
    } else if (obj.type === 'DatePicker') {
      if (obj.label != 'Last billed') {
        return (
          <DatePicker
            key={obj.label}
            id={obj.id}
            callbackValue={this.handleDateChange}
            required={obj.required}
            label={this.props.t(obj.label)}
            name={obj.label}
            dbid={obj.dbid}
            value={this.state[obj.dbid]}
          />
        );
      } else {
        return null;
      }
    } else if (obj.type === 'LocationPicker') {
      return (
        <LocationPicker
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
        />
      );
    } else if (obj.type === 'DatabaseMultiChoice') {
      return (
        <DatabaseMultiChoice
          key={obj.label}
          id={obj.id}
          name={obj.label}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          required={obj.required}
          method={obj.method}
          getClients={this.props.getClients()}
          getContractos={this.props.getContractors()}
          getPersons={this.props.getPersons()}
          getOrders={this.props.getOrders()}
          getArticles={this.props.getArticles()}
          getPartners={this.props.getPartners()}
          getCompanys={this.props.getCompanys()}
          label={this.props.t(obj.label)}
          callbackValue={this.handleDatabaseMultiChoiceChange}
          callbackValueId={this.handleChildStateChange}
        />
      );
    } else if (obj.type === 'FileChooser') {
      return (
        <FileChooser
          key={obj.label}
          id={obj.label}
          dbid={obj.dbid}
          callbackValue={this.handleFilePickerChange}
          callbackValueOnSuccess={this.handleFilePickerChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
        />
      );
    } else if (obj.type === 'Multi') {
      if (obj.multiType === 'BankingDetails') {
        return (
          <MultiBankingDetails
            key={obj.multiType}
            callbackValue={this.handleChildStateChange}
            entityType={obj.entityType}
          />
        );
      } else if (obj.multiType === 'AccountManagerDetails') {
        return (
          <MultiAccountManagerDetails
            key={obj.multiType}
            callbackValue={this.handleChildStateChange}
            entityType={obj.entityType}
            defaultValues={{
              accountManagerNames: this.state.accountManagerNames,
              accountManagerNumbers: this.state.accountManagerNumbers,
            }}
          />
        );
      } else {
        return null;
      }
    } else if (obj.type === 'CheckboxPrefillTextField') {
      return (
        <CheckboxPrefillTextField
          callbackValue={this.handleChildStateChange}
          callbackValueText={this.handleChildStateChange}
          checkboxLabel={this.props.t(obj.checkboxLabel)}
          checkboxName={obj.checkboxLabel}
          checkboxDbid={obj.checkboxDbid}
          checkboxDefaultValue={false}
          textFieldName={obj.textFieldLabel}
          textFieldLabel={this.props.t(obj.textFieldLabel)}
          textFieldDbid={obj.textFieldDbid}
          textFieldDefaultValue={this.state[obj.label]}
          required={obj.required}
          preFill={obj.preFill}
          name={obj.label}
          type={obj.validationType}
        />
      );
    } else if (obj.type === 'PriceHistory') {
      return (
        <PriceHistory
          key={obj.label}
          id={obj.label}
          callbackValue={this.handleChildStateChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
        />
      );
    } else {
      return null;
    }
  };

  handleMultiChoiceChange = async (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(name);
    console.log(value);

    await this.setState({
      [name]: value,
    });
    this.getSchema();
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log(evt.target.name + ':', value);
    console.log(evt.target.value);
    console.log(evt.target);

    this.setState({
      [evt.target.name]: value,
    });
  };

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE');
    console.log(name, value, data, dataLabel);

    this.setState({
      [name]: value,
      [dataLabel]: data,
    });
  };

  handleCheckboxChange = (name, value) => {
    console.log('UPDATING Checkbox');
    console.log(name);
    console.log(value);

    this.setState({
      [name]: value,
    });
  };

  handleDateChange = (name, date) => {
    console.log('changing date to ', date, 'for ', name);

    this.setState({
      [name]: date,
    });
  };

  handleChildStateChange = (name, value) => {
    console.log(`saving state{ ${name}: ${value} }`);

    this.setState({
      [name]: value,
    });
  };

  handleFilePickerChange = (name, fObj) => {
    // convert fObj to bson
    // prepare BSON for mongo
    // save mongo link?
    console.log('fobj', fObj);
    this.setState({
      [name]: 'a file...',
    });
  };

  handleAdd = () => {
    this.props.addOrder(this.state);
  };

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Dialog
         fullWidth={true}
         maxWidth={'xl'}
          open={this.props.open}
          onClose={() => {
            this.props.handleClose();
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.t('Add New Regular Order') +
              ' ' +
              this.props.t('For this') +
              ' ' +
              this.props.t('Contractor')}
          </DialogTitle>
          <DialogContent>
          <AddForm
            currentSubTab={0}
            currentTab={TOP_NAVIGATION_ROUTES[4]}
            parentCallback={this.props.parentCallback}
            parentCallbackAction={this.props.parentCallbackAction}
          />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.handleClose();
              }}
              color="primary"
            >
              {this.props.t('Cancel')}
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  addHoliday,
  addClient,
  addContractor,
  addArticle,
  addPerson,
  addOrder,
  addClientSpecialOrder,
  addContractorSpecialOrder,
  addPartner,
  addBank,
  addGroup,
  addCompany,
  addTour,
  addPersonComponent,
  addInvoice,
  getClients,
  getCompanys,
  getContractors,
  getArticles,
  getHolidays,
  getPersons,
  getOrders,
  getPartners,
  getTours,
})(form(withTranslation('common')(AddSpecialOrderForm)));

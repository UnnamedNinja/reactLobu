import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import MultiMultiChoice from '../Inputs/MultiMultichoice';
import MultiPhoneNumber from '../Inputs/multiPhoneNumber';
import IbanTextInput from '../Inputs/ibanTextInput';
import AlternateInvoiceRecipientInput from '../Inputs/AlternateInvoiceRecipientInput';
import MultiAccountManagerDetails from '../submenus/multiAccountManagerDetails';
import PaymentStopMultiChoice from '../Inputs/paymentStopMultiChoice';
import PersonTypeInput from '../Inputs/PersonTypeInput.js';
import AssignmentNoticeMultiChoice from '../Inputs/AssignmentNoticeMultiChoice';
import CheckBox from '../Inputs/Checkbox';
import CheckboxPrefillTextField from '../Inputs/CheckboxTextFieldFiller';
import DatePicker from '../Inputs/DatePicker';
import MultiArticle from '../submenus/multiArticle';
import MultiPerson from '../submenus/MultiPerson';

import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import LocationPicker from '../Inputs/LocationPicker';
import DateRangePicker from '../Inputs/DateRangePicker';
import DateRangePicker2 from '../Inputs/DateRangePicker2';
import FileChooser from '../Inputs/FileChooser';
import MultiWeightSlip from '../submenus/multiWeightSlip';
import MultiInvoice from '../submenus/multiInvoice';
import InvoiceDeliveryMethod from '../Inputs/InvoiceDeliveryMethodInput';
import PaymentCycleInput from '../Inputs/PaymentCycleInput';
import TerminationTimeInput from '../Inputs/TerminationTimeInput';

import { AddInputField } from '../submenus/submenuUtils';
import MultiBankingDetails from '../submenus/multiBankingDetails';
import SelectEditDeleteTable from '../data-tables/edit-table';
import FuelPriceTable from '../data-tables/fuel-table';
import PriceCorridorTable from '../data-tables/price-corridor-table';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

// import Textarea from '../Inputs/Textarea';
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
  ORDER_MENU_TABS,
} from '../../constants/ui-constants';
import ClientInputFieldData from '../../Schemas/AddClient.json';
import ContractorInputFieldData from '../../Schemas/AddContractor.json';
import ArticleInputFieldData from '../../Schemas/AddArticle.json';
import PersonInputFieldData from '../../Schemas/AddPerson.json';
import OrderInputFieldData from '../../Schemas/AddOrder.json';
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

import { addClient, getClients,getClient, ADD_CLIENT } from '../../redux/modules/client';
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
import PriceHistory from '../Inputs/PriceHistory';
import ContractorHistory from '../Inputs/ContractorHistory';

import Alert from '@material-ui/lab/Alert';
import { withTranslation } from 'react-i18next';

const form = reduxForm({
  form: 'add',
});

class AddForm extends React.Component {
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

  componentDidMount() {
    this.getSchema();
  }

  getSchema = async () => {
    //Client Route
    // console.log('subtab', this.props.currentSubTab);
    if (this.props.currentTab === TOP_NAVIGATION_ROUTES[0]) {
      if (this.props.currentSubTab == 0) {
        this.setTiles(ClientInputFieldData);
      } else if (this.props.currentSubTab == 1) {
        this.setTiles(OrderInputFieldData);
      } else if (this.props.currentSubTab == 2) {
        this.setTiles(ClientSpecialOrderInputFieldData);
      } else if (this.props.currentSubTab == 3) {
        this.setTiles(PersonInputFieldData);
      } else if (this.props.currentSubTab == 4) {
        // fuel price table
      } else if (this.props.currentSubTab == 5) {
        this.setTiles(CommentInputFieldData);
      }
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[1]) {
      if (this.props.currentSubTab == 0) {
        this.setTiles(ContractorInputFieldData);
      } else if (this.props.currentSubTab == 1) {
        this.setTiles(OrderInputFieldData);
      } else if (this.props.currentSubTab == 2) {
        // Fuel price table
      } else if (this.props.currentSubTab == 3) {
        this.setTiles(ContractorSpecialOrderInputFieldData);
      } else if (this.props.currentSubTab == 4) {
        this.setTiles(PersonInputFieldData);
      } else if (this.props.currentSubTab == 5) {
        this.setTiles(CommentInputFieldData);
      }
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[2]) {
      this.setTiles(ArticleInputFieldData);
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[3]) {
      this.setTiles(PersonInputFieldData);
    } else if (
      this.props.currentTab === TOP_NAVIGATION_ROUTES[4] &&
      this.props.currentSubTab == 0
    ) {
      let orders = await this.props.getOrders();
      console.log("ORDER UP");
      console.log(orders);
      console.log(orders.allOrders.length);
      let orderNumber = orders.allOrders.length;
      await this.setState({ orders: orders.allOrders, OrderNumber: orderNumber++ });
      this.setTiles(OrderInputFieldData);
    } else if (
      this.props.currentTab === TOP_NAVIGATION_ROUTES[4] &&
      this.props.currentSubTab == 3
    ) {
      this.setTiles(CommentInputFieldData);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 0
    ) {
      this.setTiles(BankInputFieldData);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 1
    ) {
      this.setTiles(GroupInputFieldData);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 2
    ) {
      this.setTiles(GroupInputFieldData);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 3
    ) {
      this.setTiles(HolidayInputFieldData);
      // this.setTiles(ArticleInputFieldData);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 4
    ) {
      this.setTiles(ArticleInputFieldData);
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[1]) {
      this.setTiles(CompanyInputFieldData);
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[4]) {
      this.setTiles(TourInputFieldData);
    }
  };
  setTiles = (data) => {
    let headers = Object.keys(data);
    headers.map((header, index) => {
      let stuffer = 'header' + index;
      this.setState({ [stuffer]: header });
    });
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
        //     callbackHandleMultiChoiceChange={this.handleMultiChoiceChange}
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
      let stuff = 'tile' + index;
      {
        /**
         Adds the fields to the correct tile.
       */
      }
      this.setState({ [stuff]: tileValues });
    });

    this.setState({ tileData: tiles });
  };

  /*
  ValidationTypes
  string
  email
  mobilephone
  number
  zipcode
  website
  logo
  iban
  bic
  */
  createInputField = (obj) => {

    console.log("showing onjects here", obj)
    if (obj.default) {
      this.setState({ [obj.label]: obj.default });
    }

    if (obj.type === 'Comment') {
      return (
        <Paper style={{ width: '98%', marginRight: 10, marginTop: 20 }}>
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
              style={{ marginTop: 10}}
              error
              onChange={this.handleTextFieldChange}
              name={obj.label}
              required={obj.required}
              label={this.props.t(obj.label)}
              InputProps={{
                readOnly: obj.readOnly,
              }}
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
                InputProps={{
                  readOnly: obj.readOnly,
                }}
                defaultValue={obj.placeholder}

              />
            )}
          {obj.label === 'VAT Ex. 19%' ? <br /> : null}
        </div>
      );
    } else if (obj.type === 'OrderNumberTextInput') {
      return (
        <div style={{ margin: 10, display: 'inline' }}>
          <TextField
            key={obj.label}
            style={{ marginTop: 10 }}
            onChange={this.handleTextFieldChange}
            name={obj.label}
            value={this.state.OrderNumber}
            required={obj.required}
            label={this.props.t(obj.label)}
            placeholder={obj.placeholder}
            InputProps={{
              readOnly: obj.readOnly,
            }}
          />

          {obj.label === 'VAT Ex. 19%' ? <br /> : null}
        </div>
      );
    }
    else if (obj.type === 'IbanTextInput') {
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
      if (!obj.label.match('Last Billed')) {
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
            disabled={true}


          />
        );
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
          defaultPrice={this.state[`${obj.dbid}default`]? this.state[`${obj.dbid}default`] : "Add Prices for Date Ranges"}
          dbid={obj.dbid}
        />


      );
    }
    else if (obj.type === 'ContractorHistory') {
      return (
        <ContractorHistory
          key={obj.label}
          id={obj.label}

          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          callbackValue={this.handleDatabaseMultiChoiceChange}
          callbackValueId={this.handleChildStateChange}

        />
      );
    }else if (obj.type == 'AssignmentNotice') {
      return (
        <AssignmentNoticeMultiChoice
          key={obj.dbid}
          label={this.props.t(obj.label)}
          name={obj.label}
          required={obj.type}
          dbid={obj.dbid}
          callbackValue={this.handleDatabaseMultiChoiceChange}
          method={'getCompanysFullNames'}
          defaultValue={this.state[obj.dbid]}
        />
      );
    } else {
      return null;
    }
  };

  handleMultiChoiceChange = async (name, value) => {
    console.log('UPDATING MUTLICHOICE', name, value);
    await this.setState({
      [name]: value,
    });
    this.getSchema();
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log(evt.target.name + ':', value);

    this.setState({
      [evt.target.name]: value,
    });
    this.getSchema();
  };

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE:', "showing name ", name, "showing value", value, "showing data", data, "showing label", dataLabel);
    this.setState({
      [name]: value,
      [name + 'Id']: data,
      [dataLabel]: value,
      [dataLabel + 'Id']: data,
    });
  };

  handleCheckboxChange = (name, value) => {
    console.log('UPDATING Checkbox', name, value);
    this.setState({
      [name]: value,
    });
  };

  handleDateChange = (name, date) => {
    console.log("saving:'" + name + "':", date);
    this.setState({
      [name]: date,
    });
  };

  handleChildStateChange = (name, value) => {
    console.log(`saving state{ ${name}:`, value, '}');
    this.setState({
      [name]: value,
    });
  };

  handleChildStateChangeAIR = async (name, value) => {
    console.log(`saving state{ ${name}: ${value.Name1} }`);
    await this.setState({
      [name]: value.Name1,
    });
    await this.setState({
      alternateInvoiceRecipientId: value._id,
    });

    await this.getSchema();
  };

  handleFilePickerChange = (name, fObj) => {
    // convert fObj to bson
    // prepare BSON for mongo
    // save mongo link?
    // console.log('fobj', fObj);
    this.setState({
      [name]: 'a file...',
    });
  };

  handleAdd = async () => {
    if (this.props.currentTab === TOP_NAVIGATION_ROUTES[0]) {
      if (this.props.currentSubTab == 0) {
        console.log('your boi', this.state);
        let clientFormData = this.state;
        clientFormData['Account Manager Names'] = [];
        clientFormData['Account Manager Phone Numbers'] = [];
        console.log('ACM total:', this.state.totalAccountManagerDetails);
        for (let i = 0; i < this.state.totalAccountManagerDetails; i++) {
          clientFormData['Account Manager Names'].push(
            this.state['Account Manager Name (' + (i + 1) + ')'],
          );
          clientFormData['Account Manager Phone Numbers'].push(
            this.state['Account Manager Phone Number (' + (i + 1) + ')'],
          );
        }
        console.log('ACMState:', clientFormData);
        this.props.addClient(clientFormData);
      } else if (this.props.currentSubTab == 1) {
        // store order(s) selected on client (save for once orders is complete)
      } else if (this.props.currentSubTab == 2) {
        this.props.addClientSpecialOrder(this.state);
        // store db ref ids on client
      } else if (this.props.currentSubTab == 3) {
        // add contact person or dont
        // store db ref ids of contact person(s) selected on client
      } else if (this.props.currentSubTab == 4) {
        // store fuel price table values on client
      } else if (this.props.currentSubTab == 5) {
        // store comment on client
      }
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[1]) {
      if (this.props.currentSubTab == 0) {
        let bankingDetails = [];
        console.log('bankingDetails::', this.state);
        for (let i = 0; i < this.state.totalBankingDetails; i++) {
          //  alert(this.state[`Assignment Notice (${i+1})`])
          console.log("BINGO");
          console.log(this.state['Assignment Notice (' + (i + 1) + ')']);
          alert(this.state['Assignment Notice (' + (i + 1) + ')'])
          //  alert(this.state['Debitor Number(' + (i + 1) + ')'])
          const bankingDetail = {
            company: this.state['Company (' + (i + 1) + ')'],
            companyId: this.state['Company (' + (i + 1) + ')Id'],
            assignmentNotice: this.state['Assignment Notice (' + (i + 1) + ')'],
            assignmentNoticeId: this.state['Assignment Notice (' + (i + 1) + ')Id'],
            companyBank: this.state['Company Bank (' + (i + 1) + ')'],
            companyBankId: this.state['Company Bank (' + (i + 1) + ')Id'],
            debitorNumber: this.state[`Debitor Number (${i + 1})`],
            creditorNumber: this.state['Creditor Number (' + (i + 1) + ')'],
            clientNumberAtContractor: this.state['Client number at contractor (' + (i + 1) + ')'],
            iban: this.state['IBAN (' + (i + 1) + ')'],
            bic: this.state['BIC (' + (i + 1) + ')'],
            bank: this.state['Bank (' + (i + 1) + ')'],
            lastBilled: this.state['Last Billed (' + (i + 1) + ')'], // no value on add
            contractFile: this.state['Contract File (' + (i + 1) + ')'],
            contractStartDate: this.state['Contract Start Date (' + (i + 1) + ')'],
            contractEndDate: this.state['Contract End Date (' + (i + 1) + ')'],
            contractOK: this.state[`Contract OK (${i + 1})`],
          };
          bankingDetails.push(bankingDetail);
        }

        console.log('your boi', bankingDetails, this.state);

        const bankingAppendedToState = {
          ...this.state,
          'Banking Details': bankingDetails,
        };

        this.props.addContractor(bankingAppendedToState);
      } else if (this.props.currentSubTab == 1) {
        // store order on contractor (save for once orders is complete)
      } else if (this.props.currentSubTab == 2) {
        // store fuel price table values on contractor
      } else if (this.props.currentSubTab == 3) {
        // add special order
        // store db ref ids on contractor
      } else if (this.props.currentSubTab == 4) {
        // add contact person or dont
        // store db ref ids of contact person(s) on contractor
      } else if (this.props.currentSubTab == 5) {
        // store comment on contractor
      }
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[2]) {
      this.props.addArticle(this.state);
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[3]) {
      await this.props.addPerson(this.state);
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[4]) {
      let personComponentIds = [];

      // store components of an order onto the database
      // and store their db reference ids for the order later
      if (this.state.totalPersons > 0) {
        for (let i = 1; i <= this.state.totalPersons; i++) {
          // filter the state for this specific person component instance's properties
          const personComponent = {
            person: this.state[`Account Manager (${i})`],
            calculation: this.state[`Calculation (${i})`],
            value: this.state[`Value (${i})`],
          };
          console.log('personComponent', personComponent);
          let x;
          x = await this.props.addPersonComponent(personComponent);
          console.log('x:', x);
          console.log(personComponentIds);
          personComponentIds.push(x._id);
          // alert('wait');
        }
      }
      alert(this.state.ClientId)
      let client = await this.props.getClient(this.state.ClientId)
      console.log("CLIENT NUMBER!");
      console.log(client.ClientFound.clientNumber);

      await this.setState({ personComponentIds: personComponentIds, clientNumber: client.ClientFound.clientNumber });
      const orderResponse = this.props.addOrder(this.state);

      if (orderResponse.status) {
        console.log(orderResponse);
      }
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 0
    ) {
      this.props.addBank(this.state);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 1
    ) {
      this.props.addGroup(this.state);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 3
    ) {
      this.props.addHoliday(this.state);
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 4
    ) {
      this.props.addArticle(this.state);
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[1]) {
      this.props.addCompany(this.state);
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[4]) {
      this.props.addTour(this.state);
    } else {
      //alert(this.props.currentTab + ' : ' + this.props.currentSubTab);
    }
  };

  render() {
    // console.log('now at', this.props);
    if (this.props.currentTab === TOP_NAVIGATION_ROUTES[0]) {
      if (this.props.currentSubTab == 0) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header1)}
                    </Typography>
                    {this.state.tile1}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header2)}
                    </Typography>
                    {this.state.tile2}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header3)}
                    </Typography>
                    {this.state.tile3}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 1) {
        return (
          <SelectEditDeleteTable
            parentCallbackAction={this.props.parentCallbackAction}
            parentCallback={this.props.parentCallback}
            tableTitle={CLIENT_ADD_MENU_TABS[0]}
            columns={ORDER_TABLE_COLUMNS}
          />
        );
      } else if (this.props.currentSubTab == 2) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              ADD SPECIAL ORDER
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 3) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + CLIENT_ADD_MENU_TABS[3])}
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 4) {
        return (
          <FuelPriceTable
            fuelCorridor={[
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
            ]}
            columnData={[
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
            ]}
          />
        );
      } else if (this.props.currentSubTab == 5) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
              onClick={() => {
                console.log('your boi', this.state);
                alert("soon")
              }}
              >
                {this.props.t('Save') + ' ' + this.props.t(this.props.currentTab)}
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
                onClick={() => window.location.reload()}
              >
                {this.props.t('Cancel')}
              </Button>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      }
    } else if (
      this.props.currentTab === TOP_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 2
    ) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + this.props.currentTab)}
          </Button>
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[1]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header1)}
                  </Typography>
                  {this.state.tile1}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header2)}
                  </Typography>
                  {this.state.tile2}
                </Paper>
              </Grid>
              {['Bankruptcy'].includes(this.state['Payment Stop']) ? (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Paper style={{ padding: 12, height: '100%' }}>
                      <Typography variant="h4" style={{ paddingBottom: 30 }}>
                        {this.props.t(this.state.header3)}
                      </Typography>
                      {this.state.tile3}
                    </Paper>
                  </Grid>
                </React.Fragment>
              ) : (
                  <React.Fragment></React.Fragment>
                )}
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + this.props.currentTab)}
          </Button>
        </div>
      );
    }
    //ADD ORDERS TAB
    else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[4]) {
      console.log('subtab', this.props.currentSubTab);
      if (this.props.currentSubTab == 0) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>

                {['Night Fee', 'Day Fee', 'Saturday Fee'].includes(this.state['Order Type']) ? (
                  <Grid item xs={12}>
                    <Paper style={{ padding: 12, height: '100%' }}>
                      <SelectOrderTabs />
                    </Paper>
                  </Grid>
                ) : (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <Paper style={{ padding: 12, height: '100%' }}>
                          <Typography variant="h4" style={{ paddingBottom: 30 }}>
                            {this.props.t(this.state.header1)}
                          </Typography>
                          {this.state.tile1}
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper style={{ padding: 12, height: '100%' }}>
                          <Typography variant="h4" style={{ paddingBottom: 30 }}>
                            {this.props.t(this.state.header2)}
                          </Typography>
                          {this.state.tile2}
                        </Paper>
                      </Grid>
                    </React.Fragment>
                  )}
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 1) {
        return (
          <FuelPriceTable
            fuelCorridor={[
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
            ]}
            columnData={[
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
            ]}
          />
        );
      } else if (this.props.currentSubTab == 2) {
        return <PriceCorridorTable columnData={[[0, 0, 0, 0, 0]]} />;
      } else if (this.props.currentSubTab == 3) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </div>
        );
      } else {
        return <Alert>404 Error: Unexpected Route</Alert>;
      }
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.state.header0}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + SYSTEM_NAVIGATION_ROUTES[this.props.currentSubTab])}
          </Button>
        </div>
      );
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[4]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {console.log('point1: ', this.state.header0)}
                    {this.state.header0}
                  </Typography>
                  {console.log('point1: ', this.state.tile0)}
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + BOTTOM_NAVIGATION_ROUTES[4])}
          </Button>
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[3]) {
      console.log('statee for profiles is here', this.state);
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.state.header0}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + this.props.currentTab)}
          </Button>
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[2]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + this.props.currentTab)}
          </Button>
        </div>
      );
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[1]) {
      if (this.props.currentSubTab == 0) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header1)}
                    </Typography>
                    {this.state.tile1}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header2)}
                    </Typography>
                    {this.state.tile2}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 1) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header1)}
                    </Typography>
                    {this.state.tile1}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header2)}
                    </Typography>
                    {this.state.tile2}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      } else if (this.props.currentSubTab == 2) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header0)}
                    </Typography>
                    {this.state.tile0}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header1)}
                    </Typography>
                    {this.state.tile1}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: 12, height: '100%' }}>
                    <Typography variant="h4" style={{ paddingBottom: 30 }}>
                      {this.props.t(this.state.header2)}
                    </Typography>
                    {this.state.tile2}
                  </Paper>
                </Grid>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 20 }}
              onClick={() => this.handleAdd()}
            >
              {this.props.t('ADD ' + this.props.currentTab)}
            </Button>
          </div>
        );
      }
    } else {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header1)}
                  </Typography>
                  {this.state.tile1}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header2)}
                  </Typography>
                  {this.state.tile2}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: 20 }}
            onClick={() => this.handleAdd()}
          >
            {this.props.t('ADD ' + this.props.currentTab)}
          </Button>
        </div>
      );
    }
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
  getClient,
  getCompanys,
  getContractors,
  getArticles,
  getHolidays,
  getPersons,
  getOrders,
  getPartners,
  getTours,
})(form(withTranslation('common')(AddForm)));

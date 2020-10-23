import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import LocationPicker from '../Inputs/LocationPicker';
import AssignmentNoticeMultiChoice from '../Inputs/AssignmentNoticeMultiChoice';
import MultiArticle from '../submenus/multiArticle';
import PreviewAnnexDocument from '../modals/previewAnnexDocument.js';
import PreviewPurchaseConfirmation from '../modals/previewPurchaseConfirmation.js';
import PreviewSalesConfirmation from '../modals/previewSalesConfirmation.js';
import PreviewInvoice from '../modals/previewInvoice.js';
import PreviewTransportInformation from '../modals/previewTransportInformation.js';
import PreviewTransportOrder from '../modals/previewTransportationOrder.js';
import CheckboxPrefillTextField from '../Inputs/CheckboxTextFieldFiller';
import AlternateInvoiceRecipientInput from '../Inputs/AlternateInvoiceRecipientInput';
import InvoiceDeliveryMethod from '../Inputs/InvoiceDeliveryMethodInput';
import PriceHistory from '../Inputs/PriceHistory';
import PaymentStopMultiChoice from '../Inputs/paymentStopMultiChoice';
import MultiBankingDetails from '../submenus/multiBankingDetails';
import PaymentCycleInput from '../Inputs/PaymentCycleInput';
import MultiPhoneNumber from '../Inputs/multiPhoneNumber';
import IbanTextInput from '../Inputs/ibanTextInput';
import TerminationTimeInput from '../Inputs/TerminationTimeInput';
import MultiAccountManagerDetails from '../submenus/multiAccountManagerDetails';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ContractorHistory from '../Inputs/ContractorHistory';

import CheckBox from '../Inputs/Checkbox';
import DatePicker from '../Inputs/DatePicker';
import {
  TOP_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  ORDER_MENU_TABS,
} from '../../constants/ui-constants';
import ClientInputFieldData from '../../Schemas/AddClient.json';
import ContractorInputFieldData from '../../Schemas/AddContractor.json';
import ArticleInputFieldData from '../../Schemas/AddArticle.json';
import PersonInputFieldData from '../../Schemas/AddPerson.json';
import OrderInputFieldData from '../../Schemas/AddOrder.json';
import PartnerInputFieldData from '../../Schemas/AddPartner.json';
import BankInputFieldData from '../../Schemas/AddBank.json';
import GroupInputFieldData from '../../Schemas/AddGroup.json';
import HolidayInputFieldData from '../../Schemas/AddHoliday.json';
import CommentInputFieldData from '../../Schemas/AddComment.json';
import TourInputFieldData from '../../Schemas/AddTour.json';
import CompanyInputFieldData from '../../Schemas/AddCompany.json';
import PersonTypeInput from '../Inputs/PersonTypeInput.js';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import PdfSender from '../pdfToHtml/converter.js';
import AnnexDocument from '../pdfToHtml/annexDocument.js';
import FileChooser from '../Inputs/FileChooser';
import FuelPriceTable from '../data-tables/fuel-table';
import PriceCorridorTable from '../data-tables/price-corridor-table';
import { Document, Page, pdfjs } from 'react-pdf';

import Icon from '@material-ui/core/Icon';
import { getClient, editClient, getClients } from '../../redux/modules/client';
import { getContractor, editContractor, getContractors } from '../../redux/modules/contractor';
import { getArticle, editArticle, getArticles } from '../../redux/modules/article';
import { getHoliday, editHoliday } from '../../redux/modules/holiday';
import { getPerson, editPerson, getPersons, getAccountManagers } from '../../redux/modules/person';
import { getOrder, editOrder, getOrders } from '../../redux/modules/order';
import { getPartner, editPartner, getPartners } from '../../redux/modules/partner';
import { getBank, editBank, getBanks } from '../../redux/modules/bank';
import { getGroup, editGroup, getGroups } from '../../redux/modules/group';
import { getCompanys, getCompany, editCompany } from '../../redux/modules/company';
import {
  getPersonComponent,
  editPersonComponent,
  getPersonComponents,
} from '../../redux/modules/personComponent';
import { getInvoice } from '../../redux/modules/invoice';
import { withTranslation } from 'react-i18next';
import { getTour, editTour, getTours } from '../../redux/modules/tour';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

/**
 GOOGLE MAP FOR TOUR SECTION
 */
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
//----------------

let currentEntity;
let currentEntity2;
let currentEntity3;

const form = reduxForm({
  form: 'add',
});

class EditForm extends React.Component {
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
      map: null,
    };
  }

  /**
   GOOGLE MAP FOR TOUR SECTION
   */
  onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    this.setState({ map });
  };

  onUnmount = (map) => {
    this.setState({ map: null });
  };

  async componentDidMount() {
    if (this.props.currentSubTab == 0 && this.props.currentTab == TOP_NAVIGATION_ROUTES[0]) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let client = await this.props.getClient(this.props.currentRowData._id);
      console.log('Client!!!!!');
      console.log(client);
      this.currentEntity = client.ClientFound;
      await this.setState({
        invoiceEmail: client.ClientFound['invoiceEmail'],
        accountManagerNames: client.ClientFound.accountManagerNames,
        accountManagerNumbers: client.ClientFound.accountManagerNumbers,
      });

      await this.getSchema(ClientInputFieldData);
    } else if (this.props.currentSubTab == 0 && this.props.currentTab == TOP_NAVIGATION_ROUTES[1]) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let contractor = await this.props.getContractor(this.props.currentRowData._id);
      console.log('Contractor!');
      console.log(contractor);
      this.currentEntity = contractor.ContractorFound;
      this.getSchema(ContractorInputFieldData);
    } else if (
      this.props.currentSubTab == 0 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[1]
    ) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let company = await this.props.getCompany(this.props.currentRowData._id);
      console.log('Contractor!');
      console.log(company);
      this.currentEntity = company.CompanyFound;
      this.getSchema(CompanyInputFieldData);
    } else if (this.props.currentSubTab == 0 && this.props.currentTab == TOP_NAVIGATION_ROUTES[2]) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let article = await this.props.getArticle(this.props.currentRowData._id);
      console.log('Aricle!');
      console.log(article);
      this.currentEntity = article.ArticleFound;
      this.getSchema(ArticleInputFieldData);
    } else if (this.props.currentSubTab == 0 && this.props.currentTab == TOP_NAVIGATION_ROUTES[3]) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let person = await this.props.getPerson(this.props.currentRowData._id);
      console.log('PERSON!');
      console.log(person);
      this.currentEntity = person.PersonFound;
      await this.setState({
        isAccountManager: person.PersonFound.isAccountManager,
        commission: person.PersonFound.commission,
        calculation: person.PersonFound.calculation
      });
      this.getSchema(PersonInputFieldData);
    } else if (this.props.currentSubTab == 0 && this.props.currentTab == TOP_NAVIGATION_ROUTES[4]) {
      let order = await this.props.getOrder(this.props.currentRowData._id);
      // let clientData = await this.props.getPerson(order.OrderFound.client);
      // let companyData = await this.props.getCompanys();

      // let contractorData = await this.props.getContractor(order.OrderFound.contractor);

      console.log('MONGODB GOT ORDER!!');
      //alert("hiya")
      this.currentEntity = order.OrderFound;
      this.determinePriceHistoryDefault("clientPriceWeek");
      this.determinePriceHistoryDefault("clientPriceWeekend");
      this.determinePriceHistoryDefault("contractorPriceWeek");
      this.determinePriceHistoryDefault("contractorPriceWeekend");
      this.determineContractorHistoryDefault("contractor");

      this.getSchema(OrderInputFieldData);




    } else if (this.props.currentSubTab == 1 && this.props.currentTab == TOP_NAVIGATION_ROUTES[4]) {
      let order = await this.props.getOrder(this.props.currentRowData._id);
      // let clientData = await this.props.getPerson(order.OrderFound.client);
      // let companyData = await this.props.getCompanys();

      // let contractorData = await this.props.getContractor(order.OrderFound.contractor);

      console.log('MONGODB GOT ORDER!!');

      this.currentEntity = order.OrderFound;

      this.setState({
        companyData: companyData.allCompanys[0],
      });
    } else if (this.props.currentSubTab == 2 && this.props.currentTab == TOP_NAVIGATION_ROUTES[4]) {
      let order = await this.props.getOrder(this.props.currentRowData._id);
      // let clientData = await this.props.getPerson(order.OrderFound.client);
      // let companyData = await this.props.getCompanys();

      // let contractorData = await this.props.getContractor(order.OrderFound.contractor);

      console.log('MONGODB GOT ORDER!!');

      this.currentEntity = order.OrderFound;

      this.setState({
        companyData: companyData.allCompanys[0],
      });
    } else if (this.props.currentSubTab == 3 && this.props.currentTab == TOP_NAVIGATION_ROUTES[4]) {
      let order = await this.props.getOrder(this.props.currentRowData._id);
      // let clientData = await this.props.getPerson(order.OrderFound.client);
      // let companyData = await this.props.getCompanys();

      // let contractorData = await this.props.getContractor(order.OrderFound.contractor);

      console.log('MONGODB GOT ORDER!!');

      this.currentEntity = order.OrderFound;
      this.getSchema(CommentInputFieldData);
      this.setState({
        companyData: companyData.allCompanys[0],
      });
    } else if (
      this.props.currentSubTab == 0 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]
    ) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      console.log(BankInputFieldData)
      // bank.companyCode =company.CompanyFound.companyCode
      let bank = await this.props.getBank(this.props.currentRowData._id);

      let company = await this.props.getCompany(bank.BankFound.companyId);
      console.log(company)
      bank.BankFound.company = company.CompanyFound.companyCode
      this.currentEntity = bank.BankFound;
      this.getSchema(BankInputFieldData);
    } else if (
      this.props.currentSubTab == 1 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]
    ) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let group = await this.props.getGroup(this.props.currentRowData._id);
      console.log('Group!');
      console.log(group);
      this.currentEntity = group.GroupFound;
      this.getSchema(GroupInputFieldData);
    } else if (
      this.props.currentSubTab == 2 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]
    ) {
    } else if (
      this.props.currentSubTab == 3 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]
    ) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let holiday = await this.props.getHoliday(this.props.currentRowData._id);
      console.log('Holiday!');
      console.log(holiday);
      this.currentEntity = holiday.HolidayFound;
      this.getSchema(HolidayInputFieldData);
      // console.log('ROW');
      // console.log(this.props.currentRowData);
      // let article = await this.props.getArticle(this.props.currentRowData._id);
      // console.log('Article!');
      // console.log(article);
      // this.currentEntity = article.ArticleFound;
      // this.getSchema(ArticleInputFieldData);
    } else if (
      this.props.currentSubTab == 4 &&
      this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]
    ) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let article = await this.props.getArticle(this.props.currentRowData._id);
      console.log('Article!');
      console.log(article);
      this.currentEntity = article.ArticleFound;
      this.getSchema(ArticleInputFieldData);
    } else if (this.props.currentTab == BOTTOM_NAVIGATION_ROUTES[4]) {
      console.log('ROW');
      console.log(this.props.currentRowData);
      let tour = await this.props.getTour(this.props.currentRowData._id);
      console.log('Tour!');
      console.log(tour);
      this.currentEntity = tour.TourFound;
      this.getSchema(TourInputFieldData);
    }
  }

  determinePriceHistoryDefault =(dbid)=>{
    let today = new Date(Date.now());
    let index;
    let defaultPrice;
    //alert(this.currentEntity[dbid])
    console.log("dafs");
    console.log(this.currentEntity[dbid]);
    this.currentEntity[dbid].map(async(priceHistoryDatum ,i)=>{
      var dateFrom = priceHistoryDatum.validFrom;
      var dateTo = priceHistoryDatum.validTo;
      var dateCheck = new Date(Date.now());
      console.log("BOTHERZ");
      console.log(Date.parse(dateFrom));
      console.log(Date.parse(dateCheck));
      console.log(Date.parse(dateTo));
      console.log(Date.parse(dateCheck) > Date.parse(dateFrom) && Date.parse(dateCheck) < Date.parse(dateTo));
      if (Date.parse(dateCheck) > Date.parse(dateFrom) && Date.parse(dateCheck) < Date.parse(dateTo)) {
        //alert("AYAY"+" "+ priceHistoryDatum.price);
        await this.setState({[dbid+"default"]:priceHistoryDatum.price });
        console.log("DK");
        console.log(this.state);
      }
    })
  }
  determineContractorHistoryDefault =async (dbid)=>{
    let today = new Date(Date.now());
    let index;
    let defaultPrice;
    //alert(this.currentEntity[dbid])
    console.log("mask off");
    console.log(typeof this.currentEntity[dbid]);
    console.log(this.currentEntity[dbid]);

    if (this.currentEntity[dbid]!=undefined) {
      let arr = JSON.parse(this.currentEntity[dbid]);
      console.log(typeof arr);
      console.log(arr);
      arr.map(async(priceHistoryDatum ,i)=>{
        var dateFrom = priceHistoryDatum.validFrom;
        var dateTo = priceHistoryDatum.validTo;
        var dateCheck = new Date(Date.now());
        console.log("BOTHERZ");
        console.log(Date.parse(dateFrom));
        console.log(Date.parse(dateCheck));
        console.log(Date.parse(dateTo));
        console.log(Date.parse(dateCheck) > Date.parse(dateFrom) && Date.parse(dateCheck) < Date.parse(dateTo));
        if (Date.parse(dateCheck) > Date.parse(dateFrom) && Date.parse(dateCheck) < Date.parse(dateTo)) {
          //alert("AYAY"+" "+ priceHistoryDatum.price);
          await this.setState({[dbid+"default"]:priceHistoryDatum.contractor });
          console.log("DK");
          console.log(this.state);
        }
      })
      await this.setState({ contractor: JSON.parse(this.currentEntity[dbid])})
    }

  }

  getSchema = (data) => {
    //Client Route
    this.setTiles(data);
  };

  setTiles = (data) => {
    console.log('HERE FOR INPUT FIELD DATA!');

    let headers = Object.keys(data);
    headers.map((header, index) => {
      let stuffer = 'header' + index;
      this.setState({ [stuffer]: header });
    });

    const tiles = Object.values(data).map((tile, index) => {
      let tileValues = Object.values(tile).map((question) => {
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
  };

  createInputField = (obj) => {
    console.log(this.currentEntity);
    console.log(obj.dbid);

    this.setState({ [obj.dbid]: this.currentEntity[obj.dbid] });

    console.log('BONGO', this.state[obj.dbid]);

    if (obj.default && this.state[obj.dbid] === undefined) {
      this.setState({ [obj.dbid]: obj.default });
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
            isEdit
            defaultValue={this.state[obj.dbid]}
          />
        </Paper>
      );
    } else if (obj.type == 'TextInput') {
      return (
        <TextField
          key={obj.dbid}
          style={{ margin: 10 }}
          defaultValue={this.state[obj.dbid]}
          onChange={(e) => {
            console.log('TRYING!!!');
            console.log(e.target.value);
            console.log(obj.dbid);
            console.log(this.state[obj.dbid]);
            const { value } = event.target;
            this.setState({ [obj.dbid]: value });
          }}
          InputProps={{
            readOnly: obj.readOnly,
          }}
          name={obj.label}
          required={obj.required}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          isEdit
        />
      );
    } else if (obj.type === 'OrderNumberTextInput') {
      return (
        <div style={{ margin: 10, display: 'inline' }}>
          <TextField
            key={obj.label}
            style={{ marginTop: 10 }}
            onChange={this.handleTextFieldChange}
            name={obj.label}
            value={this.state.orderNumber}
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
    } else if (obj.type == 'MultiChoice') {

      return (
        <MultiChoice
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          options={obj.options}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          name={obj.label}
          label={this.props.t(obj.label)}
          isEdit={true}
          default={obj.default}
        />
      );
    } else if (obj.type === 'IbanTextInput') {
      return (
        <IbanTextInput
          handleTextFieldChange={this.handleTextFieldChange}
          IBAN={this.state['iban']}
          obj={obj}
          callbackValue={this.handleChildStateChange}
          isEdit
        />
      );
    } else if (obj.type === 'MultiPhoneNumber') {
      return (
        <MultiPhoneNumber
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          name={obj.label}
          isEdit={true}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
        />
      );
    } else if (obj.type === 'PaymentStopMultiChoice') {
      return (
        <PaymentStopMultiChoice
          key={obj.label}
          id={obj.id}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          isEdit
          value={this.state[obj.dbid]}
        />
      );
    } else if (obj.type === 'LocationPicker') {
      console.log('BBQ');
      console.log(this.state);
      return (
        <LocationPicker
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          isEdit
        />
      );
    } else if (obj.type === 'InvoiceDeliveryMethod') {
      console.log('pool plug');
      console.log(this.state);
      console.log(this.state[obj.emailDbid]);
      console.log(obj.emailDbid);
      // alert(this.currentEntity.invoiceEmail);
      // alert(this.currentEntity);
      console.log('PP' + this.state['invoiceEmail']);
      return (
        <InvoiceDeliveryMethod
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          isEdit={true}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          emailLabel={obj.emailLabel}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          invoiceDeliveryMethod={this.state[obj.dbid]}
          invoiceEmail={this.state[obj.emailDbid]}
          emailDbid={obj.emailDbid}
          methodDbid={obj.emailDbid}
        />
      );
    } else if (obj.type === 'PaymentCycleMultiChoice') {
      console.log('JESUS WALKS');
      console.log(this.state);
      return (
        <PaymentCycleInput
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          isEdit={true}
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
          methodDbid={obj.daysDbid}
          paymentCycle={this.state['Payment Cycle'] || this.state.paymentCycle}
        />
      );
    } else if (obj.type === 'TerminationTimeMultiChoice') {
      console.log('terminate times');
      console.log(this.state);
      return (
        <TerminationTimeInput
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          isEdit={true}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          daysLabel={obj.daysLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          daysDbid={obj.daysDbid}
          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          name={obj.label}
          methodDbid={obj.daysDbid}
          paymentCycle={this.state['Termination Time'] || this.state.terminationTime}
        />
      );
    } else if (obj.type === 'PersonTypeInput') {
      console.log('RenderPersonTypeINPUT');
      console.log(this.state);
      return (
        <PersonTypeInput
          key={obj.label}
          key2={obj.emailLabel}
          id={obj.id}
          isEdit={true}
          callbackValue={this.handleMultiChoiceChange}
          callbackValueText={this.handleTextFieldChange}
          // emailLabel={obj.emailLabel}
          checkboxLabel={obj.checkboxLabel} //!! emailLabel field is missing in AddClient schema, so placeholder for email input was empty
          checkboxDbid={obj.checkboxDbid}
          callbackValueCheckbox={this.handleCheckboxChange}
          checked={this.state[obj.checkboxDbid]}
          commission={this.state['commission']}
          calculation={this.state['calculation']}

          required={obj.required}
          options={obj.options}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
          personType={this.state['Type'] || this.state.type}
        />
      );
    } else if (obj.type == 'CheckBox') {
      console.log('CHECKEDDDD ');
      console.log(this.state);
      return (
        <CheckBox
          checked={this.state[obj.dbid]}
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          required={obj.required}
          label={this.props.t(obj.label)}
          callbackValue={this.handleCheckboxChange}
        />
      );
    } else if (obj.type == 'DatePicker') {
      return (
        <DatePicker
          key={obj.label}
          id={obj.id}
          required={obj.required}
          label={this.props.t(obj.label)}
          defaultValue={Date.parse(this.state[obj.dbid])}
          value={Date.parse(this.state[obj.dbid])}
          callbackValue={this.handleDateChange}
          isEdit={true}
        />
      );
    } else if (obj.type === 'DatabaseMultiChoice') {
      console.log('MUTLIIII');
      console.log('poggers');
      console.log(this.state[obj.dbid]);
      console.log(obj.dbid);
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
          getPersons={this.props.getPersons()}
          getOrders={this.props.getOrders()}
          getPartners={this.props.getPartners()}
          getArticles={this.props.getArticles()}
          getContractors={this.props.getContractors()}
          getAccountManagers={this.props.getAccountManagers()}
          label={this.props.t(obj.label)}
          isEdit={true}
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
          required={obj.required}
          label={this.props.t(obj.label)}
          isEdit
        />
      );
    } else if (obj.type === 'CheckboxPrefillTextField') {
      console.log('BOZO BUCKETS');
      console.log(this.currentEntity);
      console.log(this.currentEntity[obj.checkboxDbid]);
      console.log(this.currentEntity[obj.textFieldDbid]);
      console.log(obj.checkboxDbid);
      console.log(this.state);

      console.log('end');
      return (
        <CheckboxPrefillTextField
          callbackValue={this.handleChildStateChange}
          callbackValueText={this.handleChildStateChange}
          checkboxLabel={this.props.t(obj.checkboxLabel)}
          checkboxName={obj.checkboxLabel}
          checkboxDbid={obj.checkboxDbid}
          checkboxDefaultValue={this.currentEntity[obj.checkboxDbid]}
          textFieldName={obj.textFieldLabel}
          textFieldLabel={this.props.t(obj.textFieldLabel)}
          textFieldDbid={obj.textFieldDbid}
          textFieldDefaultValue={this.currentEntity[obj.textFieldDbid]}
          required={obj.required}
          preFill={obj.preFill}
          name={obj.label}
          type={obj.validationType}
          isEdit
        />
      );
    } else if (obj.type === 'PriceHistory') {
      console.log('nohitter', this.state);
      console.log(this.state[`${obj.dbid}default`]);
      console.log("BOOO");


      return (
        <PriceHistory
          key={obj.label}
          id={obj.label}
          callbackValue={this.handleChildStateChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          data={this.state[obj.dbid]}
          defaultPrice={this.state[`${obj.dbid}default`]? this.state[`${obj.dbid}default`] : "No Valid Histories Set"}
          isEdit
        />
      );
    }else if (obj.type === 'ContractorHistory') {
      return (
        <ContractorHistory
          key={obj.label}
          id={obj.label}
          data={this.state[obj.dbid]}

          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          callbackValue={this.handleDatabaseMultiChoiceChange}
          callbackValueId={this.handleChildStateChange}
          defaultContractor={this.state[`${obj.dbid}default`]? this.state[`${obj.dbid}default`] : "No Valid Histories Set"}

          isEdit

        />
      );
    } else if (obj.type === 'AlternateInvoiceRecipientInput') {
      console.log('BOILS');
      console.log(this.state['Alternate Invoice Recipient']);
      console.log(this.state);
      return (
        <div style={{ margin: 10 }}>
          <AlternateInvoiceRecipientInput
            key={obj.label}
            style={{ width: '100%' }}
            name={obj.label}
            required={obj.required}
            label={this.props.t(obj.label)}
            dbid={obj.dbid}
            textValue={
              this.state['Alternate Invoice Recipient'] == undefined
                ? this.props.t('Select an Alternate')
                : this.state['Alternate Invoice Recipient']
            }
            multiline={true}
            getCompanys={this.props.getCompanys}
            callbackValue={this.handleChildStateChangeAIR}
            rows={5}
            isEdit
          />
        </div>
      );
    } else if (obj.type == 'AssignmentNotice') {
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
          isEdit
        />
      );
    } else if (obj.type === 'Multi') {
      if (obj.multiType === 'BankingDetails') {
        this.state[obj.dbid].forEach(async (obj, i) => {
          for (const [key, value] of Object.entries(obj)) {
            this.setState({ [key + '(' + (i + 1) + ')']: value });
          }
          console.log('STATEE', this.state);
        });
        return (
          <MultiBankingDetails
            key={obj.type}
            callbackValue={this.handleChildStateChange}
            entityType={obj.entityType}
            isEdit={true}
            {...this.state}
            totalBankingDetails={this.state[obj.dbid] ? this.state[obj.dbid].length : 1}
          />
        );
      } else if (obj.multiType === 'AccountManagerDetails') {
        console.log('AMN:', this.state['accountManagerNames'], this.state['accountManagerNumbers']);

        return (
          <MultiAccountManagerDetails
            key={obj.multiType}
            callbackValue={this.handleChildStateChange}
            entityType={obj.entityType}
            defaultValues={{
              accountManagerNames: this.state.accountManagerNames,
              accountManagerNumbers: this.state.accountManagerNumbers,
            }}
            isEdit
          />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  handleChildStateChange = (name, value) => {
    console.log('Parent: saving ' + name + ':' + value);
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

  handleCheckboxChange = (name, value) => {
    console.log('Checkbox: saving ' + name + ':' + value);
    this.setState({
      [name]: value,
    });
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log('saving ' + name + ':' + value);
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

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE');
    console.log('DBMulti: saving', name + ':' + value);
    console.log('DBMulti: saving', name + 'Id:' + data);
    console.log('DBMulti: saving', dataLabel + ':' + value);
    console.log('DBMulti: saving', dataLabel + 'Id:' + data);
    this.setState({
      [name]: value,
      [name + 'Id']: data,
      [dataLabel]: value,
      [dataLabel + 'Id']: data,
    });
  };

  handleTextFieldChange = async (evt, dbid) => {
    console.log('FKKK');
    console.log(this.state);
    console.log(dbid);
    console.log(this.state[dbid]);
    console.log(evt.target.value);
    await this.setState({
      [dbid]: evt.target.value,
    });
  };

  render() {
    if (this.props.currentTab === TOP_NAVIGATION_ROUTES[0]) {
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
                let clientFormData = this.state;
                clientFormData['accountManagerNames'] = [];
                clientFormData['accountManagerPhoneNumbers'] = [];
                for (let i = 0; i < this.state.totalAccountManagerDetails; i++) {
                  clientFormData['accountManagerNames'].push(
                    this.state['accountManagerName(' + (i + 1) + ')'],
                  );
                  clientFormData['accountManagerPhoneNumbers'].push(
                    this.state['accountManagerPhoneNumber(' + (i + 1) + ')'],
                  );
                }
                this.props.editClient(this.currentEntity._id, clientFormData);
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
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header3)}
                  </Typography>
                  {this.state.tile3}
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[1]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
              onClick={() => this.props.editCompany(this.currentEntity._id, this.state)}
            >
              {this.props.t('Save') + ' ' + this.props.currentTab}
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
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[4]) {
      if (this.props.currentSubTab == 0) {
        return (
          <div style={{ flexGrow: 1 }}>
            <form noValidate autoComplete="off">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
                onClick={async () => {
                  // store components of an order onto the database
                  // and store their db reference ids for the order later
                  let personComponentIds = [];
                  if (this.state.totalPersons > 0) {
                    for (let i = 1; i <= this.state.totalPersons; i++) {
                      // filter the state for this specific person component instance's propertiesl
                      const personComponent = {
                        person: this.state[`accountManager(${i})`],
                        calculation: this.state[`calculation(${i})`],
                        value: this.state[`value(${i})`],
                      };
                      console.log('personComponent', personComponent);
                      let x;
                      x = await this.props.editPersonComponent(personComponent);
                      console.log('x:', x);
                      console.log(personComponentIds);
                      personComponentIds.push(x._id);
                      // alert('wait');
                    }
                  }

                  this.props.editOrder(this.currentEntity._id, {
                    ...this.state,
                    contractor:JSON.stringify(this.state.contractor),
                    personComponentIds: personComponentIds,
                  });
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
                onClick={() => this.props.editOrder(this.currentEntity._id, this.state)}
              >
                {this.props.t('Save') +
                  ' ' +
                  this.props.t(ORDER_MENU_TABS[this.props.currentSubTab])}
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
                onClick={() => window.location.reload()}
              >
                {this.props.t('Cancel')}
              </Button>
              <Grid container spacing={12}>
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
        return <div>404 Error</div>;
      }
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[1]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
              onClick={() => {
                let bankingDetails = [];
                for (let i = 0; i < this.state.totalBankingDetails; i++) {
                  const bankingDetail = {
                    company: this.state['company(' + (i + 1) + ')'],
                    assignmentNotice: this.state['assignmentNotice(' + (i + 1) + ')'],
                    assignmentNoticeId: this.state['assignmentNotice(' + (i + 1) + ')Id'],
                    companyBank: this.state['companyBank(' + (i + 1) + ')'],
                    debitorNumber: this.state['debitorNumber(' + (i + 1) + ')'],
                    creditorNumber: this.state['creditorNumber(' + (i + 1) + ')'],
                    clientNumberAtContractor: this.state[
                      'clientNumberAtContractor(' + (i + 1) + ')'
                    ],
                    iban: this.state['iban(' + (i + 1) + ')'],
                    bic: this.state['bic(' + (i + 1) + ')'],
                    bank: this.state['bank(' + (i + 1) + ')'],
                    lastBilled: this.state['lastBilled(' + (i + 1) + ')'],
                    contractFile: this.state['contractFile(' + (i + 1) + ')'],
                    contractStartDate: this.state['contractStartDate(' + (i + 1) + ')'],
                    contractEndDate: this.state['contractEndDate(' + (i + 1) + ')'],
                    contractOK: this.state['contractOK(' + (i + 1) + ')'],
                  };
                  bankingDetails.push(bankingDetail);
                }

                const bankingAppendedToState = {
                  ...this.state,
                  bankingDetails: bankingDetails,
                };

                this.props.editContractor(this.currentEntity._id, bankingAppendedToState);
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
              {['Bankruptcy'].includes(this.state.paymentStop) ? (
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
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[2]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={() => this.props.editPerson(this.currentEntity._id, this.state)}
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
        </div>
      );
    } else if (this.props.currentTab === TOP_NAVIGATION_ROUTES[3]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={async () => {
              let response = await this.props.editPerson(this.currentEntity._id, this.state);
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
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 0
    ) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={async () => {
              let response = await this.props.editBank(this.currentEntity._id, this.state);
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
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {console.log("_____________________________-")}
                  {console.log(this.state.tile0)}
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 1
    ) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={() => this.props.editGroup(this.currentEntity._id, this.state)}
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
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 3
    ) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={() => this.props.editHoliday(this.currentEntity._id, this.state)}
          >
            {this.props.t('Save') +
              ' ' +
              this.props.t(SYSTEM_NAVIGATION_ROUTES[this.props.currentSubTab])}
          </Button>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
            onClick={() => window.location.reload()}
          >
            {this.props.t('Cancel')}
          </Button>
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
    } else if (
      this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[0] &&
      this.props.currentSubTab == 4
    ) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={() => this.props.editArticle(this.currentEntity._id, this.state)}
          >
            {this.props.t('Save') +
              ' ' +
              this.props.t(SYSTEM_NAVIGATION_ROUTES[this.props.currentSubTab])}{' '}
          </Button>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
            onClick={() => window.location.reload()}
          >
            {this.props.t('Cancel')}
          </Button>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                    {console.log('headers:', this.props.t(this.state.header0))}
                  </Typography>
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    } else if (this.props.currentTab === BOTTOM_NAVIGATION_ROUTES[4]) {
      return (
        <div style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
            onClick={() => this.props.editTour(this.currentEntity._id, this.state)}
          >
            {this.props.t('Save') + ' ' + this.props.t(BOTTOM_NAVIGATION_ROUTES[4])}
          </Button>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
            onClick={() => window.location.reload()}
          >
            {this.props.t('Cancel')}
          </Button>
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ padding: 12, height: '100%' }}>
                  <Typography variant="h4" style={{ paddingBottom: 30 }}>
                    {this.props.t(this.state.header0)}
                  </Typography>
                  {console.log('tile0: ', this.state.tile0)}
                  {this.state.tile0}
                </Paper>
              </Grid>
            </Grid>
          </form>
          <LoadScript googleMapsApiKey="AIzaSyD0sBC7QvQ-peioMlGlU1OIxN-czT49Z6s">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={this.onLoad}
              onUnmount={this.onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <React.Fragment></React.Fragment>
            </GoogleMap>
          </LoadScript>
        </div>
      );
    } else {
      return (
        <div style={{ flexGrow: 1 }}>
          <form noValidate autoComplete="off">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
              onClick={() => this.props.editClient(this.currentEntity._id, this.state)}
            >
              {this.props.t('Save') + ' ' + this.props.currentTab}
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
        </div>
      );
    }
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getCompanys,
  getCompany,
  editCompany,
  getClient,
  editClient,
  getClients,
  editHoliday,
  getHoliday,
  getContractor,
  editContractor,
  getContractors,
  editArticle,
  getArticle,
  getArticles,
  getPerson,
  editPerson,
  getPersons,
  getOrder,
  editOrder,
  getOrders,
  getPartner,
  editPartner,
  getPartners,
  getBank,
  editBank,
  getGroup,
  editGroup,
  getGroups,
  getPersonComponent,
  editPersonComponent,
  getInvoice,
  getTour,
  getTours,
  editTour,
  getAccountManagers,
})(form(withTranslation('common')(EditForm)));

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

import { editClient, getClient, getClients } from '../../redux/modules/client';
import { editContractor, getContractor, getContractors } from '../../redux/modules/contractor';
import { editPartner, getPartner, getPartners } from '../../redux/modules/partner';
import { editInvoice, getInvoice, getInvoices } from '../../redux/modules/invoice';
import {
  editPersonComponent,
  getPersonComponent,
  getPersonComponents,
} from '../../redux/modules/personComponent';
import { editCompany, getCompany, getCompanys } from '../../redux/modules/company';
import { editArticle, getArticle, getArticles } from '../../redux/modules/article';
import { editHoliday, getHoliday, getHolidays } from '../../redux/modules/holiday';
import { editPerson, getPerson, getPersons, getAccountManagers } from '../../redux/modules/person';
import { editOrder, getOrder, getOrders } from '../../redux/modules/order';
import {
  editClientSpecialOrder,
  getClientSpecialOrder,
  getClientSpecialOrders,
} from '../../redux/modules/clientSpecialOrder';
import {
  editContractorSpecialOrder,
  getContractorSpecialOrder,
  getContractorSpecialOrders,
} from '../../redux/modules/contractorSpecialOrder';
import { editBank, getBank, getBanks } from '../../redux/modules/bank';
import { editGroup, getGroup, getGroups } from '../../redux/modules/group';
import { editTour, getTour, getTours } from '../../redux/modules/tour';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { BsFileEarmarkText } from 'react-icons/bs';
import { AiOutlineSend, AiFillEye } from 'react-icons/ai';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import SelectOrderTabs from '../select-order-tabs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTranslation } from 'react-i18next';
let currentEntity;

const form = reduxForm({
  form: 'add',
});

class EditOrderForm extends React.Component {
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

  componentDidMount = async () => {
    await this.getData(this.props);
  };

  getData = async (props) => {
    let clientOrder = await props.getOrder(props.selectedOrder._id);
    this.currentEntity = clientOrder.OrderFound;
    this.getSchema();
  };

  getSchema = () => {
    //Client Route
    this.setTiles(OrderInputFieldData);
  };

  setTiles = (data) => {
    console.log('HERE FOR CLIENT INPUT FIELD DATA!');

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
    console.log('BONGO');
    console.log(this.state[obj.dbid]);

    if (obj.type == 'TextInput') {
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
          name={obj.label}
          required={obj.required}
          label={this.props.t(obj.label)}
          dbid={obj.dbid}
        />
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
        />
      );
    } else if (obj.type === 'LocationPicker') {
      return (
        <LocationPicker
          key={obj.label}
          id={obj.id}
          dbid={obj.dbid}
          value={this.state[obj.dbid]}
          callbackValue={this.handleMultiChoiceChange}
          required={obj.required}
          label={this.props.t(obj.label)}
          name={obj.label}
        />
      );
    } else if (obj.type === 'InvoiceDeliveryMethod') {
      console.log('pool plug');
      console.log(this.state);
      console.log(this.state[obj.emailDbid]);
      console.log(obj.emailDbid);
      console.log(this.state['invoiceEmail']);
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
          methodDbid={obj.emailDbid}
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
          name={obj.label}
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
          name={obj.label}
          defaultValue={Date.parse(this.state[obj.dbid])}
          callbackValue={this.handleDateChange}
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
          name={obj.label}
          isEdit={true}
          callbackValue={this.handleDatabaseMultiChoiceChange}
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
          name={obj.label}
          isEdit
        />
      );
    } else if (obj.type === 'CheckboxPrefillTextField') {
      return (
        <CheckboxPrefillTextField
          callbackValue={this.handleChildStateChange}
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
          type={obj.validationType}
        />
      );
    } else {
      return;
    }
  };

  handleChildStateChange = (name, value) => {
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
    console.log('UPDATING Checkbox');
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value,
    });
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
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

  handleTextFieldChange = (evt, dbid) => {
    console.log('FKKK');
    console.log(this.state);
    console.log(dbid);
    console.log(this.state[dbid]);
    console.log(evt.target.value);
    this.setState({
      dbid: evt.target.value,
    });
    evt.target.value = this.state[dbid];
  };

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.handleClose();
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.t('Edit') +
              ' ' +
              this.props.t('Order') +
              ' ' +
              this.props.t('For') +
              ' ' +
              this.props.t('Client')}
          </DialogTitle>
          <DialogContent>
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
                </Grid>{' '}
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
            <SpecialOrderMultiArticle callbackValue={this.handleChildStateChange} {...this.state} />
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
            <Button
              onClick={async () => {
                this.props.editOrder(this.currentEntity._id, this.state);
                await this.getData(this.props);
                this.props.handleClose();
              }}
              color="primary"
            >
              {this.props.t('Edit') +
                ' ' +
                this.props.t('Regular Order') +
                ' ' +
                this.props.t('For') +
                ' ' +
                this.props.t('Client')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  editHoliday,
  editClient,
  editContractor,
  editArticle,
  editPerson,
  editOrder,
  editClientSpecialOrder,
  editContractorSpecialOrder,
  editPartner,
  editBank,
  editGroup,
  editCompany,
  editTour,
  editPersonComponent,
  editInvoice,
  getHolidays,
  getClients,
  getContractors,
  getArticles,
  getPersons,
  getAccountManagers,
  getOrders,
  getClientSpecialOrders,
  getContractorSpecialOrders,
  getPartners,
  getBanks,
  getGroups,
  getCompanys,
  getTours,
  getPersonComponents,
  getInvoices,
  getHoliday,
  getClient,
  getContractor,
  getArticle,
  getPerson,
  getOrder,
  getClientSpecialOrder,
  getContractorSpecialOrder,
  getPartner,
  getBank,
  getGroup,
  getCompany,
  getTour,
  getPersonComponent,
  getInvoice,
})(form(withTranslation('common')(EditOrderForm)));

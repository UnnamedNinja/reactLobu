import React from 'react';
import MaterialTable from 'material-table';
import {
  getClients,
  getClient,
  GET_CLIENTS,
  DELETE_CLIENT,
  deleteClient,
} from '../../redux/modules/client';
import { getContractors, getContractor, deleteContractor } from '../../redux/modules/contractor';
import {
  getArticles,
  GET_ARTICLE,
  DELETE_ARTICLE,
  deleteArticle,
} from '../../redux/modules/article';
import {
  getHolidays,
  GET_HOLIDAY,
  DELETE_HOLIDAY,
  deleteHoliday,
} from '../../redux/modules/holiday';
import { getPersons, GET_PERSON, DELETE_PERSON, deletePerson } from '../../redux/modules/person';
import { getOrders, GET_ORDER, DELETE_ORDER, deleteOrder } from '../../redux/modules/order';
import {
  getClientSpecialOrders,
  deleteClientSpecialOrder,
} from '../../redux/modules/clientSpecialOrder';
import {
  getContractorSpecialOrders,
  deleteContractorSpecialOrder,
} from '../../redux/modules/contractorSpecialOrder';
import { getBanks, deleteBank } from '../../redux/modules/bank';
import { getGroups, deleteGroup } from '../../redux/modules/group';
import { getCompanys, deleteCompany, getCompany } from '../../redux/modules/company';

import { getPartners, deletePartner } from '../../redux/modules/partner';
import { getTours, deleteTour } from '../../redux/modules/tour';
import moment from 'moment'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  TOP_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  CLIENT_NAVIGATION_ROUTES,
  CONTACT_PERSON_TABLE_COLUMNS,
  CONTRACTOR_EDIT_MENU_TABS,
} from '../../constants/ui-constants';
import AddSpecialOrder from '../Add/addSpecialOrderPopUp';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withTranslation } from 'react-i18next';
import EditSpecialOrderPopUp from '../Edit/editSpecialOrderPopUp';
let columnReference;

const form = reduxForm({
  form: 'add',
});

{
  /**
   EDIT DELETE TABLE
   */
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// div had className={classes.paper}

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      data: [],
      tableTitle: this.props.tableTitle,
      open: false,
    };
  }

  async componentDidMount() {
    await this.getTableData();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getTableData = async (props) => {
    if (this.columnReference == this.props.columns) {
      return;
    }
    //Client
    else if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
      let response = await this.props.getClientSpecialOrders();

      console.log('DATA RETRIEVED FROM MONGODB FOR ALL SPECIAL ORDERS');
      console.log(response);
      let filteredOrders = response.allSpecialOrders.filter((order) => {
        return order.client === this.props.currentClient;
      });

      console.log('SpecialOrder with this client' + this.props.currentClient);
      console.log(filteredOrders);
      this.columnReference = this.props.columns;
      this.setState({ data: filteredOrders });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[0]) {
      let response = await this.props.getClients();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL CLIENTS');
      console.log(response.allClients);
      for (let i = 0; i < response.allClients.length; i++) {
        response.allClients[i]['accountManagerName'] =
          response.allClients[i].accountManagerNames[0];
      }
      this.columnReference = this.props.columns;
      response.allClients.map((clients)=>{
        clients.name = clients.Name1 + " " + clients.Name2
        if(clients.lastBilled.match('Not Billed Yet')){
          clients.lastBilled = this.props.t(clients.lastBilled)
        }
      })
      console.log("showing in all clients",response.allClients)
      this.setState({ data: response.allClients });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[1]) {
      let response = await this.props.getContractors();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL CONTRACTORS');
      console.log(response.allContractors);
      this.columnReference = this.props.columns;
      response.allContractors.map((contracts)=>{
        contracts.name = contracts.name1 + " " + contracts.name2
      })
      this.setState({ data: response.allContractors });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[2]) {
      let response = await this.props.getArticles();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL Articles');
      console.log(response.allArticles);
      this.columnReference = this.props.columns;
      response.allArticles.map((article)=>{
        article.name = article.description
      })
      this.setState({ data: response.allArticles });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[3]) {
      let response = await this.props.getPersons();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL PERSONS',response);
      console.log(response.allPersons);
      this.columnReference = this.props.columns;
      response.allPersons.map((person)=>{
        person.name = person.firstName + ' ' + person.surname
      })
      this.setState({ data: response.allPersons });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[4]) {
      let joinedOrders = [];
      let response = await this.props.getOrders();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL ORDERS');
      console.log(response.allOrders);
      console.log(this.props.columns);
      this.columnReference = this.props.columns;

      // get all data for an order that we need to show the user
      /**
     if (
        response.allOrders &&
        response.allOrders.length !== undefined &&
        response.allOrders.length > 0
      ) {
        await response.allOrders.forEach(async (order, i) => {
          // append order ref values on order for frontend filling
          const clientResponse = await this.props.getClient(
            order.clientId,
          );
          const client = clientResponse.ClientFound;

          const contractorResponse = await this.props.getContractor(
            order.contractorId,
          );
          const contractor = contractorResponse.ContractorFound;

          let combo = await { ...order, ...contractor, ...client };
          if (order.contractorPriceWeek[0]) {
            combo['contractorPrice'] =
              order.contractorPriceWeek[0].price; // not sure if this is the correct priceBasis
          }
          if (order.clientPriceWeek[0]) {
            combo['clientPrice'] = order.clientPriceWeek[0].price;
          } // not sure if this is the correct priceBasis
          combo['clientCity'] = client.city;

          response.allOrders[i] = await {
            ...response.allOrders[i],
            ...combo,
          };
          console.log('combo', combo);
        });
        **/

      console.log('eddited allOrders:', response.allOrders);
      response.allOrders.map((order)=>{
        order.dateOfExpiry = moment(order.dateOfExpiry ).format('DD.MM.YYYY')
        order.validFrom = moment(order.validFrom ).format('DD.MM.YYYY')
        order.name = order.orderName
      })
      await this.setState({ data: response.allOrders });
      console.log('state data', typeof this.state.data, this.state.data);
      console.log('responseAllOrders');
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[0]) {
      // console.log('Beer');
      let response = await this.props.getBanks();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL BANKS');
      console.log(response);
      this.columnReference = this.props.columns;
      response.allBanks.map(async (bank)=>{
        let company = await this.props.getCompany(bank.companyId);
      //  console.log("STANL");
      //  console.log(company);
        bank.name = bank.bankName
        bank.companyCode = company.CompanyFound.companyCode
      })
      this.setState({ data: response.allBanks });
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[1]) {
      //alert('HERE');
      let response = await this.props.getGroups();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL GROUPS');
      console.log(response);
      this.columnReference = this.props.columns;
      response.allGroups.map((group)=>{
        group.name = group.groupName
      })
      this.setState({ data: response.allGroups });
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[3]) {
      //alert('HERE');
      let response = await this.props.getHolidays();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL', SYSTEM_NAVIGATION_ROUTES[3]);
      console.log(response);
      this.columnReference = this.props.columns;
      response.allHolidays.map((holiday)=>{
        holiday.name = holiday.description
      })
      this.setState({ data: response.allHolidays });
    } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[1]) {
      //    alert('HERE');
      let response = await this.props.getCompanys();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL COMPANYS');
      console.log(response);
      this.columnReference = this.props.columns;
      response.allCompanys.map((company)=>{
        company.name = company.name1 + ' ' + company.name2
      })
      this.setState({ data: response.allCompanys });
    } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4]) {
      //    alert('HERE');
      let response = await this.props.getTours();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL TOURS');
      console.log(response);
      this.columnReference = this.props.columns;
      response.allTours.map((tour)=>{
        tour.name = tour.tourName
      })
      this.setState({ data: response.allTours });
    } else if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
      //    alert('HERE');
      let response = await this.props.getClientSpecialOrders();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL SpecialOrder');
      console.log(response);
      this.columnReference = this.props.columns;
      response.allSpecialOrders.map((specialOrder)=>{
        specialOrder.name = specialOrder.orderName
      })
      this.setState({ data: response.allSpecialOrders });
    } else {
      //  alert('HERE' + TOP_NAVIGATION_ROUTES[0] + ' ' + this.props.tableTitle);
    }
  };

  getColumns = (columns) => {
    let updatedColumns = [];
    for (let column of columns) {
      updatedColumns.push({ title: this.props.t(column.title), field: column.field });
    }

    return updatedColumns;
  };

  handleOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  render() {
    // const classes = useStyles();
    this.getTableData();
    console.log('currentcols from table');
    console.log(this.props.columns);
    // console.log(this.props.tableTitle);
    // console.log(this.state.selectedSpecialOrder);
    let data = this.state.data;
    if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[4]) {
      console.log('state data');
      console.log(this.state.data);

      // alert('bruh');
    }
    console.log('PAUL:', 'rows', this.props.t('rows'));
    return (
      <div>
        <AddSpecialOrder
          currentClient={this.props.currentClient}
          open={this.state.open}
          handleClose={() => this.handleClose()}
        />
        {this.state.selectedSpecialOrder !== undefined ? (
          <EditSpecialOrderPopUp
            open={this.state.openEdit}
            handleClose={() => this.handleCloseEdit()}
            selectedSpecialOrder={this.state.selectedSpecialOrder}
          />
        ) : null}
        <MaterialTable
          localization={{
            pagination: {
              labelDisplayedRows: `{from}-{to} ${this.props.t('of')} {count}`,
              labelRowsSelect:`${this.props.t('rows')}`
            },
            toolbar: {
              nRowsSelected: `{0} ${this.props.t('rows')} ${this.props.t('selected')}`,
              searchTooltip: this.props.t('Search'),
              searchPlaceholder: this.props.t('Search'),
            },
            header: {
              actions: this.props.t('Actions'),
            },
            body: {
              emptyDataSourceMessage: this.props.t('No records to display'),
              filterRow: {
                filterTooltip: this.props.t('Filter'),
              },
            },
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add',
              isFreeAction: true,
              hidden: this.props.addHidden || this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4],
              onClick: (event, rowData) => {
                if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
                  this.handleOpen();
                } else {
                  // alert(this.props.tableTitle);
                  this.props.parentCallbackAction('ADD');
                }
              },
            },
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: async (event, rowData) => {
                if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
                  console.log('rows', rowData);
                  await this.setState({ selectedSpecialOrder: rowData });
                  this.handleOpenEdit();
                } else {
                  this.props.parentCallbackAction('EDIT', rowData);
                }
              },
            },
            (rowData) => ({
              icon: 'delete',
              tooltip: 'Delete',
              onClick: async (event, rowData) => {
                console.log("showing row data ",rowData)
                let txt;
                let r = confirm('You want to delete ' + rowData.name + '?');
                if (r == true) {
                  if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[0]) {
                    await this.props.deleteClient(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[1]) {
                    await this.props.deleteContractor(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[2]) {
                    await this.props.deleteArticle(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[3]) {
                    await this.props.deletePerson(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[4]) {
                    await this.props.deleteOrder(rowData._id);
                    // delete personComponents...
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[0]) {
                    await this.props.deleteBank(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[1]) {
                    await this.props.deleteGroup(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[3]) {
                    await this.props.deleteHoliday(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[4]) {
                    await this.props.deleteArticle(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[1]) {
                    await this.props.deleteCompany(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4]) {
                    await this.props.deleteTour(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
                    await this.props.deleteClientSpecialOrder(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === CONTRACTOR_EDIT_MENU_TABS[3]) {
                    await this.props.deleteSpecialOrder(rowData._id);
                    window.location.reload();
                  }
                } else {
                  txt = 'You pressed Cancel!';
                }
              },
            }),
          ]}
          // title={this.props.t(this.props.tableTitle)}
          title = {null}
          columns={this.getColumns(this.props.columns)}
          data={data}
          options={{
            filtering: true,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getClients,
  getClient,
  deleteClient,
  getContractors,
  getContractor,
  deleteContractor,
  getArticles,
  deleteArticle,
  getHolidays,
  deleteHoliday,
  getPersons,
  deletePerson,
  deleteOrder,
  deleteClientSpecialOrder,
  getClientSpecialOrders,
  deleteContractorSpecialOrder,
  getContractorSpecialOrders,
  getOrders,
  getPartners,
  deletePartner,
  getBanks,
  deleteBank,
  getGroups,
  deleteGroup,
  getCompany,
  getCompanys,
  deleteCompany,
  getTours,
  deleteTour,
})(form(withTranslation('common')(EditTable)));

/*

// example this.state.DATA
[{Name1: "Tyler Gottlieb",
Name2: "Tyler Gottlieb",
accountManagerName: "Franky",
accountManagerNumber: 123123,
address: "1125 N 9th St, Kalamazoo, MI, USA",
alternateInvoiceRecipient: "Tyler Curve",
article: "fdgv",
bankingDetails: [],
bic: "324324",
billingCycle: "Monthly",
city: "Milwaukee",
client: "Tyler Gottlieb",
clientId: "5f5cf9a599ed4d4d9482b1db",
clientNumber: 9,
clientNumberAtClient: 234234,
clientPriceWeek: [],
clientPriceWeekend: [{}],
company: "5f29b52fb64ff97e4e77f8bf",
companyBank: "123123",
contractEndDate: "2020-09-22T05:00:00.000Z",
contractStartDate: "2020-10-02T05:00:00.000Z",
contractor: "Beast",
contractorDateOfExpiry: "2020-09-16T05:00:00.000Z",
contractorId: "5f09ca249859e425429e1d77",
contractorNumber: "02930923",
contractorPriceWeek: [{}],
contractorPriceWeekend: [],
contractorValidFrom: "2020-09-30T05:00:00.000Z",
costCenter: "234",
createdAt: "2020-09-12T16:39:01.766Z",
currency: "EUR",
dateOfExpiry: "2020-09-22T05:00:00.000Z",
debitorNumber: "123123123",
departureTimes: "23",
duration: "2",
email: "t@maiol.com",
fax: "123",
fuelType: "3",
group: "GROUPIEZ",
houseNumber: "213",
iban: "SE3550000000054910000003",
id: "5f5cf9a599ed4d4d9482b1db",
invoiceDeliveryMethod: "Email",
isFuelFee: "true",
kmPerDay: 23,
lastBilled: "Not Billed Yet",
mobile: 9234829384,
name1: "Beast",
name2: "Moder",
nationalTaxID: "234234",
numberOfDepartures: "23",
orderName: "Swag",
orderNumber: "1",
orderType: "Day Tour",
paymentCycle: "14 net",
personComponentIds: [],
phone1: "123",
phone2: "123",
priceBasis: "32",
start: "2",
state: "Bavaria",
street: "1125 N 9th St.",
tableData: {id: 0},
taxID: "234234",
terminationTime: "30 net",
updatedAt: "2020-09-12T16:39:01.766Z",
validFrom: "2020-09-13T05:00:00.000Z",
vat: 19,
vehicleSize: "M",
vendorNumber: "234234",
zipcode: 53233,
__v: 0,
_id: "5f5cf9a599ed4d4d9482b1db"}]

*/

import React from 'react';
import MaterialTable from 'material-table';
import { getClients, GET_CLIENTS, DELETE_CLIENT, deleteClient } from '../../redux/modules/client';
import { getContractors, deleteContractor } from '../../redux/modules/contractor';
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
import { getCompanys, deleteCompany } from '../../redux/modules/company';

import { getPartners, deletePartner } from '../../redux/modules/partner';
import { getTours, deleteTour } from '../../redux/modules/tour';

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
import AddSpecialOrderContractor from '../Add/addSpecialOrderPopUpContractor';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withTranslation } from 'react-i18next';
import EditSpecialOrderPopUpContractor from '../Edit/editSpecialOrderPopUpContractor';
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
    this.getTableData();
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
      let response = await this.props.getContractorSpecialOrders();
      //
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL SPECIAL ORDERS');
      console.log(response);
      let filteredOrders = response.allSpecialOrders.filter((order) => {
        return order.contractor === this.props.currentContractor;
      });

      console.log('SpecialOrder with this client' + this.props.currentContractor);
      console.log(filteredOrders);
      this.columnReference = this.props.columns;
      this.setState({ data: filteredOrders });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[0]) {
      let response = await this.props.getClients();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL CLIENTS');
      console.log(response.allClients);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allClients });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[1]) {
      let response = await this.props.getContractors();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL CONTRACTORS');
      console.log(response.allContractors);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allContractors });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[2]) {
      let response = await this.props.getArticles();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL Articles');
      console.log(response.allArticles);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allArticles });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[3]) {
      let response = await this.props.getPersons();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL PERSONS');
      console.log(response.allPersons);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allPersons });
    } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[4]) {
      let response = await this.props.getOrders();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL ORDERS');
      console.log(response.allOrders);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allOrders });
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[0]) {
      console.log('Beer');
      let response = await this.props.getBanks();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL BANKS');
      console.log(response);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allBanks });
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[1]) {
      //alert('HERE');
      let response = await this.props.getGroups();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL GROUPS');
      console.log(response);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allGroups });
    } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[3]) {
      //alert('HERE');
      let response = await this.props.getHolidays();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL', SYSTEM_NAVIGATION_ROUTES[3]);
      console.log(response);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allHolidays });
    } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[1]) {
      //    alert('HERE');
      let response = await this.props.getCompanys();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL COMPANYS');
      console.log(response);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allCompanys });
    } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4]) {
      //    alert('HERE');
      let response = await this.props.getTours();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL TOURS');
      console.log(response);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allTours });
    } else if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
      //    alert('HERE');
      let response = await this.props.getClientSpecialOrders();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL SpecialOrder');
      console.log(response);
      this.columnReference = this.props.columns;
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
    console.log(this.props.tableTitle);
    console.log(this.state.selectedSpecialOrder);
    return (
      <div>
        <AddSpecialOrderContractor currentContractor={this.props.currentContractor} open={this.state.open} handleClose={() => this.handleClose()} />
        {this.state.selectedSpecialOrder !== undefined ? (
          <EditSpecialOrderPopUpContractor
            open={this.state.openEdit}
            handleClose={() => this.handleCloseEdit()}
            selectedSpecialOrder={this.state.selectedSpecialOrder}
          />
        ) : null}
        <MaterialTable
          localization={{
            pagination: {
              labelDisplayedRows: `{from}-{to} ${this.props.t('of')} {count}`,
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
                  alert(this.props.tableTitle);
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
              onClick: (event, rowData) => {
                let txt;
                let r = confirm('You want to delete ' + rowData._id + ' ?');
                if (r == true) {
                  if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[0]) {
                    this.props.deleteClient(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[1]) {
                    this.props.deleteContractor(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[2]) {
                    this.props.deleteArticle(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[3]) {
                    this.props.deletePerson(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === TOP_NAVIGATION_ROUTES[4]) {
                    this.props.deleteOrder(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[0]) {
                    this.props.deleteBank(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[1]) {
                    this.props.deleteGroup(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[3]) {
                    this.props.deleteHoliday(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === SYSTEM_NAVIGATION_ROUTES[4]) {
                    this.props.deleteArticle(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[1]) {
                    this.props.deleteCompany(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4]) {
                    this.props.deleteTour(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[2]) {
                    this.props.deleteContractorSpecialOrder(rowData._id);
                    window.location.reload();
                  } else if (this.props.tableTitle === CONTRACTOR_EDIT_MENU_TABS[3]) {
                    this.props.deleteSpecialOrder(rowData._id);
                    window.location.reload();
                  }
                } else {
                  txt = 'You pressed Cancel!';
                }
              },
            }),
          ]}
          title={this.props.t(this.props.tableTitle)}
          columns={this.getColumns(this.props.columns)}
          data={this.state.data}
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
  deleteClient,
  getContractors,
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
  getCompanys,
  deleteCompany,
  getTours,
  deleteTour,
})(form(withTranslation('common')(EditTable)));

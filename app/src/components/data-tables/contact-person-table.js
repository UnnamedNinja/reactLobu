import React from 'react';
import MaterialTable from 'material-table';
import {
  getClients,
  GET_CLIENTS,
  DELETE_CLIENT,
  deleteClient,
  getClient,
  editClient,
} from '../../redux/modules/client';
import {
  getContractors,
  deleteContractor,
  getContractor,
  editContractor,
} from '../../redux/modules/contractor';
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
import AddSpecialOrder from '../Add/addSpecialOrderPopUp';
import AddContactPersonPopUp from '../Add/addContactPersonPopUp';
import AddExistingContactPersonPopUp from '../Add/addExistingContactPersonPopUp';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withTranslation } from 'react-i18next';
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
      openEP: false,
    };
  }

  async componentDidMount() {
    alert("HEREEE")
    await this.getTableData();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenEP = () => {
    this.setState({ openEP: true });
  };

  handleCloseEP = async() => {
    //await this.getTableData();
    await this.setState({ openEP: false });

  };

  getTableData = async (props) => {

    //Client Contact People
      if (this.props.isClient) {
      let response = await this.props.getPersons();
      let r2 = await this.props.getClient(this.props.currentClient);
      let contactPersonsIds = r2.ClientFound.contactPersons;

      console.log(response.allPersons);
      let filteredPeople = response.allPersons.filter((person) => {
        return contactPersonsIds.includes(person._id);
      });
      this.columnReference = this.props.columns;
      await this.setState({ data: filteredPeople, contactPersonsIds: contactPersonsIds });
    } else {
      let response = await this.props.getPersons();
      let r2 = await this.props.getContractor(this.props.currentContractor);
      let contactPersonsIds = r2.ContractorFound.contactPersons;

      console.log(response.allPersons);
      let filteredPeople = response.allPersons.filter((person) => {
        return contactPersonsIds.includes(person._id);
      });
      this.columnReference = this.props.columns;
      await this.setState({ data: filteredPeople, contactPersonsIds: contactPersonsIds });
    }
  };

  getColumns = (columns) => {
    let updatedColumns = [];
    for (let column of columns) {
      updatedColumns.push({ title: this.props.t(column.title), field: column.field });
    }

    return updatedColumns;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render=()=> {
    // const classes = useStyles();
    this.getTableData();

    console.log('currentcols from table');
    console.log(this.props.columns);
    console.log(this.props.tableTitle);
    return (
      <div>
        <AddExistingContactPersonPopUp
          open={this.state.openEP}
          handleClose={() => this.handleCloseEP()}
          currentClient={this.props.currentClient}
          currentContractor={this.props.currentContractor}
          isClient={this.props.isClient}
        />
        <AddContactPersonPopUp
          open={this.state.open}
          handleClose={() => this.handleClose()}
          currentClient={this.props.currentClient}
          currentContractor={this.props.currentContractor}
          isClient={this.props.isClient}
        />
        <Button
          onClick={() => {
            this.handleOpenEP();
          }}
          style={{ color: 'green', marginBottom: 10 }}
          variant="outlined"
        >
          {this.props.t('Add Existing Person')}
        </Button>
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
              hidden: this.props.tableTitle === BOTTOM_NAVIGATION_ROUTES[4],
              onClick: (event, rowData) =>
                this.props.tableTitle === CLIENT_NAVIGATION_ROUTES[3]
                  ? this.handleOpen()
                  : this.props.parentCallbackAction('ADD'),
            },
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => this.props.parentCallbackAction('EDIT', rowData),
            },
            (rowData) => ({
              icon: 'delete',
              tooltip: 'Delete',
              onClick: async (event, rowData) => {
                let txt;
                let r = confirm('You want to delete ' + rowData._id + ' ?');
                if (r == true) {
                  console.log(this.state.contactPersonsIds);
                  let array = this.state.contactPersonsIds;
                  var index = array.indexOf(rowData._id);
                  while (index > -1) {
                    array.splice(index, 1);
                    index = array.indexOf(rowData._id);
                  }
                  console.log(array);
                  if (this.props.isClient) {
                    await this.props.editClient(this.props.currentClient, {
                      contactPersons: array,
                    });
                  } else {
                    await this.props.editContractor(this.props.currentContractor, {
                      contactPersons: array,
                    });
                  }
                  this.getTableData();
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
  getCompanys,
  deleteCompany,
  getTours,
  deleteTour,
  editClient,
  editContractor,
})(form(withTranslation('common')(EditTable)));

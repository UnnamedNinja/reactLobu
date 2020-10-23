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
  ORDER_TABS_SELECT,
  ORDER_TABS_SELECTED,
} from '../../constants/ui-constants';
import AddOrderPopUp from '../Add/addOrderPopUp';
import EditOrderPopUp from '../Edit/editOrderPopUp';

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
      openEdit: false,
      selectedOrder: '',
    };
  }

  async componentDidMount() {
    this.getTableData();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getTableData = async (props) => {
    if (this.columnReference == this.props.columns) {
      return;
    }
    //orders
    let response = await this.props.getOrders();
    console.log('DATA RETRIEVED FROM MONGODB FOR ALL ORDERS');
    console.log(response.allOrders);

    await this.setState({ data: response.allOrders });
  };

  getColumns = (columns) => {
    let updatedColumns = [];
    for (let column of columns) {
      updatedColumns.push({ title: this.props.t(column.title), field: column.field });
    }

    return updatedColumns;
  };

  handleClose = () => {
    this.setState({ open: false, openEdit: false });
  };

  render() {
    // const classes = useStyles();
    this.getTableData();

    return (
      <div>
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
              onClick: (event, rowData) => alert('Added to Selected'),
            },
          ]}
          title={'Select Orders'}
          columns={this.getColumns(
            this.props.index === 0 ? ORDER_TABS_SELECT : ORDER_TABS_SELECTED,
          )}
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

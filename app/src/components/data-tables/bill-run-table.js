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
import { getBanks, deleteBank } from '../../redux/modules/bank';
import { getGroups, deleteGroup } from '../../redux/modules/group';
import { getCompanys, deleteCompany } from '../../redux/modules/company';

import { getPartners, deletePartner } from '../../redux/modules/partner';
import { getBillRuns } from '../../redux/modules/billrun';
import PreviewBillRun from '../modals/previewBillRun';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  TOP_NAVIGATION_ROUTES,
  MID_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
} from '../../constants/ui-constants';
let columnReference;

const form = reduxForm({
  form: 'add',
});

{
  /**
EDIT DELETE TABLE
  */
}
class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      data: [],
      tableTitle: this.props.tableTitle,
      isOpen:false,
    };
  }

  async componentDidMount() {
    this.getTableData();
  }

  callbackOpen = () => {
    this.setState({ isOpen: false});
  }

  getTableData = async (props) => {
    if (this.columnReference == this.props.columns) {
      return;
    }
    //Client
    else if (this.props.tableTitle === MID_NAVIGATION_ROUTES[0]) {
      let response = await this.props.getBillRuns();
      console.log('DATA RETRIEVED FROM MONGODB FOR ALL BillRuns');
      console.log(response.allBillRuns);
      this.columnReference = this.props.columns;
      this.setState({ data: response.allBillRuns });
    }  else {
      //  alert('HERE' + TOP_NAVIGATION_ROUTES[0] + ' ' + this.props.tableTitle);
    }
  };

  render() {
    this.getTableData();
    console.log('currentcols from table');
    console.log(this.props.columns);
    console.log(this.props.tableTitle);

    return (
      <div>
      <MaterialTable
        actions={[

          {
            icon: 'preview',
            tooltip: 'Preview',
            onClick: (event, rowData) => {
              this.setState({isOpen:true});
            }
          },

        ]}
        title={this.props.tableTitle}
        columns={this.props.columns}
        data={this.state.data}
        options={{
          filtering: true
        }}

      />
      <PreviewBillRun handleClose={()=>{this.callbackOpen()}} isOpen={this.state.isOpen} />

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
  getOrders,
  getPartners,
  deletePartner,
  getBanks,
  deleteBank,
  getGroups,
  deleteGroup,
  getCompanys,
  getBillRuns,
  deleteCompany,
})(form(EditTable));

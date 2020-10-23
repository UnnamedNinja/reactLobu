import React from 'react';
import DrawerTab from '../mainDrawer/drawer';
import SelectEditDeleteTable from '../../components/data-tables/edit-table';
import SpecificOrderTable from '../../components/data-tables/specific-order-table';
import SpecialOrderTableContractors from '../../components/data-tables/contractor-special-order-table';

import ClientOrderTable from '../../components/data-tables/client-order-table';

import ContractorOrderTable from '../../components/data-tables/contractor-order-table';
import SystemFuelTable from '../../components/data-tables/system-fuel-table.js';
import UsersTable from '../../components/data-tables/users-table.js';

import ContactPersonTable from '../../components/data-tables/contact-person-table';
import BillRunTable from '../../components/data-tables/bill-run-table';

import Typography from '@material-ui/core/Typography';
import TopTabs from './toptab.js';
import AddForm from '../../components/Add/addForm';
import AddSpecialOrder from '../../components/Add/addSpecialOrderPopUp';
import AddOrderPopUp from '../../components/Add/addOrderPopUp';

import EditForm from '../../components/Edit/editForm';
import FuelPriceTableClient from '../data-tables/fuel-table';
import FuelPriceTableContractor from '../data-tables/fuel-table-contractor';

import {
  GROUP_TABLE_COLUMNS,
  BANK_TABLE_COLUMNS,
  CLIENT_TABLE_COLUMNS,
  ARTICLE_TABLE_COLUMNS,
  HOLIDAY_TABLE_COLUMNS,
  SYSTEM_NAVIGATION_ROUTES,
  CLIENT_NAVIGATION_ROUTES,
  TOP_NAVIGATION_ROUTES,
  MID_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  TOURS_TABLE_COLUMNS,
  SPECIAL_ORDERS_TABLE_COLUMNS,
  ORDER_TABLE_COLUMNS,
  CONTACT_PERSON_TABLE_COLUMNS,
  CLIENT_ADD_MENU_TABS,
  CLIENT_EDIT_MENU_TABS,
  PERSON_TABLE_COLUMNS,
  USER_TABLE_COLUMNS,
} from '../../constants/ui-constants';
import { withTranslation } from 'react-i18next';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TOP_NAVIGATION_ROUTES[0],
      currentSubTab: '0',
      currentCols: [],
      currentAction: '',
      currentRowData: '',
      open: false,
    };
  }

  callbackCurrentTab = (text, columns) => {
    console.log('Callback from Drawer ' + text);
    console.log(columns);
    this.setState({ currentTab: text, currentCols: columns, currentAction: '', currentSubTab: 0 });
  };

  callbackCurrentSubTab = (text) => {
    console.log('Callback from EditMenu ' + text);
    this.setState({ currentSubTab: text });
  };

  callbackCurrentAction = async (text, rowData) => {
    console.log('Callback from AddMenu ' + text);
    console.log(rowData);
    await this.setState({ currentAction: text, currentRowData: rowData });
    console.log('SPEC ORDer', SPECIAL_ORDERS_TABLE_COLUMNS, this.state);
    console.log(rowData);
  };

  handleConfimChangePage = () => {};

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    console.log('MOUNTING DASH!');
  }

  render() {
    if (this.state.currentAction === 'ADD') {
      // alert(this.state.currentTab);
      if (this.state.currentTab === TOP_NAVIGATION_ROUTES[4] && this.state.currentSubTab == 3) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                Order Comments
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />

              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab === TOP_NAVIGATION_ROUTES[4] &&
        this.state.currentSubTab == 3
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                Order Comments
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />

              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[3] ||
        this.state.currentTab == TOP_NAVIGATION_ROUTES[4]
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (this.state.currentTab == TOP_NAVIGATION_ROUTES[2]) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (this.state.currentTab == TOP_NAVIGATION_ROUTES[1]) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (this.state.currentTab == BOTTOM_NAVIGATION_ROUTES[1]) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (this.state.currentTab == TOP_NAVIGATION_ROUTES[0]) {
        if (this.state.currentSubTab == 2) {
          return (
            <div style={{ flex: 1, display: 'flex' }}>
              <DrawerTab
                currentAction={this.state.currentAction}
                parentCallback={this.callbackCurrentTab}
                currentTab={this.state.currentTab}
              />
              <main style={{ flexGrow: 1 }}>
                <TopTabs
                  currentTab={this.state.currentTab}
                  currentSubTab={this.state.currentSubTab}
                  parentCallback={this.callbackCurrentSubTab}
                />
                <AddSpecialOrder
                  currentSubTab={this.state.currentSubTab}
                  currentTab={this.state.currentTab}
                  parentCallback={this.callbackCurrentTab}
                  parentCallbackAction={this.callbackCurrentAction}
                />
              </main>
            </div>
          );
        } else if (this.state.currentSubTab == 1) {
          alert('IN ADD SHOULDNT BE HERE' + this.state.currentSubTab + this.state.currentTab);
          return (
            <div style={{ flex: 1, display: 'flex' }}>
              <DrawerTab
                currentAction={this.state.currentAction}
                parentCallback={this.callbackCurrentTab}
                currentTab={this.state.currentTab}
              />
              <main style={{ flexGrow: 1 }}>
                <TopTabs
                  currentTab={this.state.currentTab}
                  currentSubTab={this.state.currentSubTab}
                  parentCallback={this.callbackCurrentSubTab}
                />
                <SelectEditDeleteTable
                  parentCallbackAction={this.callbackCurrentAction}
                  parentCallback={this.callbackCurrentTab}
                  tableTitle={TOP_NAVIGATION_ROUTES[4]}
                  columns={ORDER_TABLE_COLUMNS}
                />
              </main>
            </div>
          );
        } else {
          return (
            <div style={{ flex: 1, display: 'flex' }}>
              <DrawerTab
                currentAction={this.state.currentAction}
                parentCallback={this.callbackCurrentTab}
                currentTab={this.state.currentTab}
              />
              <main style={{ flexGrow: 1 }}>
                <AddForm
                  currentSubTab={this.state.currentSubTab}
                  currentTab={this.state.currentTab}
                  parentCallback={this.callbackCurrentTab}
                  parentCallbackAction={this.callbackCurrentAction}
                />
              </main>
            </div>
          );
        }
      } else {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      }
    } else if (this.state.currentAction === 'EDIT') {
      if (this.state.currentTab == TOP_NAVIGATION_ROUTES[0] && this.state.currentSubTab == 2) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('SPECIAL ORDERS')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                currentClient={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[2]}
                columns={SPECIAL_ORDERS_TABLE_COLUMNS}
              />
              <SelectEditDeleteTable
                currentClient={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={TOP_NAVIGATION_ROUTES[2]}
                columns={ARTICLE_TABLE_COLUMNS}
                addHidden
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[0] &&
        this.state.currentSubTab == 1
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('ORDERS') +
                  ' ' +
                  this.props.t('ASSOCIATED') +
                  ' ' +
                  this.props.t('WITH THIS') +
                  ' ' +
                  this.props.t('CLIENT')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <ClientOrderTable
                currentClient={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[1]}
                columns={ORDER_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[0] &&
        this.state.currentSubTab == 3
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('Contact People')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <ContactPersonTable
                currentClient={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[3]}
                columns={PERSON_TABLE_COLUMNS}
                isClient={true}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[0] &&
        this.state.currentSubTab == 4
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('Fuel Price Table For') + ' ' + this.state.currentRowData.Name1}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <FuelPriceTableClient currentClient={this.state.currentRowData._id} />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[0] &&
        this.state.currentSubTab == 5
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('SPECIAL ORDERS')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[1] &&
        this.state.currentSubTab == 2
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('SPECIAL ORDERS') +
                  ' ' +
                  this.props.t('FOR') +
                  ' ' +
                  this.props.t('CONTRACTOR')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SpecialOrderTableContractors
                currentContractor={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[2]}
                columns={SPECIAL_ORDERS_TABLE_COLUMNS}
              />
              <SelectEditDeleteTable
                currentClient={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={TOP_NAVIGATION_ROUTES[2]}
                columns={ARTICLE_TABLE_COLUMNS}
                addHidden
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[1] &&
        this.state.currentSubTab == 1
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('ORDERS') +
                  ' ' +
                  this.props.t('ASSOCIATED') +
                  ' ' +
                  this.props.t('WITH THIS') +
                  ' ' +
                  this.props.t('CONTRACTOR')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <ContractorOrderTable
                currentContractor={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[1]}
                columns={ORDER_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[1] &&
        this.state.currentSubTab == 3
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('Contact People')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <ContactPersonTable
                currentContractor={this.state.currentRowData._id}
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[3]}
                columns={PERSON_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[1] &&
        this.state.currentSubTab == 4
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('Fuel Price Table For') + ' ' + this.state.currentRowData.name1}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <FuelPriceTableContractor currentContractor={this.state.currentRowData._id} />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab == TOP_NAVIGATION_ROUTES[1] &&
        this.state.currentSubTab == 5
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('SPECIAL ORDERS')}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (this.state.currentTab === BOTTOM_NAVIGATION_ROUTES[1]) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('EDIT ' + this.state.currentTab)}
              </Typography>

              <EditForm
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                currentRowData={this.state.currentRowData}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentTab === TOP_NAVIGATION_ROUTES[4] &&
        this.state.currentSubTab == 3
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                Order Comments
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />

              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      } else if (
        this.state.currentSubTab == 0 ||
        this.state.currentSubTab == 1 ||
        this.state.currentSubTab == 2 ||
        this.state.currentSubTab == 3 ||
        this.state.currentSubTab == 4 ||
        this.state.currentSubTab == 5
      ) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('EDIT ' + this.state.currentTab)}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <EditForm
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                currentRowData={this.state.currentRowData}
              />
            </main>
          </div>
        );
      } else {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t('EDIT ' + this.state.currentTab)}
              </Typography>
              <TopTabs
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              {this.props.t(this.state.currentSubTab)}
            </main>
          </div>
        );
      }
    }
    //Not Add or Edit
    else if (this.state.currentTab === TOP_NAVIGATION_ROUTES[0]) {
      if (this.state.currentSubTab == 0) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'} className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}

              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={TOP_NAVIGATION_ROUTES[0]}

                columns={CLIENT_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 1) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={TOP_NAVIGATION_ROUTES[4]}
                columns={ORDER_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 2) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_NAVIGATION_ROUTES[2]}
                columns={SPECIAL_ORDERS_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 3) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={CLIENT_ADD_MENU_TABS[3]}
                columns={CONTACT_PERSON_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 4) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <FuelPriceTableClient
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
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 5) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <AddForm
                currentSubTab={this.state.currentSubTab}
                currentTab={this.state.currentTab}
                parentCallback={this.callbackCurrentTab}
                parentCallbackAction={this.callbackCurrentAction}
              />
            </main>
          </div>
        );
      }
    } else if (this.state.currentTab === BOTTOM_NAVIGATION_ROUTES[0]) {
      console.log('PAUL', this.state);
      if (this.state.currentSubTab == 0) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            {console.log("_______________________________________________")}
            {console.log(this.state.currentAction)}
            {console.log(this.state.currentTab)}
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography>
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={SYSTEM_NAVIGATION_ROUTES[0]}
                columns={BANK_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 1) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={SYSTEM_NAVIGATION_ROUTES[1]}
                columns={GROUP_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      }

      // else if (this.state.currentSubTab == 2) {
      //   return (
      //     <div style={{ flex: 1, display: 'flex' }}>
      //       <DrawerTab currentAction={this.state.currentAction}
      //         parentCallback={this.callbackCurrentTab}
      //         currentTab={this.state.currentTab}
      //       />
      //       <main style={{ flexGrow: 1 }}>
      //         <Typography paragraph className={'uppercase-span'}>{this.state.currentTab}</Typography>
      //         <TopTabs
      //           currentTab={this.state.currentTab}
      //           currentSubTab={this.state.currentSubTab}
      //           parentCallback={this.callbackCurrentSubTab}
      //         />
      //         <iframe
      //           style={{ width: '100%', height: 680 }}
      //           src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTUNYBUdqY_ANASx4JDJIAzSqu3L5Q_pUtCCOjCDRqiTY0c1FI_h5Wa72BXNsEfMKIv973-2GO-Hgvt/pubhtml?widget=true&amp;headers=false"
      //         ></iframe>
      //       </main>
      //     </div>
      //   );
      // }
      else if (this.state.currentSubTab == 2) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SystemFuelTable />
            </main>
          </div>
        );
      } else if (this.state.currentSubTab == 3) {
        return (
          <div style={{ flex: 1, display: 'flex' }}>
            <DrawerTab
              currentAction={this.state.currentAction}
              parentCallback={this.callbackCurrentTab}
              currentTab={this.state.currentTab}
            />
            <main style={{ flexGrow: 1 }}>
              {/* <Typography paragraph className={'uppercase-span'}>
                {this.props.t(this.state.currentTab)}
              </Typography> */}
              <TopTabs
                currentTab={this.state.currentTab}
                currentSubTab={this.state.currentSubTab}
                parentCallback={this.callbackCurrentSubTab}
              />
              <SelectEditDeleteTable
                parentCallbackAction={this.callbackCurrentAction}
                parentCallback={this.callbackCurrentTab}
                tableTitle={SYSTEM_NAVIGATION_ROUTES[3]}
                columns={HOLIDAY_TABLE_COLUMNS}
              />
            </main>
          </div>
        );
      }
    } else if (this.state.currentTab === BOTTOM_NAVIGATION_ROUTES[4]) {
      return (
        <div style={{ flex: 1, display: 'flex' }}>
          <DrawerTab
            currentAction={this.state.currentAction}
            parentCallback={this.callbackCurrentTab}
            currentTab={this.state.currentTab}
          />
          <main style={{ flexGrow: 1 }}>
            {/* <Typography paragraph>{this.props.t(this.state.currentTab)}</Typography> */}
            <SelectEditDeleteTable
              parentCallbackAction={this.callbackCurrentAction}
              parentCallback={this.callbackCurrentTab}
              tableTitle={BOTTOM_NAVIGATION_ROUTES[4]}
              columns={TOURS_TABLE_COLUMNS}
            />
          </main>
        </div>
      );
    } else if (this.state.currentTab === MID_NAVIGATION_ROUTES[0]) {
      alert('TT');
      return (
        <div style={{ flex: 1, display: 'flex' }}>
          <DrawerTab
            currentAction={this.state.currentAction}
            parentCallback={this.callbackCurrentTab}
            currentTab={this.state.currentTab}
          />
          <main style={{ flexGrow: 1 }}>
            {/* <Typography paragraph className={'uppercase-span'}>
              {this.props.t(this.state.currentTab)}
            </Typography> */}
            <BillRunTable
              parentCallbackAction={this.callbackCurrentAction}
              parentCallback={this.callbackCurrentTab}
              tableTitle={MID_NAVIGATION_ROUTES[0]}
              columns={ARTICLE_TABLE_COLUMNS}
            />
          </main>
        </div>
      );
    } else if (
      this.state.currentTab === TOP_NAVIGATION_ROUTES[4] &&
      this.state.currentSubTab == 0
    ) {
      // orders dashboard edit table
      return (
        <div style={{ flex: 1, display: 'flex' }}>
          <DrawerTab
            currentAction={this.state.currentAction}
            parentCallback={this.callbackCurrentTab}
            currentTab={this.state.currentTab}
          />
          <main style={{ flexGrow: 1 }}>
            {/* <Typography paragraph className={'uppercase-span'}>
              {this.props.t(this.state.currentTab)}
            </Typography> */}
            <SelectEditDeleteTable
              parentCallbackAction={this.callbackCurrentAction}
              parentCallback={this.callbackCurrentTab}
              tableTitle={this.state.currentTab}
              columns={this.state.currentCols}
            />
          </main>
        </div>
      );
    } else if (
      this.state.currentTab === BOTTOM_NAVIGATION_ROUTES[2] &&
      this.state.currentSubTab == 0
    ) {
      // orders dashboard edit table
      return (
        <div style={{ flex: 1, display: 'flex' }}>
          <DrawerTab
            currentAction={this.state.currentAction}
            parentCallback={this.callbackCurrentTab}
            currentTab={this.state.currentTab}
          />
          <main style={{ flexGrow: 1 }}>
            {/* <Typography paragraph className={'uppercase-span'}>
              {this.props.t(this.state.currentTab)}
            </Typography> */}
            <UsersTable
              parentCallbackAction={this.callbackCurrentAction}
              parentCallback={this.callbackCurrentTab}
              tableTitle={BOTTOM_NAVIGATION_ROUTES[2]}
              columns={USER_TABLE_COLUMNS}
            />
          </main>
        </div>
      );
    } else {
      return (
        <div style={{ flex: 1, display: 'flex' }}>
          <DrawerTab
            currentAction={this.state.currentAction}
            parentCallback={this.callbackCurrentTab}
            currentTab={this.state.currentTab}
          />
          <main style={{ flexGrow: 1 }}>
            {/* <Typography paragraph className={'uppercase-span'}>
              {this.props.t(this.state.currentTab)}
            </Typography> */}
            <SelectEditDeleteTable
              parentCallbackAction={this.callbackCurrentAction}
              parentCallback={this.callbackCurrentTab}
              tableTitle={this.state.currentTab}
              columns={this.state.currentCols}
            />
          </main>
        </div>
      );
    }
  }
}

export default withTranslation('common')(Dashboard);

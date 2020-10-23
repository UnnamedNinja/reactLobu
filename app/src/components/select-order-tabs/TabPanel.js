import React, { useState, useEffect } from 'react';
import { ORDER_TABS_SELECT, ORDER_TABS_SELECTED } from '../../constants/ui-constants';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addOrder, getOrders, ADD_ORDER } from '../../redux/modules/order';
import Typography from '@material-ui/core/Typography';

let selectedOrders = [];

const form = reduxForm({
  form: 'add',
});

const TabPanel = (props) => {
  const { children, value, index, getOrders, ...other } = props;

  const [orders, setOrders] = useState([]);
  const getColumns = (columns) => {
    let updatedColumns = [];
    for (let column of columns) {
      updatedColumns.push({ title: props.t(column.title), field: column.field });
    }

    return updatedColumns;
  };

  const getOrdersData = async () => {
    let ordersData = await props.getOrders();
    console.log('ROL');
    console.log(ordersData.allOrders);
    await setOrders(ordersData.allOrders);
  };

  const getPrices = () => {
    console.log('ordd', selectedOrders);
    let prices = selectedOrders.map((order, i) => {
      return (
        <Typography variant="h4" style={{ color: 'green', display: 'inline' }}>
          {`${order.clientPriceWeek[0] ? order.clientPriceWeek[0].price : 0} ${
            i === selectedOrders.length - 1 ? '' : ' +'
          } `}{' '}
        </Typography>
      );
    });
    return prices;
  };

  const getPricesTotal = () => {
    if (selectedOrders.length != []) {
      let total = 0;
      selectedOrders.forEach((order, i) => {
        total += parseFloat(order.clientPriceWeek[0] ? order.clientPriceWeek[0].price : '0');
      });
      return total;
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    getOrdersData();
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <MaterialTable
            localization={{
              pagination: {
                labelDisplayedRows: `{from}-{to} ${props.t('of')} {count}`,
              },
              toolbar: {
                nRowsSelected: `{0} ${props.t('rows')} ${props.t('selected')}`,
              },
              header: {},
              body: {
                emptyDataSourceMessage: props.t('No records to display'),
                filterRow: {
                  filterTooltip: props.t('Filter'),
                },
              },
            }}
            options={{
              selection: true,
            }}
            actions={
              index === 0
                ? [
                    {
                      icon: 'add',
                      tooltip: props.t('Add Order'),
                      onClick: async (event, rowData) => {
                        await selectedOrders.push(rowData);
                      },
                    },
                  ]
                : [
                    {
                      icon: 'delete',
                      tooltip: props.t('Removing Selected Order'),
                      onClick: async (event, rowData) => {
                        let index = selectedOrders.indexOf(rowData);
                        if (index > -1) {
                          selectedOrders.splice(index, 1);
                        }
                      },
                    },
                  ]
            }
            title={''}
            options={{
              filtering: true,
            }}
            columns={getColumns(index === 0 ? ORDER_TABS_SELECT : ORDER_TABS_SELECTED)}
            data={index === 0 ? orders : selectedOrders}
          />
          {index === 1 ? (
            <Typography variant="h4" style={{ color: 'green' }}>
              {getPrices()}{' '}
            </Typography>
          ) : null}
          {index === 1 ? (
            <Typography variant="h4" style={{ color: 'green' }}>
              {props.t('Total')}: {getPricesTotal() ? getPricesTotal() : 0.0}{' '}
            </Typography>
          ) : null}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getOrders,
})(form(withTranslation('common')(TabPanel)));

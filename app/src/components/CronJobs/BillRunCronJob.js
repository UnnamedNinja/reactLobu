import React from 'react';
import { addClient, getClients, ADD_CLIENT } from '../../redux/modules/client';
import { getOrders } from '../../redux/modules/order';
import { addBillRun } from '../../redux/modules/billrun';

import { connect } from 'react-redux';
var CronJob = require('cron').CronJob;
var DateDiff = require('date-diff');

class BillCron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleBillRunUpdate = (props) => {
    let ordersAssociatedWithClient = [];

    let job = new CronJob(
      '*/2 * * * *',
      async function () {
        //Step 1 get clients
        let clients = await props.getClients();
        let allClients = clients.allClients;
        allClients.forEach(async (client) => {
          let contractStartDate = client.contractStartDate;
          let contractEndDate = client.contractEndDate;
          let billingCycle = client.billingCycle;
          let lastBilledDate = client.LastBilled;

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          console.log(contractStartDate);
          console.log(today.toISOString());
          console.log(contractEndDate);
          console.log(lastBilledDate);
          if (today.toISOString() >= contractStartDate && today.toISOString() <= contractEndDate) {
            console.log('in between/on');
            console.log(billingCycle);
            var diff = today - Date.parse(lastBilledDate);

            let diffDays = diff / (1000 * 3600 * 24);
            console.log('DIFF DAYS: ' + diffDays);
            if (
              (billingCycle === 'Daily' && diffDays >= 1) ||
              (billingCycle === 'Weekly' && diffDays >= 7) ||
              (billingCycle === '14 Days' && diffDays >= 14) ||
              (billingCycle === 'Monthly' && diffDays >= 30)
            ) {
              console.log('WOWZA!');
              let orders = await props.getOrders();
              let allOrders = orders.allOrders;
              console.log('ALL ORDERS');
              allOrders.forEach((order) => {
                console.log(order.client);
                console.log(client._id);
                console.log(order.client === client._id);
                if (order.client === client._id) {
                  ordersAssociatedWithClient.push(order);
                }
              });
              console.log('INVOICES READY FOR A CLIENT!');
              await props.addBillRun({ orders: ordersAssociatedWithClient });
              //Add them as Invoices
            } else {
              console.log('NOT READY TO BE BILLED');
            }
          } else {
            console.log('outside');
          }
        });
      },
      null,
      true,
      'America/Los_Angeles',
    );

    //start bill run cron job
    job.start();
  };

  render() {
    this.handleBillRunUpdate(this.props);

    return <div></div>;
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, { getClients, getOrders, addBillRun })(BillCron);

import React from 'react';
import { Document } from 'react-pdf';
import styles from './purchasestyles.css';
var url = require('./pngurl');
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// see proptypes at bottom of file for props
class PurchaseConf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // could add props to state... at least the props
    // that could change as user keeps editing (so that would be all of them except maybe person name1 and name2...)
  }

  componentWillMount = () => {};

  render() {
    let today = new Date();
    return (
      <div>
    <meta charSet="utf-8" />
    <title>A simple, clean, and responsive HTML invoice template</title>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n    .invoice-box {\n        max-width: 800px;\n        margin: auto;\n        padding: 30px;\n        border: 1px solid #eee;\n        box-shadow: 0 0 10px rgba(0, 0, 0, .15);\n        font-size: 16px;\n        line-height: 24px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: #555;\n    }\n    \n    .invoice-box table {\n        width: 100%;\n        line-height: inherit;\n        text-align: left;\n    }\n    \n    .invoice-box table td {\n        padding: 5px;\n        vertical-align: top;\n    }\n    \n    .invoice-box table tr td:nth-child(2) {\n        text-align: right;\n    }\n    \n    .invoice-box table tr.top table td {\n        padding-bottom: 20px;\n    }\n    \n    .invoice-box table tr.top table td.title {\n        font-size: 45px;\n        line-height: 45px;\n        color: #333;\n    }\n    \n    .invoice-box table tr.information table td {\n        padding-bottom: 40px;\n    }\n    \n    .invoice-box table tr.heading td {\n        background: #eee;\n        border-bottom: 1px solid #ddd;\n        font-weight: bold;\n    }\n    \n    .invoice-box table tr.details td {\n        padding-bottom: 20px;\n    }\n    \n    .invoice-box table tr.item td{\n        border-bottom: 1px solid #eee;\n    }\n    \n    .invoice-box table tr.item.last td {\n        border-bottom: none;\n    }\n    \n    .invoice-box table tr.total td:nth-child(2) {\n        border-top: 2px solid #eee;\n        font-weight: bold;\n    }\n    \n    @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n            width: 100%;\n            display: block;\n            text-align: center;\n        }\n        \n        .invoice-box table tr.information table td {\n            width: 100%;\n            display: block;\n            text-align: center;\n        }\n    }\n    \n    /** RTL **/\n    .rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n    }\n    \n    .rtl table {\n        text-align: right;\n    }\n    \n    .rtl table tr td:nth-child(2) {\n        text-align: left;\n    }\n    "
      }}
    />
    <div className="invoice-box">
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr className="top">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td className="title">
                      <img
                        src="https://www.sparksuite.com/images/logo.png"
                        style={{ width: "100%", maxWidth: 300 }}
                      />
                    </td>
                    <td>
                    Number:	33
                    <br />
Client #:
<br />
Date:	02.11.2020
<br />
Phone:	+49602162579
<br />
Fax:	+496021 - 62579 15
<br />
Email:info@jks-zustellservice.de
<br />
Creditor #:
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="information">
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td>
                    J.K.S. Zustellservice GmbH & Co. KG
                    <br />
                    Boschweg 5
<br />
                    63741 Aschaffenburg
<br />

                    Fur Filiale:
<br />
                    Hennig Fahrzeugteile GmbH & Co. KG
<br />
                    Christian-Wirth-Str. 19
<br />
                    36043 Fulda
<br />
                    USt-ID-Nr.DE814014951
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="heading">

            <td>From: 02.11.2020   -   02.11.2020</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>



          </tr>
          <tr className="details">
            <td>We bill you as following:</td>
            <td></td>

            <td></td>

            <td></td>

            <td></td>

          </tr>
          <tr className="heading">
            <td>Item</td>
            <td>Price</td>
            <td>Unit</td>
            <td>Amount</td>
            <td>Total</td>

          </tr>
          <tr className="item">
            <td>Website design</td>
            <td>$300.00</td>
            <td>Day</td>
            <td>2</td>
            <td>$600.00</td>
          </tr>

          <tr className="item last">
            <td>Domain name (1 year)</td>
            <td>$10.00</td>
          </tr>
          <tr className="total">
            <td />
            <td>Total: $610.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

    );
  }
}


export default PurchaseConf;

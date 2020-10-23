import React from 'react';
import { Document } from 'react-pdf';
var url = require('./pngurl');
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// see proptypes at bottom of file for props
class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // could add props to state... at least the props
    // that could change as user keeps editing (so that would be all of them except maybe person name1 and name2...)
  }

  componentWillMount = () => {};

  render() {
    let today = new Date();
    return (
      <html>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              '\n<!--\nspan.cls_003{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Arial,serif;font-size:9.5px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Arial,serif;font-size:9.5px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_016{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Times,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:9.9px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:9.9px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_015{font-family:Arial,serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_015{font-family:Arial,serif;font-size:7.6px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n',
          }}
        />
        <div
          style={{
            position: 'relative',
            top: 0,
            width: 594,
            height: 841,
            borderStyle: 'outset',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <img src="./invoiceBackgroundPngs/background1.jpg" width={594} height={841} />
          </div>
          <div
            style={{ position: 'absolute', left: '454.03px', top: '79.62px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '489.70px', top: '93.66px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.props.companyStreet}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '418.51px', top: '107.70px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.companyZip} ${this.props.companyState}, ${this.props.companyCity}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '447.31px', top: '121.62px' }}
            className="cls_003"
          >
            <span className="cls_003">{`Tel.: ${this.props.phone}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '459.07px', top: '133.98px' }}
            className="cls_006"
          >
            <span className="cls_006">{this.props.email}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '138.54px' }}
            className="cls_016"
          >
            <span className="cls_016">
              {`${this.props.companyName}, ${this.props.companyNameAddressLine1}`}
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '472.18px', top: '150.54px' }}
            className="cls_006"
          >
            <span className="cls_006"> </span>
            <a href="http://www.srcone.de/">www.srcone.de</a>{' '}
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '163.02px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.firstName} ${this.props.lastName} ${this.props.companyName}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '175.02px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.street} ${this.props.addressBuildingNumber}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '187.02px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.zipcode} ${this.props.city}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '272.73px' }}
            className="cls_007"
          >
            <span className="cls_007">Rechnung</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '305.85px' }}
            className="cls_003"
          >
            <span className="cls_003">
              Unsere Lieferungen/Leistungen stellen wir Ihnen wie folgt in Rechnung.
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '76.58px', top: '340.41px' }}
            className="cls_008"
          >
            <span className="cls_008">Rechnungsnr.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '190.46px', top: '340.41px' }}
            className="cls_008"
          >
            <span className="cls_008">Kundennr.:</span>
            <span className="cls_004"> </span>
            <span className="cls_009"> Kunden-USt-IdNr.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '371.59px', top: '340.41px' }}
            className="cls_008"
          >
            <span className="cls_008">Datum:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '439.63px', top: '340.41px' }}
            className="cls_008"
          >
            <span className="cls_008">Leistungsdatum:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '76.58px', top: '353.97px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.props.invoiceNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '190.46px', top: '353.97px' }}
            className="cls_003"
          >
            <span className="cls_003">10065</span>
          </div>
          <div
            style={{ position: 'absolute', left: '260.57px', top: '353.97px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.countryCode}${this.props.clientVATIDNo}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '371.59px', top: '353.97px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${today.getDate()}.${
              today.getMonth() + 1
            }.${today.getFullYear()}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '439.63px', top: '353.97px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.serviceDate.getDate()}.${
              this.props.serviceDate.getMonth() + 1
            }.${this.props.serviceDate.getFullYear()}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '78.02px', top: '401.85px' }}
            className="cls_008"
          >
            <span className="cls_008">Pos.</span>
          </div>
          <div
            style={{ position: 'absolute', left: '109.46px', top: '399.33px' }}
            className="cls_008"
          >
            <span className="cls_008">Bezeichnung</span>
          </div>
          <div
            style={{ position: 'absolute', left: '363.55px', top: '401.85px' }}
            className="cls_008"
          >
            <span className="cls_008">Menge &amp;</span>
          </div>
          <div
            style={{ position: 'absolute', left: '430.99px', top: '401.85px' }}
            className="cls_008"
          >
            <span className="cls_008">Einzel €</span>
          </div>
          <div
            style={{ position: 'absolute', left: '493.66px', top: '401.85px' }}
            className="cls_008"
          >
            <span className="cls_008">Gesamt{` ${this.props.currencyUnitPrefix}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '367.99px', top: '415.89px' }}
            className="cls_009"
          >
            <span className="cls_009">Einheit</span>
          </div>
          <div
            style={{ position: 'absolute', left: '86.06px', top: '440.39px' }}
            className="cls_003"
          >
            <span className="cls_003">1</span>
          </div>
          <div
            style={{ position: 'absolute', left: '109.46px', top: '440.39px' }}
            className="cls_008"
          >
            <span className="cls_008">{this.props.item}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '352.03px', top: '440.39px' }}
            className="cls_003"
          >
            <span className="cls_003">
              <NumberFormat
                thousandSeparator={'.'}
                decimalSeparator=","
                value={this.props.itemQuantity}
              />
              {`${this.props.itemUnit}`}
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '437.59px', top: '440.39px' }}
            className="cls_003"
          >
            <span className="cls_003">
              <NumberFormat
                thousandSeparator={'.'}
                decimalSeparator=","
                value={this.props.sourcePrice}
              />
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '499.78px', top: '440.39px' }}
            className="cls_003"
          >
            <span className="cls_003">
              <NumberFormat
                thousandSeparator={'.'}
                decimalSeparator=","
                value={this.props.itemQuantity * this.props.sourcePrice}
              />
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '109.46px', top: '453.95px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.props.itemDescription}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '109.46px', top: '481.91px' }}
            className="cls_003"
          >
            <span className="cls_003">Wiegeschein 13.134</span>
          </div>
          <div
            style={{ position: 'absolute', left: '72.98px', top: '509.51px' }}
            className="cls_008"
          >
            <span className="cls_008">Gesamtbetrag*</span>
          </div>
          <div
            style={{ position: 'absolute', left: '499.78px', top: '509.51px' }}
            className="cls_008"
          >
            <span className="cls_008">6.185,40</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '539.39px' }}
            className="cls_003"
          >
            <span className="cls_003">
              *Reverse-Charge-Verfahren. Der Rechnungsbetrag enthält keine Umsatzsteuer. Die Steuer
              wird
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '555.47px' }}
            className="cls_003"
          >
            <span className="cls_003">
              gemäß §13b Abs 2 Nr. 7 UstG vom Leistungsempfänger geschuldet.
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '577.43px' }}
            className="cls_003"
          >
            <span className="cls_003">
              14 Zahlungsziel 14 Tage nach Rechnungsdatum, ohne Abzug.
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '596.51px' }}
            className="cls_003"
          >
            <span className="cls_003">Vielen Dank für die gute Zusammenarbeit.</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '763.58px' }}
            className="cls_005"
          >
            <span className="cls_005">USt-IdNr.: DE306470110</span>
          </div>
          <div
            style={{ position: 'absolute', left: '313.01px', top: '763.58px' }}
            className="cls_005"
          >
            <span className="cls_005">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '772.46px' }}
            className="cls_005"
          >
            <span className="cls_005">Steuernummer: 19/208/10290</span>
          </div>
          <div
            style={{ position: 'absolute', left: '313.01px', top: '772.58px' }}
            className="cls_015"
          >
            <span className="cls_015">Volksbank Südheide - Isenhagener Land - Altmark</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '780.98px' }}
            className="cls_005"
          >
            <span className="cls_005">{`${this.props.zipcode} ${this.props.city}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '313.01px', top: '780.98px' }}
            className="cls_005"
          >
            <span className="cls_005">IBAN: {this.props.iban}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '789.50px' }}
            className="cls_005"
          >
            <span className="cls_005">{`${this.props.zipcode} ${this.props.city}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '313.01px', top: '790.10px' }}
            className="cls_005"
          >
            <span className="cls_005">BIC: {this.props.bic}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.06px', top: '798.64px' }}
            className="cls_005"
          >
            <span className="cls_005">Geschäftsführer: Kai Hoyer</span>
          </div>
          <div
            style={{ position: 'absolute', left: '289.25px', top: '811.12px' }}
            className="cls_005"
          >
            <span className="cls_005">Seite 1/1</span>
          </div>
        </div>
      </html>
    );
  }
}

// total: 6185.40 => 6.185,40

export default Invoice;

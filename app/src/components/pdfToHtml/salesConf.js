import React from 'react';
import styles from './salesConfStyles.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// see proptypes at bottom of file for props
class SalesConf extends React.Component {
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
              '\nspan.cls_002{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}span.cls_011{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_011{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_004{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_012{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:11.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_013{font-family:Arial,serif;font-size:10.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_003{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_014{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,127);font-weight:normal;font-style:normal;text-decoration: none}\n',
          }}
        />
        <div
          style={{
            position: 'relative',
            top: 0,
            width: 655,
            height: 842,
            borderStyle: 'outset',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <img src="salesConfBackgroundPngs/background1.jpg" width="{595}" height="{841}" />
          </div>
          <div
            style={{ position: 'absolute', left: '436.80px', top: '94.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '475.20px', top: '106.10px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.companyStreet}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '404.00px', top: '117.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{`${this.props.companyZip} ${this.props.companyState}, ${this.props.companyCity}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '129.20px' }}
            className="cls_011"
          >
            <span className="cls_011">
              {`${this.props.companyName}, ${this.props.companyNameAddressLine1}`}
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '147.40px' }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.deviatingInvoiceAddress}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '354.20px', top: '147.40px' }}
            className="cls_004"
          >
            <span className="cls_004">Kontakt:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '425.00px', top: '147.40px' }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.contactName}</span>
          </div>

          <div
            style={{ position: 'absolute', left: '354.20px', top: '160.10px' }}
            className="cls_004"
          >
            <span className="cls_004">Telefon:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '425.00px', top: '160.10px' }}
            className="cls_004"
          >
            <span className="cls_004">{`${this.props.phone}`}</span>
          </div>

          <div
            style={{ position: 'absolute', left: '354.20px', top: '172.70px' }}
            className="cls_004"
          >
            <span className="cls_004">E-Mail:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '425.00px', top: '172.70px' }}
            className="cls_012"
          >
            <span className="cls_012"> </span>
            <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
          </div>
          <div
            style={{ position: 'absolute', left: '354.20px', top: '198.00px' }}
            className="cls_004"
          >
            <span className="cls_004">Datum:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '425.00px', top: '198.00px' }}
            className="cls_004"
          >
            <span className="cls_004">{`${today.getDate()}.${
              today.getMonth() + 1
            }.${today.getFullYear()}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '223.30px' }}
            className="cls_006"
          >
            <span className="cls_006">Verkaufsbestätigung</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '237.10px' }}
            className="cls_007"
          >
            <span className="cls_007">Dispo-Nummer:{` ${this.props.dispositionNumber}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '275.10px' }}
            className="cls_004"
          >
            <span className="cls_004">Sehr geehrte Damen und Herren,</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '300.40px' }}
            className="cls_004"
          >
            <span className="cls_004">
              auf Grundlage unsere allgemeinen Verkaufsbedingungen verkaufen wir Ihnen wie folgt:
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '325.70px' }}
            className="cls_007"
          >
            <span className="cls_007">Sorte/Warenbezeichnung</span>
          </div>
          <div
            style={{ position: 'absolute', left: '425.00px', top: '325.70px' }}
            className="cls_007"
          >
            <span className="cls_007">Preis/to</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '347.60px' }}
            className="cls_008"
          >
            <span className="cls_008">{`${this.props.item} (${this.props.itemID})`} </span>
          </div>
          <div
            style={{ position: 'absolute', left: '318.80px', top: '347.60px' }}
            className="cls_008"
          >
            <span className="cls_008">
              <NumberFormat
                value={this.props.price}
                displayType={'text'}
                thousandSeparator={true}
              />
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '352.06px', top: '347.60px' }}
            className="cls_008"
          >
            <span className="cls_008">
              {`${this.props.currencyUnitPrefix} `}/to Zuzahlung durch Source One
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '359.10px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.itemDescription}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '382.10px' }}
            className="cls_008"
          >
            <span className="cls_008">Menge:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '382.10px' }}
            className="cls_002"
          >
            <span className="cls_002">{`Eine Ladung - Mindestauslastung ${this.props.minLoadingWeight} ${this.props.weightUnit}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '406.00px' }}
            className="cls_008"
          >
            <span className="cls_008">Lieferbedingung:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '405.00px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.incotermType} </span>
            <span className="cls_004">{`${this.props.countryCode}-${this.props.zipcode}-${this.props.city}`} </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '429.30px' }}
            className="cls_008"
          >
            <span className="cls_008">Anlieferung:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '429.30px' }}
            className="cls_002"
          >
            <span className="cls_002">
              {`${this.props.pickupDate}`}
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '452.30px' }}
            className="cls_008"
          >
            <span className="cls_008">Entladestelle:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '452.30px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.companyNameAddressLine1}</span>
          </div>


          <div
            style={{ position: 'absolute', left: '71.00px', top: '498.30px' }}
            className="cls_008"
          >
            <span className="cls_008">Entladereferenz:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '498.30px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.unloadingReference}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '521.30px' }}
            className="cls_008"
          >
            <span className="cls_008">Zahlungsbedingungen:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '212.60px', top: '521.30px' }}
            className="cls_002"
          >
            <span className="cls_002">{`${this.props.daysToPayment} Tage`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '590.30px' }}
            className="cls_002"
          >
            <span className="cls_002">
              Bitte senden Sie uns direkt nach der Be- bzw. Einladung den Wiegeschein per E-Mail an
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '601.80px' }}
            className="cls_013"
          >
            <span className="cls_013"> </span>
            <a href="mailto:dispo@srcone.de">dispo@srcone.de</a>
            {'{'}' '{'}'}
            <span className="cls_002"> zu. Vielen Dank.</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '624.80px' }}
            className="cls_002"
          >
            <span className="cls_002">Bei Fragen, stehe wir Ihnen gerne zur Verfügung</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '659.30px' }}
            className="cls_002"
          >
            <span className="cls_002">Mit freundlichen Grüßen</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '682.30px' }}
            className="cls_002"
          >
            <span className="cls_002">Ihr Source One Team</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '752.30px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '389.60px', top: '752.30px' }}
            className="cls_003"
          >
            <span className="cls_003">{`${this.props.zipcode} ${this.props.city}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '762.30px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.companyNameAddressLine1}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '389.60px', top: '762.30px' }}
            className="cls_003"
          >
            <span className="cls_003">{`USt-IdNr.: ${this.props.ustID}`}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '71.00px', top: '772.30px' }}
            className="cls_003"
          >
            <span className="cls_003">
              E-Mail: info@srcone.de, <a href="http://www.srcone.de/">www.srcone.de</a>
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '389.60px', top: '772.30px' }}
            className="cls_003"
          >
            <span className="cls_003">Geschäftsführer: Kai Hoyer</span>
          </div>
        </div>
      </html>
    );
  }
}



export default SalesConf;

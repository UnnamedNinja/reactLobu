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
      <html>
        <div>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                '\nspan.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_012{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_009{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_009{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\n',
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
              <img
                src="./purchaseConfBackgroundPngs/background1.jpg"
                width={595}
                height={842}
              />
            </div>
            <div
              style={{ position: 'absolute', left: '440.05px', top: '130.37px' }}
              className="cls_004"
            >
              <span className="cls_004">{this.props.companyName}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '475.35px', top: '141.62px' }}
              className="cls_004"
            >
              <span className="cls_004">{this.props.companyStreet}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '402.50px', top: '152.90px' }}
              className="cls_004"
            >
              <span className="cls_004">{`${this.props.companyZip} ${this.props.companyState}, ${this.props.companyCity}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '164.15px' }}
              className="cls_012"
            >
              <span className="cls_012">
              {`${this.props.companyName}, ${this.props.companyNameAddressLine1}`}
              </span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '181.42px' }}
              className="cls_005"
            >
              <span className="cls_005">{this.props.deviatingInvoiceAddress}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '354.45px', top: '181.42px' }}
              className="cls_005"
            >
              <span className="cls_005">Kontakt:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '425.02px', top: '181.42px' }}
              className="cls_005"
            >
              <span className="cls_005">{this.props.contactName}</span>
            </div>

            <div
              style={{ position: 'absolute', left: '354.45px', top: '193.42px' }}
              className="cls_005"
            >
              <span className="cls_005">Phone:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '425.02px', top: '193.42px' }}
              className="cls_005"
            >
              <span className="cls_005">{`${this.props.phone
                .toString()
                .substr(0, 4)} ${this.props.phone
                .toString()
                .substr(5, 8)} ${this.props.phone
                .toString()
                .substr(8, 10)} ${this.props.phone
                .toString()
                .substr(10, 12)} ${this.props.phone.toString().substr(12, 14)}`}</span>
            </div>

            <div
              style={{ position: 'absolute', left: '354.45px', top: '206.20px' }}
              className="cls_005"
            >
              <span className="cls_005">E-Mail:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '425.02px', top: '206.20px' }}
              className="cls_013"
            >
              <span className="cls_013">{this.props.email}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '354.45px', top: '230.22px' }}
              className="cls_005"
            >
              <span className="cls_005">Date:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '425.02px', top: '230.22px' }}
              className="cls_005"
            >
              <span className="cls_005">{`${today.getDate()}.${
                today.getMonth() + 1
              }.${today.getFullYear()}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '243.72px' }}
              className="cls_007"
            >
              <span className="cls_007">Purchase Confirmation</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '256.50px' }}
              className="cls_008"
            >
              <span className="cls_008">Dispo-Nummer:{` ${this.props.dispositionNumber}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '293.28px' }}
              className="cls_005"
            >
              <span className="cls_005">Dear Sir or Madam,</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '318.05px' }}
              className="cls_005"
            >
              <span className="cls_005">
                on the basis of our general conditions of purchase we purchase from you as follows:
              </span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '342.07px' }}
              className="cls_008"
            >
              <span className="cls_008">Description of goods</span>
            </div>
            <div
              style={{ position: 'absolute', left: '460.32px', top: '342.07px' }}
              className="cls_008"
            >
              <span className="cls_008">Price/to</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '363.82px' }}
              className="cls_009"
            >
              <span className="cls_009">{this.props.item}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '283.10px', top: '363.82px' }}
              className="cls_009"
            >
              <span className="cls_009">{this.props.itemID}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '316.82px', top: '362.32px' }}
              className="cls_009"
            >
              <span className="cls_009">
                <NumberFormat
                  value={this.props.price}
                  displayType={'text'}
                  thousandSeparator={true}
                />
                {`${this.props.currencyUnitPrefix} `}/to additional payment by Fa.Ammer
              </span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '386.35px' }}
              className="cls_009"
            >
              <span className="cls_009">Minimum loading weight:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '212.53px', top: '384.85px' }}
              className="cls_004"
            >
              <span className="cls_004">{`${this.props.minLoadingWeight} ${this.props.weightUnit}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '409.62px' }}
              className="cls_009"
            >
              <span className="cls_009">Incoterm:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '212.53px', top: '408.12px' }}
              className="cls_004"
            >
              <span className="cls_004">
                {`${this.props.incotermType} ${this.props.countryCode}`}-
              </span>
              <span className="cls_005">{`${this.props.zipcode} ${this.props.city}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '432.15px' }}
              className="cls_009"
            >
              <span className="cls_009">Pick-up:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '212.53px', top: '430.65px' }}
              className="cls_004"
            >
              <span className="cls_004">{Object.values(this.props.pickupDate)[0]}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '454.67px' }}
              className="cls_009"
            >
              <span className="cls_009">Loading point:</span>
            </div>

            <div
              style={{ position: 'absolute', left: '212.53px', top: '465.92px' }}
              className="cls_004"
            >
              <span className="cls_004">{this.props.deviatingInvoiceAddress}</span>
            </div>

            <div
              style={{ position: 'absolute', left: '70.60px', top: '499.70px' }}
              className="cls_009"
            >
              <span className="cls_009">Loading reference:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '212.53px', top: '498.20px' }}
              className="cls_004"
            >
              <span className="cls_004">{this.props.loadingReferenceNumber}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '522.23px' }}
              className="cls_009"
            >
              <span className="cls_009">Terms of payment:</span>
            </div>
            <div
              style={{ position: 'absolute', left: '212.53px', top: '520.73px' }}
              className="cls_004"
            >
              <span className="cls_004">{`${this.props.termsOfPayment}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '566.53px' }}
              className="cls_004"
            >
              <span className="cls_004">
                Please send us the weighing slip by e-mail to dispo@srcone.de immediately after
                loading or
              </span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '577.78px' }}
              className="cls_004"
            >
              <span className="cls_004">unloading. Thanks a lot.</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '598.80px' }}
              className="cls_004"
            >
              <span className="cls_004">If you have any questions, we are at your disposal.</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '622.83px' }}
              className="cls_004"
            >
              <span className="cls_004">With kind regards</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '644.57px' }}
              className="cls_004"
            >
              <span className="cls_004">Your Source One Team</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '753.42px' }}
              className="cls_002"
            >
              <span className="cls_002">{this.props.companyName}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '389.72px', top: '753.42px' }}
              className="cls_002"
            >
              <span className="cls_002">{`${this.props.zipcode} ${this.props.city}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '763.20px' }}
              className="cls_002"
            >
              <span className="cls_002">{this.state.companyNameAddressLine1}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '389.72px', top: '763.20px' }}
              className="cls_002"
            >
              <span className="cls_002">{`USt-IdNr.: ${this.props.ustID}`}</span>
            </div>
            <div
              style={{ position: 'absolute', left: '70.60px', top: '773.70px' }}
              className="cls_002"
            >
              <span className="cls_002">E-Mail: info@srcone.de, </span>
              <a href="http://www.srcone.de/">www.srcone.de</a>{' '}
            </div>
            <div
              style={{ position: 'absolute', left: '389.72px', top: '770.70px' }}
              className="cls_002"
            >
              <span className="cls_002">Geschäftsführer: Kai Hoyer</span>
            </div>
          </div>
        </div>
      </html>
    );
  }
}


export default PurchaseConf;

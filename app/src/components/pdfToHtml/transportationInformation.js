import React from 'react';
import styles from './salesConfStyles.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// see proptypes at bottom of file for props
class TransportationInformation extends React.Component {
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
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n<!--\nspan.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: underline}\ndiv.cls_012{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_006{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_006{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_010{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_010{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n"
          }}
        />
        <div
          style={{
            position: "relative",
            top: 0,
            width: 595,
            height: 842,
            borderStyle: "outset",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <img
              src="68926d7a-d3b2-11ea-8b25-0cc47a792c0a_id_68926d7a-d3b2-11ea-8b25-0cc47a792c0a_files/background1.jpg"
              width={595}
              height={842}
            />
          </div>
          <div
            style={{ position: "absolute", left: "440.05px", top: "130.37px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: "absolute", left: "475.35px", top: "141.62px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.companyStreet}</span>
          </div>
          <div
            style={{ position: "absolute", left: "402.50px", top: "152.90px" }}
            className="cls_004"
          >
            <span className="cls_004">{`${this.props.companyZip} ${this.props.companyState}, ${this.props.companyCity}`}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "164.15px" }}
            className="cls_011"
          >
            <span className="cls_011">
              {this.props.companyNameAddressLine1}
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "354.45px", top: "181.42px" }}
            className="cls_005"
          >
            <span className="cls_005">Kontakt:</span>
          </div>
          <div
            style={{ position: "absolute", left: "425.02px", top: "181.42px" }}
            className="cls_005"
          >
            <span className="cls_005">{this.props.contactName}</span>
          </div>
          <div
            style={{ position: "absolute", left: "354.45px", top: "193.42px" }}
            className="cls_005"
          >
            <span className="cls_005">Telefon:</span>
          </div>
          <div
            style={{ position: "absolute", left: "425.02px", top: "193.42px" }}
            className="cls_005"
          >
            <span className="cls_005">{this.props.phone}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "206.20px" }}
            className="cls_012"
          >
            <span className="cls_012">Transportinformationen</span>
          </div>
          <div
            style={{ position: "absolute", left: "354.45px", top: "206.20px" }}
            className="cls_005"
          >
            <span className="cls_005">E-Mail:</span>
          </div>
          <div
            style={{ position: "absolute", left: "425.02px", top: "206.20px" }}
            className="cls_013"
          >
            <span className="cls_013">{this.props.email}</span>
          </div>
          <div
            style={{ position: "absolute", left: "354.45px", top: "218.20px" }}
            className="cls_005"
          >
            <span className="cls_005">Datum:</span>
          </div>
          <div
            style={{ position: "absolute", left: "425.02px", top: "218.20px" }}
            className="cls_005"
          >
            <span className="cls_005">{`${today.getDate()}.${
              today.getMonth() + 1
            }.${today.getFullYear()}`}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "230.22px" }}
            className="cls_005"
          >
            <span className="cls_005">Disponummer: {` ${this.props.dispositionNumber}`}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "278.25px" }}
            className="cls_006"
          >
            <span className="cls_006">Ladedaten</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "305.28px" }}
            className="cls_008"
          >
            <span className="cls_008">Ladestelle:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "303.78px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "315.80px" }}
            className="cls_004"
          >
            <span className="cls_004">Baldhamer Straße 33</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "327.05px" }}
            className="cls_004"
          >
            <span className="cls_004">85604 Zorneding</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "349.58px" }}
            className="cls_008"
          >
            <span className="cls_008">Abholung:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "348.08px" }}
            className="cls_004"
          >
            <span className="cls_004">am 19.12.2019</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "360.83px" }}
            className="cls_008"
          >
            <span className="cls_008">Ladenummer:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "359.33px" }}
            className="cls_004"
          >
            <span className="cls_004">wasd123</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "372.10px" }}
            className="cls_008"
          >
            <span className="cls_008">Be- und Entladezeiten:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "370.60px" }}
            className="cls_004"
          >
            <span className="cls_004">Mo.-Do: 06:00-12:00 und 15:00-16:00</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "383.35px" }}
            className="cls_004"
          >
            <span className="cls_004">Fr:</span>
          </div>
          <div
            style={{ position: "absolute", left: "250.80px", top: "381.85px" }}
            className="cls_004"
          >
            <span className="cls_004">05:00-12:00</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "394.60px" }}
            className="cls_008"
          >
            <span className="cls_008">EfactNR:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "393.10px" }}
            className="cls_004"
          >
            <span className="cls_004">s321231456</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "416.37px" }}
            className="cls_006"
          >
            <span className="cls_006">Entladedaten</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "442.65px" }}
            className="cls_008"
          >
            <span className="cls_008">Entladestelle:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "441.15px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "453.92px" }}
            className="cls_004"
          >
            <span className="cls_004">Baldhamer Straße 33</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "465.17px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.companyName} Zorneding</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "486.95px" }}
            className="cls_008"
          >
            <span className="cls_008">Anlieferung :</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "485.45px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.date}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "498.20px" }}
            className="cls_008"
          >
            <span className="cls_008">Entladenummer:</span>
          </div>
          <div
            style={{ position: "absolute", left: "247.80px", top: "496.70px" }}
            className="cls_004"
          >
            <span className="cls_004">asd456</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "509.47px" }}
            className="cls_008"
          >
            <span className="cls_008">Be- und Entladezeiten:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "507.97px" }}
            className="cls_004"
          >
            <span className="cls_004">Mo.-Do: 06:00-12:00 und 15:00-16:00</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "520.72px" }}
            className="cls_004"
          >
            <span className="cls_004">Fr:</span>
          </div>
          <div
            style={{ position: "absolute", left: "250.80px", top: "519.22px" }}
            className="cls_004"
          >
            <span className="cls_004">05:00-12:00</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "531.97px" }}
            className="cls_008"
          >
            <span className="cls_008">EfactNR:</span>
          </div>
          <div
            style={{ position: "absolute", left: "212.53px", top: "530.47px" }}
            className="cls_004"
          >
            <span className="cls_004">{this.props.efactNumber}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "598.80px" }}
            className="cls_004"
          >
            <span className="cls_004">
              Bei Fragen, stehe wir Ihnen gerne zur Verf ügung
            </span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "634.08px" }}
            className="cls_004"
          >
            <span className="cls_004">Mit freundlichen Grüßen</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "655.85px" }}
            className="cls_004"
          >
            <span className="cls_004">Ihr Source One Team</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "753.42px" }}
            className="cls_002"
          >
            <span className="cls_002">{this.props.companyName}</span>
          </div>
          <div
            style={{ position: "absolute", left: "389.72px", top: "753.42px" }}
            className="cls_002"
          >
            <span className="cls_002">{`${this.props.zipcode} ${this.props.city}`}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "763.20px" }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.companyNameAddressLine1}</span>
          </div>
          <div
            style={{ position: "absolute", left: "389.72px", top: "763.20px" }}
            className="cls_002"
          >
            <span className="cls_002">{`USt-IdNr.: ${this.props.ustID}`}</span>
          </div>
          <div
            style={{ position: "absolute", left: "70.60px", top: "773.70px" }}
            className="cls_002"
          >
            <span className="cls_002">E-Mail: info@srcone.de, </span>
            <a href="http://www.srcone.de/">www.srcone.de</a>{" "}
          </div>
          <div
            style={{ position: "absolute", left: "389.72px", top: "770.70px" }}
            className="cls_002"
          >
            <span className="cls_002">Geschäftsführer: Kai Hoyer</span>
          </div>
        </div>
      </div>

    );
  }
}



export default TransportationInformation;

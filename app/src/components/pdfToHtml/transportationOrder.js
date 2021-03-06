import React from 'react';
import styles from './salesConfStyles.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// see proptypes at bottom of file for props
class TransportationOrder extends React.Component {
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
          "\n<!--\nspan.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_004{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_012{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_012{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_005{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_013{font-family:Arial,serif;font-size:11.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_007{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_007{font-family:Arial,serif;font-size:11.3px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_008{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\ndiv.cls_008{font-family:Arial,serif;font-size:9.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}\nspan.cls_014{font-family:Arial,serif;font-size:9.8px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_014{font-family:Arial,serif;font-size:9.8px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\ndiv.cls_002{font-family:Arial,serif;font-size:8.3px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}\nspan.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: underline}\ndiv.cls_011{font-family:Arial,serif;font-size:8.3px;color:rgb(4,98,193);font-weight:normal;font-style:normal;text-decoration: none}\n-->\n"
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
          src="0faca51a-d3b5-11ea-8b25-0cc47a792c0a_id_0faca51a-d3b5-11ea-8b25-0cc47a792c0a_files/background1.jpg"
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
        className="cls_012"
      >
        <span className="cls_012">
            {`${this.props.companyName}, ${this.props.companyNameAddressLine1}`}
        </span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "181.42px" }}
        className="cls_005"
      >
        <span className="cls_005">Spedition Logistik GmbH &amp; Co. KG</span>
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
        <span className="cls_005">{this.props.firstName}</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "193.42px" }}
        className="cls_005"
      >
        <span className="cls_005">Baldhamer Straße 33</span>
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
        className="cls_005"
      >
        <span className="cls_005">85604 Zorneding</span>
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
        <span className="cls_005">{this.props.date}</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "230.22px" }}
        className="cls_007"
      >
        <span className="cls_007">Dispo-Nummer: 20191207</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "267.00px" }}
        className="cls_005"
      >
        <span className="cls_005">Sehr geehrte Damen und Herren,</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "291.78px" }}
        className="cls_005"
      >
        <span className="cls_005">
          hiermit bestätigen wir Ihnen folgenden Auftrag:
        </span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "316.55px" }}
        className="cls_007"
      >
        <span className="cls_007">Transportauftrag</span>
      </div>
      <div
        style={{ position: "absolute", left: "425.02px", top: "316.55px" }}
        className="cls_007"
      >
        <span className="cls_007">Preis</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "338.30px" }}
        className="cls_008"
      >
        <span className="cls_008">Transport von </span>
        <span className="cls_004">85604 Zorneding nach 85604 Zorneding</span>
      </div>
      <div
        style={{ position: "absolute", left: "425.02px", top: "338.30px" }}
        className="cls_004"
      >
        <span className="cls_004">850€</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "360.83px" }}
        className="cls_008"
      >
        <span className="cls_008">Material:</span>
      </div>
      <div
        style={{ position: "absolute", left: "212.53px", top: "359.33px" }}
        className="cls_004"
      >
        <span className="cls_004">310er</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "372.10px" }}
        className="cls_008"
      >
        <span className="cls_008">Fahrzeug:</span>
      </div>
      <div
        style={{ position: "absolute", left: "212.53px", top: "370.60px" }}
        className="cls_004"
      >
        <span className="cls_004">Walkingf loor</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "383.35px" }}
        className="cls_008"
      >
        <span className="cls_008">Zahlungsbedingungen</span>
        <span className="cls_004">:</span>
      </div>
      <div
        style={{ position: "absolute", left: "212.53px", top: "381.85px" }}
        className="cls_004"
      >
        <span className="cls_004">30 Tage nach Rechnungstellung</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "405.12px" }}
        className="cls_007"
      >
        <span className="cls_007">Ladedaten</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "431.40px" }}
        className="cls_008"
      >
        <span className="cls_008">Ladestelle:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "431.40px" }}
        className="cls_004"
      >
        <span className="cls_004">Ammer Entsorgungs GmbH &amp; Co.KG</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "431.40px" }}
        className="cls_008"
      >
        <span className="cls_008">Be- und Entladezeiten:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "442.65px" }}
        className="cls_004"
      >
        <span className="cls_004">Baldhamer Straße 33</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "441.15px" }}
        className="cls_004"
      >
        <span className="cls_004">Mo.-Do: 06:00-12:00 und 15:00-16:00</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "453.92px" }}
        className="cls_004"
      >
        <span className="cls_004">85604 Zorneding</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "453.92px" }}
        className="cls_004"
      >
        <span className="cls_004">Fr:</span>
      </div>
      <div
        style={{ position: "absolute", left: "392.75px", top: "453.92px" }}
        className="cls_004"
      >
        <span className="cls_004">05:00-12:00</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "475.68px" }}
        className="cls_008"
      >
        <span className="cls_008">Abholung:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "474.18px" }}
        className="cls_004"
      >
        <span className="cls_004">am 19.12.2019</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "485.45px" }}
        className="cls_008"
      >
        <span className="cls_008">Ladenummer:</span>
        <span className="cls_004"> wasd123</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "498.20px" }}
        className="cls_008"
      >
        <span className="cls_008">Avisierung:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "496.70px" }}
        className="cls_014"
      >
        <span className="cls_014">{this.props.email}</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "519.97px" }}
        className="cls_007"
      >
        <span className="cls_007">Entladedaten</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "546.25px" }}
        className="cls_008"
      >
        <span className="cls_008">Entladestelle:</span>
        <span className="cls_004"> Ammer Entsorgungs GmbH &amp; Co.KG</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "544.75px" }}
        className="cls_008"
      >
        <span className="cls_008">Be- und Entladezeiten:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "557.50px" }}
        className="cls_004"
      >
        <span className="cls_004">Baldhamer Straße 33</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "557.50px" }}
        className="cls_004"
      >
        <span className="cls_004">Mo.-Do: 06:00-12:00 und 15:00-16:00</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "568.78px" }}
        className="cls_004"
      >
        <span className="cls_004">85604 Zorneding</span>
      </div>
      <div
        style={{ position: "absolute", left: "354.45px", top: "568.78px" }}
        className="cls_004"
      >
        <span className="cls_004">Fr:</span>
      </div>
      <div
        style={{ position: "absolute", left: "392.75px", top: "568.78px" }}
        className="cls_004"
      >
        <span className="cls_004">05:00-12:00</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "589.78px" }}
        className="cls_008"
      >
        <span className="cls_008">Anlieferung :</span>
        <span className="cls_004"> am 20.12.2019</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "601.05px" }}
        className="cls_008"
      >
        <span className="cls_008">Ladenummer:</span>
        <span className="cls_004"> asd456</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "613.80px" }}
        className="cls_008"
      >
        <span className="cls_008">Avisierung:</span>
      </div>
      <div
        style={{ position: "absolute", left: "141.18px", top: "612.30px" }}
        className="cls_014"
      >
        <span className="cls_014">{this.props.email}</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "658.10px" }}
        className="cls_004"
      >
        <span className="cls_004">
          Bei Fragen, stehe wir Ihnen gerne zur Verf ügung
        </span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "692.62px" }}
        className="cls_004"
      >
        <span className="cls_004">Mit freundlichen Grüßen</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "713.65px" }}
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
        <span className="cls_002">HRB 206389 Amtsgericht Hildesheim</span>
      </div>
      <div
        style={{ position: "absolute", left: "70.60px", top: "763.20px" }}
        className="cls_002"
      >
        <span className="cls_002">{`${this.props.companyZip} ${this.props.companyState}, ${this.props.companyCity}`}</span>
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


export default TransportationOrder;

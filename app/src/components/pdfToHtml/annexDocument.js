import React from 'react';
import { Document } from 'react-pdf';
import styles from './pdfstyles.css';
var url = require('./pngurl');
import PropTypes from 'prop-types';

// see proptypes at bottom of file for props
class OrderDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; // could add props to state... at least the props
    // that could change as user keeps editing (so that would be all of them except maybe person name1 and name2...)
  }

  componentWillMount = () => {};

  render() {
    return (
      <html>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>annexDoc</title>
          <meta name="generator" content="BCL easyConverter SDK 5.0.210" />
        </head>
        <div
        style={{
          position: 'relative',
          top: 0,
          width: 655,
          height: 842,
          borderStyle: 'outset',
          overflow: 'hidden',
        }}>

        <body style={styles}>
          <div id="page_1">
            {/*<div id="p1dimg1"><img src={"data:"+url} id="p1img1" /></div> */}
            <div id="id1_1">
              <p className="p0 ft0">MITZUFÜHRENDE INFORMATIONEN FÜR DIE VERBRINGUNG</p>
              <p className="p1 ft1">DER IN ARTIKEL 3, ABSÄTZE 2 UND 4 GENANNTEN ABFÄLLE</p>
              <p className="p2 ft4">
                VERSANDINFORMATIONEN <span className="ft2">(</span>
                <span className="ft3">1</span>
                <span className="ft2">)</span>
              </p>
              <table cellPadding={0} cellSpacing={0} className="t0">
                <tr>
                  <td colSpan={5} className="tr0 td0">
                    <p className="p3 ft5">1. Person, die die Verbringung veranlasst:</p>
                  </td>
                  <td colSpan={5} className="tr0 td1">
                    <p className="p4 ft5">2. Importeur / Empfänger:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft7">
                      <span className="ft6">Name: </span>
                      {this.props.contactPersonCompanyName}
                    </p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Name: {this.props.importerCompanyName}</p>
                  </td>
                  <td className="tr1 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr0 td11">
                    <p className="p3 ft9">
                      <span className="ft6">Anschrift: </span>
                      {this.props.contactPersonAddress}
                    </p>
                  </td>
                  <td className="tr0 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr0 td7">
                    <p className="p4 ft6">Anschrift: {this.props.importerAddress}</p>
                  </td>
                  <td className="tr0 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr2 td11">
                    <p className="p3 ft7">
                      <span className="ft6">Kontaktperson: </span>
                      {`${this.props.contactPersonSalutation},
                        ${this.props.contactPersonName1},
                        ${this.props.contactPersonName2}`}
                    </p>
                  </td>
                  <td className="tr2 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr2 td7">
                    <p className="p4 ft6">
                      Kontaktperson:
                      {`${this.props.importerSalutation},
                        ${this.props.importerName1},
                        ${this.props.importerName2}`}
                    </p>
                  </td>
                  <td className="tr2 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft7">
                      <span className="ft6">Tel.: </span>
                      {this.props.contactPersonPhoneNumber}
                    </p>
                  </td>
                  <td colSpan={2} className="tr1 td12">
                    <p className="p6 ft6">Fax: N/V</p>
                  </td>
                  <td className="tr1 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Tel.: {this.props.importerPhoneNumber}</p>
                  </td>
                  <td className="tr1 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td10">
                    <p className="p7 ft6">Fax: {this.props.importerFax}</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft7">
                      <nobr>
                        <span className="ft6">E-Mail:</span>
                      </nobr>
                      <span className="ft6"> </span>
                      {this.props.contactPersonEmail}
                    </p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">
                      <nobr>E-Mail: {this.props.importerEmail}</nobr>
                    </p>
                  </td>
                  <td className="tr1 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr3 td13">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td14">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td15">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td16">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td17">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td18">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td19">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td20">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td21">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td22">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft5">3. Tatsächliche Menge:</p>
                  </td>
                  <td colSpan={2} className="tr1 td12">
                    <p className="p5 ft6">Tonnen (Mg):</p>
                  </td>
                  <td className="tr1 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={5} rowSpan={2} className="tr4 td23">
                    <p className="p4 ft5">4. Tatsächliches Datum der Verbringung:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr5 td2">
                    <p className="p5 ft11">&nbsp;</p>
                  </td>
                  <td className="tr5 td3">
                    <p className="p5 ft11">&nbsp;</p>
                  </td>
                  <td rowSpan={2} className="tr1 td4">
                    <p className="p8 ft6">m³:</p>
                  </td>
                  <td className="tr5 td5">
                    <p className="p5 ft11">&nbsp;</p>
                  </td>
                  <td className="tr5 td6">
                    <p className="p5 ft11">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr6 td2">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td3">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td5">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td6">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td24">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td25">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td8">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td9">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                  <td className="tr6 td10">
                    <p className="p5 ft12">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="tr7 td26">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td15">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td16">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td17">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td18">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td19">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr7 td27">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td className="tr7 td22">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr1 td28">
                    <p className="p3 ft5">
                      5.(a) 1. Transportunternehmen <span className="ft14">(</span>
                      <span className="ft15">2</span>
                      <span className="ft14">)</span>:
                    </p>
                  </td>
                  <td colSpan={4} className="tr1 td29">
                    <p className="p4 ft5">5.(b): 2. Transportunternehmen:</p>
                  </td>
                  <td colSpan={3} className="tr1 td30">
                    <p className="p4 ft5">5.(c): 3. Transportunternehmen:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr0 td2">
                    <p className="p3 ft6">Name:</p>
                    {this.props.transportCompanyCompanyName}
                  </td>
                  <td className="tr0 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr0 td7">
                    <p className="p4 ft6">Name:</p>
                  </td>
                  <td className="tr0 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr0 td30">
                    <p className="p4 ft6">Name:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft6">Anschrift: {this.props.transportCompanyAddress}</p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Anschrift:</p>
                  </td>
                  <td className="tr1 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr1 td30">
                    <p className="p4 ft6">Anschrift:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft6">Kontaktperson:</p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Kontaktperson:</p>
                  </td>
                  <td className="tr1 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr1 td30">
                    <p className="p4 ft6">Kontaktperson:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft6">Tel : {this.props.phone}</p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Tel.:</p>
                  </td>
                  <td className="tr1 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr1 td30">
                    <p className="p4 ft6">Tel.:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr0 td2">
                    <p className="p3 ft6">
                      <nobr>E-Mail: {this.props.transportCompanyEmail}</nobr>
                    </p>
                  </td>
                  <td className="tr0 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr0 td7">
                    <p className="p4 ft6">Fax:</p>
                  </td>
                  <td className="tr0 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr0 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr0 td30">
                    <p className="p4 ft6">Fax:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr8 td2">
                    <p className="p3 ft17">
                      Transportart: <span className="ft16">LKW</span>
                    </p>
                  </td>
                  <td className="tr8 td3">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td31">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr9 td7">
                    <p className="p4 ft6">
                      <nobr>E-Mail:</nobr>
                    </p>
                  </td>
                  <td className="tr8 td24">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td32">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td colSpan={3} rowSpan={2} className="tr9 td30">
                    <p className="p4 ft6">
                      <nobr>E-Mail:</nobr>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr1 td2">
                    <p className="p3 ft6">Übergabedatum:</p>
                  </td>
                  <td className="tr10 td3">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td31">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td24">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td32">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr11 td3">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td31">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr1 td7">
                    <p className="p4 ft6">Transportart:</p>
                  </td>
                  <td className="tr11 td24">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td32">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td colSpan={3} rowSpan={2} className="tr1 td30">
                    <p className="p4 ft6">Transportart:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr10 td2">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td3">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td31">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td24">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td32">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr9 td2">
                    <p className="p3 ft6">Unterschrift:</p>
                  </td>
                  <td className="tr9 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr9 td7">
                    <p className="p4 ft6">Übergabedatum:</p>
                  </td>
                  <td className="tr9 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr9 td30">
                    <p className="p4 ft6">Übergabedatum:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr12 td2">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr12 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr12 td31">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr12 td7">
                    <p className="p4 ft6">Unterschrift:</p>
                  </td>
                  <td className="tr12 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr12 td32">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr12 td30">
                    <p className="p4 ft6">Unterschrift:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr13 td13">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td14">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td33">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td16">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td34">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td18">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td35">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr13 td27">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td22">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr8 td2">
                    <p className="p3 ft23">
                      6. Abfallerzeuger <span className="ft22">(</span>
                      <span className="ft15">3</span>
                      <span className="ft22">)</span>
                    </p>
                  </td>
                  <td className="tr8 td3">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td4">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td5">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td6">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td colSpan={5} className="tr8 td23">
                    <p className="p4 ft23">
                      8. Verwertungsverfahren (oder gegebenenfalls Beseitigungs-
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} rowSpan={2} className="tr9 td36">
                    <p className="p3 ft5">Ersterzeuger, Neuerzeuger oder Einsammler:</p>
                  </td>
                  <td colSpan={5} className="tr8 td23">
                    <p className="p4 ft23">verfahren bei in Artikel 3 Absatz 4 genannten Abfällen):</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr10 td24">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td25">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td8">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td9">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td10">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr2 td2">
                    <p className="p3 ft6">Name: {this.props.wasteProducerCompanyName}</p>
                  </td>
                  <td className="tr2 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr2 td7">
                    <p className="p4 ft6">
                      <nobr>R-Code /</nobr> <nobr>D-Code :</nobr> {this.props.rCodedCode}
                    </p>
                  </td>
                  <td className="tr2 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr2 td2">
                    <p className="p3 ft6">Anschrift: {this.props.wasteProducerAddress}</p>
                  </td>
                  <td className="tr2 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr2 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td18">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td19">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td20">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td21">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td22">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr8 td2">
                    <p className="p3 ft17">
                      Kontaktperson:
                      {`${this.props.wasteProducerPersonSalutation},
                        ${this.props.wasteProducerPersonName1},
                        ${this.props.wasteProducerPersonName2}`}
                    </p>
                  </td>
                  <td className="tr8 td3">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td4">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td5">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td6">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td colSpan={5} className="tr8 td23">
                    <p className="p4 ft23">9. Übliche Bezeichnung der Abfälle:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr8 td2">
                    <p className="p3 ft17">Tel.: {this.props.wasteProducerPhoneNumber}</p>
                  </td>
                  <td colSpan={2} className="tr8 td12">
                    <p className="p9 ft17">Fax: {this.props.wasteProducerFax}</p>
                  </td>
                  <td className="tr8 td5">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td6">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td24">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td25">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td8">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td9">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td10">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td2">
                    <p className="p3 ft6">
                      <nobr>E-Mail: {this.props.wasteProducerEmail}</nobr>
                    </p>
                  </td>
                  <td className="tr1 td3">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td24">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td25">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td9">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td10">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr14 td13">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td14">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td15">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td16">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td17">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td18">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr14 td37">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td21">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td22">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr12 td2">
                    <p className="p3 ft5">7. Verwertungsanlage</p>
                  </td>
                  <td colSpan={2} className="tr12 td12">
                    <p className="p10 ft5">Labor</p>
                  </td>
                  <td className="tr12 td5">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr12 td6">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr12 td38">
                    <p className="p4 ft5">10. Abfallidentifizierung</p>
                  </td>
                  <td colSpan={2} className="tr12 td39">
                    <p className="p5 ft14">
                      (einschlägige Codes angeben)<span className="ft6">:</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="tr14 td2">
                    <p className="p3 ft25">Name:</p>
                  </td>
                  <td className="tr14 td3">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td4">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td5">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td6">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr4 td7">
                    <p className="p11 ft6">i) Basel Anlage IX :</p>
                  </td>
                  <td className="tr14 td8">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td9">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td rowSpan={2} className="tr4 td10">
                    <p className="p12 ft7">B3010</p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr1 td2">
                    <p className="p3 ft6">Anschrift: {this.props.recoveryFacilityAddress}</p>
                  </td>
                  <td className="tr15 td3">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td4">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td5">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td6">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td8">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td9">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr15 td3">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td4">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td5">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td6">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td colSpan={5} rowSpan={2} className="tr1 td23">
                    <p className="p11 ft6">ii) OECD (falls abweichend von i)):</p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr1 td2">
                    <p className="p3 ft6">
                      Kontaktperson:
                      {`${this.props.recoveryFacilityPersonSalutation},
                        ${this.props.recoveryFacilityPersonName1},
                        ${this.props.recoveryFacilityPersonName2}`}
                    </p>
                  </td>
                  <td className="tr15 td3">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td4">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td5">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td6">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr15 td3">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td4">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td5">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td6">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr9 td7">
                    <p className="p11 ft6">
                      iii) Anhang IIIA <span className="ft14">(</span>
                      <span className="ft15">4</span>
                      <span className="ft14">):</span>
                    </p>
                  </td>
                  <td className="tr15 td8">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td9">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                  <td className="tr15 td10">
                    <p className="p5 ft26">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr1 td2">
                    <p className="p3 ft6">Tel.: {this.props.recoveryFacilityPhoneNumber}</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr1 td12">
                    <p className="p6 ft6">Fax: {this.props.recoveryFacilityFax}</p>
                  </td>
                  <td className="tr13 td5">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td6">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td8">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td9">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td10">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr16 td5">
                    <p className="p5 ft27">&nbsp;</p>
                  </td>
                  <td className="tr16 td6">
                    <p className="p5 ft27">&nbsp;</p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr9 td7">
                    <p className="p11 ft6">
                      iv) Anhang IIIB <span className="ft14">(</span>
                      <span className="ft15">5</span>
                      <span className="ft14">):</span>
                    </p>
                  </td>
                  <td className="tr16 td8">
                    <p className="p5 ft27">&nbsp;</p>
                  </td>
                  <td className="tr16 td9">
                    <p className="p5 ft27">&nbsp;</p>
                  </td>
                  <td className="tr16 td10">
                    <p className="p5 ft27">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr1 td2">
                    <p className="p3 ft6">
                      <nobr>E-Mail: {this.props.recoveryFacilityEmail}</nobr>
                    </p>
                  </td>
                  <td className="tr11 td3">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td4">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td5">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td6">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td8">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td9">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                  <td className="tr11 td10">
                    <p className="p5 ft20">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr10 td3">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td4">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td5">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td6">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td colSpan={3} rowSpan={2} className="tr14 td38">
                    <p className="p11 ft25">
                      v) <nobr>EU-Abfallverzeichnis:</nobr>
                    </p>
                  </td>
                  <td colSpan={2} rowSpan={2} className="tr14 td39">
                    <p className="p13 ft28">191204</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr3 td2">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td3">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td4">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td5">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td className="tr3 td6">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr9 td13">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td14">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td15">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td16">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td17">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr9 td40">
                    <p className="p11 ft6">vi) Nationaler Code:</p>
                  </td>
                  <td className="tr9 td20">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td21">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr9 td22">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr8 td13">
                    <p className="p3 ft23">11. Betroffene Staaten:</p>
                  </td>
                  <td className="tr8 td14">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td15">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td16">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td34">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td18">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td19">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td20">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td21">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                  <td className="tr8 td22">
                    <p className="p5 ft18">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="tr14 td41">
                    <p className="p14 ft25">Ausfuhrstaat / Versandstaat</p>
                  </td>
                  <td className="tr14 td15">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td colSpan={4} className="tr14 td42">
                    <p className="p15 ft25">Durchfuhrstaat(en)</p>
                  </td>
                  <td className="tr14 td20">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td43">
                    <p className="p5 ft24">&nbsp;</p>
                  </td>
                  <td className="tr14 td22">
                    <p className="p16 ft25">Einfuhrstaat / Empfängerstaat</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr17 td2">
                    <p className="p17 ft9">{this.props.exportingCountry}</p>
                  </td>
                  <td className="tr17 td44">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td4">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td45">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td46">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td47">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td25">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td8">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td48">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr17 td10">
                    <p className="p18 ft9">AT</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr10 td13">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td49">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td15">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td50">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td34">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td51">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td19">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td20">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td43">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                  <td className="tr10 td22">
                    <p className="p5 ft19">&nbsp;</p>
                  </td>
                </tr>
              </table>
              <p className="p19 ft32">
                <span className="ft29">12.</span>
                <span className="ft30">Erklärung der die Verbringung veranlassenden Person: </span>Ich
                erkläre hiermit, dass die obigen Informationen nach meinem besten Wissen vollständig
                sind und der Wahrheit entsprechen. Ich erkläre ferner, dass mit dem Empfänger
                wirksame vertragliche Verpflichtungen schriftlich eingegangen wurden{' '}
                <span className="ft31">
                  (ist bei den in Artikel 3 Absatz 4 genannten Abfällen nicht erforderlich)
                </span>
                :
              </p>
              <table cellPadding={0} cellSpacing={0} className="t1">
                <tr>
                  <td className="tr1 td52">
                    <p className="p5 ft7">
                      <span className="ft6">Name: </span>Armin Rösch
                    </p>
                  </td>
                  <td className="tr1 td53">
                    <p className="p5 ft7">
                      <span className="ft6">Datum: </span>17.03.2020
                    </p>
                  </td>
                  <td className="tr1 td54">
                    <p className="p5 ft6">Unterschrift:</p>
                  </td>
                </tr>
              </table>
              <p className="p20 ft5">13. Unterschrift des Empfängers bei Entgegennahme der Abfälle:</p>
              <p className="p21 ft6">
                Name:<span style={{ paddingLeft: '172px' }}>Datum:</span>
                <span style={{ paddingLeft: '152px' }}>Unterschrift:</span>
              </p>
              <table cellPadding={0} cellSpacing={0} className="t2">
                <tr>
                  <td className="tr18 td55">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr18 td56">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td colSpan={2} className="tr18 td57">
                    <p className="p17 ft4">VON DER VERWERTUNGSANLAGE ODER VOM LABOR AUSZUFÜLLEN:</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="tr0 td58">
                    <p className="p3 ft5">14. Eingang</p>
                  </td>
                  <td className="tr0 td59">
                    <p className="p5 ft6">bei der Verwertungsanlage:</p>
                  </td>
                  <td className="tr0 td60">
                    <p className="p5 ft6">In Empfang genommene Menge: Tonnen (Mg):</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr1 td61">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td62">
                    <p className="p5 ft8">&nbsp;</p>
                  </td>
                  <td className="tr1 td59">
                    <p className="p5 ft6">oder beim Labor:</p>
                  </td>
                  <td className="tr1 td60">
                    <p className="p22 ft6">m³:</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="tr17 td58">
                    <p className="p3 ft6">Name:</p>
                  </td>
                  <td className="tr17 td59">
                    <p className="p23 ft6">Datum:</p>
                  </td>
                  <td className="tr17 td60">
                    <p className="p24 ft6">Unterschrift:</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr7 td55">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr7 td63">
                    <p className="p5 ft13">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td className="tr9 td61">
                    <p className="p25 ft34">
                      (<span className="ft33">1</span>)
                    </p>
                  </td>
                  <td colSpan={3} className="tr9 td64">
                    <p className="p17 ft35">
                      Mitzuführende Informationen bei der Verbringung der in der grünen Liste
                      aufgeführten Abfälle, die zur Verwertung bestimmt sind, oder von Abfällen, die
                      für eine Laboranalyse
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="tr3 td61">
                    <p className="p5 ft10">&nbsp;</p>
                  </td>
                  <td colSpan={3} className="tr3 td64">
                    <p className="p17 ft36">
                      bestimmt sind, gemäß der Verordnung (EG) Nr. 1013/2006. Beim Ausfüllen dieses
                      Formulars sind auch die spezifischen Anweisungen im Anhang IC der Verordnung
                      (EG) Nr.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr18 td61">
                    <p className="p25 ft34">
                      (<span className="ft33">2</span>)
                    </p>
                  </td>
                  <td colSpan={2} className="tr13 td65">
                    <p className="p17 ft37">1013/2006 zu berücksichtigen.</p>
                  </td>
                  <td className="tr13 td60">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr13 td64">
                    <p className="p17 ft37">
                      Bei mehr als 3 Transportunternehmen sind die unter Nummer 5 a), b), c)
                      verlangten Informationen beizufügen.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="tr3 td61">
                    <p className="p25 ft38">
                      (<span className="ft33">3</span>)
                    </p>
                  </td>
                  <td colSpan={3} className="tr3 td64">
                    <p className="p17 ft36">
                      Wenn es sich bei der Person, die die Verbringung veranlasst, nicht um den
                      Erzeuger oder Einsammler handelt, sind auch Informationen zum Erzeuger oder
                      Einsammler
                    </p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr18 td61">
                    <p className="p25 ft34">
                      (<span className="ft33">4</span>)
                    </p>
                  </td>
                  <td className="tr13 td62">
                    <p className="p17 ft37">anzugeben.</p>
                  </td>
                  <td className="tr13 td59">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                  <td className="tr13 td60">
                    <p className="p5 ft21">&nbsp;</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr13 td64">
                    <p className="p17 ft35">
                      Der/die entsprechende(n) Code(s) gemäß Anhang IIIA der Verordnung (EG) Nr.
                      1013/2006 ist/sind – gegebenenfalls hintereinander – anzugeben. Bestimmte
                      Einträge des Basler
                    </p>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className="tr4 td61">
                    <p className="p25 ft34">
                      (<span className="ft33">5</span>)
                    </p>
                  </td>
                  <td colSpan={3} className="tr3 td64">
                    <p className="p17 ft38">
                      Übereinkommens wie B1100, B3010 oder B3020 sind, wie im Anhang IIIA angegeben,
                      auf bestimmte Abfallströme beschränkt.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="tr11 td64">
                    <p className="p17 ft34">
                      Es sind die im Anhang IIIB der Verordnung (EG) Nr. 1013/2006 aufgeführten{' '}
                      <nobr>BEU-Codes</nobr> zu verwenden.
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </body>
        </div>
      </html>
    );
  }
}

// if needed here are some order props we can definitely pull - these might be what get passed as props in converter.js
/*
'fieldAgent': ctx.request.body["Field Agent"],
'orderNumber': 0,
'officeStaff': ctx.request.body["Office Staff"],
'source': ctx.request.body["Source"],
'deviatingInvoiceAddress': ctx.request.body["Deviating Invoice Address"],
'processor': ctx.request.body["Processor"],
'forwarder': ctx.request.body["Forwarder"],
'vehicle': ctx.request.body["Vehicle"],
'category': ctx.request.body["Category"],
'minLoadingWeight': ctx.request.body["Minimum Loading Weight"],
'transportationBudget':ctx.request.body["Transportation Budget"],
'shippingCost': ctx.request.body["Shipping Cost"],
'currency': ctx.request.body["Currency"],
'incotermSource': ctx.request.body["Source: Incoterm"],
'incotermProcessor': ctx.request.body["Processor: Incoterm"],
'collectionSource': ctx.request.body["Source: Collection"],
'deliveryProcess':ctx.request.body["Process: Delivery"],
'pickupDate': ctx.request.body["Pickup Date"],
'deliveryDate': ctx.request.body["Delivery Date"],
'loadingReferenceSource':ctx.request.body["Source: Loading reference"],
'loadingReferenceProcessor':ctx.request.body["Processor: Loading reference"],
'annexDocument': ctx.request.body["Annex Document"],
'purchaseConfirmation': ctx.request.body["Purchase Confirmation"],
'salesConfirmation': ctx.request.body["Sales Confirmation"],
'transportationInformation': ctx.request.body["Transportation Information"],
'invoiceDocument': ctx.request.body["Invoice Document"],
'transportationOrder': ctx.request.body["Transportation Order"],
'annexDocumentDate': ctx.request.body["Annex Document Date"],
'purchaseConfirmationDate': ctx.request.body["Purchase Confirmation Date"],
'salesConfirmationDate': ctx.request.body["Sales Confirmation Date"],
'transportationInformationDate': ctx.request.body["Transportation Information Date"],
'invoiceDocumentDate': ctx.request.body["Invoice Documen Datet"],
'transportationOrderDate': ctx.request.body["Transportation Order Date"],
'orderStatus':'unset',
'articles':{}
*/

export default OrderDocument;

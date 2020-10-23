import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Document, Page } from 'react-pdf';
import renderHTML from 'react-render-html';
import html from './htmls/annexDoc.html';
// import OrderHTML from './orderdocument'; // there is something I'm doing in here that makes the webapp not load at all

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {};

  handleClick = () => {
    console.log('HEtttREEEE');
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.handleClick();
          }}
        >
          Click Me To Send a PDF
        </Button>
        {/* {renderHTML(
          <OrderHTML
            personPhoneNumber={4145509999}
            address={'Alte Hof 23(Street) ' + '99999(Zipcode) ' + 'Daldorf(City)'}
            personSalutation={'Herr'}
            personName1={'Paul'}
            personName2={'Rinaldi'}
          />,
        )} */}
        {renderHTML(html)}
      </div>
    );
  }
}

export default Converter;

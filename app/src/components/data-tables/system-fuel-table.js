import React from 'react';

// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  getPublicFuelData,
} from '../../redux/modules/publicFuelData';
import { withTranslation } from 'react-i18next';

const EUR = '€';
const DATA_COLUMNS_COUNT = 6;
const FUEL_TYPE_COUNT = 5;

import { connect } from 'react-redux';
// improve with https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnisdummyfield-bool
class FuelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  async componentDidMount(){
  let response =  await this.props.getPublicFuelData();
  await this.setState({data:response.fuelData});
  console.log(response.fuelData);

  }

  handleChange(index, dataType, value) {
    const newState = this.state.content.map((item, i) => {
      if (i == index) {
        return { ...item, [dataType]: value };
      }
      return item;
    });

    this.setState({
      content: newState,
    });
  }

  handleChangeTop(index, dataType, value) {
    const newState = this.state.corridorsTop.map((item, i) => {
      if (i == index) {
        return { ...item, [dataType]: value };
      }
      return item;
    });

    this.setState({
      corridorsTop: newState,
    });
  }

  handleChangeBottom(index, dataType, value) {
    const newState = this.state.corridorsBottom.map((item, i) => {
      if (i == index) {
        return { ...item, [dataType]: value };
      }
      return item;
    });

    this.setState({
      corridorsBottom: newState,
    });
  }


  render() {
    console.clear();
    console.log(JSON.stringify(this.state.content));
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{this.props.t('Year')}</th>
            <th>{this.props.t('Month')}</th>
            <th style={{color:'green'}}>{this.props.t('Price € cent / liter')}</th>

          </tr>

          
          <tr>
          <td>2020</td>
          <td>{this.state.data[36]}</td>
          <td>{this.state.data[38]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[31]}</td>
          <td>{this.state.data[33]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[26]}</td>
          <td>{this.state.data[28]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[21]}</td>
          <td>{this.state.data[23]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[16]}</td>
          <td>{this.state.data[18]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[11]}</td>
          <td>{this.state.data[13]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[6]}</td>
          <td>{this.state.data[8]}€</td>
          </tr>
          <tr>
          <td>2020</td>
          <td>{this.state.data[1]}</td>
          <td>{this.state.data[3]}€</td>
          </tr>







        </thead>

      </table>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getPublicFuelData
})(withTranslation('common')(FuelTable));

import React from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { withTranslation } from 'react-i18next';
import { getFuelPrices, editFuelPrice, getFuelPrice, addFuelPrice } from '../../redux/modules/fuelpricedata';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
const EUR = '€';
const DATA_COLUMNS_COUNT = 6;
const FUEL_TYPE_COUNT = 5;

import { connect } from 'react-redux';
// improve with https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnisdummyfield-bool
class FuelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      corridorsTop: [{ a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '', j: '' }],
      corridorsBottom: [{ a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '', j: '' }],

      content: [
        { type: '1', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '' },
        { type: '2', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '' },
        { type: '3', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '' },
        { type: '4', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '' },
        { type: '5', p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '', p8: '', p9: '', p10: '' },
      ],
      isNewTable: true
    };
  }

  async componentDidMount() {
    alert(this.props.currentClient)

    let prices = await this.props.getFuelPrice(this.props.currentClient);
    console.log("price fuel");
    console.log(prices.FuelPriceFound[0].corridorsTop);
    if (prices.FuelPriceFound.length >= 1) {
      console.log("EXISTING FUEL PRICE");
      console.log(prices.FuelPriceFound.corridorsTop);
      this.setState({
        corridorsTop: prices.FuelPriceFound[0].corridorsTop,
        corridorsBottom: prices.FuelPriceFound[0].corridorsBottom,
        content: prices.FuelPriceFound[0].content,
        isNewTable: false,
      });
    }
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
    console.log(JSON.stringify(this.state.content));
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'green' }}
          onClick={async () => {
            if (this.state.isNewTable) {
              await this.setState({ clientId: this.props.currentClient })
              await this.props.addFuelPrice(this.state);
              await this.setState({ isNewTable: false })
            } else {
              await this.props.editFuelPrice(this.props.currentClient, this.state)
            }
          }
          }
        >
          {this.props.t('Save') + ' ' + this.props.t(this.props.currentTab)}
        </Button>
        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          style={{ margin: 10, float: 'left', backgroundColor: 'white', color: 'red' }}
          onClick={() => window.location.reload()}
        >
          {this.props.t('Cancel')}
        </Button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>{this.props.t('Price Corridor') + ' 1'}</th>
              <th>{this.props.t('Price Corridor') + ' 2'}</th>
              <th>{this.props.t('Price Corridor') + ' 3'}</th>
              <th>{this.props.t('Price Corridor') + ' 4'}</th>
              <th>{this.props.t('Price Corridor') + ' 5'}</th>
              <th>{this.props.t('Price Corridor') + ' 6'}</th>
              <th>{this.props.t('Price Corridor') + ' 7'}</th>
              <th>{this.props.t('Price Corridor') + ' 8'}</th>
              <th>{this.props.t('Price Corridor') + ' 9'}</th>
              <th>{this.props.t('Price Corridor') + ' 10'}</th>
            </tr>

            {this.state.corridorsTop.map((row, index) => {
              return (
                <tr>
                  <th></th>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'a', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].a}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'b', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].b}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'c', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].c}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'd', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].d}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'e', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].e}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'f', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].f}
                    />
                  </td>
                  <td>
                    {' '}
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'g', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].g}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'h', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].h}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'i', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].i}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeTop(index, 'j', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsTop[index].j}
                    />
                  </td>{' '}
                </tr>
              );
            })}

            {this.state.corridorsBottom.map((row, index) => {
              return (
                <tr>
                  <th>{this.props.t('Fuel Type')}</th>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'a', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].a}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'b', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].b}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'c', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].c}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'd', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].d}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'e', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].e}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'f', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].f}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'g', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].g}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'h', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].h}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'i', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].i}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChangeBottom(index, 'j', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.corridorsBottom[index].j}
                    />
                  </td>
                </tr>
              );
            })}
          </thead>
          <tbody>
            {this.state.content.map((row, index) => {
              return (
                <tr>
                  <td>
                    <h6>{this.state.content[index].type}</h6>
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p1', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p1}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p2', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p2}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p3', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p3}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p4', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p4}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p5', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p5}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p6', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p6}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p7', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p7}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p8', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p8}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p9', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p9}
                    />
                  </td>{' '}
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'p10', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].p10}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getFuelPrices, editFuelPrice, getFuelPrice, addFuelPrice
})(withTranslation('common')(FuelTable));

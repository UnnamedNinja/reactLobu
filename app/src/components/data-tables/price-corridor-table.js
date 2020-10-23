import React from 'react';
import { withTranslation } from 'react-i18next';
import PlusIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const EUR = '€';
const DATA_COLUMNS_COUNT = 6;
const FUEL_TYPE_COUNT = 5;

import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

class PriceCorridorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [{ validFrom: '', validTo: '', clientPrice: '', contractorPrice: '' }],
    };
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

  handleAdd() {
    const newContent = this.state.content;
    newContent.push({ validFrom: '', validTo: '', clientPrice: '', contractorPrice: '' });
    this.setState({
      content: newContent,
    });
  }

  handleDelete(index) {
    console.log('index', index);
    console.log(this.state.content);
    this.state.content.splice(index, 1);
    console.log(this.state.content);
    this.setState({
      something: 'a',
    });
  }

  render() {
    console.clear();
    console.log(JSON.stringify(this.state.content));
    return (
      <Container>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: 'center' }}>
                {this.props.t('Corridor (Unit as price basis)')}
              </th>
              <th colSpan={2} style={{ textAlign: 'center' }}>
                {this.props.t('Price')}
              </th>
              <th colSpan={2} style={{ textAlign: 'center' }}>
                {this.props.t('Delete')}
              </th>
            </tr>
            <tr>
              <th>{this.props.t('From')}</th>
              <th>{this.props.t('To')}</th>
              <th>{this.props.t('Client Price')}</th>
              <th>{this.props.t('Contractor Price')}</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {this.state.content.map((row, index) => {
              return (
                <tr>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'validFrom', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].validFrom}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'validTo', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].validTo}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'clientPrice', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].clientPrice}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => this.handleChange(index, 'contractorPrice', e.target.value)}
                      type="text"
                      className="form-control"
                      value={this.state.content[index].contractorPrice}
                    />
                  </td>
                  <td>
                    <IconButton
                      color="primary"
                      aria-label="delete price corridor"
                      component="span"
                      onClick={() => this.handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <IconButton
          color="primary"
          aria-label="delete price corridor"
          component="span"
          onClick={() => this.handleAdd()}
        >
          <PlusIcon />
          {this.props.t('Add new')}
        </IconButton>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {})(withTranslation('common')(PriceCorridorTable));

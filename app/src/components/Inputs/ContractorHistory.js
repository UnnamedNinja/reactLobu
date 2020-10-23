
import React from 'react';
import DatePicker from '../Inputs/DatePicker';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import { getContractors } from '../../redux/modules/contractor';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';
import RestoreIcon from '@material-ui/icons/Restore';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal';
// import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import { withTranslation } from 'react-i18next';
import { PRICE_HISTORY_COLUMNS } from '../../constants/ui-constants';
import { TextField } from '@material-ui/core';

const EUR = '€';
const DATA_COLUMNS_COUNT = 6;
const FUEL_TYPE_COUNT = 5;

import { Container } from '@material-ui/core';

class PriceHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ price: '', validFrom: '', validTo: '' }],
      open: false,
      textValue: '',
    };

  }

  componentDidMount = async() => {

    if (this.props.data) {
      this.setState({ data: JSON.parse(this.props.data) });
    }
  };

  handlePriceTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log('pH targetName, label, value:', evt.target.name, evt.target.label);

    this.setState({
      value: value,
    });

    this.props.callbackValue(evt.target.name, value);
    this.props.callbackValue(
      this.props.isEdit ? this.props.dbid : this.props.name,
      this.state.data,
    ); // value

    let newData;
    if (this.state.data[0] === undefined) {
      newData = [];
      newData.push({ price: value, validFrom: new Date(Date.now()), validTo: '' });
    } else {
      newData = this.state.data;
      newData[0] = { price: value, validFrom: new Date(Date.now()), validTo: '' };
    }
    this.setState({ data: newData });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.render();
  };

  handleChange =async(index, varName, value) => {
  //  alert(varName)

    const newState = this.state.data.map((item, i) => {
      if (i == index) {
        return { ...item, [varName]: value };
      }
      return item;
    });

    await this.props.callbackValue(this.props.isEdit ? this.props.dbid : this.props.name, newState); // value

    await this.setState({
      data: newState,
    });
  }

  handleAdd() {
    const newData = this.state.data;
    newData.push({
      price: '',
      validFrom: this.state.data[this.state.data.length - 1]
        ? this.state.data[this.state.data.length - 1].date
        : new Date(Date.now()),
      validTo: '',
    });
    this.props.callbackValue(this.props.isEdit ? this.props.dbid : this.props.name, newData);

    this.setState({
      data: newData,
    });
  }

  handleDelete(index) {
    console.log('index', index);
    console.log(this.state.data);
    this.state.data.splice(index, 1);
    console.log(this.state.data);
    this.props.callbackValue(this.props.isEdit ? this.props.dbid : this.props.name, newData);

    this.setState({
      something: 'a',
    });
  }
//See which price history to display in the textfield
   determinePriceHistoryDefault = () =>{
    let today = new Date(Date.now());
    this.props.data.map(async(priceHistoryDatum)=>{
      var dateFrom = priceHistoryDatum.validFrom;
      var dateTo = priceHistoryDatum.validTo;
      var dateCheck = new Date(Date.now());
      console.log("BOTHERZ");
      console.log(dateFrom);
      console.log(dateCheck);
      console.log(dateTo);
      console.log(dateCheck > dateFrom && dateCheck < dateTo);
      if (dateCheck > dateFrom && dateCheck < dateTo) {
        return priceHistoryDatum.price
      }else{
        return 'NO PRICE HISTORY SET FOR TODAY'
      }
    })
  }

  render() {
    console.log(JSON.stringify(this.state.data));
    return (
      <div style={{ display: 'inline-flex' }}>
        <TextField
          style={{ marginTop: 10 }}
          onChange={this.handlePriceTextFieldChange}
          name={this.props.name}
          required={this.props.required}
          label={this.props.t(this.props.label)}
          //this needs to be fixed according to date
          defaultValue={this.props.defaultContractor}
        />
        <IconButton
          color="primary"
          aria-label="delete price corridor"
          component="span"
          onClick={this.handleOpen}
        >
          <RestoreIcon />
        </IconButton>
        {this.state.open && (
          <Dialog
            title={''}
            onClose={this.handleClose}
            style={{
              width: '100%',
              height: '100%',
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, -50%)`,
              margin: 10,
              zIndex: 5,
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Paper>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan={1} style={{ textAlign: 'center' }}>
                      {this.props.t('Price')}
                    </th>
                    <th colSpan={1} style={{ textAlign: 'center' }}>
                      {this.props.t('Valid From')}
                    </th>
                    <th colSpan={1} style={{ textAlign: 'center' }}>
                      {this.props.t('Valid to')}
                    </th>
                    <th colSpan={1} style={{ textAlign: 'center' }}>
                      {this.props.t('Delete')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((row, index) => {
                    console.log("ROWER");
                    console.log(this.state.data);
                    console.log(row);
                    console.log(this.state.data[index]["Valid From"]);
                    console.log(row["Valid From"]);
                    return (
                      <tr>
                        <td>

                          <DatabaseMultiChoice
                            name={"Contractor"}
                            dbid={"contractor"}
                            value={row["contractor"]}
                            required={false}

                            method={"getContractors"}
                            getContractos={this.props.getContractors()}
                            label={this.props.t("Contractor")}
                            callbackValue={this.props.callbackValue}
                            callbackValueId={this.props.callbackValueId}
                            callbackValuePopUpContractor={(varName, val) => {this.handleChange(index, varName, val)}}
                            isContractorHistory={true}

                            isEdit={this.props.isEdit}

                          />
                        </td>
                        <td>
                          <DatePicker
                            required={false}
                            label={this.props.t('Valid From')}
                            defaultValue={
                              Date.parse(this.state.data[index].validFrom)
                            }
                            callbackValue={(varName, val) => this.handleChange(index, "validFrom", val)}
                            type="text"
                            className="form-control"
                            name={'Valid From'}
                            dbid={'validFrom'}
                            //value={this.props.isEdit ? this.state.data[index].validFrom : this.state.data[index]["Valid From"]}
                            isEdit={this.props.isEdit}
                          />
                        </td>
                        <td>
                          <DatePicker
                            required={false}
                            label={this.props.t('Valid To')}
                            defaultValue={
                            Date.parse(this.state.data[index].validTo)
                            }
                            callbackValue={(varName, val) => this.handleChange(index, "validTo", val)}
                            name={'Valid To'}
                            dbid={'validTo'}

                            type="text"
                            className="form-control"
                            value={this.state.data[index].validTo}
                            isEdit={this.props.isEdit}
                          />
                        </td>
                        <td>
                          <IconButton
                            color="primary"
                            aria-label="delete price history"
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
                aria-label="delete price history"
                component="span"
                onClick={() => this.handleAdd()}
              >
                <PlusIcon />
                {this.props.t('Add new')}
              </IconButton>
              <IconButton
                style={{ float: 'right' }}
                color="primary"
                aria-label="close opened price history modal"
                component="span"
                onClick={this.handleClose}
              >
                <CloseIcon />
                {this.props.t('Close')}
              </IconButton>
            </Paper>
          </Dialog>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {getContractors})(withTranslation('common')(PriceHistoryTable));

import React from 'react';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import MultiPhoneNumber from '../Inputs/multiPhoneNumber';
import { getCompanys } from '../../redux/modules/company';
import { getClients } from '../../redux/modules/client';
import { getContractors } from '../../redux/modules/contractor';
import { getPersons } from '../../redux/modules/person';
import { getOrders } from '../../redux/modules/order';
import { getArticles } from '../../redux/modules/article';
import { getPartners } from '../../redux/modules/partner';
import { getBanks } from '../../redux/modules/bank';

import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class MultiAccountManagerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      totalAccountManagerDetails: 1,
    };
  }
  doMounting = async() =>{
    if (this.props.defaultValues !== undefined) {
      const names = this.props.defaultValues.accountManagerNames;
      const numbers = this.props.defaultValues.accountManagerNumbers;
      console.log("names and numbers");
      console.log(names);
      console.log("----");
      console.log(numbers);

      let newState;
      if (names && numbers && numbers.length && names.length && numbers.length == names.length) {
        newState = {
          totalAccountManagerDetails: this.props.defaultValues.accountManagerNames.length,
        };

        names.forEach(async (name, i) => {
          newState['accountManagerName(' + (i + 1) + ')'] = name;
          newState['accountManagerPhoneNumber(' + (i + 1) + ')'] = numbers[i];
          this.addNewRow();
          await this.setState(newState)
        });
      }
      console.log('account newState', newState);
    }
    await this.props.callbackValue('totalAccountManagerDetails', this.state.totalAccountManagerDetails);
    console.log("GREAT STATE");
    console.log(this.state);
  }

  componentDidMount = async () => {
  await this.doMounting();
  };

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    const updatedTotalAccountManager = this.state.totalAccountManagerDetails + 1;
    cDivs.push('Object');
    this.setState({ customDiv: cDivs, totalAccountManagerDetails: updatedTotalAccountManager });
    console.log('just addded a new row,', updatedTotalAccountManager);
    this.props.callbackValue('totalAccountManagerDetails', updatedTotalAccountManager);
  };

  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    const updatedTotalAccountManager = this.state.totalAccountManagerDetails - 1;
    array.splice(index, 1);
    this.setState({ customDiv: array, totalAccountManagerDetails: updatedTotalAccountManager });
    this.props.callbackValue('totalAccountManagerDetails', updatedTotalAccountManager);
  };

  handleChildStateChange = (name, value) => {
    this.props.callbackValue(name, value);
    this.props.callbackValue('totalAccountManagerDetails', this.state.totalAccountManagerDetails);
    this.setState({
      [name]: value,
    });
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.props.callbackValue('totalAccountManagerDetails', this.state.totalAccountManagerDetails);
    this.setState({
      [name]: value,
    });
    this.props.callbackValue(name, value);
  };

  handleDatabaseMultiChoiceChange = (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE');
    console.log(name, value, data, dataLabel);
    this.setState({
      [name]: value,
      [name + 'Id']: data,
      [dataLabel]: value,
      [dataLabel + 'Id']: data,
    });
    this.props.callbackValue('totalAccountManagerDetails', this.state.totalAccountManagerDetails);
    this.props.callbackValue(this.props.isEdit ? name : dataLabel, value);
    this.props.callbackValue(this.props.isEdit ? name : dataLabel + 'Id', data);
  };

  render() {
    if (this.props.isEdit) {
      return (
        <div style={{ marginTop: '5px' }}>
          <Button
            startIcon={<PlusIcon />}
            variant="outlined"
            style={{ marginTop: 10, color: 'green' }}
            onClick={() => {
              this.addNewRow();
            }}
          >
            {this.props.t('Add Additional ' + this.props.entityType)}
          </Button>
          {this.state['accountManagerName(1)'] ? this.state.customDiv.map((cdiv, i) => {
            console.log("BOWS");
            console.log(i);
            console.log(this.state);
            console.log('accountManagerName(' + (i + 1) + ')');
            return (
              <div
                style={{ paddingTop: 12, height: '100%' }}
                className="expense-block"
                key={cdiv}
                id="expense-block-`${i}`"
                data-block={i}
              >
                <Paper style={{ backgroundColor: '#e9f0ff', padding: 5, margin: 10 }}>
                  <Grid style={{ margin: 20 }}>
                    <Button
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      style={{ color: 'red', backgroundColor: 'white', float: 'right', margin: 12 }}
                      onClick={() => {
                        this.deleteRow(i);
                      }}
                    >
                      {this.props.t('Remove From Order')}
                    </Button>
                    <br />
                    {console.log(i + 'boi', this.state['accountManagerName(' + (i + 1) + ')'])}
                    <DatabaseMultiChoice
                      key={'accountManagerName' + i}
                      label={this.props.t('Account Manager Name') + ' (' + (i + 1) + ')'}
                      name={'Account Manager Name (' + (i + 1) + ')'}
                      required={true}
                      dbid={'accountManagerName(' + (i + 1) + ')'}
                      callbackValue={this.handleDatabaseMultiChoiceChange}
                      method={'getAccountManagers'}
                      isEdit={this.props.isEdit}
                      value={
                        this.props.isEdit
                          ? this.state['accountManagerName(' + (i + 1) + ')']
                          : this.state['Account Manager Name (' + (i + 1) + ')']
                      }
                    />
                    <MultiPhoneNumber
                      key={'accountManagerPhoneNumber'}
                      id={'Account Manager Phone Number' + ' (' + (i + 1) + ')'}
                      callbackValue={this.handleMultiChoiceChange}
                      required={true}
                      label={this.props.t('Account Manager Phone Number') + ' (' + (i + 1) + ')'}
                      name={'Account Manager Phone Number (' + (i + 1) + ')'}
                      dbid={'accountManagerNumber(' + (i + 1) + ')'}
                      value={this.state['accountManagerPhoneNumber(' + (i + 1) + ')']}
                    />
                    <div />
                  </Grid>
                </Paper>
              </div>
            );
          }):null}
        </div>
      );
    }else{
    return (
      <div style={{ marginTop: '5px' }}>
        <Button
          startIcon={<PlusIcon />}
          variant="outlined"
          style={{ marginTop: 10, color: 'green' }}
          onClick={() => {
            this.addNewRow();
          }}
        >
          {this.props.t('Add Additional ' + this.props.entityType)}
        </Button>
        {this.state.customDiv.map((cdiv, i) => {
          console.log("BOWS");
          console.log(i);
          console.log(this.state);
          console.log('accountManagerName(' + (i + 1) + ')');
          return (
            <div
              style={{ paddingTop: 12, height: '100%' }}
              className="expense-block"
              key={cdiv}
              id="expense-block-`${i}`"
              data-block={i}
            >
              <Paper style={{ backgroundColor: '#e9f0ff', padding: 5, margin: 10 }}>
                <Grid style={{ margin: 20 }}>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    style={{ color: 'red', backgroundColor: 'white', float: 'right', margin: 12 }}
                    onClick={() => {
                      this.deleteRow(i);
                    }}
                  >
                    {this.props.t('Remove From Order')}
                  </Button>
                  <br />
                  {console.log(i + 'boi', this.state['accountManagerName(' + (i + 1) + ')'])}
                  <DatabaseMultiChoice
                    key={'accountManagerName' + i}
                    label={this.props.t('Account Manager Name') + ' (' + (i + 1) + ')'}
                    name={'Account Manager Name (' + (i + 1) + ')'}
                    required={true}
                    dbid={'accountManagerName(' + (i + 1) + ')'}
                    callbackValue={this.handleDatabaseMultiChoiceChange}
                    method={'getAccountManagers'}
                    isEdit={this.props.isEdit}
                    value={
                      this.props.isEdit
                        ? this.state['accountManagerName(' + (i + 1) + ')']
                        : this.state['Account Manager Name (' + (i + 1) + ')']
                    }
                  />
                  <MultiPhoneNumber
                    key={'accountManagerPhoneNumber'}
                    id={'Account Manager Phone Number' + ' (' + (i + 1) + ')'}
                    callbackValue={this.handleMultiChoiceChange}
                    required={true}
                    label={this.props.t('Account Manager Phone Number') + ' (' + (i + 1) + ')'}
                    name={'Account Manager Phone Number (' + (i + 1) + ')'}
                    dbid={'accountManagerNumber(' + (i + 1) + ')'}
                    value={this.state['accountManagerPhoneNumber(' + (i + 1) + ')']}
                  />
                  <div />
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
}
}

// Props: entityType, defaulltEntityValue, invoiceNumber, totalInvoiceAmount

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getContractors,
  getPersons,
  getOrders,
  getArticles,
  getPartners,
  getCompanys,
  getClients,
  getBanks,
})(withTranslation('common')(MultiAccountManagerDetails));

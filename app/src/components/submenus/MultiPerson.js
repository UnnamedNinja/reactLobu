import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import CheckBox from '../Inputs/Checkbox';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import { getPersons, getPerson } from '../../redux/modules/person';
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

class MultiPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      totalPersons: 0,
    };
  }

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    cDivs.push('Object');
    this.setState((prevState) => {
      return { customDiv: cDivs, totalPersons: prevState.totalPersons + 1 };
    });
    this.props.callbackValue('totalPersons', this.state.totalPersons);
  };

  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    array.splice(index, 1);
    this.setState((prevState) => {
      return { customDiv: array, totalPersons: prevState.totalPersons + 1 };
    });
    this.props.callbackValue('totalPersons', this.state.totalPersons);
  };

  handleTextFieldChange = (name, e) => {
    const value = e.target.value;
    console.log('e:', e);
    console.log('ename:', e.target.name);
    this.props.callbackValue(name, value);
    if (this.state.totalPersons == 0) {
      this.props.callbackValue('totalPersons', 1);
      this.setState({ totalPersons: 1 });
    }
    this.setState({
      [name]: value,
    });
  };

  callbackCommish = (commish) => {
    this.setState({
      ['commish' + this.state.totalPersons]: commish,
    });
  };

  handleDatabaseMultiChoiceChange = async (name, value, data, dataLabel) => {
    console.log('UPDATING DB MUTLICHOICE');
    console.log(name, value, data, dataLabel);
    this.props.callbackValue(dataLabel, data);
    let response = await this.props.getPerson(data);
    let person = response.PersonFound;
    console.log(person.commission);
    console.log(person.calculation)
    if (this.state.totalPersons == 0) {
      await this.props.callbackValue('totalPersons', 1);
      await this.setState({ totalPersons: 1 });
    }
    await this.setState({
      [name]: value,
      [dataLabel]: data,
      ['commission' + this.state.totalPersons]: person.commission,
      ['calculation' + this.state.totalPersons]: person.calculation,

    });
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.props.callbackValue(name, value);
    if (this.state.totalPersons == 0) {
      this.props.callbackValue('totalPersons', 1);
      this.setState({ totalPersons: 1 });
    }
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log('BSTATE');
    console.log(this.state);
    return (
      <div>
        <Button
          startIcon={<PlusIcon />}
          variant="outlined"
          style={{ color: 'green', marginTop: 10 }}
          onClick={() => {
            this.addNewRow();
          }}
        >
          {this.props.t('Add Additional Person')}
        </Button>
        {this.state.customDiv.map((cdiv, i) => {
          return (
            <div
              style={{ paddingTop: 12, height: '100%' }}
              className="expense-block"
              key={cdiv}
              id="expense-block-`${i}`"
              data-block={i}
            >
              <Paper style={{ backgroundColor: '#e9f0ff' }}>
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
                <DatabaseMultiChoice
                  key={i}
                  id={i}
                  required={true}
                  method={'getAccountManagers'}
                  value={this.state['Person (' + (i + 1) + ')']}
                  callbackValue={this.handleDatabaseMultiChoiceChange}
                  getPersons={this.props.getPersons}
                  label={this.props.t('Account Manager') + ' (' + (i + 1) + ')'}
                  name={'Account Manager (' + (i + 1) + ')'}
                  dbid={'accountManager(' + (i + 1) + ')'}
                />
               <TextField
                  style={{ margin: 10 }}
                  required={false}
                  value={this.state['calculation' + (i + 1)] || "EMPTY IN PERSON" }
                  label={this.props.t('Calculation') + ' (' + (i + 1) + ')'}
                  name={'Calculation (' + (i + 1) + ')'}
                  dbid={'calculation(' + (i + 1) + ')'}
                />
                <TextField
                  style={{ margin: 10 }}
                  required={false}
                  value={this.state['commission' + (i + 1)] || 'EMPTY IN PERSON'}
                  label={this.props.t('Commission') + ' (' + (i + 1) + ')'}
                  name={'Commission (' + (i + 1) + ')'}
                  dbid={'commission(' + (i + 1) + ')'}
                />

              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, { getPersons, getPerson })(
  withTranslation('common')(MultiPerson),
);

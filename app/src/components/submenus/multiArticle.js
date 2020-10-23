import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import CheckBox from '../Inputs/Checkbox';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import { addArticle, getArticles, ADD_ARTICLE } from '../../redux/modules/article';
import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';

class MultiArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customDiv: [1], // set initial state with one div
      totalArticles: 0,
    };
  }

  addNewRow = () => {
    let cDivs = this.state.customDiv;
    cDivs.push('Object');
    this.setState((prevState) => {
      return { customDiv: cDivs, totalArticles: prevState.totalArticles + 1 };
    });
    this.props.callbackValue('totalArticles', this.state.totalArticles);
  };

  deleteRow = (index) => {
    console.log(index);
    let array = this.state.customDiv;
    array.splice(index, 1);
    this.setState((prevState) => {
      return { customDiv: array, totalArticles: prevState.totalArticles + 1 };
    });
    this.props.callbackValue('totalArticles', this.state.totalArticles);
  };

  handleTextFieldChange = (evt) => {
    const value = evt.target.value;
    console.log(value);
    console.log(evt.target.name);
    this.setState({
      [evt.target.name]: value,
    });
    this.props.callbackValue(evt.target.name, value);
  };

  handleMultiChoiceChange = (name, value) => {
    console.log('UPDATING MUTLICHOICE');
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value,
    });
    this.props.callbackValue(name, value);
  };

  render() {
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
          {this.props.t('Add Additional Article')}
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
                  Remove From Order
                </Button>
                <br />
                <DatabaseMultiChoice
                  key={i}
                  id={i}
                  required={true}
                  method={'getArticles'}
                  callbackValue={this.handleMultiChoiceChange}
                  getArticles={this.props.getArticles}
                  label={'Article (' + (i + 1) + ')'}
                  name={'Article (' + (i + 1) + ')'}
                  dbid={'Article(' + (i + 1) + ')'}
                />
                <br />
                <TextField
                  key={i}
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Source: Price (' + (i + 1) + ')'}
                  name={'Source: Price (' + (i + 1) + ')'}
                  dbid={'sourcePrice(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Euro', 'USD']}
                  label={'Source Currency (' + (i + 1) + ')'}
                  name={'sourceCurrency (' + (i + 1) + ')'}
                  dbid={'sourceCurrency(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Tons', 'Kg']}
                  label={'Source Units (' + (i + 1) + ')'}
                  name={'Source Units (' + (i + 1) + ')'}
                  dbid={'sourceUnits(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Supplementary Payment', 'Compensation']}
                  label={'Soure: Cashflow (' + (i + 1) + ')'}
                  name={'Source: Cashflow (' + (i + 1) + ')'}
                  dbid={'sourceCashflow(' + (i + 1) + ')'}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Source: Deviating Article Name (' + (i + 1) + ')'}
                  name={'Source: Deviating Article Name (' + (i + 1) + ')'}
                  dbid={'sourceDeviatingArticleName(' + (i + 1) + ')'}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Source: Condition (' + (i + 1) + ')'}
                  name={'Source: Condition (' + (i + 1) + ')'}
                  dbid={'sourceCondition(' + (i + 1) + ')'}
                />
                <br />
                <TextField
                  key={i}
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Processor: Price (' + (i + 1) + ')'}
                  name={'Processor: Price (' + (i + 1) + ')'}
                  dbid={'processorPrice(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Euro', 'USD']}
                  label={'Processor: Currency (' + (i + 1) + ')'}
                  name={'Processor: Currency (' + (i + 1) + ')'}
                  dbid={'processorCurrency(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Tons', 'Kg']}
                  label={'Processor: Units (' + (i + 1) + ')'}
                  name={'Processor: Units (' + (i + 1) + ')'}
                  dbid={'processorUnits(' + (i + 1) + ')'}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Supplementary Payment', 'Compensation']}
                  label={'Processor: Cashflow (' + (i + 1) + ')'}
                  name={'Processor: Cashflow (' + (i + 1) + ')'}
                  dbid={'processorCashflow(' + (i + 1) + ')'}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Processor: Deviating Article Name (' + (i + 1) + ')'}
                  name={'Processor: Deviating Article Name (' + (i + 1) + ')'}
                  dbid={'processorDeviatingArticleName(' + (i + 1) + ')'}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Processor: Condition (' + (i + 1) + ')'}
                  name={'Processor: Condition (' + (i + 1) + ')'}
                  dbid={'processorCondition(' + (i + 1) + ')'}
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

export default connect(mapStateToProps, { getArticles })(MultiArticle);

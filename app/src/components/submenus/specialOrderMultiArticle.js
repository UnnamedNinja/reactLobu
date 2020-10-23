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
import { withTranslation } from 'react-i18next';

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
                  {this.props.t('Remove From Order')}
                </Button>
                <DatabaseMultiChoice
                  key={i}
                  id={i}
                  required={true}
                  method={'getArticles'}
                  callbackValue={this.handleMultiChoiceChange}
                  getArticles={this.props.getArticles}
                  label={this.props.t('Article') + ' (' + (i + 1) + ')'}
                  name={'Article (' + (i + 1) + ')'}
                  dbid={'Article(' + (i + 1) + ')'}
                  defaultValue={this.props['Article (' + (i + 1) + ')']}
                />
                <TextField
                  key={i}
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={this.props.t('Amount') + ' (' + (i + 1) + ')'}
                  name={'Amount(' + (i + 1) + ')'}
                  dbid={'amount(' + (i + 1) + ')'}
                  defaultValue={this.props['Amount (' + (i + 1) + ')']}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Euro', 'USD']}
                  label={this.props.t('Source Currency') + ' (' + (i + 1) + ')'}
                  name={'sourceCurrency (' + (i + 1) + ')'}
                  dbid={'sourceCurrency(' + (i + 1) + ')'}
                  defaultValue={this.props['Source Currency (' + (i + 1) + ')']}
                />
                <MultiChoice
                  callbackValue={this.handleMultiChoiceChange}
                  required={false}
                  options={['Piece', 'KM', 'Days', 'Stop', 'Hour']}
                  label={this.props.t('Units') + ' (' + (i + 1) + ')'}
                  name={'Units (' + (i + 1) + ')'}
                  dbid={'units(' + (i + 1) + ')'}
                  defaultValue={this.props['Units (' + (i + 1) + ')']}
                />

                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={this.props.t('Person') + ' (' + (i + 1) + ')'}
                  name={'Person (' + (i + 1) + ')'}
                  dbid={'person (' + (i + 1) + ')'}
                  defaultValue={this.props['Person (' + (i + 1) + ')']}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={'Provision (' + (i + 1) + ')'}
                  name={'Provision (' + (i + 1) + ')'}
                  dbid={'provision(' + (i + 1) + ')'}
                  defaultValue={this.props['Provision (' + (i + 1) + ')']}
                />
                <TextField
                  key={i}
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={this.props.t('Client Price') + ' (' + (i + 1) + ')'}
                  name={'Client Price (' + (i + 1) + ')'}
                  dbid={'clientPrice(' + (i + 1) + ')'}
                  defaultValue={this.props['Client Price (' + (i + 1) + ')']}
                />
                <TextField
                  key={i}
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={this.props.t('Contractor Price') + ' (' + (i + 1) + ')'}
                  name={'Contractor Price (' + (i + 1) + ')'}
                  dbid={'contractorPrice(' + (i + 1) + ')'}
                  defaultValue={this.props['contractorPrice (' + (i + 1) + ')']}
                />
                <TextField
                  style={{ margin: 10 }}
                  onChange={this.handleTextFieldChange}
                  required={false}
                  label={this.props.t('Comment') + ' (' + (i + 1) + ')'}
                  name={'Comment (' + (i + 1) + ')'}
                  dbid={'Comment (' + (i + 1) + ')'}
                  defaultValue={this.props['Comment (' + (i + 1) + ')']}
                  placeholder="Comment"
                  multiline
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

export default connect(mapStateToProps, { getArticles })(withTranslation('common')(MultiArticle));

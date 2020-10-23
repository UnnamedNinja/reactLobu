import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { getGroups } from '../../redux/modules/group';
import { getCompanys } from '../../redux/modules/company';
import { getFieldAgents } from '../../redux/modules/person';
import { getBanks } from '../../redux/modules/bank';
import { getContractors } from '../../redux/modules/contractor';
import { getClients } from '../../redux/modules/client';

import { connect } from 'react-redux';
import { ARTICLE_ITEM_TYPE_MENU_CHOICES } from '../../constants/ui-constants';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
let currentOption;

class DatabaseMultiMultiCheckboxChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      menuItems: [],
      response: [],
      nameProperty: '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  async componentDidMount() {
    if (this.props.method == 'getClients') {
      const response = await this.props.getClients();

      console.log('Client ALERT');
      console.log(response.allClients);

      this.setState({ response: response.allClients, nameProperty: '_id' });
    } else if (this.props.method == 'getContractors') {
      const response = await this.props.getContractors();
      console.log('CARRIER ALERT');
      console.log(response.allContractors);

      this.setState({ response: response.allContractors, nameProperty: '' });
    } else if (this.props.method == 'getArticles') {
      const response = await this.props.getArticles();

      console.log('ARTICLE ALERT');
      console.log(response.allArticles);

      this.setState({ response: response.allArticles, nameProperty: 'descriptionInEnglish' }); // todo should be able to switch between german and english?
    } else if (this.props.method == 'getGroups') {
      const response = await this.props.getGroups();

      console.log('GROUP ALERT');
      console.log(response.allGroups);

      this.setState({ response: response.allGroups, nameProperty: 'groupName' });
    } else if (this.props.method === 'getItemTypes') {
      console.log('ItemTypes ALERT');

      this.setState({ response: ARTICLE_ITEM_TYPE_MENU_CHOICES, nameProperty: 'description' });
    } else if (this.props.method === 'getCompanys') {
      const response = await this.props.getCompanys();

      console.log('Companys dk ALERT');
      console.log(response.allCompanys);

      this.setState({ response: response.allCompanys, nameProperty: 'executiveDirector' });
    } else if (this.props.method === 'getFieldAgents') {
      const response = await this.props.getFieldAgents();

      console.log('FieldAgentALERT ALERT');
      console.log(response.allFieldAgents);

      this.setState({ response: response.allFieldAgents, nameProperty: '_id' });
    } else if (this.props.method === 'getBanks') {
      const response = await this.props.getBanks();

      console.log('FieldAgentALERT ALERT');
      console.log(response.allBanks);

      this.setState({ response: response.allBanks, nameProperty: '_id' });
    } else if (this.props.method === 'getClients') {
      const response = await this.props.getClients();

      console.log('Client ALERT');
      console.log(response.allClients);

      this.setState({ response: response.allClients, nameProperty: '_id' });
    } else if (this.props.method === 'getContractors') {
      const response = await this.props.getContractors();

      console.log('Contractors ALERT');
      console.log(response.allContractors);

      this.setState({ response: response.allClients, nameProperty: '_id' });
    }
  }

  render() {
    console.log('VALUE');
    console.log(this.props.value);
    return (
      <span style={{ paddingTop: 15, paddingBottom: 15 }}>
        <div style={{ margin: 10, maxWidth: 300 }}>
          <Autocomplete
            style={{
              margin: 10,
              minWidth: 140,
              maxWidth: 300,
              display: 'inline-flex',
            }}
            id="combo-box-demo"
            defaultValue={this.props.value}
            options={this.state.response}
            onChange={(event, newValue) => {
              this.props.callbackValue(
                this.props.dbid,
                newValue[this.state.nameProperty],
                this.currentOption,
                this.props.name,
              );

              //this.props.callbackValue(this.props.dbid, newValue[this.state.nameProperty]);

              //this.setState({[this.props.dbid]:newValue})
            }}
            getOptionLabel={(option) => {
              // console.log("opton coming up");
              // console.log(option);
              // console.log(this.state.nameProperty);
              // console.log(option[this.state.nameProperty]);
              this.currentOption = option._id;
              if (option === null || option === undefined) {
                return '??';
              } else if (typeof option === 'object' && this.state.nameProperty != undefined) {
                if (option[this.state.nameProperty] != undefined) {
                  return option[this.state.nameProperty];
                } else {
                  return this.currentOption;
                }
              } else {
                return option;
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={this.props.label} required={this.props.required} />
            )}
          />
        </div>
      </span>
    );
  }
}

DatabaseMultiMultiCheckboxChoice.propTypes = {
  value: PropTypes.string,
  menuItems: PropTypes.array,
  response: PropTypes.array,
  nameProperty: PropTypes.string,
};

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getGroups,
  getBanks,
  getCompanys,
  getFieldAgents,
  getContractors,
  getClients,
})(DatabaseMultiMultiCheckboxChoice);

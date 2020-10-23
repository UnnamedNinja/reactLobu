import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { getGroups } from '../../redux/modules/group';
import { getCompanys } from '../../redux/modules/company';
import { getFieldAgents, getAccountManagers } from '../../redux/modules/person';
import { getBanks } from '../../redux/modules/bank';
import { getContractors } from '../../redux/modules/contractor';
import { getClients } from '../../redux/modules/client';
import { getArticles } from '../../redux/modules/article';

import { connect } from 'react-redux';
import { ARTICLE_ITEM_TYPE_MENU_CHOICES } from '../../constants/ui-constants';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from 'react-i18next';

let currentOption;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class DatabaseMultiChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      menuItems: [],
      response: [],
      selectedOptions:[],
      selectedOptionsIds:[],

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
    } else if (this.props.method == 'getPersons') {
      const response = await this.props.getPersons();
      console.log('CARRIER ALERT');
      console.log(response.allPersons);

      this.setState({ response: response.allPersons, nameProperty: '' });
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

      this.setState({ response: ARTICLE_ITEM_TYPE_MENU_CHOICES, nameProperty: 'companyCode' });
    } else if (this.props.method === 'getCompanys') {
      const response = await this.props.getCompanys();

      console.log('Companys ALERT');
      console.log(response.allCompanys);

      this.setState({ response: response.allCompanys, nameProperty: 'companyCode' });
    } else if (this.props.method === 'getCompanysCompanyCodes') {
      const response = await this.props.getCompanys();

      console.log('Companys ALERT');
      console.log(response.allCompanys);

      this.setState({ response: response.allCompanys, nameProperty: 'companyCode' });
    } else if (this.props.method === 'getCompanysFullNames') {
      const response = await this.props.getCompanys();

      console.log('Companys ALERT');
      console.log(response.allCompanys);

      this.setState({ response: response.allCompanys, nameProperty: 'companyCode' });
    } else if (this.props.method === 'getFieldAgents') {
      const response = await this.props.getFieldAgents();

      console.log('FieldAgentALERT ALERT');
      console.log(response.allFieldAgents);

      this.setState({ response: response.allFieldAgents, nameProperty: '_id' });
    } else if (this.props.method === 'getAccountManagers') {
      const response = await this.props.getAccountManagers();

      console.log('Account Managers ALERT');
      console.log(response.allPersons);

      this.setState({ response: response.allPersons, nameProperty: 'firstName' });
    } else if (this.props.method === 'getBanks') {
      const response = await this.props.getBanks();

      console.log('FieldAgentALERT ALERT');
      console.log(response.allBanks);

      this.setState({ response: response.allBanks, nameProperty: 'bankName' });
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
      <Autocomplete
        style={{
          marginRight: 10,
          marginLeft: 10,
          marginTop: 10,
          minWidth: 180,
          maxWidth: 300,
          display: 'inline-flex',
        }}
        multiple
        disableCloseOnSelect
        defaultValue={this.props.defaultValue != undefined ? this.props.defaultValue : []}
        id="checkboxes-tags-demo"
        options={this.state.response}
        onChange={async (event, newValue) => {
          // console.log('ASSIGNMENT', this.props.dbid, newValue, this.currentOption, this.props.name);
          let index = this.state.selectedOptions.length

          alert("PP"+' INDEX: '+index+" "+newValue[index].companyCode);
          await this.setState({ selectedOptions: [...this.state.selectedOptions, newValue[index].companyCode] }) //simple value
          await this.setState({ selectedOptionsIds: [...this.state.selectedOptionsIds, newValue[index]._id] }) //simple value

            this.props.callbackValue(
            this.props.dbid,
            this.state.selectedOptions,
            this.state.selectedOptionsIds,
            this.props.name,
          );

        /**
         if (newValue[0].name1) {
            this.props.callbackValue(
              this.props.dbid,
              newValue[0].companyCode,
              newValue[0]._id,
              this.props.name,
            );
          } else {
            this.props.callbackValue(
              this.props.dbid,
              newValue,
              this.currentOption,
              this.props.name,
            );
          }
          */


          //this.props.callbackValue(this.props.dbid, newValue[this.state.nameProperty]);

          //this.setState({[this.props.dbid]:newValue})
        }}
        getOptionLabel={(option) => {
          if (option.companyCode) {
            return option.companyCode;
          } else {
            return option;
          }
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.companyCode}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField {...params} label={this.props.label} required={this.props.required} />
        )}
      />
    );
  }
}

DatabaseMultiChoice.propTypes = {
  // value: PropTypes.string,
};

const mapStateToProps = ({ authentication }) => ({});

export default connect(mapStateToProps, {
  getGroups,
  getBanks,
  getArticles,
  getCompanys,
  getFieldAgents,
  getAccountManagers,
  getContractors,
  getClients,
})(withTranslation('common')(DatabaseMultiChoice));

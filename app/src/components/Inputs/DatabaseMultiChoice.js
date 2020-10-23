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
import { withTranslation } from 'react-i18next';
let currentOption;

const formatToId = (str) => {
  return str[0].toUpperCase() + str.slice(1, str.length) + 'Id';
};

class DatabaseMultiChoice extends React.Component {
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

  // fetch multichoice data
  async componentDidMount() {
    if (this.props.method == 'getClients') {
      const response = await this.props.getClients();

      console.log('Client ALERT');
      console.log(response.allClients);

      this.setState({ response: response.allClients, nameProperty: 'Name1' });
    } else if (this.props.method == 'getContractors') {
      const response = await this.props.getContractors();
      console.log('CARRIER ALERT');
      console.log(response.allContractors);

      this.setState({ response: response.allContractors, nameProperty: 'name1' });
    } else if (this.props.method == 'getPersons') {
      const response = await this.props.getPersons();
      console.log('PERSON ALERT');
      console.log(response.allPersons);
      console.log(response.allPersons[0]);
      this.setState({ response: response.allPersons, nameProperty: 'firstName' });
    } else if (this.props.method == 'getArticles') {
      const response = await this.props.getArticles();

      console.log('ARTICLE ALERT');
      console.log(response.allArticles);

      this.setState({ response: response.allArticles, nameProperty: 'description' }); // todo should be able to switch between german and english?
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
      console.log("responded in allcompanhy",response.allCompanys);

      // this.setState({ response: response.allCompanys, nameProperty: 'executiveDirector' });
            this.setState({ response: response.allCompanys, nameProperty: 'companyCode' });


    } else if (this.props.method === 'getCompanysCompanyCodes') {
      const response = await this.props.getCompanys();
      console.log('Companys ALERT');
      console.log(response.allCompanys);

      this.setState({ response: response.allCompanys, nameProperty: 'companyCode' });
    }

    // else if (this.props.method === 'getCompanysFullNames') {
    //   alert('showing banks here for getCompany')

    //   const response = await this.props.getCompanys();
    //   console.log('Companys ALERT');
    //   console.log("shwoing all fecthed",response.allCompanys);

    //   this.setState({ response: response.allCompanys, nameProperty: 'executiveDirector' });
    // }
    else if (this.props.method === 'getCompanysFullNames') {

      const company = await this.props.getCompanys();
      // console.log('Companys ALERT');
      // console.log("shwoing all fecthed",response.allCompanys);

      // this.setState({ response: response.allCompanys, nameProperty: 'executiveDirector' });
      console.log("showing fetched companies",company)
      const response = await this.props.getBanks();

      console.log(response.allBanks);
      response.allBanks.map((bank)=>{
        company.allCompanys.map((company)=>{
          if(company.executiveDirector.match(bank.company))
          bank.companyCode = company.companyCode
          bank.codeAndDescription = company.companyCode + " | " + bank.bankDescription
        })
      })
      console.log('response all banks',response.allBanks);


      this.setState({ response: response.allBanks, nameProperty: 'codeAndDescription' });
    }
    else if (this.props.method === 'getFieldAgents') {
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

      this.setState({ response: response.allClients, nameProperty: 'Name1' });
    } else if (this.props.method === 'getContractors') {
      const response = await this.props.getContractors();

      console.log('Contractors ALERT');
      console.log(response.allContractors);

      this.setState({ response: response.allClients, nameProperty: 'name1' });
    }
  }

  render() {
    console.log('VALUE');
    console.log("shoing",this.props.value);
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
        id="combo-box-demo"
        defaultValue={this.props.value}
        options={this.state.response}
        //name property
        onChange={async (event, newValue) => {
          this.props.callbackValue(
            this.props.dbid,
            newValue[this.state.nameProperty],
            this.currentOption,
            this.props.name, //this.props.label,
          );

          // if there is a callback to get the ID of the
          if (this.props.callbackValueId) {
            this.props.callbackValueId(formatToId(this.props.name), newValue._id);
          }
          if (this.props.isContractorHistory) {
            console.log("CONTRACTOR HISTROY CHANGER");
            console.log(newValue[this.state.nameProperty]);
            await this.props.callbackValuePopUpContractor("contractor",newValue[this.state.nameProperty])
            await this.props.callbackValuePopUpContractor("contractorId",newValue._id)

            //await this.props.callbackValuePopUpContractor("contractorId",newValue._id)
          }


          //this.props.callbackValue(this.props.dbid, newValue[this.state.nameProperty]);

          //this.setState({[this.props.dbid]:newValue})
        }}
        getOptionLabel={(option) => {
          // console.log("opton coming up");
          // console.log(option);
          // console.log(this.state.nameProperty);
          // console.log(option[this.state.nameProperty]);
          this.currentOption = option._id;
          // console.log('option:', option);
          if (option === null || option === undefined) {
            return '??';
          } else if (typeof option === 'object' && this.state.nameProperty != undefined) {
            if (option[this.state.nameProperty] != undefined) {
              // console.log('o[nameProp]=', option[this.state.nameProperty]);
              return option[this.state.nameProperty];
            } else {
              return this.currentOption;
            }
          } else {
            return option;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={this.props.t(this.props.label)}
            required={this.props.required}
          />
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

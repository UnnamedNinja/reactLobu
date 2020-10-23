import React from 'react';
import TextField from '@material-ui/core/TextField';
import MultiChoice from '../Inputs/MultiChoice';
import MultiMultiChoice from '../Inputs/MultiMultichoice';
import CheckBox from '../Inputs/Checkbox';
import DatePicker from '../Inputs/DatePicker';
import MultiArticle from '../submenus/multiArticle';
import DatabaseMultiChoice from '../Inputs/DatabaseMultiChoice';
import LocationPicker from '../Inputs/LocationPicker';
import DateRangePicker from '../Inputs/DateRangePicker';
import DateRangePicker2 from '../Inputs/DateRangePicker2';
import FileChooser from '../Inputs/FileChooser';
import MultiWeightSlip from '../submenus/multiWeightSlip';
import MultiInvoice from '../submenus/multiInvoice';
import InvoiceDeliveryMethod from '../Inputs/InvoiceDeliveryMethodInput';

import BankingDetailsInputFields from '../../Schemas/SubSchemas/AddMultiBankingDetails.json';
import MultiEntity from './multiEntity';

export const AddInputField = (props) => {
  console.log(props.obj);

  if (props.obj.type === 'TextInput') {
    return (
      <TextField
        key={props.obj.label}
        style={{ margin: 10 }}
        onChange={props.callbackHandleTextFieldChange}
        name={props.obj.label}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'MultiChoice') {
    return (
      <MultiChoice
        key={props.obj.label}
        id={props.obj.id}
        callbackValue={props.callbackHandleMultiChoiceChange}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
      />
    );
  } else if (props.obj.type === 'MultiMultiChoice') {
    return (
      <MultiMultiChoice
        key={props.obj.label}
        id={props.obj.id}
        callbackValue={props.callbackHandleMultiChoiceChange}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
        intern={props.internType}
      />
    );
  } else if (props.obj.type === 'DeliveryDateRangeMultiChoice') {
    return (
      <DateRangePicker
        key={props.obj.label}
        id={props.obj.id}
        callbackValue={props.callbackHandleMultiChoiceChange}
        callbackValueRange={props.callbackHandleChildStateChange}
        callbackDateChange={props.callbackHandleDateChange}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
        sourceCollection={props.parentState['Source: Collection']}
      />
    );
  } else if (props.obj.type === 'DeliveryDateRangeMultiChoice2') {
    return (
      <DateRangePicker2
        key={props.obj.label}
        id={props.obj.id}
        callbackValue={props.callbackHandleMultiChoiceChange}
        callbackValueRange={props.callbackHandleChildStateChange}
        callbackDateChange={props.callbackHandleDateChange}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
        processorDelivery={props.processorDelivery}
      />
    );
  } else if (props.obj.type === 'InvoiceDeliveryMethod') {
    return (
      <InvoiceDeliveryMethod
        key={props.obj.label}
        key2={props.obj.emailLabel}
        id={props.obj.id}
        callbackValue={props.callbackHandleMultiChoiceChange}
        callbackValueText={props.callbackHandleTextFieldChange}
        emailLabel={props.obj.emailLabel}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
        invoiceDeliveryMethod={props.invoiceDeliveryMethod}
        isEdit={props.isEdit}
      />
    );
  } else if (props.obj.type === 'CheckBox') {
    return (
      <CheckBox
        key={props.obj.label}
        id={props.obj.id}
        dbid={props.obj.dbid}
        callbackValue={props.callbackHandleCheckboxChange}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'DatePicker') {
    return (
      <DatePicker
        key={props.obj.label}
        id={props.obj.id}
        callbackValue={props.callbackHandleDateChange}
        required={props.obj.required}
        label={props.obj.label}
        name={props.obj.label}
        dbid={props.obj.dbid}
        value={props.parentState[props.obj.dbid]}
      />
    );
  } else if (props.obj.type === 'LocationPicker') {
    return (
      <LocationPicker
        key={props.obj.label}
        id={props.obj.id}
        dbid={props.obj.dbid}
        callbackValue={props.callbackHandleMultiChoiceChange}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'DatabaseMultiChoice') {
    return (
      <DatabaseMultiChoice
        key={props.obj.label}
        id={props.obj.id}
        name={props.obj.label}
        dbid={props.obj.dbid}
        value={props.parentState[props.obj.dbid]}
        required={props.obj.required}
        method={props.obj.method}
        getClients={props.getClients()}
        getContractos={props.getContractors()}
        getPersons={props.getPersons()}
        getOrders={props.getOrders()}
        getArticles={props.getArticles()}
        getPartners={props.getPartners()}
        label={props.obj.label}
        callbackValue={props.callbackHandleDatabaseMultiChoiceChange}
      />
    );
  } else if (props.obj.type === 'FileChooser') {
    return (
      <FileChooser
        key={props.obj.label}
        id={props.obj.label}
        dbid={props.obj.dbid}
        callbackValue={props.callbackHandleFilePickerChange}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'Multi') {
    // multies
    if (props.obj.multiType === 'BankingDetails') {
      console.log('making a multientity');
      return (
        <MultiEntity
          {...props}
          entityName={props.obj.multiType}
          entityInputs={Object.values(BankingDetailsInputFields)}
        />
      );
    } else {
      return null; // <div>Not found</div>
    }
  } else {
    return null;
  }
};

export const EditInputField = (props) => {
  props.callbackHandleChildStateChange({ [props.obj.dbid]: props.currentEntity[props.obj.dbid] });
  //console.log('BONGO');
  //console.log(props.parentState[props.obj.dbid]);

  if (props.obj.type == 'TextInput') {
    return (
      <TextField
        key={props.obj.dbid}
        style={{ margin: 10 }}
        defaultValue={props.parentState[props.obj.dbid]}
        onChange={(e) => {
          const { value } = event.target;
          props.callbackHandleChildStateChange(props.obj.dbid, value);
          //this.setState({ [props.obj.dbid]: value });
        }}
        name={props.obj.label}
        required={props.obj.required}
        label={props.obj.label}
        dbid={props.obj.dbid}
      />
    );
  } else if (props.obj.type == 'MultiChoice') {
    return (
      <MultiChoice
        key={props.obj.label}
        id={props.obj.id}
        dbid={props.obj.dbid}
        value={props.parentState[props.obj.dbid]}
        options={props.obj.options}
        callbackValue={props.callbackHandleMultiChoiceChange}
        required={props.obj.required}
        name={props.obj.label}
        label={props.obj.label}
        isEdit={true}
      />
    );
  } else if (props.obj.type === 'LocationPicker') {
    return (
      <LocationPicker
        key={props.obj.label}
        id={props.obj.id}
        dbid={props.obj.dbid}
        value={props.parentState[props.obj.dbid]}
        callbackValue={props.callbackHandleMultiChoiceChange}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'InvoiceDeliveryMethod') {
    return (
      <InvoiceDeliveryMethod
        key={props.obj.label}
        key2={props.obj.emailLabel}
        id={props.obj.id}
        isEdit={true}
        callbackValue={props.callbackHandleMultiChoiceChange}
        callbackValueText={props.callbackHandleTextFieldChange}
        emailLabel={props.obj.emailLabel}
        required={props.obj.required}
        options={props.obj.options}
        label={props.obj.label}
        dbid={props.obj.dbid}
        invoiceDeliveryMethod={props.parentState['invoiceDeliveryMethod']}
        invoiceEmail={props.parentState['invoiceEmail']}
      />
    );
  } else if (props.obj.type == 'CheckBox') {
    return (
      <CheckBox
        checked={props.parentState[props.obj.dbid]}
        key={props.obj.label}
        id={props.obj.id}
        dbid={props.obj.dbid}
        required={props.obj.required}
        label={props.obj.label}
        callbackValue={props.callbackHandleCheckboxChange}
      />
    );
  } else if (props.obj.type == 'DatePicker') {
    return (
      <DatePicker
        key={props.obj.label}
        id={props.obj.id}
        required={props.obj.required}
        label={props.obj.label}
      />
    );
  } else if (props.obj.type === 'DatabaseMultiChoice') {
    return (
      <DatabaseMultiChoice
        key={props.obj.label}
        id={props.obj.id}
        name={props.obj.label}
        dbid={props.obj.dbid}
        value={props.parentState[props.obj.dbid]}
        required={props.obj.required}
        method={props.obj.method}
        getClients={props.getClients()}
        getPersons={props.getPersons()}
        getOrders={props.getOrders()}
        getPartners={props.getPartners()}
        getArticles={props.getArticles()}
        getContractors={props.getContractors()}
        label={props.obj.label}
        callbackValue={props.callbackHandleDatabaseMultiChoiceChange}
      />
    );
  } else if (props.obj.type === 'FileChooser') {
    return (
      <FileChooser
        key={props.obj.label}
        id={props.obj.label}
        dbid={props.obj.dbid}
        callbackValue={props.callbackHandleFilePickerChange}
        required={props.obj.required}
        label={props.obj.label}
        isEdit
      />
    );
  } else {
    return;
  }
};

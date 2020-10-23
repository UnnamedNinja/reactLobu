import React from 'react';
import { FloatingLabel } from '@progress/kendo-react-labels';
import { DatePicker, DateInput } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-react-intl';
import '@progress/kendo-react-tooltip';
import '@progress/kendo-react-common';
import '@progress/kendo-react-popup';
import '@progress/kendo-react-buttons';
import '@progress/kendo-date-math';
import '@progress/kendo-react-dropdowns';

import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';

import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import deNumbers from 'cldr-numbers-full/main/de/numbers.json';
import deLocalCurrency from 'cldr-numbers-full/main/de/currencies.json';
import deCaGregorian from 'cldr-dates-full/main/de/ca-gregorian.json';
import deDateFields from 'cldr-dates-full/main/de/dateFields.json';
load(
  likelySubtags,
  currencyData,
  weekData,
  deNumbers,
  deLocalCurrency,
  deCaGregorian,
  deDateFields
);
import i18next from 'i18next';


// import esMessages from '../../translations/de.json';
// loadMessages(esMessages, 'de');

const RenderMyDateInput = (props) => {
  if (props.value !== null && props.value !== undefined) {
    return <DateInput readOnly={props.readOnly} value={props.value} onChange={props.onChange} />;
  }
  return (
    <input
      className="k-textbox"
      onFocus={(e) => {
        e.target.value = '';
        props.onChange(e);
      }}
      readOnly={props.readOnly}
    />
  );
};

const sizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'];

export default function KendoDatePicker(props) {
  console.log("[DatePicker.js] showing availabe props here ", props)
  const [ddlState, setDdlState] = React.useState();
  const editorId = 'sizes-editor';
  const labelId = 'sizes-label';

  React.useEffect(() => {
    if (props.isEdit && props.defaultValue) {
      setDdlState(new Date(props.defaultValue));
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        margin: 10,
        display: 'inline',
        bottom: '3px',
        color: '#D3D3D3',
      }}
    >
      <FloatingLabel
        id={labelId}
        label={`${props.label}${props.required ? ' *' : ''}`}
        editorId={editorId}
        editorValue={ddlState}
      >
        {i18next.language == 'de' ?
         <IntlProvider locale={'de'}>
         <DatePicker
           id={props.id}
           ariaLabelledBy={props.label}
           // required={props.required}
           style={{ color: '#D3D3D3', position: 'absolute', margin: 10, bottom: '30px' }}
           weekNumber={true}
           format={'dd/mm/yyyy'}
           formatPlaceholder={{ year: 'yyyy', month: 'mm', day: 'dd' }}
           defaultValue={props.defaultValue ? new Date(props.defaultValue) : undefined}
           value={ddlState}
           disabled={props.disabled}
           dateInput={RenderMyDateInput}
           onChange={(event) => {
             if (ddlState) {
               setDdlState(new Date(event.target.value));
             }
             props.callbackValue(
               props.isEdit ? props.dbid : props.name,
               new Date(event.target.value),
             );
           }}
         />
       </IntlProvider>
       :
       <DatePicker
         id={props.id}
         ariaLabelledBy={props.label}
         // required={props.required}
         style={{ color: '#D3D3D3', position: 'absolute', margin: 10, bottom: '30px' }}
         weekNumber={true}
         format={'dd/mm/yyyy'}
         formatPlaceholder={{ year: 'yyyy', month: 'mm', day: 'dd' }}
         defaultValue={props.defaultValue ? new Date(props.defaultValue) : undefined}
         value={ddlState}
         disabled={props.disabled}
         dateInput={RenderMyDateInput}
         onChange={(event) => {
           if (ddlState) {
             setDdlState(new Date(event.target.value));
           }
           props.callbackValue(
             props.isEdit ? props.dbid : props.name,
             new Date(event.target.value),
           );
         }}
       />
      }

      </FloatingLabel>
    </div>
  );
}

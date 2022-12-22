import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { LocalizationProvider, IntlProvider, loadMessages, load } from '@progress/kendo-react-intl';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import esnumbers from 'cldr-numbers-full/main/es/numbers.json';
import escaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esdateFields from 'cldr-dates-full/main/es/dateFields.json';
import estimeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';

import ennumbers from 'cldr-numbers-full/main/en/numbers.json';
import encaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json';
import endateFields from 'cldr-dates-full/main/en/dateFields.json';
import entimeZoneNames from 'cldr-dates-full/main/en/timeZoneNames.json';

import languageConfig from '../../../config/languageConfig';
import PropTypes from 'prop-types'

load(
   likelySubtags,
   currencyData,
   weekData,
   esnumbers,
   escaGregorian,
   esdateFields,
   estimeZoneNames,
   ennumbers,
   encaGregorian,
   endateFields,
   entimeZoneNames
);

const GvdDatePicker = ({ id = null, name, value, lang, onChange, disabled }) => {

   loadMessages(languageConfig.ES.kendo.datepicker, "es");
   loadMessages(languageConfig.EN.kendo.datepicker, "en");

   return (
      <LocalizationProvider language={lang}>
         <IntlProvider locale={lang}>
            <DatePicker
               id={id}
               name={name}
               value={value}
               onChange={onChange}
               required={true}
               format="dd-MM-yyyy"
               formatPlaceholder={{ year: 'yyyy', month: 'mm', day: 'dd' }}
               disabled={disabled}
            />
         </IntlProvider>
      </LocalizationProvider>);
}

GvdDatePicker.propTypes = {
   id: PropTypes.string,
   name: PropTypes.string,
   value: PropTypes.any,
   lang: PropTypes.string,
   disabled: PropTypes.bool,
   onChange: PropTypes.func,
}

export default GvdDatePicker; 

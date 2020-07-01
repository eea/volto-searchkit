import React from 'react';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import { map } from 'lodash';
import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { FormFieldWrapper } from '@plone/volto/components';
import { FormContext } from '../Blocks/Form';

const Select = loadable(() => import('react-select'));

const messages = {
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
};

const SelectField = (props) => {
  // console.log('props values', props);
  const { onEdit, id, value = null, onChange, es_indexes } = props;

  const { form } = React.useContext(FormContext);

  let choices = [];
  if (form) {
    const index =
      es_indexes[form?.es_index?.host]?.items?.[form?.es_index?.indexName] ||
      {};
    const props = index.mappings?.resource?.properties || {};
    choices = Object.keys(props).map((l) => [l, l]);
  }

  return (
    <FormFieldWrapper {...props} draggable={true}>
      <Select
        id={`field-${id}`}
        name={id}
        disabled={onEdit !== null}
        className="react-select-container"
        classNamePrefix="react-select"
        isMulti={id === 'roles' || id === 'groups'}
        options={[
          ...map(choices, (option) => ({
            value: option[0],
            label:
              // Fix "None" on the serializer, to remove when fixed in p.restapi
              option[1] !== 'None' && option[1] ? option[1] : option[0],
          })),
          {
            label: props.intl.formatMessage(messages.no_value),
            value: 'no-value',
          },
        ]}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ DropdownIndicator, Option }}
        defaultValue={{ label: value, value: value }}
        onChange={(data) => {
          return onChange(id, data.value === 'no-value' ? null : data.value);
        }}
      />
    </FormFieldWrapper>
  );
};

export default connect((state, props) => {
  return {
    es_indexes: state.es_server,
  };
}, {})(SelectField);

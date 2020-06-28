import { FormFieldWrapper } from '@plone/volto/components';
import React from 'react';
import loadable from '@loadable/component';
import { map, find, isBoolean, isObject, intersection } from 'lodash';
import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

const Select = loadable(() => import('react-select'));

const messages = {
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
};

const SelectIndex = (props) => {
  const { onEdit, id, choices, value, onChange } = props;

  return (
    <FormFieldWrapper {...this.props} draggable={true}>
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
            label: this.props.intl.formatMessage(messages.no_value),
            value: 'no-value',
          },
        ]}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ DropdownIndicator, Option }}
        defaultValue={null}
        onChange={(data) => {
          let dataValue = [];
          if (Array.isArray(data)) {
            for (let obj of data) {
              dataValue.push(obj.value);
            }
            return onChange(id, dataValue);
          }
          return onChange(
            id,
            data.value === 'no-value' ? undefined : data.value,
          );
        }}
      />
    </FormFieldWrapper>
  );
};

export default SelectIndex;

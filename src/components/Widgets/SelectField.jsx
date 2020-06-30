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
import { getIndexes, getIndexDefinition } from '../../actions';
import { FormContext } from '../Blocks/Form';

// , find, isBoolean, isObject, intersection

const Select = loadable(() => import('react-select'));

const messages = {
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
};

const SelectIndex = (props) => {
  console.log('props values', props);
  const {
    onEdit,
    id,
    choices,
    value = {},
    onChange,
    es_indexes,
    getIndexes,
  } = props;
  const { host } = value;

  React.useEffect(() => {
    if (host && !es_indexes.loading && !es_indexes.loaded) {
      getIndexes(host);
    }
  }, [host, es_indexes, getIndexes]);
  // const [was, setWas] = React.useState();
  // React.useEffect(() => {
  //   if (host && !was) {
  //     setWas(true);
  //     getIndexes(host);
  //   }
  // }, [host, es_indexes, getIndexes, was]);
  console.log('indexName', value.indexName);

  const { form } = React.useContext(FormContext);
  console.log('form', form);

  return (
    <FormFieldWrapper {...props} title="Index name" draggable={true}>
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
        defaultValue={{ label: value.indexName, value: value.indexName }}
        onChange={(data) => {
          return onChange(
            id,
            data.value === 'no-value'
              ? { ...value, indexName: null }
              : {
                  ...value,
                  indexName: data.value,
                },
          );
        }}
      />
    </FormFieldWrapper>
  );
};

export default connect(
  (state, props) => {
    const host = props.value?.host;
    const es_indexes = state.es_server[host] || {};
    const { items = [] } = es_indexes;
    console.log('es_indexes', es_indexes);
    return {
      es_indexes,
      choices: items.map((l) => [l, l]),
    };
  },
  { getIndexes },
)(SelectIndex);

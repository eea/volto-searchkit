import React from 'react';

export const FormContext = React.createContext();

export const FormProvider = (props) => {
  const { defaultValue } = props;
  const [form, setForm] = React.useState(defaultValue);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {props.children}
    </FormContext.Provider>
  );
};

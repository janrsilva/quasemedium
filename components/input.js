import { TextField } from '@material-ui/core';
import ErrorMessage from './error-message';
import React from 'react';

export default function Input(props) {
  const inputName = [props.name];
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props.formik;
  return <div className={props.className}>
    <TextField
      name={props.name}
      id="standard-basic"
      label={props.label}
      onChange={props.formik.onChange}
      value={props.value}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[inputName]}
    />
    {touched[inputName] && errors[inputName] && errors[inputName].map(
      (message, key) => <ErrorMessage key={key}>{message}</ErrorMessage>
    )}
  </div>
}
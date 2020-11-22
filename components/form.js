import { Formik } from 'formik';
import React from 'react';

export default function Form(props) {
  const rules = {
    email: (inputName, message, values, errors) => {
      if (values[inputName] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[inputName])) {
        pushError(errors, inputName, message);
      }
    },
    required: (inputName, message, values, errors) => {
      if (!values[inputName]) {
        pushError(errors, inputName, message);
      }
    },
    nickname: (inputName, message, values, errors) => {
      if (values[inputName] && !/^[A-Z0-9._-]+$/i.test(values[inputName])) {
        pushError(errors, inputName, message);
      }
    },
  }
  const validate = values => {
    const errors = {};
    const validationRules = props.validate;
    Object.keys(validationRules).forEach(inputName => {
      const item = validationRules[inputName];
      Object.keys(item).forEach(rule => {
        const message = item[rule];
        rules[rule](inputName, message, values, errors)
      });
    });
    return errors;
  };
  return <Formik initialValues={props.initialValues} validate={validate} onSubmit={props.onSubmit}>
    {formik => props.children(formik)}
  </Formik>
}

function pushError(errors, inputName, message) {
  if (!errors[inputName]) {
    errors[inputName] = [];
  }
  errors[inputName].push(message);
}
import styles from '../styles/SignUp.module.css'
import React from 'react';
import MyModal from './modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import ErrorMessage from './error-message';

export default function SignUp() {
  return <a className={styles.card}>
    <SignUpButton>
      Quero fazer parte!
    </SignUpButton>
  </a>;
}

function SignUpButton(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const initialValues = { email: '', password: '' };
  return (
    <div>
      <div onClick={openModal}>
        {props.children || 'Entrar'}
      </div>
      <MyModal closeModal={closeModal} isOpen={modalIsOpen}>
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className={styles.grid}>
              <div>
                <h3>Faça parte da comunidade!</h3>
              </div>
              <div>
                <p>você receberá um link para continuar seu cadastro</p>
              </div>
              <div>
                <TextField
                  name="email"
                  id="standard-basic"
                  label="e-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage>{errors.email && touched.email && errors.email}</ErrorMessage>
              </div>
              <div>
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                  Continuar
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </MyModal>
    </div>
  );
}
import React from "react";
import styles from '../styles/Account.module.css'
import { getSession } from 'next-auth/client'
import Page from '../components/page'
import Input from '../components/input'
import { Button } from '@material-ui/core'
import axios from 'axios';
import Form from '../components/form'
import { AccountService } from '../src/services/account-service'
import { AccountRepository } from '../src/repositories/account-repository'
import { DBFactory } from '../src/factories/db-factory'

export default function Account({user}) {

  const initialValues = {
    name: '',
    github: '',
    linkedin: '',
    ...user
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const {data} = await axios.patch('/api/me', values);
    setSubmitting(false);
  };

  const validate = {
    name: {
      required: "Obrigatório",
    },
    email: {
      required: "Obrigatório",
      email: "Esse não é um formato de e-mail válido",
    },
    linkedin: {
      nickname: "Informe seu usuário ao invés da url",
    },
    github: {
      nickname: "Informe seu usuário ao invés da url",
    }
  }

  return (
    <Page>
      <Form initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {formik => (
          <form onSubmit={formik.handleSubmit} className={styles.grid}>
            <Input className={styles.grid} name="name" label="nome" formik={formik} />
            <Input className={styles.grid} name="email" label="e-mail" formik={formik} />
            <Input className={styles.grid} name="linkedin" label="/linkedin" formik={formik} />
            <Input className={styles.grid} name="github" label="/github" formik={formik} />
            <div>
              <Button disabled={formik.isSubmitting} type="submit" variant="contained" color="primary">
                Salvar
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const db = DBFactory.build(process.env.DB_DRIVER);
  await db.connect();
  const service = new AccountService(new AccountRepository(db));
  // @todo Error: Error serializing `.user._id` returned from `getServerSideProps` in "/account".
  // Reason: `object` ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types.
  const user = JSON.parse(JSON.stringify(await service.getByEmail(session.user.email)));
  return {
    props: {
      session,
      user
    },
  }
}
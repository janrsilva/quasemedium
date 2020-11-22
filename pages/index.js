import React from 'react';
import styles from '../styles/Home.module.css'
import SignUp from '../components/signup'
import Page from '../components/page'

export default function Home() {
  return (
    <Page>
      <h1 className={styles.title}>
        Quase leia artigos de forma fácil.
      </h1>
      <div className={styles.grid}>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h3>O Primeiro Artigo</h3>
          Entenda por que esse projeto existe.
        </a>
        <SignUp />
      </div>
    </Page>
  );
}

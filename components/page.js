import React from 'react';
import Footer from '../components/footer'
import Header from '../components/header'
import styles from '../styles/Home.module.css'

export default function Page(props) {
  return (
    <div className={styles.container}>
      <Header/>
        <main className={styles.main}>
          {props.children}
        </main>
      <Footer />
    </div>
  );
}
import Footer from '../components/footer'
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import SignUp from '../components/signup'
import { providers } from 'next-auth/client'

export default function Home({ providers }) {
  return (
    <div className={styles.container}>
      <Header providers={providers} />
      <main className={styles.main}>
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
      </main>
      <Footer />
    </div>
  );
}

// enable the SSR
export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context)
    }
  }
}
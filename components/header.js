import Head from "next/head";
import Image from "next/image";
import styles from '../styles/Header.module.css'
import LoginButton from "./login";

export default function Header(props) {
  return (
    <header className={styles.header}>
      <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/logo.png"
        alt="logo do quasemedium"
        width={300}
        height={64}
      />
      <LoginButton providers={props.providers} />
    </header>
  )
}

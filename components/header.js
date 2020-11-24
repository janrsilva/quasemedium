import React from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from '../styles/Header.module.css'
import LoginButton from "./login";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/client";

export default function Header(props) {
  const router = useRouter()
  const [ session ] = useSession()

  const goHome = () => {
    router.push('/');
  };
  return (
    <header className={styles.header}>
      <Head>
          <title>Quasemedium</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        onClick={goHome}
        src="/logo.png"
        alt="logo do quasemedium"
        width={300}
        height={64}
      />
      <LoginButton session={session} />
    </header>
  )
}

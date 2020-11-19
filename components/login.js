import React from 'react';
import styles from '../styles/Login.module.css'

import { signIn, useSession } from 'next-auth/client'
import AccountMenu from './account-menu';

export default function LoginButton(props) {
  const [ session ] = useSession()

  return (
    <div>
      {!session && <a className={styles.signin} onClick={signIn}>
          {props.children || 'Entrar'}
        </a>
      }
      {session && <AccountMenu />}
    </div>
  );
}

import React from 'react';
import styles from '../styles/Login.module.css'
import { signIn } from 'next-auth/client'
import AccountMenu from './account-menu';

export default function LoginButton(props) {

  return (
    <div>
      {!props.session && <a className={styles.signin} onClick={signIn}>
          {props.children || 'Entrar'}
        </a>
      }
      {props.session && <AccountMenu name={props.session.user.name} />}
    </div>
  );
}

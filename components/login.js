import React from 'react';
import styles from '../styles/Login.module.css'
import MyModal from './modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function LoginButton(props) {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div>
      <a className={styles.signin} onClick={openModal}>
        {props.children || 'Entrar'}
      </a>
      <MyModal closeModal={closeModal} isOpen={modalIsOpen}>
        <form className={styles.grid}>
          <div>
            <h3>Entre.</h3>
          </div>
          <div>
            <TextField id="standard-basic" label="e-mail" />
          </div>
          <div>
            <TextField id="standard-basic" label="senha" />
          </div>
          <div>
            <Button variant="contained" color="primary">
              Entrar
            </Button>
          </div>
        </form>
      </MyModal>
    </div>
  );
}

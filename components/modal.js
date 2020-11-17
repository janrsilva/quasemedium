import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/Modal.module.css'
import { GrClose } from 'react-icons/gr';

export default function MyModal(props) {
  Modal.setAppElement('body');
  return <Modal isOpen={props.isOpen}>
    <header className={styles.header}>
      <GrClose onClick={props.closeModal}/>
    </header>
    <div className={styles.content}>
      {props.children}
    </div>
  </Modal>;
}

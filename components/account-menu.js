import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { VscAccount } from 'react-icons/vsc';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import { Fade } from '@material-ui/core';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goAccount = () => {
    router.push('/account');
  };

  const goNewArticle = () => {
    router.push('/editor/new');
  };

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div className="menu" style={style}>
      <span>{props.name && <small>Oi, <FirtName>{props.name}</FirtName></small>}</span>
      <Button className="new" aria-controls="menu-list-grow" aria-haspopup="true" onClick={goNewArticle}>
        <BsFileEarmarkPlus size="1.5rem" />
      </Button>
      <Button aria-controls="menu-list-grow" aria-haspopup="true" onClick={menuHandleClick}>
        <VscAccount size="1.5rem" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={goAccount}>Minha Conta</MenuItem>
        <MenuItem onClick={handleClose}>Meus Artigos</MenuItem>
        <MenuItem onClick={goNewArticle}>Novo Artigo</MenuItem>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

export function FirtName(props) {
  return <>{firtName(props.children)}</>
}

export function firtName(name) {
  return name.split(' ')[0]
}
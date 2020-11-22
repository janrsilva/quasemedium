import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { VscAccount } from 'react-icons/vsc';
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import { Fade } from '@material-ui/core';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goAccount = () => {
    router.push('/account');
  };

  return (
    <div>
      {props.name && <small>Oi, {props.name.split(' ')[0]}</small>}
      <Button aria-controls="menu-list-grow" aria-haspopup="true" onClick={handleClick}>
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
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
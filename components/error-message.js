import React from 'react';

const style = {
  color: 'red'
}

export default function ErrorMessage(props) {
  return <small style={style}>{props.children}</small>
}

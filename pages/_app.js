import React from 'react';
import '../styles/globals.css'
import "regenerator-runtime/runtime.js";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

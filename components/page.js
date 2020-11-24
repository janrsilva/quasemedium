import React from 'react';
import Footer from '../components/footer'
import Header from '../components/header'

export default function Page(props) {
  const containerStyle = {
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const mainStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  containerStyle.justifyContent = props.justifyContent || containerStyle.justifyContent;
  mainStyle.justifyContent = props.justifyContent || mainStyle.justifyContent;

  return (
    <div style={containerStyle}>
      <Header/>
        <main style={mainStyle}>
          {props.children}
        </main>
      <Footer />
    </div>
  );
}
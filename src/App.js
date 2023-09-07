import React from 'react';
import { Toaster } from 'react-hot-toast';

import Title from './components/Title';
import AppHeader from './components/AppHeader';

import classes from './App.module.css';
import AppContent from './components/AppContent';

function App() {
  return (
    <>
      <div>
        <Title />
        <div className={classes.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.5rem',
          },
        }}
      />
    </>
  );
}

export default App;

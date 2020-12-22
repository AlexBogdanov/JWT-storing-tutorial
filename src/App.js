import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Validator from './core/components/validator/Validator';
import { ajaxRefreshToken } from './core/services/authenticationService';
import inMemoryJwtService from './core/services/inMemoryJwtService';

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    ajaxRefreshToken()
      .then(res => {
        const { token, tokenExpiration } = res.data;
        inMemoryJwtService.setToken(token, tokenExpiration);
        setIsAppReady(true);
      }).catch(() => {
        setIsAppReady(true);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {
          isAppReady ?
          <Validator />
          :
          <div>Loading...</div>
        }
      </header>
    </div>
  );
}

export default App;

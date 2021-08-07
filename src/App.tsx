import { useState } from 'react';

import SplashScreen from './views/SplashScreen';
import ListView from './views/ListView';

import './styles/global.scss';

function App() {

  const [token, setToken] = useState<string>('');

  const logUserIn = (token: string) => {
    setToken(token);
  }

  return (
    <div>
      {token ? <ListView token={token} /> : <SplashScreen logUserIn={logUserIn} />}
    </div>
  );
}

export default App;

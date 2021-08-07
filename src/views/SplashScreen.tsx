import React, { useState } from 'react';

import styles from '../styles/SplashScreen.module.scss';

const url = 'https://thebetter.bsgroup.eu/Authorization/SignIn';

interface PropTypes {
  logUserIn: (token: string) => void;
}

const SplashScreen: React.FC<PropTypes> = ({ logUserIn }) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const getToken = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        setUsername('');
        setPassword('');
        logUserIn(data.AuthorizationToken.Token);
      })
      .catch(error => console.error('Error: ', error));
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() !== 'anonymous' || password !== '0000') return;
    getToken();
  }

  return (
    <main className={styles.container}>
      <h1>BSG Recruitment Task</h1>
      <p>This is an OTT web application containing video content with the option of playback.</p>
      <form onSubmit={handleFormSubmit} >
        <input type="text" placeholder='Enter username' value={username} onChange={handleUsernameChange} />
        <input type="text" placeholder='Enter password' value={password} onChange={handlePasswordChange} />
        <button>Log in</button>
      </form>
    </main>
  )
};

export default SplashScreen;
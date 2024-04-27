import { useState } from 'react'

import "./App.css";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      setLoggedIn(true);
      setError('');
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleSignUp = () => {
    setLoading(true);
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      return response.json();
    })
    .then(data => {
      setError('');
      alert('Signup successful, please log in.');
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      {loggedIn ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <div>
          <h1 className='text-3xl font-bold text-center text-red-400 mb-6'>Welcome, Sign in or Sign up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:border-blue-500'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:border-blue-500'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block'
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block mt-4'
              onClick={handleSignUp}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
